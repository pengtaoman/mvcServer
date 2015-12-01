package com.neusoft.unieap.action;

/**
 * ��չ<code>org.apache.struts.actions.DispatchAction</code>��<br/>
 * һΪ���룬�Ա���չ����Ϊ���Tomcat�����еĺ������⡣
 *
 * @author  ������ shaosl@neusoft.com
 * @version 1.7
 */
/*--------------------------------------------------------------
 ����ʱ�䣺2003-04-12
 �޸�������2003-09-23 ������   ����Web��ͬ�����ƣ���ֹ�ظ��ύ����   ����execute�����;�̬����
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
		attrs = null; // ָ������
		if (forwardName == null) {
			return null;
		}
		return actionMapping.findForward(forwardName);
	}

	/**
	 * @param mapping
	 *            Actionӳ����󣬴���õ�Action�е���Ϣ
	 * @param form
	 *            �ύ��Action��begin������Form����
	 * @param request
	 *            http����
	 * @param response
	 *            http���ض���
	 * @return ���ز���������Forward����
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
            writeOptLogs(request, "Ȩ�޲����ɹ���");
            Calendar cal2 = Calendar.getInstance();
            long after = cal2.getTimeInMillis();
            long delay = after - before;
            if((delay / 1000L) > 1)
            	SysLog.writeLogs("Monitor", "ERROR", DateUtil.stringDateTime(new Date()) + ":" + ip + "-" + workNo + "-" +  requestPath + " ����ʱ�� " + delay / 1000L + " ��");
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
    	if (null != buttonId && !"".equals(buttonId)&& !"ec".equals(ec_i)) { //��Ϊnull��˵��ΪȨ�ް�ť
    		try {
    			DBLogger logbo = (DBLogger)getDBLogger(); //�õ���¼��־��BO
        		LogVO logVo = logbo.isWriteLogs(buttonId);
        		if (null != logVo) { //��Ϊnull��˵����ҪΪ��Ȩ�ް�ť����д��־
            		HashMap<String,String> logMap = new HashMap<String,String>();
            		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
        	        String loginHost = request.getRemoteHost();
        	        String workNo =  authvo.getWorkNo();
        	        logMap.put("systemId", logVo.getSystemId());
        	        logMap.put("buttonId", buttonId);
        	        logMap.put("workNo", workNo);
        	        logMap.put("loginHost", loginHost);
        	        logMap.put("operDesc", desc);       
            		logbo.doAddLogInfoByProc(logMap);//��¼��־
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
