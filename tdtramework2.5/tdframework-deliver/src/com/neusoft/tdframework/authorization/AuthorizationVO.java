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
public interface AuthorizationVO {
	/** ��ò˵�����*/
	public String getMenuId() ;
	
	/**��ò˵�����*/
		public String getMenuName() ;
	/**���ϵͳ����*/
	public String getSystemId() ;
	/**���ģ�����*/
	public String getModuleId();
	/**��ò˵�����*/
	public int getMenuType();
	/**��ô򿪷�ʽ*/
	public int getOpenMethod() ;
	/**���ҳ������*/
	public String getPageLink() ;
	
	/**��ò��*/
	public int getLayer();
	/**��ü�¼��־*/
	public int getLog ();
	/**���˳��*/
	public int getOrder();
	/**��ù�������ʾ*/
	public int getIfMyWork();
	/**����ϼ��˵�����*/
	public String getParentMenuId();
	/**���ʹ��״̬*/
	public int getInuse();
	/**��ò˵�����*/
	public String getMenuDesc ();
	/**����ӽ��*/
	public boolean getIfChild();
	/**����ӽ��*/
	public boolean getIfSelect() ;
	/**�Ƿ�����Ȩ��Ȩ��*/
	public int getAdminStatus() ;
	
	/**�Ƿ���ִ��Ȩ��*/
	public int getExecStatus() ;

}
