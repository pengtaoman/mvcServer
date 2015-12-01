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
	/** 获得菜单编码*/
	public String getMenuId() ;
	
	/**获得菜单名称*/
		public String getMenuName() ;
	/**获得系统编码*/
	public String getSystemId() ;
	/**获得模块编码*/
	public String getModuleId();
	/**获得菜单类型*/
	public int getMenuType();
	/**获得打开方式*/
	public int getOpenMethod() ;
	/**获得页面连接*/
	public String getPageLink() ;
	
	/**获得层次*/
	public int getLayer();
	/**获得记录日志*/
	public int getLog ();
	/**获得顺序*/
	public int getOrder();
	/**获得工作区显示*/
	public int getIfMyWork();
	/**获得上级菜单编码*/
	public String getParentMenuId();
	/**获得使用状态*/
	public int getInuse();
	/**获得菜单描述*/
	public String getMenuDesc ();
	/**获得子结点*/
	public boolean getIfChild();
	/**获得子结点*/
	public boolean getIfSelect() ;
	/**是否有授权的权限*/
	public int getAdminStatus() ;
	
	/**是否有执行权限*/
	public int getExecStatus() ;

}
