/*
 * <p>Title:       组织机构职员展示信息</p>
 * <p>Description: 为组织机构人员调整新建的类,中和了职员信息和职员职务关系信息</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.dao.organemployeedisplay;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;

public class OrganEmployeeDisplayVO extends BaseVO 
{
    private String  employeeId; //职员编码
    private String  employeeName;   //职员名称
    private String  workNo;//工号
    private int dutyId; //职务
    private String dutyName;//职务名称
    private String  organId;    //所属组织机构
    private int kind;//主要职务或兼职 0:主要职务, 1:兼职
    private String kindName; //任职类型名称
    private int modifiable; //当前操作员是否可以调整
    private String areaId; //区域编码
    private String owner;
    public OrganEmployeeDisplayVO(){
        
    }
    /** 
        空值处理
    */
    private String nvl(String str) {
        return str==null?"":str;
    }
    public int getDutyId()
    {
        return dutyId;
    }
    public void setDutyId(int dutyId)
    {
        this.dutyId = dutyId;
    }
    public String getEmployeeId()
    {
        return employeeId;
    }
    public void setEmployeeId(String employeeId)
    {
        this.employeeId = employeeId;
    }
    public String getEmployeeName()
    {
        return employeeName;
    }
    public void setEmployeeName(String employeeName)
    {
        this.employeeName = employeeName;
    }
    public int getKind()
    {
        return kind;
    }
    public void setKind(int kind)
    {
        this.kind = kind;
    }
    public String getOrganId()
    {
        return organId;
    }
    public void setOrganId(String organId)
    {
        this.organId = organId;
    }
        
    public String getDutyName()
    {
        return dutyName;
    }
    public void setDutyName(String dutyName)
    {
        this.dutyName = dutyName;
    }
    public String getKindName()
    {
        return kindName;
    }
    public void setKindName(String kindName)
    {
        this.kindName = kindName;
    }

	public int getModifiable() {
		return modifiable;
	}
	public void setModifiable(int modifiable) {
		this.modifiable = modifiable;
	}
	
	public String getAreaId() {
		return areaId;
	}
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
	
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public String toString(int tabs) {
        StringBuffer ret = new StringBuffer();
        String str_tab = StringUtil.tabs(tabs);
        ret.append("<employeeId>").append(nvl(employeeId)).append("</employeeId>\n");
        ret.append(str_tab).append("<employeeName>").append(nvl(employeeName)).append("</employeeName>\n");
        ret.append(str_tab).append("<dutyId>").append(dutyId).append("</dutyId>\n");
        ret.append(str_tab).append("<dutyName>").append(dutyName).append("</dutyName>\n");
        ret.append(str_tab).append("<organId>").append(nvl(organId)).append("</organId>\n");
        ret.append(str_tab).append("<kind>").append(kind).append("</kind>\n");
        ret.append(str_tab).append("<kindName>").append(kindName).append("</kindName>\n");
        ret.append(str_tab).append("<modifiable>").append(modifiable).append("</modifiable>\n");
        return ret.toString();
    }
    /**
     * @return 返回 workNo。
     */
    public String getWorkNo() {
        return workNo;
    }
    /**
     * @param workNo 要设置的 workNo。
     */
    public void setWorkNo(String workNo) {
        this.workNo = workNo;
    }
}
