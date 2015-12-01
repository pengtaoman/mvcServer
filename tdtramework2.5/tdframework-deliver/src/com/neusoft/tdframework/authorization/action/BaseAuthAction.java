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
 * ������֤����
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
		// �������ȡ�û����Ϳ���.
		String reqUserName = request.getParameter("userName");
		String reqPassword = request.getParameter("password");

		if (setSessionValue(reqUserName, reqPassword, request)) {
			thirdPartyAuthorize(request);
			// ��֤�ɹ�
			return mapping.findForward(MAIN_PAGE_FORWORD);
		} else {
			// ��֤ʧ��
			return mapping.findForward(LOGIN_PAGE_FORWORD);
		}
	}

	/**
	 * ����Ȩ�޳��򣬲�����֤ͨ������û���Ϣ���뵽session����
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
				case 0: //��֤ʧ��
					request.setAttribute("alertMsg", vo.getAuthorizeMessage());
					break;
				case 1: //��֤ʧ��
					request.setAttribute("alertMsg", vo.getAuthorizeMessage());
					break;
				case 2: //��֤�ɹ�,���о�����Ϣ
					retB = true;
					request.getSession(true).setAttribute(
							GlobalParameters.SESSION_INFO, vo);
					//ҳ�浼��ʹ��redirect,ͨ��SESSION��ֹ����Ϣ
					request.getSession(true).setAttribute("alertMsg",
							vo.getAuthorizeMessage());
					break;
				case 3: //��֤�ɹ�
					retB = true;
					request.getSession(true).setAttribute(
							GlobalParameters.SESSION_INFO, vo);
					break;
				default:
					request
							.setAttribute("alertMsg", "Ȩ����֤���δ֪����:"
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
			//���û���ҵ���Ӧ�������࣬����ѭ��
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
