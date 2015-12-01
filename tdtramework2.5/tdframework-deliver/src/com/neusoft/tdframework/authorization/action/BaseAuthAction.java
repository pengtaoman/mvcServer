package com.neusoft.tdframework.authorization.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.authorization.AuthorizeBO;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.authorization.ThirdPartyAuthorize;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.unieap.action.EAPDispatchAction;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * 
 * 公用认证程序
 * 
 * @author lub@neusoft.com
 * @version 1.0, 2004-11-24
 */
public class BaseAuthAction extends EAPDispatchAction {
	public static final String MAIN_PAGE_FORWORD = "main";

	public static final String LOGIN_PAGE_FORWORD = "Login";

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws ActionException {
		// 从请求获取用户名和口令.
		String reqUserName = request.getParameter("userName");
		String reqPassword = request.getParameter("password");

		if (setSessionValue(reqUserName, reqPassword, request)) {
			thirdPartyAuthorize(request);
			// 认证成功
			return mapping.findForward(MAIN_PAGE_FORWORD);
		} else {
			// 认证失败
			return mapping.findForward(LOGIN_PAGE_FORWORD);
		}
	}

	/**
	 * 调用权限程序，并将认证通过后的用户信息放入到session当中
	 * 
	 * @param username
	 * @param password
	 * @param session
	 * @return boolean
	 * @throws ActionException
	 */
	private boolean setSessionValue(String username, String password,
			HttpServletRequest request) throws ActionException {
		boolean retB = false;
		//		AuthorizeFactory authorizeFactory =
		// (AuthorizeFactory)FrameAppContext.getBean(super.getServlet().getServletContext(),AuthorizeFactory.BEAN);

		InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
				.getInteractionObject(AuthorizeFactory.BEAN, this
						.getAppContext(request));

		AuthorizeBO authBO = authorizeFactory.getAuthorizeBO(request);
		//AuthorizeBO authBO =
		// (AuthorizeBO)FrameAppContext.getBean(super.getServlet().getServletContext(),AuthorizeBO.BEAN);
		AuthorizeVO vo = null;
		//HashMap menu = null;
		//HashMap sys = null;
		try {
			vo = authBO.getAuthorizeInfo(username, password);
			String employee = vo.getEmployeeId();
			String errMsg = vo.getAuthorizeMessage();
			if (null != vo) {
				int authResult = vo.getAuthorizeResult();
				switch (authResult) {
				case 0: //认证失败
					request.setAttribute("alertMsg", vo.getAuthorizeMessage());
					break;
				case 1: //认证失败
					request.setAttribute("alertMsg", vo.getAuthorizeMessage());
					break;
				case 2: //认证成功,但有警告信息
					retB = true;
					request.getSession(true).setAttribute(
							GlobalParameters.SESSION_INFO, vo);
					//页面导向使用redirect,通过SESSION防止该信息
					request.getSession(true).setAttribute("alertMsg",
							vo.getAuthorizeMessage());
					break;
				case 3: //认证成功
					retB = true;
					request.getSession(true).setAttribute(
							GlobalParameters.SESSION_INFO, vo);
					break;
				default:
					request
							.setAttribute("alertMsg", "权限认证结果未知类型:"
									+ authResult);
					break;
				}
			}
		} catch (ServiceException e) {
			e.printStackTrace();
			throw new ActionException(e);
		}
		return retB;
	}

	private boolean thirdPartyAuthorize(HttpServletRequest request) {
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
		.getInteractionObject(AuthorizeFactory.BEAN, this.getAppContext(request));
		ThirdPartyAuthorize[] thirdPartyAuthorize = authorizeFactory.getThirdParyAuthorize(request);

		if (thirdPartyAuthorize == null)
			return true;

		boolean result = true;
		String errMsg = null;
		for (int i = 0; i < thirdPartyAuthorize.length; i++) {
			ThirdPartyAuthorize thirdAuthorize = thirdPartyAuthorize[i];
			//如果没有找到对应的配置类，跳出循环
			if (thirdAuthorize == null)
				continue;

			try {
				if (!thirdAuthorize.authorize(request))
					result = false;
			} catch (ServiceException e) {
				e.printStackTrace();
				errMsg = errMsg + "\n" + thirdAuthorize.getClass().getName()
						+ ":" + e.getMessage();
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
		if (obj == null)
			return "";
		else
			return obj;
	}

}
