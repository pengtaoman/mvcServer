package com.neusoft.tdframework.authorization;

import java.util.Calendar;
import java.util.GregorianCalendar;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.neusoft.tdframework.admin.login.LoginUserDAO;
import com.neusoft.tdframework.admin.login.SessionListener;
import com.neusoft.tdframework.bas.log.DssLogBO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.DESUtil;
import com.neusoft.tdframework.common.util.PassWord;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.portal.config.TDConfigHelper;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class PortalInfoRegistry {
    static final boolean baslog = true;
	
	public static boolean register(HttpServletRequest request,HttpServletResponse response,String username,String password)throws ActionException{

		boolean ret = registerUserInfo(username,password,request);
		if(!ret)
			return ret;
		if(TDConfigHelper.isFlowPermitted())
		{
			registerUniflow(request,response,username, password);
		}
		if(TDConfigHelper.isBasLogPermitted())
		{
			registerBasLogInfo(request);
		}
		if(TDConfigHelper.getAppKind().equals("portal")){
			HttpSession session = request.getSession(true);
			String ipStr = getIpAddressFromRequest(request);
			SessionListener sessionListener = new SessionListener((String)session.getAttribute(
					"WorkNo"), session.getId(), ipStr,(String)session.getAttribute(
					"macaddress"), (String)session.getAttribute(
					"dnsname"),(String)session.getAttribute("CityCode"));
			session.setAttribute("listener", sessionListener);
		}
		return ret;
	}

	  private static void registerUniflow(HttpServletRequest request, HttpServletResponse response, String username, String password) {
		    AuthorizeVO authVO = (AuthorizeVO)request.getSession().getAttribute(
		      "login_info");
		    WorkflowManager.initUniflow(authVO.getEmployeeId(), username, request, response);
	}
	/**
	 * <p>Description: 获得IP地址</p>
	 * <p>Remark: </p>
	 * @param request
	 * @return
	 */
	protected static String getIpAddressFromRequest(HttpServletRequest request){
	String ip = request.getHeader("x-forwarded-for");
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	ip = request.getHeader("Proxy-Client-IP");
	}
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	ip = request.getHeader("WL-Proxy-Client-IP");
	}
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	ip = request.getRemoteAddr();
	}
	return ip;
	}
	
	private static void registerBasLogInfo(HttpServletRequest request){
        //dss appcontext
        InteractionObjectFactory factory = InteractionObjectFactory
        .getInstance();
        AppContext appContext1 = new AppContextImpl();
        appContext1.setApplicationName("dss");
        DssLogBO dssLogBO = (DssLogBO) factory.getInteractionObject("dssLogBO",
                appContext1);
        //end
        // 写登陆日志,写首页访问日志，设置visitId
        AuthorizeVO vo = (AuthorizeVO)request.getSession(true).getAttribute(
                GlobalParameters.SESSION_INFO);
        try{
        	vo.setLoginId(dssLogBO.doLogin(vo.getEmployeeId(), vo.getLoginIp()));
        	request.getSession().setAttribute("visitId",dssLogBO.doVisit(vo.getLoginId(), vo
                        .getEmployeeId(), "101", null, 1));
        }
        catch(ServiceException se)
		{
        	
		}
        //end
		
	}
	
	private static boolean  registerUserInfo(String username, String password,
			HttpServletRequest request)throws ActionException{
			boolean retB = false;
			HttpSession session = request.getSession(true);
			InteractionObjectFactory factory = InteractionObjectFactory
					.getInstance();
	        AppContext appContext = new AppContextImpl();
	        appContext.setApplicationName("");
			AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
					.getInteractionObject(AuthorizeFactory.BEAN, appContext);

			AuthBOExt extBO = (AuthBOExt)factory.getInteractionObject("authBOExt", appContext);
			AuthorizeBO authBO = authorizeFactory.getAuthorizeBO(request);
			AuthorizeVO vo = null;
			AuthVOExt voext = null;
			try {
				vo = authBO.getAuthorizeInfo(username, password);
				voext = extBO.getAuthorizeInfo(username);
				//-- 此两个属性为融合经营分析权限系统而增加
				String loginIp = request.getRemoteHost();
				vo.setLoginIp(loginIp);
				
				//---------------
				if (null != vo) {
					int authResult = vo.getAuthorizeResult();
					switch (authResult) {
					case 0: //认证失败
						request.setAttribute("alertMsg", vo.getAuthorizeMessage());
						break;
					case 1: //认证失败
						request.setAttribute("alertMsg", vo.getAuthorizeMessage());
						request.setAttribute("reason", "pwdExpired");
						session.setAttribute("EmployeeId", vo.getEmployeeId());
						session.setAttribute("WorkNo", voext.getWorkNo());
						request.getSession(true).setAttribute(
								GlobalParameters.SESSION_INFO, vo);
						break;
					case 2: //认证成功,但有警告信息
						retB = true;
						request.getSession(true).setAttribute(
								GlobalParameters.SESSION_INFO, vo);
						if(voext!=null)
						{
							session.setAttribute(
									"logon.isDone", "You are on line!");
							session.setAttribute(
									"Account", voext.getAccount());
							session.setAttribute(
									"PersonLevel", String.valueOf(voext.getPersonLevel()));
							session.setAttribute(
									"ProvinceCode", voext.getProvinceCode());
							session.setAttribute(
									"CenterCode", voext.getCenterCode());
							session.setAttribute(
									"OrganCode", voext.getOrganCode());
							session.setAttribute(
									"RegionCode", voext.getRegionCode());
							session.setAttribute(
									"CityName", voext.getCityName());
							session.setAttribute(
									"CityLevel", String.valueOf(voext.getCityLevel()));
							session.setAttribute(
									"AreaCode", voext.getAreaCode());
							session.setAttribute(
									"ParentCity", voext.getParentCity());
							session.setAttribute(
									"Department", voext.getDepartment());
							session.setAttribute(
									"DepartmentName", voext.getDepartmentName());
							session.setAttribute(
									"WorkNo", voext.getWorkNo());
							session.setAttribute(
									"CityCode", voext.getCityCode());
							session.setAttribute(
									"EmployeeId", vo.getEmployeeId());
							String encryedPass = DESUtil.encrypt(PassWord.decode(vo.getWorkPwd()));
							session.setAttribute("EncriedPwd", encryedPass);
							String decodedPass = PassWord.decode(vo.getWorkPwd());
							session.setAttribute("decodedPass", decodedPass);
						}
						
						//页面导向使用redirect,通过SESSION防止该信息
						session.setAttribute("alertMsg",
								vo.getAuthorizeMessage());
						break;
					case 3: //认证成功
						retB = true;
						session.setAttribute(
								GlobalParameters.SESSION_INFO, vo);
						if(voext!=null)
						{
							session.setAttribute(
									"logon.isDone", "You are on line!");
							session.setAttribute(
									"Account", voext.getAccount());
							session.setAttribute(
									"PersonLevel", String.valueOf(voext.getPersonLevel()));
							session.setAttribute(
									"ProvinceCode", voext.getProvinceCode());
							session.setAttribute(
									"CenterCode", voext.getCenterCode());
							session.setAttribute(
									"OrganCode", voext.getOrganCode());
							session.setAttribute(
									"RegionCode", voext.getRegionCode());
							session.setAttribute(
									"CityName", voext.getCityName());
							session.setAttribute(
									"CityLevel", String.valueOf(voext.getCityLevel()));
							session.setAttribute(
									"AreaCode", voext.getAreaCode());
							session.setAttribute(
									"ParentCity", voext.getParentCity());
							session.setAttribute(
									"Department", voext.getDepartment());
							session.setAttribute(
									"DepartmentName", voext.getDepartmentName());
							session.setAttribute(
									"WorkNo", voext.getWorkNo());
							session.setAttribute(
									"CityCode", voext.getCityCode());
							session.setAttribute(
									"EmployeeId", vo.getEmployeeId());
							String encryedPass = DESUtil.encrypt(PassWord.decode(vo.getWorkPwd()));
							session.setAttribute("EncriedPwd", encryedPass);
							String decodedPass = PassWord.decode(vo.getWorkPwd());
							session.setAttribute("decodedPass", decodedPass);
						}
						break;
					case 4: //初次登录，认证失败
						request.setAttribute("alertMsg", vo.getAuthorizeMessage());
						request.setAttribute("reason", "firstLogin");
						session.setAttribute("EmployeeId", vo.getEmployeeId());
						session.setAttribute("WorkNo", voext.getWorkNo());
						request.getSession(true).setAttribute(
								GlobalParameters.SESSION_INFO, vo);
						break;
					default:
						request.setAttribute("alertMsg", "权限认证结果未知类型:" + authResult);
						break;
					}
				}
			} catch (ServiceException e) {
				//e.printStackTrace();
				SysLog.writeLogs("tdframework ",GlobalParameters.ERROR,"PortalInfoRegistry--RegisterLoginInfo:"+e.getMessage());
				throw new ActionException(e);
			}
			return retB;
	}
	public static void unRegisterLoginInfo(HttpServletRequest request){
		if(TDConfigHelper.isBasLogPermitted())
		{
			unRegisterBasLogInfo(request);
		}
	}
	
	private static void unRegisterBasLogInfo(HttpServletRequest request){
        //dss appcontext
        InteractionObjectFactory factory = InteractionObjectFactory
        .getInstance();
        AppContext appContext1 = new AppContextImpl();
        appContext1.setApplicationName("dss");
        DssLogBO dssLogBO = (DssLogBO) factory.getInteractionObject("dssLogBO",
                appContext1);
        //end
        // 写登陆日志,写首页访问日志，设置visitId
        AuthorizeVO vo = (AuthorizeVO)request.getSession(true).getAttribute(
                GlobalParameters.SESSION_INFO);
        if(vo==null)
        	return;
        try{
        	dssLogBO.doLogout(vo.getLoginId());
        }
        catch(ServiceException se)
		{
        	
		}
        //end
		
	}
	
	
}
