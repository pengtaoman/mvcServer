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
public interface SystemVO {
	/** ���ϵͳ����*/
	public String getSystemId() ;
	
	/**���ϵͳ����*/
	public String getSystemName();
	
	/**���ϵͳ����*/
	public String getSystemType() ;
	
	/**���ϵͳ��ϸ����*/
	public String getDetailDesc() ;
    
    /** �����ϵͳ���� */
    public SystemColl getSubSystemColl();
    
    /** ����ϼ�ϵͳϵͳ�˵����� */
    public String getParentSystemId();
    
    /**����Ƿ���ʾ���ҵ��ղؼС� */
    public String getIfShowFavorite();

}
