/*
 * <p>Title:为融合4.5权限系统session信息新增的vo</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.tdframework.authorization;

public interface AuthVOExt
{    
    public String getAccount();

    public String getAreaCode();
    
    public String getCenterCode();

    public String getCityCode();

    public int getCityLevel();

    public String getCityName();
    
    public String getDepartment();

    public String getDepartmentName();

    public String getOrganCode();

    public String getParentCity();

    public int getPersonLevel();

    public String getProvinceCode();

    public String getRegionCode();

    public String getWorkNo();
    
    public String getParamRoleId();


}
