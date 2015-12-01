package com.neusoft.unieap.action;

/**
 * 扩展<code>org.apache.struts.actions.DispatchAction</code>。<br/>
 * 一为隔离，以便扩展；二为解决Tomcat请求中的汉字问题。
 *
 * @author  邵树力 shaosl@neusoft.com
 * @version 1.7
 */
/*--------------------------------------------------------------
 创建时间：2003-04-12
 修改履历：2003-09-23 赵永生   加入Web的同步令牌，防止重复提交请求   增加execute方法和静态变量
 --------------------------------------------------------------*/

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.neusoft.om.dao.log.LogVO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.DBLogger;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.config.DataWindowConfig;
import com.neusoft.unieap.config.EAPConfigHelper;
import com.neusoft.unieap.config.SSLConfig;
import com.neusoft.unieap.service.org.Person;
import com.neusoft.unieap.service.ssl.SslUtil;
import com.neusoft.unieap.util.Globals;

/**
 * @author huangzg
 * 
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class EAPDispatchAction extends DispatchAction {

	public static final String SECURE = "secure";

	public ActionForward EAPForward(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) {
		String forwardName = request
				.getParameter(DataWindowConfig.FORWARD_NAME_IN_PARTLY_REFRESH);
		// get attributs from session
		HashMap attrs = (HashMap) request.getSession().getAttribute(
				Globals.ATTR_TRANSFER_NAME);
		if (attrs != null) {
			String key;
			for (Iterator e = attrs.keySet().iterator(); e.hasNext();) {
				key = (String) e.next();
				request.setAttribute(key, attrs.get(key));
			}
			// remove
			request.getSession().removeAttribute(Globals.ATTR_TRANSFER_NAME);
		}
		attrs = null; // 指定回收
		if (forwardName == null) {
			return null;
		}
		return actionMapping.findForward(forwardName);
	}

	/**
	 * @param mapping
	 *            Action映射对象，从其得到Action中的信息
	 * @param form
	 *            提交给Action中begin操作的Form对象
	 * @param request
	 *            http请求
	 * @param response
	 *            http返回对象
	 * @return 返回操作处理后的Forward对象
	 * @throws Exception
	 */
	public ActionForward begin(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		return mapping.findForward("begin");
	}

	protected AppContext getAppContext(HttpServletRequest request) {
		AppContext context = new AppContextImpl();
		context.setPerson((Person) request.getSession()
				.getAttribute("userinfo"));
		context.setApplicationName(EAPConfigHelper.getApplicationName(request
				.getSession()));
		return context;
	}

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (isCancelled(request)) {
			ActionForward af = cancelled(mapping, form, request, response);
			if (af != null) {
				return af;
			}
		}
		// Identify the request parameter containing the method name
		String parameter = mapping.getParameter();
		String[] parameters = parameter.split(",");
		if (parameters[0] == null) {
			String message = messages.getMessage("dispatch.handler", mapping
					.getPath());

			log.error(message);

			throw new ServletException(message);
		}

		if (SSLConfig.isEnabled) {
			boolean isSSL = false;
			if (parameters.length > 1) {
				if (parameters[1].equalsIgnoreCase(SECURE)) {
					isSSL = true;
				}
			}
			String redirectString = SslUtil.getRedirectString(request,
					getServlet().getServletContext(), isSSL);

			if (redirectString != null) {
				try {
					// Redirect the page to the desired URL
					response.sendRedirect(response
							.encodeRedirectURL(redirectString));
					return null;
				} catch (Exception ioe) {
					// Handle Appropriately
				}
			}
		}

		// Get the method's name. This could be overridden in subclasses.
		String name = getMethodName(mapping, form, request, response,
				parameters[0]);

		// Prevent recursive calls
		if ("execute".equals(name) || "perform".equals(name)) {
			String message = messages.getMessage("dispatch.recursive", mapping
					.getPath());

			log.error(message);
			throw new ServletException(message);
		} else
        {
            String requestPath = request.getRequestURI();
            String ip = request.getRemoteAddr();
            String workNo = (String)request.getSession().getAttribute("WorkNo");
            request.setAttribute("methodName", name);
            Calendar cal1 = Calendar.getInstance();
            long before = cal1.getTimeInMillis();
            //SysLog.writeLogs("Monitor", "ERROR", DateUtil.stringDateTime(new Date()) + ":" + ip + "-" + workNo + "-" + "\u9875\u9762 \"" + requestPath + "\" \u5F00\u59CB\u8FD0\u884C ");
            ActionForward actionForward = dispatchMethod(mapping, form, request, response, name);
            writeOptLogs(request, "权限操作成功！");
            Calendar cal2 = Calendar.getInstance();
            long after = cal2.getTimeInMillis();
            long delay = after - before;
            if((delay / 1000L) > 1)
            	SysLog.writeLogs("Monitor", "ERROR", DateUtil.stringDateTime(new Date()) + ":" + ip + "-" + workNo + "-" +  requestPath + " 运行时间 " + delay / 1000L + " 秒");
            //SysLog.writeLogs("Monitor", "ERROR", DateUtil.stringDateTime(new Date()) + ":" + ip + "-" + workNo + "-" + "\u9875\u9762 \"" + requestPath + "\" \u7ED3\u675F\u8FD0\u884C ");
            return actionForward;
        }

	}
	/**
	 * 
	 * @param request
	 * @param desc
	 * @throws ActionException
	 * 20110504 by zhangjn
	 */
    public void writeOptLogs(HttpServletRequest request, String desc) throws ActionException {
    	String buttonId = request.getParameter("CREATE_BUTTON_ID");
    	String ec_i = request.getParameter("ec_i");
    	if (null != buttonId && !"".equals(buttonId)&& !"ec".equals(ec_i)) { //不为null，说明为权限按钮
    		try {
    			DBLogger logbo = (DBLogger)getDBLogger(); //得到记录日志的BO
        		LogVO logVo = logbo.isWriteLogs(buttonId);
        		if (null != logVo) { //不为null，说明需要为该权限按钮操作写日志
            		HashMap<String,String> logMap = new HashMap<String,String>();
            		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        	        String loginHost = request.getRemoteHost();
        	        String workNo =  authvo.getWorkNo();
        	        logMap.put("systemId", logVo.getSystemId());
        	        logMap.put("buttonId", buttonId);
        	        logMap.put("workNo", workNo);
        	        logMap.put("loginHost", loginHost);
        	        logMap.put("operDesc", desc);       
            		logbo.doAddLogInfoByProc(logMap);//记录日志
        		}	
    		} catch (ServiceException e) {
    			throw new ActionException(e);
    		}	
    	}
    }
    public DBLogger getDBLogger()
    {    
         InteractionObjectFactory factory = InteractionObjectFactory.getInstance();                 
         AppContext appContext = new AppContextImpl();
         appContext.setApplicationName("");
         DBLogger logger = (DBLogger) factory.getInteractionObject("logFacade",appContext);           
         return logger;  
    }

}
