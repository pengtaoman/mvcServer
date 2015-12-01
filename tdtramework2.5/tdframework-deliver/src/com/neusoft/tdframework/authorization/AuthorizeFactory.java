/*
 * Created on 2004-12-23
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.authorization;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.context.FrameAppContext;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.log.FrameWorkLogger;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author chenzt
 * 
 * ��֤�����࣬��ȡ��ؽӿ�ʵ����
 */
public class AuthorizeFactory implements BaseBO {
	public static final String BEAN = "authorizeFactoryFacade";

	private String authorizeFacade = null;

	private String workFlowInfoFacade = null;

	private List thirdPartyAuthorizeFacade = null;

	private RemoteAuthorizeColl remoteAuthorizeColl = null;

	/**
	 * ��ȡ��֤�Ķ���
	 * 
	 * @param request
	 * @return
	 */
	public AuthorizeBO getAuthorizeBO(HttpServletRequest request) {
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
		AuthorizeBO authorizeBO = (AuthorizeBO) factory.getInteractionObject(
				authorizeFacade, appContext);
		return authorizeBO;
	}

	/**
	 * ��ȡ��������֤���ʵ����
	 * 
	 * @param request
	 * @return
	 */
	public ThirdPartyAuthorize[] getThirdParyAuthorize(
			HttpServletRequest request) {

		// ������õĻ���ֱ�ӷ��ؿ�
		if (thirdPartyAuthorizeFacade == null)
			return null;

		//ѭ����ȡ����
		ThirdPartyAuthorize[] thirdPartyAuthorizes = new ThirdPartyAuthorize[thirdPartyAuthorizeFacade
				.size()];
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("channelext");
		InteractionObjectFactory factory = InteractionObjectFactory
				.getInstance();
		for (int i = 0, j = thirdPartyAuthorizeFacade.size(); i < j; i++) {
			String facade = (String) thirdPartyAuthorizeFacade.get(i);
			ThirdPartyAuthorize thirdPartyAuthorize = null;
			try {
				thirdPartyAuthorize = (ThirdPartyAuthorize) factory
						.getInteractionObject(facade,appContext);
			} catch (Exception e) {
				FrameWorkLogger
						.error(facade + " ��������֤ʧ��: " + e.getMessage(), e);
			}

			thirdPartyAuthorizes[i] = thirdPartyAuthorize;
		}

		return thirdPartyAuthorizes;
	}

	/**
	 * ��ȡ����������Ľӿ���
	 * 
	 * @return
	 */
	public WorkFlowInfo getWorkFlowInfo(HttpServletRequest request) {
		return (WorkFlowInfo) FrameAppContext.getBean(request.getSession(true)
				.getServletContext(), workFlowInfoFacade);
	}

	/**
	 * @return
	 */
	public String getAuthorizeFacade() {
		return authorizeFacade;
	}

	/**
	 * @param string
	 */
	public void setAuthorizeFacade(String string) {
		authorizeFacade = string;
	}

	/**
	 * @return
	 */
	public List getThirdParyAuthorizeFacade() {
		return thirdPartyAuthorizeFacade;
	}

	/**
	 * @param list
	 */
	public void setThirdPartyAuthorizeFacade(List list) {
		thirdPartyAuthorizeFacade = list;
	}

	/**
	 * @return
	 */
	public String getWorkFlowInfoFacade() {
		return workFlowInfoFacade;
	}

	/**
	 * @param string
	 */
	public void setWorkFlowInfoFacade(String string) {
		workFlowInfoFacade = string;
	}

	/**
	 * ��ȡԶ����֤��������Ϣ
	 * 
	 * @param request
	 * @return
	 */
	public RemoteAuthorizeColl getRemoteAuthorizeColl() {
		return remoteAuthorizeColl;
	}

	/**
	 * @param coll
	 */
	public void setRemoteAuthorizeColl(RemoteAuthorizeColl coll) {
		remoteAuthorizeColl = coll;
	}

}
