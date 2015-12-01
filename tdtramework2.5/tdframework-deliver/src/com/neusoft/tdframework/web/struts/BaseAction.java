package com.neusoft.tdframework.web.struts;

import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.Hashtable;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.Globals;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionServlet;
import org.apache.struts.config.ModuleConfig;
import org.apache.struts.upload.CommonsMultipartRequestHandler;
import org.apache.struts.upload.MultipartRequestHandler;

import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.core.BaseServiceImpl;
import com.neusoft.tdframework.core.Service;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.log.FrameWorkLogger;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @deprecated
* BaseAction抽象类 <br>
* 子类必须实现service()方法 <br>
* 增加是否需要权限认证和是否需要需要字符集转换功能<br>
* 需要在web.xml配置文件声明struts的ActionServlet部分增加初始化参数<br>
* encoding <br>
* ifneedauth <br>
* charset <br>
* 
* @serialData 2004-11-16
* @serial 增加文件上传功能支持
* 
* @author lubin@neusoft.com
* @since tdframework1.0
* @version 1.0, 2004-10-11
*/
abstract public class BaseAction extends Action {
	//是否需要进行中文编码转换
	private boolean encoding = true;
	//转换的字符集 gb2312:UTF-8
	private String charset = "GBK";	
	//是否需要权限认证
	private boolean ifneedauth = false;
	
	
	//service manager
//	private BaseService baseService;
	private static ThreadLocal baseServiceS=new ThreadLocal();

	private void setEnCoding(boolean b1) {
		this.encoding = b1;
	}

	protected boolean getEnCoding() {
		return this.encoding;
	}

	private void setCharset(String s1) {
		this.charset = s1;
	}

	protected String getCharset() {
		return this.charset;
	}
	
	private void setIfNeedAuth(boolean b1) {
		this.ifneedauth = b1;
	}

	protected boolean getIfNeedAuth() {
		return this.ifneedauth;
	}

	protected BaseService getBaseService(){
		
		BaseService tempBaseService= (BaseService)baseServiceS.get();
		if (tempBaseService==null){
			InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
			
			tempBaseService=new BaseServiceImpl();
			tempBaseService.setFactory(factory);
			baseServiceS.set(tempBaseService);
			
			
		}
			///////////////////////////////////////////////////////2012-07-16 BENGIN
		if (((BaseServiceImpl)tempBaseService)._appC == null) {
			String appName = "";
			AppContext appCOM = new AppContextImpl();
			appCOM.setApplicationName(appName);
			tempBaseService.setAppContext(appCOM);
		}
            ///////////////////////////////////////////////////////2012-07-16 END
		return tempBaseService;
	}
	
	protected void setBaseService(BaseService service){
		baseServiceS.set(service);
	}
	/**
	 * default method
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return ActionForward
	 * @throws Exception
	 */
	public ActionForward execute(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException {

		// 提取应用名称，并赋给 baseService
		getAppName(mapping);
		String requestPath = request.getRequestURI();
		if ((getIfNeedAuth()) && (!isLoggedIn(request))) { //是否需要权限控制,没有登陆
			return (mapping.findForward(GlobalParameters.SESSION_INVALID_PAGE));
		} else {
			if (getEnCoding()) {//设置字符集属性
				try {
					request.setCharacterEncoding(getCharset());
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
					throw new ActionException("UnsupportedEncodingException!"+e);
				}
			}
			
			try {
				parseMultipartRequest(request);
			} catch (ServletException e) {
				e.printStackTrace();
				throw new ActionException(e.getMessage());
			}
			
			Calendar cal1 = Calendar.getInstance();
			long before = cal1.getTimeInMillis();
			ActionForward actionForward = service(mapping, form, request, response);
			Calendar cal2 = Calendar.getInstance();
			long after = cal2.getTimeInMillis();
			
			long delay = after - before;
			if(delay>3000) {
				//如果业务逻辑超过3秒写报警日志
				FrameWorkLogger.warn("页面 \"" + requestPath + "\" 执行达到 " + delay/1000 + " 秒");
			}
			
			return actionForward;
			
//			try {
//				//文件上传功能支持
//				parseMultipartRequest(request);
//				return service(mapping, form, request, response);
//			} catch (Exception e) {
//				e.printStackTrace();
//				throw new ActionException("upload file failure!"+e);				
//			}
		}
	}
	
	/**
	 * @param request
	 */
	private void getAppName(ActionMapping actionMapping) {
		String prefix = actionMapping.getModuleConfig().getPrefix();
		String appName = "";
		if(prefix!=null&&!prefix.equals(""))
		    appName = prefix.substring(1);
		AppContext appCOM = new AppContextImpl();
		appCOM.setApplicationName(appName);
		getBaseService().setAppContext(appCOM);
	}

	/**
	 * 解析 MultipartRequest
	 * @param request
	 * @throws ServletException
	 */
	private void parseMultipartRequest(HttpServletRequest request) throws ServletException{
		String contentType = request.getContentType();
		if((contentType != null) && (contentType.startsWith(GlobalParameters.MULTIPART_CONTENT_TYPE))){
			CommonsMultipartRequestHandler cmrh = new CommonsMultipartRequestHandler();

			cmrh.handleRequest(request);
			Object maxLengthExeed = request.getAttribute(
								MultipartRequestHandler.ATTRIBUTE_MAX_LENGTH_EXCEEDED);
			
			if(maxLengthExeed!=null) {
				if(((Boolean)maxLengthExeed).booleanValue()) {
					ModuleConfig ac = (ModuleConfig) request.getAttribute(
											   Globals.MODULE_KEY);
					String maxFileSize = ac.getControllerConfig().getMaxFileSize();
					String prefix = ac.getPrefix();
								
					throw new UploadException("上传文件大小超长错误(" + 
							"服务器配置大小: " + maxFileSize + ")!");
				}
			}
						
			Hashtable fileitem = cmrh.getFileElements();
			request.setAttribute(GlobalParameters.FILEPARAS_NAME,fileitem);	
			
		}	
	}
	
	/**
	 * 处理文件上传的request对象
	 * 将表单的文本框、下拉框等信息放入到request对象中，
	 * 上传文件存储到Hashtable中，使用request的setAttribute()方法存储，
	 * 属性的名字统一定为GlobalParameters.FILEPARAS_NAME
	 * @param request
	 */
	protected UploadData getUploadData(HttpServletRequest request) throws UploadException{
			
		Hashtable fileitem = (Hashtable)request.getAttribute(GlobalParameters.FILEPARAS_NAME);
			
		return new UploadData(fileitem);
	}



	/**
	 * 抽象方法，子类必须实现
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	abstract public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException;

	/**
	 * 验证权限、是否登录
	 * @param request
	 * @return boolean
	 */
	protected boolean isLoggedIn(HttpServletRequest request) {

		if (request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO) == null) {
			return false;
		} else {
			return true;
		}
	}

	protected boolean convertStringtoBoolean(String s1) {
		boolean b1 = false;
		if (s1.equalsIgnoreCase("true") || s1.equalsIgnoreCase("yes")) {
			b1 = true;
		}
		return b1;
	}

	/**
	 * 取得web.xml配置文件中的配置信息
	 */
	private void getConfig() {

		String s1 =
			getServlet().getServletConfig().getInitParameter(GlobalParameters.ENCODING);
		String s2 =
			getServlet().getServletConfig().getInitParameter(GlobalParameters.IFNEEDAUTH);
		String s3 = getServlet().getServletConfig().getInitParameter(GlobalParameters.CHARSET);

		if (s1 != null && s1.intern() != "".intern()) {
			setEnCoding(convertStringtoBoolean(s1));
		}
		if (s2 != null && s2.intern() != "".intern()) {
			setIfNeedAuth(convertStringtoBoolean(s2));
		}
		if (s3 != null && s3.intern() != "".intern()) {
			setCharset(s3);
		}
		SysLog.writeLogs("tdframework",GlobalParameters.DEBUG,"-encoding-" + s1 + "-:ifneedauth-" + s2);

	}

/**
 * 覆盖父类的方法，实现同spring连接的功能
 */
	public void setServlet(ActionServlet actionServlet) {
		SysLog.writeLogs("tdframework",GlobalParameters.DEBUG,"in setServlet  method begining");
		super.setServlet(actionServlet);
		getConfig();
		
//		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
//		BaseService baseService=new BaseServiceImpl();
//		baseService.setFactory(factory);
//		
//		baseServiceS.set(baseService);
		
//		if(baseService==null)
//		{
//			InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
//			AppContext appContext = new AppContextImpl();
//			appContext.setApplicationName("");
//			BaseService service = (BaseService) factory.getInteractionObject("BaseService",  appContext);
//			service.setFactory(factory);
//			this.baseService = service;
//		}
	}
	/**
	 * 获取认证信息
	 * @param request
	 * @return
	 */
	protected AuthorizeVO getAuthorize(HttpServletRequest request) {
		return (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
	}
	/**
	 * 
	 * @param serviceFacadeName
	 * @return
	 */
	public Service getServiceFacade(String serviceFacadeName){
		return (Service)getBaseService().getServiceFacade(serviceFacadeName);
	}
	
    public Service getDBLogger()
    {    
         InteractionObjectFactory factory = InteractionObjectFactory.getInstance();                 
         AppContext appContext = new AppContextImpl();
         appContext.setApplicationName("");
         Service service = (Service) factory.getInteractionObject("logFacade",appContext);
           
         return service;   
    
    }

}
