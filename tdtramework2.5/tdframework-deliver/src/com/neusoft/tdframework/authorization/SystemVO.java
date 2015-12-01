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
	/** 获得系统编码*/
	public String getSystemId() ;
	
	/**获得系统名称*/
	public String getSystemName();
	
	/**获得系统类型*/
	public String getSystemType() ;
	
	/**获得系统详细描述*/
	public String getDetailDesc() ;
    
    /** 获得子系统集合 */
    public SystemColl getSubSystemColl();
    
    /** 获得上级系统系统菜单编码 */
    public String getParentSystemId();
    
    /**获得是否显示“我的收藏夹” */
    public String getIfShowFavorite();

}
