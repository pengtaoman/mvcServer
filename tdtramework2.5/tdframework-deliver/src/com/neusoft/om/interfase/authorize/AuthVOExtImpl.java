/*
 * <p>Title:       AuthVOExt的实现类</p>
 * <p>Description: 为融合4.5而增加的session数据类</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.interfase.authorize;

import com.neusoft.tdframework.authorization.AuthVOExt;

public class AuthVOExtImpl implements AuthVOExt
{
  public String account;
  public int personLevel;
  public String cityCode;
  public String provinceCode;
  public String centerCode;
  public String organCode;
  public String regionCode;
  public String cityName;
  public int cityLevel;
  public String areaCode;
  public String parentCity;
  public String department;
  public String departmentName;
  public String workNo;
  public String paramRoleId;
  
    public String getAccount()
    {
        return account;
    }
    public void setAccount(String account)
    {
        this.account = account;
    }
    public String getAreaCode()
    {
        return areaCode;
    }
    public void setAreaCode(String areaCode)
    {
        this.areaCode = areaCode;
    }
    public String getCenterCode()
    {
        return centerCode;
    }
    public void setCenterCode(String centerCode)
    {
        this.centerCode = centerCode;
    }
    public String getCityCode()
    {
        return cityCode;
    }
    public void setCityCode(String cityCode)
    {
        this.cityCode = cityCode;
    }
    public int getCityLevel()
    {
        return cityLevel;
    }
    public void setCityLevel(int cityLevel)
    {
        this.cityLevel = cityLevel;
    }
    public String getCityName()
    {
        return cityName;
    }
    public void setCityName(String cityName)
    {
        this.cityName = cityName;
    }
    public String getDepartment()
    {
        return department;
    }
    public void setDepartment(String department)
    {
        this.department = department;
    }
    public String getDepartmentName()
    {
        return departmentName;
    }
    public void setDepartmentName(String departmentName)
    {
        this.departmentName = departmentName;
    }
    public String getOrganCode()
    {
        return organCode;
    }
    public void setOrganCode(String organCode)
    {
        this.organCode = organCode;
    }
    public String getParentCity()
    {
        return parentCity;
    }
    public void setParentCity(String parentCity)
    {
        this.parentCity = parentCity;
    }
    public int getPersonLevel()
    {
        return personLevel;
    }
    public void setPersonLevel(int personLevel)
    {
        this.personLevel = personLevel;
    }
    public String getProvinceCode()
    {
        return provinceCode;
    }
    public void setProvinceCode(String provinceCode)
    {
        this.provinceCode = provinceCode;
    }
    public String getRegionCode()
    {
        return regionCode;
    }
    public void setRegionCode(String regionCode)
    {
        this.regionCode = regionCode;
    }
    public String getWorkNo()
    {
        return workNo;
    }
    public void setWorkNo(String workNo)
    {
        this.workNo = workNo;
    }
    public String getParamRoleId()
    {
        return paramRoleId;
    }
    public void setParamRoleId(String paramRoleId)
    {
        this.paramRoleId = paramRoleId;
    }

  
}
