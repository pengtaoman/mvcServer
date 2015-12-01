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
public interface SystemColl {
	/**
	 * 根据行号获取SystemVO
	 * @param index
	 */
	public SystemVO getSystem(int index) ;
	
	/**
	 * 根据systemId得到systemVO
	 * @param systemId
	 * @return
	 */
	public SystemVO getSystem(String systemId) ;
	
	/**
	 * 获取系统结果集的行数
	 * @return
	 */
	public int getRowCount();
	
}
