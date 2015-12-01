/*
 * Created on 2004-12-10
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.authorization;

/**
 * @author chenzt
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface AuthorizationColl {
	/**
	 * 根据行号获取menu
	 * @param index
	 */
	public AuthorizationVO getMenu(int index) ;
	
	/**
	 * 根据菜单标识获取菜单
	 * @param menuId
	 * @return
	 */
	public AuthorizationVO getMenu(String menuId);
}
