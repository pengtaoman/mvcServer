/*
 * <p>Title:Ϊ�ں�4.5Ȩ��ϵͳsession��Ϣ������vo</p>
 * <p>Description: ����ϸ��˵��</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
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
