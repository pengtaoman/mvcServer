package com.neusoft.tdframework.authorization;

import com.neusoft.om.dao.paramrole.ParamRoleColl;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-10-27
 * @author ren.hui@neusoft.com
 * @version 
 */

public interface AuthorizeVO {

	/**
	 * @return
	 */
	public String getWorkNo();

	/**
	 * @return
	 */
	
	public String getAreaId();
	/**
	 * @return
	 */
	public String getAreaName();
	/**
	 * @return
	 */
	public int getAreaLevel() ;
	/**
	 * @return
	 */
	public String getParentAreaId();
	/**
	 * @return
	 */
	public String getParentAreaName() ;
	/**
	 * 渠道编码
	 * @return
	 */
	public String getOrganID();
	/**
	 * @return
	 */
	public String getOrganName() ;
	
	/**
	 * 
	 * @return
	 */
	public int getOrganKind() ;
	/**
	 * @return
	 */
	public String getParentOrganId() ;
	/**
	 * @return
	 */
	public String getParentOrganName();
	/**
	 * 
	 * @return
	 */
	public int getParentOrganKind();
	/**
	 * @return
	 */
	public int getDutyId() ;
	
	/**
	 * @return
	 */
	public String getDutyName();
	/**
	 * 
	 * @return
	 */
	public int getParentDutyId() ;
	/**
	 * 
	 * @return
	 */
	public String getParentDutyName();
	/**
	 * @return
	 */
	public String getEmployeeId() ;
	/**
	 * @return
	 */
	public String getEmployeeName() ;
	
	public String getParentEmployeeId ();
	
	public String getParentEmployeeName();
	
	
	/**
	 * @return
	 */
	public int getAuthorizeResult() ;
	
	/**
	 * @return
	 */
	public String getAuthorizeMessage() ;
	
	/**
	 * 还有多少天失效
	 * @param 
	 *	 
	 */
	public int getAuthorizeEffectDays();
	
	/**
	 * 分区编码
	 * @return
	 */
	public String getPartCity() ;
			
	/**
	 * 获取口令
	 * @return
	 */
	public String getWorkPwd();
    
    /**
     * 参数角色集合
     * @return
     */
    public ParamRoleColl getParamRoleColl();
    
    /**
     * 地市编码
     * @return
     */
    public String getCityCode();
    
    /**
     * 管理员类型 
     * @return
     */
    public int getAdminType();
    
    /**
     * 区号
     * @return
     */
    public String getAreaCode();
    /**
     * 状态
     * @return
     */
    public int getStatus();
    // -- 以下几个属性为融合经营分析权限系统增加
    /*
     * 性别
     */
    public int getGender();
    
    /*
     * 电话
     */
    public String getMobile();
    /*
     * email
     */
    public String getEmail();
    
    public void setLoginIp(String loginIp);
    
    public String getLoginIp();
    
    public void setLoginId(String loginId);
    
    public String getLoginId();
    
    public int getBusDutyId();
    
    public String getDepartmentId();
    
    public String getDealerName();
    
    public int getOperLevel();
    
    public long getSystemUserId();
    
    public long getStaffId();
    
    public long getPartyId();
    
    public String getHomeCity();
    
    public void setHomeCity(String homeCity);
    
}
