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
	 * �����кŻ�ȡmenu
	 * @param index
	 */
	public AuthorizationVO getMenu(int index) ;
	
	/**
	 * ���ݲ˵���ʶ��ȡ�˵�
	 * @param menuId
	 * @return
	 */
	public AuthorizationVO getMenu(String menuId);
}
