/*
 * <p>Title:       ��֯����ְԱչʾ��Ϣ</p>
 * <p>Description: Ϊ��֯������Ա�����½�����,�к���ְԱ��Ϣ��ְԱְ���ϵ��Ϣ</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
 */
package com.neusoft.om.dao.organemployeedisplay;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.StringUtil;

public class OrganEmployeeDisplayVO extends BaseVO 
{
    private String  employeeId; //ְԱ����
    private String  employeeName;   //ְԱ����
    private String  workNo;//����
    private int dutyId; //ְ��
    private String dutyName;//ְ������
    private String  organId;    //������֯����
    private int kind;//��Ҫְ����ְ 0:��Ҫְ��, 1:��ְ
    private String kindName; //��ְ��������
    private int modifiable; //��ǰ����Ա�Ƿ���Ե���
    private String areaId; //�������
    private String owner;
    public OrganEmployeeDisplayVO(){
        
    }
    /** 
        ��ֵ����
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
     * @return ���� workNo��
     */
    public String getWorkNo() {
        return workNo;
    }
    /**
     * @param workNo Ҫ���õ� workNo��
     */
    public void setWorkNo(String workNo) {
        this.workNo = workNo;
    }
}
