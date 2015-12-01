package com.neusoft.tdframework.authorization.action;

import com.neusoft.om.dao.appcontainer.AppContainerDAO;
import com.neusoft.om.interfase.authorize.MoreCityBO;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.authorization.PortalInfoRegistry;
import com.neusoft.tdframework.authorization.ThirdPartyAuthorize;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.home.action.PortalPageBO;
import com.neusoft.tdframework.portal.config.TDConfigHelper;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.service.security.SecurityFactory;
import com.neusoft.unieap.service.security.providers.dao.SecurityUser;
import com.neusoft.uniflow.api.NWSession;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.acegisecurity.context.ContextHolder;
import net.sf.acegisecurity.context.security.SecureContextImpl;
import net.sf.json.JSONArray;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class LoginAction extends TDDispatchAction {
	static int count = 0;
	NWSession privateNWSession;

	protected String getAppName() {
		return "";
	}
	
	private LoginActionDaoImpl getLoginActionDaoImpl() throws Exception {
		try {
			InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
			AppContext appContext = new AppContextImpl();
			appContext.setApplicationName("home");
			LoginActionDaoImpl loginActionDaoImpl = (LoginActionDaoImpl) factory
			        .getInteractionObject("loginActionDAO", appContext);
			
			return loginActionDaoImpl;
		} catch(Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}
	
	public ActionForward getPfNo(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String username = null;
		AuthorizeVO authorizeVO = (AuthorizeVO) request.getSession(true)
				.getAttribute(GlobalParameters.SESSION_INFO);
		username = authorizeVO.getWorkNo();
		
		response.setContentType("text/html; charset=GBK");
		response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        PrintWriter out = response.getWriter();
        
        LoginActionDaoImpl loginActionDaoImpl = getLoginActionDaoImpl();
		
        List<ChangeUserVO> pf = loginActionDaoImpl.isPFNo(username);
        

		if (pf == null) {
			out.println("0");
			out.close();
			return null;
		} else {
	        JSONArray jsonArr = new JSONArray();
			for (int i = 0; i < pf.size(); i++) {
				jsonArr.add(pf.get(i));
			}
			String ans = jsonArr.toString();
			out.println(ans);
			out.close();
			return null;
		}
		
	}
	
	public ActionForward changeCityUser(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String username = null;
		String password = null;
		username = (String)request.getParameter("j_username");
		password = (String)request.getParameter("j_password");
		
		
		response.setContentType("text/html; charset=GBK");
		response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        PrintWriter out = response.getWriter();
        
        LoginActionDaoImpl loginActionDaoImpl = getLoginActionDaoImpl();
        String pwdDb = loginActionDaoImpl.getEmp(username);
        if (pwdDb != null && pwdDb.equals(password)) {
        	out.println("1");
			out.close();
			request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
			return null;
        } else {
        	out.println("0");
			out.close();
			return null;
        }
        
		
	}
	
	public ActionForward getValidateForEmp(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String username = null;
		username = (String)request.getParameter("j_username");
		
		response.setContentType("text/html; charset=GBK");
		response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        PrintWriter out = response.getWriter();
        
        LoginActionDaoImpl loginActionDaoImpl = getLoginActionDaoImpl();
		
        String pwd = loginActionDaoImpl.getEmp(username);
		if (pwd == null) {
			out.println("3");
			out.close();
			//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
			return null;
		} 
		
		String cityCode = loginActionDaoImpl.getCityForEmp(username);
		boolean isMobileFlag = loginActionDaoImpl.isMobileCodeCity(cityCode);
		if (isMobileFlag) {
			out.println("1");
			out.close();
			//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
			return null;
		} else {
			out.println("0");
			out.close();
			//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
			return null;
		}
	}
	
	public ActionForward genMobileCode(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String username = null;
		String password = null;
		username = (String)request.getParameter("j_username");
		password = (String)request.getParameter("j_password");
		
		response.setContentType("text/html; charset=GBK");
		response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        PrintWriter out = response.getWriter();
        
        LoginActionDaoImpl loginActionDaoImpl = getLoginActionDaoImpl();
		
        String pwd = loginActionDaoImpl.getEmp(username);
		if (pwd == null) {
			out.println("3");
			out.close();
			//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
			return null;
		} else if (!password.equals(pwd)) {
			out.println("4");
			out.close();
			//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
			return null;
		}
		
		try {
			String tel = loginActionDaoImpl.getTelephoneForEmp(username);
				if (tel != null && !"".equals(tel)) {
					long lastSendTime = loginActionDaoImpl.getLastMobileCodePutTime(username);
					long now = new java.util.Date().getTime();
					if (lastSendTime == 0L || now-lastSendTime>1*60*1000) {
						int code = genCode();
						loginActionDaoImpl.insertSEND_SMS_OUT_TAB(tel, String.valueOf(code), username);
						//request.getSession().setAttribute("MOBILE_VAL_CODE", String.valueOf(code));
						out.println("10");//手机验证码已经发送，请注意接收.
						out.close();
						//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
						return null;
					} else {
						out.println("11");//请等待一分钟后再获取手机验证码.
						out.close();
						//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
						return null;
					}
				} else {
					out.println("12");//该用户没有维护手机号码，请联系系统管理员维护！
					out.close();
					//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
					return null;
				}

		} catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		} 
	
	}
	
	public ActionForward beforeSubmitLogin(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String username = null;
		String password = null;
		username = (String)request.getParameter("j_username");
		password = (String)request.getParameter("j_password");
		
		response.setContentType("text/html; charset=GBK");
		response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        PrintWriter out = response.getWriter();
        
        LoginActionDaoImpl loginActionDaoImpl = getLoginActionDaoImpl();
		
        String pwd = loginActionDaoImpl.getEmp(username);
		if (pwd == null) {
			out.println("3");
			out.close();
			//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
			return null;
		} else if (!password.equals(pwd)) {
			out.println("4");
			out.close();
			//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
			return null;
		} else {
			out.println("5");
			out.close();
			//request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
			return null;
	    }
	}

	public ActionForward login(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String isMobile = (String)request.getParameter("isMobile");
		if (isMobile == null || "".equals(isMobile)) {
		    isMobile = (String)request.getSession().getAttribute("isMobile");
		}
		
		String username = null;
		String password = null;
		
		

		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("home");
		LoginActionDaoImpl loginActionDaoImpl = (LoginActionDaoImpl) factory
		        .getInteractionObject("loginActionDAO", appContext);
		


		response.setContentType("text/html; charset=GBK");
		response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);

		PrintWriter out = response.getWriter();
        
		try {
			SecurityUser user = SecurityFactory.getInstance().getSecurityUser();
		} catch (NullPointerException ne) {
			return mapping.findForward("begin");
		}
		username = SecurityFactory.getInstance().getSecurityUser()
				.getUsername();
		password = SecurityFactory.getInstance().getSecurityUser()
				.getPassword();
		
		if (!"1".equals(request.getSession().getAttribute("changeCityUser")) && !loginActionDaoImpl.canChangeUserLogin(username.toUpperCase())) {
			request.setAttribute("alertMsg", "该账户为专用账户，不允许登录.");
			request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
			return mapping.findForward("begin");
		}
		
		if ("10012".equals(isMobile)) {
			String code = (String)request.getSession().getAttribute("USER_INPUT_MOBILE_CODE");
			long lastSendTime = loginActionDaoImpl.getLastMobileCodePutTime(username);
			long now = new java.util.Date().getTime();
			String perid = (String)loginActionDaoImpl.getDueTime();
			int mu = Integer.parseInt(perid);
			if (lastSendTime == 0L || now-lastSendTime>mu*1000) {
				request.setAttribute("mobiErr", "1");
				request.setAttribute("alertMsg", "手机验证码已经过期，请重新获取.");
				request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
				return mapping.findForward("begin");
			} else {
				String mCode = loginActionDaoImpl.getMobileCode(username);
				if (code != null && code.equals(mCode)) {
					loginActionDaoImpl.removeCode(username);
				} else {
					request.setAttribute("mobiErr", "2");
					request.setAttribute("alertMsg", "请输入正确的手机验证码，或重新获取。");
					request.getSession().removeAttribute(GlobalParameters.SESSION_INFO);
					return mapping.findForward("begin");
				}
			}
		} 
		
		if (request.getAttribute("isDoubleLogin") == null) {
			if (PortalInfoRegistry.register(request, response, username,
					password)) {
					
				thirdPartyAuthorize(request);
				
				if (("true".equals((String) request
						.getAttribute("isComeFromLogin")))
						&& (request.getSession().getAttribute("appNames") == null)) {
					AppContainerDAO dao = (AppContainerDAO) getServiceFacade("containerDAO");
					List appNames = dao.getAppNames();

					request.getSession().setAttribute("appNames",
							createRemoteRemoveUrl(appNames, request));
				}
				return mapping.findForward(TDConfigHelper.getFaceName());
			}

			String reason = (String) request.getAttribute("reason");
			if ((reason != null) && (reason.equals("pwdExpired"))) {
				request.setAttribute("prompt", "您的密码已经到期，请修改然后重新登录！");
				return mapping.findForward("changePwd");
			}
			if ((reason != null) && (reason.equals("firstLogin"))) {
				request.setAttribute("prompt", "初次登录，请修改密码然后重新登录！");
				return mapping.findForward("changePwd");
			}
			return mapping.findForward("begin");
		}

		if ("true".equals(request.getAttribute("isDoubleLogin")) ) {
			if ((request.getAttribute("isDoubleLogin") != null)
					&& ("true".equals(request.getAttribute("isDoubleLogin")))) {
				HttpSession session = request.getSession(true);
				AuthorizeVO authorizeVO = (AuthorizeVO) session
						.getAttribute("login_info");
				request.setAttribute("alertMsgDL", "工号 \""
						+ authorizeVO.getWorkNo() + "\" 已经登录，不允许重复登录!");
				return mapping.findForward("begin");
			}
		} else if ("trueNotSameUser".equals(request
				.getAttribute("isDoubleLogin"))) {
			HttpSession session = request.getSession(true);
			request.setAttribute("alertMsgDL", "已有其他用户登录，请另外打开浏览器进行登录!");
			return mapping.findForward("begin");
		}
		return null;
	}

	
	public int genCode() {
		java.util.Random ran = new java.util.Random();
		int a = ran.nextInt(1000000);
		if (a < 100000) {
			return genCode();
		} else {
			return a;
		}
	}
	
	private void removeSession(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Enumeration enum1 = session.getAttributeNames();
		Vector tempname = new Vector();
		while (enum1.hasMoreElements()) {
			tempname.addElement(String.valueOf(enum1.nextElement()));
		}
		for (int i = 0; i < tempname.size(); i++)
			session.removeAttribute(tempname.elementAt(i).toString());
	}

	public ActionForward begin(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		removeSession(request);
		ContextHolder.setContext(new SecureContextImpl());
		return mapping.findForward("begin");
	}

	public ActionForward logout(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		PortalInfoRegistry.unRegisterLoginInfo(request);
		removeSession(request);
		ContextHolder.setContext(new SecureContextImpl());

		return null;
	}

	public ActionForward error(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		ContextHolder.setContext(new SecureContextImpl());
		request.setAttribute("alertMsg", "用户名或密码错误!");
		RequestDispatcher rd = request
				.getRequestDispatcher("tdframework/mainframe/login.jsp");
		rd.forward(request, response);
		return null;
	}

	private boolean thirdPartyAuthorize(HttpServletRequest request) {
		InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
				.getInteractionObject("authorizeFactoryFacade", appContext);

		ThirdPartyAuthorize[] thirdPartyAuthorize = authorizeFactory
				.getThirdParyAuthorize(request);

		if (thirdPartyAuthorize == null) {
			return true;
		}
		boolean result = true;
		String errMsg = null;
		for (int i = 0; i < thirdPartyAuthorize.length; i++) {
			ThirdPartyAuthorize thirdAuthorize = thirdPartyAuthorize[i];

			if (thirdAuthorize != null) {
				try {
					//System.out.println("??????????????????????????????????????????????????????????????" + thirdAuthorize.getClass().getName());
					if (!thirdAuthorize.authorize(request))
						result = false;
				} catch (ServiceException e) {
					e.printStackTrace();
					errMsg = errMsg + "\n"
							+ thirdAuthorize.getClass().getName() + ":"
							+ e.getMessage();
				}
			}
		}
		if (errMsg != null) {
			String alertMsg = nvl(request.getAttribute("alertMsg")) + " "
					+ errMsg;
			request.setAttribute("alertMsg", alertMsg);
		}
		return result;
	}

	private Object nvl(Object obj) {
		if (obj == null) {
			return "";
		}
		return obj;
	}

	private String getMainPage(HttpServletRequest request) {
		String topUri = request.getContextPath() + "/frameTop.do?method=common";
		String blankUri = request.getContextPath() + "/blank.html";
		String remoteAuth = request.getContextPath()
				+ "/tdframework/mainframe/RemoteAuthAJAX.jsp";

		String navFrameUri = request.getContextPath()
				+ "/tdframework/mainframe/nav_info.jsp";
		String alertMsg = (String) request.getSession(true).getAttribute(
				"alertMsg");
		request.getSession(true).removeAttribute("alertMsg");
		if (alertMsg == null) {
			alertMsg = "";
		}
		AuthorizeVO authorizeVO = (AuthorizeVO) request.getSession(true)
				.getAttribute("login_info");

		String workNo = authorizeVO.getWorkNo();
		String areaName = authorizeVO.getAreaName();
		String organName = "";
		if ((authorizeVO.getDealerName() != null)
				&& (authorizeVO.getDealerName().length() > 1))
			organName = authorizeVO.getOrganName() + "|"
					+ authorizeVO.getDealerName();
		else {
			organName = authorizeVO.getOrganName();
		}
		String path = request.getContextPath();

		StringBuffer but = new StringBuffer("");
		but.append("<html>");
		but.append("<head>");
		but
				.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=GBK\" />");
		but.append("<title>河北联通新一代BSS系统</title>");
		but.append("</head>");
		but.append("<script language=\"JavaScript\">");
		but.append("window.lastMenus=[];");
		but.append("window.maxLastMenus=5;");
		but.append("var APP_PATH=\"").append(path).append("\";");
		but.append("window.defaultStatus=\"登录信息：").append(areaName).append(
				" / ").append(organName).append(" / ").append(workNo).append(
				" \";");
		but.append("window.defaultWidth=\"*,768,*\";");
		but.append("window.maxWidth=\"0,*,0\";");
		but.append("</script>");

		but
				.append(
						"<script language=\"JavaScript\" type=\"text/javascript\" src=\"")
				.append(path).append(
						"/tdframework/mainframe/js/main.js\"></script>");
		but
				.append("\t<script language=\"JavaScript\" type=\"text/javascript\">");
		but.append("\twindow.$GlobeNav=new GlobeNav();");
		but.append("\t</script>");
		but.append("</head>");

		but.append("<form name=\"myform\">");
		but.append("<input type=\"hidden\" name=\"alertMsg\"  value=\"")
				.append(alertMsg).append("\" /> ");
		but.append("<script language=\"JavaScript\">");
		but.append("if(document.myform.alertMsg.value != \"\"){");
		but.append("alert(document.myform.alertMsg.value);");
		but.append("}");
		but.append("</script>");
		but.append("</form>");

		but
				.append("<form id=\"favorite\" name=\"favorite\" action=\"")
				.append(path)
				.append(
						"/favoriteMenuAdmin.do\" target=\"hide_page_message\" method=\"post\" >");
		but.append("<input type=\"hidden\" name=\"operType\" />");
		but.append("<input type=\"hidden\" name=\"favoriteName\" />");
		but.append("<input type=\"hidden\" name=\"menuId\" />");
		but.append("<input type=\"hidden\" name=\"systemId\" />");
		but.append("<input type=\"hidden\" name=\"pageLink\" />");
		but.append("</form>");

		but
				.append("<frameset id=\"topframeset\" cols=\"*,768,*\" frameborder=\"NO\" border=\"0\" framespacing=\"0\" >");
		but.append("<frame src=\"").append(blankUri).append(
				"\" scrolling=\"NO\" noresize>");
		but
				.append("<frameset rows=\"103,*\" frameborder=\"NO\" border=\"0\" framespacing=\"0\" id=\"topFrame\" style=\"border:1px solid #cccccc\">");
		but
				.append("<frame src=\"")
				.append(topUri)
				.append(
						"\" name=\"top_page\" scrolling=\"NO\" noresize  style=\"border-bottom:1px solid #dddddd\">");
		but
				.append("<frameset cols=\"156,*\" frameborder=\"NO\" border=\"0\" framespacing=\"0\" id=\"mainFrame\">");
		but
				.append("<frame src=\"")
				.append(blankUri)
				.append(
						"\" name=\"mainleft\" scrolling=\"NO\" noresize style=\"border-right:1px solid #cccccc\">");
		but
				.append("<frameset rows=\"20,*,0,0,0,0,0\" frameborder=\"NO\" border=\"0\" framespacing=\"0\"> ");
		but
				.append("<frame src=\"")
				.append(navFrameUri)
				.append(
						"\" name=\"work_items\" scrolling=\"NO\" noresize style=\"border-bottom:1px solid #eeeeee\">");
		but.append("<frame src=\"").append(blankUri)
				.append("\" name=\"main\">");
		but.append("<frame src=\"").append(blankUri).append(
				"\" name=\"hide_page\" scrolling=\"NO\" noresize>");
		but.append("<frame src=\"").append(blankUri).append(
				"\" name=\"notify_message\" noresize>");
		but.append("<Frame src=\"").append(blankUri).append(
				"\" name=\"hide_page_message\" noresize>");
		but.append("<Frame src=\"").append(blankUri).append(
				"\" name=\"info_board\" noresize>");
		but.append("<Frame src=\"").append(remoteAuth).append(
				"\" name=\"remoteAuth\" noresize>");
		but.append("</frameset>");
		but.append("</frameset>");
		but.append("<noframes>");
		but.append("<body>");
		but.append("<p>此网页使用了框架，但您的浏览器不支持框架，请升级您的浏览器。</p>");
		but.append("</body>");
		but.append("\t</noframes> ");
		but.append("</frameset>");
		but.append("<frame src=\"").append(blankUri).append(
				"\" scrolling=\"NO\" noresize>");
		but.append("</frameset>");
		but.append("</html>");
		return but.toString();
	}

	public ActionForward getMoreCity(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		try {
			MoreCityBO moreCityBO = (MoreCityBO) getServiceFacade("moreCityBO");

			AuthorizeVO authorizeVO = (AuthorizeVO) request.getSession(true)
					.getAttribute("login_info");

			ParamObjectCollection paramObjectCollection = moreCityBO
					.getMoreCityColl(authorizeVO.getEmployeeId());
			JSONArray jsonArr = new JSONArray();
			List list = paramObjectCollection.getList();
			for (int i = 0; i < list.size(); i++) {
				jsonArr.add(list.get(i));
			}
			String ans = jsonArr.toString();

			response.setContentType("text/html; charset=GBK");
			PrintWriter out = response.getWriter();
			out.println(ans);
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return null;
	}

	private List createRemoteRemoveUrl(List appNames, HttpServletRequest request) {
		List list = new ArrayList();
		int port = request.getServerPort();
		StringBuffer hostPath = new StringBuffer();
		hostPath.append(request.getScheme()).append("://").append(
				request.getServerName()).append(":").append(port);
		Iterator it = appNames.iterator();
		while (it.hasNext()) {
			String appName = (String) it.next();
			String urlStr = "";
			if (appName.indexOf("http://") > -1) {
				urlStr = appName + "login.do?method=logout";
			} else {
				urlStr = hostPath.toString() + appName
						+ "login.do?method=logout";
				list.add(urlStr);
			}
		}

		return list;
	}
}