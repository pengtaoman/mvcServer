/*
 * Created on 2005-1-14
 *
 * Զ����֤��������
 */
package com.neusoft.tdframework.authorization;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * @author Administrator
 *
 * Զ����֤����� 
 */
public class RemoteAuthorizeColl extends ObjectCollection{
	public static final String BEAN = "remoteAuthorize";

	/**
	 * ����һ��Զ����֤����
	 * @param remoteAuthorizeVO
	 */
	public void addRemoteAuthorizeVO(RemoteAuthorizeVO remoteAuthorizeVO) {
		 addElement(remoteAuthorizeVO);
		 addElement(remoteAuthorizeVO.getName(),remoteAuthorizeVO);
	}
	
	/**
	 * ��ȡԶ����֤������
	 * @param index
	 * @return
	 */
	public RemoteAuthorizeVO getRemoteAuthorizeVO(int index) {
		return (RemoteAuthorizeVO)getElement(index);
	}
	
	/**
	 * �������Ʋ�ѯ
	 * @param index
	 * @return
	 */
	public RemoteAuthorizeVO getRemoteAuthorizeVO(String name) {
		return (RemoteAuthorizeVO)getElement(name);
	}
}
