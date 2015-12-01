package com.neusoft.tdframework.authorization.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.authorization.PortalInfoRegistry;
import com.neusoft.tdframework.authorization.ThirdPartyAuthorize;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class RemoteAuthAction extends TDDispatchAction {
	public ActionForward unspecified(
			ActionMapping mapping,
			ActionForm form,
			HttpServletRequest request,
			HttpServletResponse response)
			throws Exception {
			String result = (String)request.getAttribute("flag");
			//HttpSession session=request.getSession(true);
			String username = (String)request.getAttribute("username");
			String password = (String)request.getAttribute("password");
			//AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
			if (PortalInfoRegistry.register(request,response,username, password)) {
				thirdPartyAuthorize(request);
			}
			request.setAttribute("result", result);
			return mapping.findForward("reply");
		}
	private boolean thirdPartyAuthorize(HttpServletRequest request) {
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
				.getInteractionObject(AuthorizeFactory.BEAN, appContext);

		ThirdPartyAuthorize[] thirdPartyAuthorize = authorizeFactory
					.getThirdParyAuthorize(request);

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
	/**
	 * 
	 * @param obj
	 * @return
	 */
	private Object nvl(Object obj) {
		if (obj == null)
			return "";
		else
			return obj;
	}
	
	

}
