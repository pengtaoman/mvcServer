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
	private	int	dutyId;	//职务编码
	private	String	employeeId;	//职员编码
	private    String  workNo;//工号
	private	String	organId;	//描述职员所任职务的组织机构信息
	private	int	kind;	//任职类型 1;主要职务  2:兼职
    private String dutyName; //职务名称
    private String organName; //组织机构名称
    private String areaId; //区域编码
    private String owner; //创建者

	/**
		空的构造方法
	*/
	public EmployeeDutyRelationVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public EmployeeDutyRelationVO(int dutyId, String employeeId, String organId,
           int kind, String dutyName, String organName,String areaId, String owner){

	}
	/**
		通过一个已有对象构造一个对象
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
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置职务编码
	*/
	public void setDutyId(int dutyId) {
		this.dutyId = dutyId;
	}
	/**
		获取职务编码
	*/
	public int getDutyId() {
		return (this.dutyId);
	}
	/**
		设置职员编码
	*/
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	/**
		获取职员编码
	*/
	public String getEmployeeId() {
		return (this.employeeId);
	}
	/**
		设置描述职员所任职务的组织机构信息
	*/
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	/**
		获取描述职员所任职务的组织机构信息
	*/
	public String getOrganId() {
		return (this.organId);
	}
	/**
		设置任职类型 1;主要职务  2:兼职
	*/
	public void setKind(int kind) {
		this.kind = kind;
	}
	/**
		获取任职类型 1;主要职务  2:兼职
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
		以SQL的结果集设置数据
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
	* 通过MAP初始化信息
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
		转化成字符串
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