package com.neusoft.om.dao.employeedutyrelation;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;

/**
 * Title: EmployeeDutyRelationVO
 * Description:
 * Company: neusoft
 * Date: 2004-12-27
 * @author ren.hui@neusoft.com
 * @version
 */

public class EmployeeDutyRelationVO extends BaseVO { 
	private	int	dutyId;	//ְ�����
	private	String	employeeId;	//ְԱ����
	private    String  workNo;//����
	private	String	organId;	//����ְԱ����ְ�����֯������Ϣ
	private	int	kind;	//��ְ���� 1;��Ҫְ��  2:��ְ
    private String dutyName; //ְ������
    private String organName; //��֯��������
    private String areaId; //�������
    private String owner; //������

	/**
		�յĹ��췽��
	*/
	public EmployeeDutyRelationVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public EmployeeDutyRelationVO(int dutyId, String employeeId, String organId,
           int kind, String dutyName, String organName,String areaId, String owner){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public EmployeeDutyRelationVO(EmployeeDutyRelationVO other){
		if(this != other) {
			this.dutyId = other.dutyId;
			this.employeeId = other.employeeId;
			this.organId = other.organId;
			this.kind = other.kind;
            this.dutyName = other.dutyName;
            this.areaId = other.areaId;
            this.owner = other.owner;
		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		����ְ�����
	*/
	public void setDutyId(int dutyId) {
		this.dutyId = dutyId;
	}
	/**
		��ȡְ�����
	*/
	public int getDutyId() {
		return (this.dutyId);
	}
	/**
		����ְԱ����
	*/
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	/**
		��ȡְԱ����
	*/
	public String getEmployeeId() {
		return (this.employeeId);
	}
	/**
		��������ְԱ����ְ�����֯������Ϣ
	*/
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	/**
		��ȡ����ְԱ����ְ�����֯������Ϣ
	*/
	public String getOrganId() {
		return (this.organId);
	}
	/**
		������ְ���� 1;��Ҫְ��  2:��ְ
	*/
	public void setKind(int kind) {
		this.kind = kind;
	}
	/**
		��ȡ��ְ���� 1;��Ҫְ��  2:��ְ
	*/
	public int getKind() {
		return (this.kind);
	}

	public String getDutyName()
    {
        return dutyName;
    }
    public void setDutyName(String dutyName)
    {
        this.dutyName = dutyName;
    }
    public String getOrganName()
    {
        return organName;
    }
    public void setOrganName(String organName)
    {
        this.organName = organName;
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
	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_duty_id".intern())
				dutyId = resultSet.getInt(i);
			else if(columnName.intern()=="f_employee_id".intern())
				employeeId = resultSet.getString(i);
			else if(columnName.intern()=="f_organ_id".intern())
				organId = resultSet.getString(i);
			else if(columnName.intern()=="f_kind".intern())
				kind = resultSet.getInt(i);
			else if(columnName.intern()=="f_work_no".intern())
				workNo = resultSet.getString(i);
			else if(columnName.intern()=="f_area_id".intern())
				areaId = resultSet.getString(i);
			else if(columnName.intern() == "f_owner".intern())
				owner = resultSet.getString(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		dutyId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("dutyId"), "-10"));
		employeeId = NullProcessUtil.nvlToString(
			map.get("employeeId"),"");
		organId = NullProcessUtil.nvlToString(
			map.get("organId"),"");
		kind = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("kind"), "-10"));
        organName = NullProcessUtil.nvlToString(
            map.get("organName"),"");
        dutyName = NullProcessUtil.nvlToString(
            map.get("dutyName"),"");   
        areaId = NullProcessUtil.nvlToString(map.get("areaId"),"");
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<DutyId>").append(dutyId).append("</DutyId>\n");
		ret.append(str_tab).append("<EmployeeId>").append(nvl(employeeId)).append("</EmployeeId>\n");
		ret.append(str_tab).append("<OrganId>").append(nvl(organId)).append("</OrganId>\n");
		ret.append(str_tab).append("<Kind>").append(kind).append("</Kind>\n");
        ret.append(str_tab).append("<organName>").append(organName).append("</organName>\n");
        ret.append(str_tab).append("<dutyName>").append(dutyName).append("</dutyName>\n");
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