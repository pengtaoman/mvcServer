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
	 * �����кŻ�ȡSystemVO
	 * @param index
	 */
	public SystemVO getSystem(int index) ;
	
	/**
	 * ����systemId�õ�systemVO
	 * @param systemId
	 * @return
	 */
	public SystemVO getSystem(String systemId) ;
	
	/**
	 * ��ȡϵͳ�����������
	 * @return
	 */
	public int getRowCount();
	
}
