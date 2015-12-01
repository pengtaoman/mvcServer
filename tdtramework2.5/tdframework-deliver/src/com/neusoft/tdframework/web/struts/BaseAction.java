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
* BaseAction������ <br>
* �������ʵ��service()���� <br>
* �����Ƿ���ҪȨ����֤���Ƿ���Ҫ��Ҫ�ַ���ת������<br>
* ��Ҫ��web.xml�����ļ�����struts��ActionServlet�������ӳ�ʼ������<br>
* encoding <br>
* ifneedauth <br>
* charset <br>
* 
* @serialData 2004-11-16
* @serial �����ļ��ϴ�����֧��
* 
* @author lubin@neusoft.com
* @since tdframework1.0
* @version 1.0, 2004-10-11
*/
abstract public class BaseAction extends Action {
	//�Ƿ���Ҫ�������ı���ת��
	private boolean encoding = true;
	//ת�����ַ��� gb2312:UTF-8
	private String charset = "GBK";	
	//�Ƿ���ҪȨ����֤
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

		// ��ȡӦ�����ƣ������� baseService
		getAppName(mapping);
		String requestPath = request.getRequestURI();
		if ((getIfNeedAuth()) && (!isLoggedIn(request))) { //�Ƿ���ҪȨ�޿���,û�е�½
			return (mapping.findForward(GlobalParameters.SESSION_INVALID_PAGE));
		} else {
			if (getEnCoding()) {//�����ַ�������
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
				//���ҵ���߼�����3��д������־
				FrameWorkLogger.warn("ҳ�� \"" + requestPath + "\" ִ�дﵽ " + delay/1000 + " ��");
			}
			
			return actionForward;
			
//			try {
//				//�ļ��ϴ�����֧��
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
	 * ���� MultipartRequest
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
								
					throw new UploadException("�ϴ��ļ���С��������(" + 
							"���������ô�С: " + maxFileSize + ")!");
				}
			}
						
			Hashtable fileitem = cmrh.getFileElements();
			request.setAttribute(GlobalParameters.FILEPARAS_NAME,fileitem);	
			
		}	
	}
	
	/**
	 * �����ļ��ϴ���request����
	 * �������ı������������Ϣ���뵽request�����У�
	 * �ϴ��ļ��洢��Hashtable�У�ʹ��request��setAttribute()�����洢��
	 * ���Ե�����ͳһ��ΪGlobalParameters.FILEPARAS_NAME
	 * @param request
	 */
	protected UploadData getUploadData(HttpServletRequest request) throws UploadException{
			
		Hashtable fileitem = (Hashtable)request.getAttribute(GlobalParameters.FILEPARAS_NAME);
			
		return new UploadData(fileitem);
	}



	/**
	 * ���󷽷����������ʵ��
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
	 * ��֤Ȩ�ޡ��Ƿ��¼
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
	 * ȡ��web.xml�����ļ��е�������Ϣ
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
 * ���Ǹ���ķ�����ʵ��ͬspring���ӵĹ���
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
	 * ��ȡ��֤��Ϣ
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
