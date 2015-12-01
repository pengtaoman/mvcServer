/*
 * Created on 2005-1-14
 *
 * 远程认证对象结果级
 */
package com.neusoft.tdframework.authorization;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * @author Administrator
 *
 * 远程认证结果级 
 */
public class RemoteAuthorizeColl extends ObjectCollection{
	public static final String BEAN = "remoteAuthorize";

	/**
	 * 增加一个远程认证对象
	 * @param remoteAuthorizeVO
	 */
	public void addRemoteAuthorizeVO(RemoteAuthorizeVO remoteAuthorizeVO) {
		 addElement(remoteAuthorizeVO);
		 addElement(remoteAuthorizeVO.getName(),remoteAuthorizeVO);
	}
	
	/**
	 * 获取远程认证的配置
	 * @param index
	 * @return
	 */
	public RemoteAuthorizeVO getRemoteAuthorizeVO(int index) {
		return (RemoteAuthorizeVO)getElement(index);
	}
	
	/**
	 * 根据名称查询
	 * @param index
	 * @return
	 */
	public RemoteAuthorizeVO getRemoteAuthorizeVO(String name) {
		return (RemoteAuthorizeVO)getElement(name);
	}
}
