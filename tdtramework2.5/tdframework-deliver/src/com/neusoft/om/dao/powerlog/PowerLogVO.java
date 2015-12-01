package com.neusoft.om.dao.powerlog;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class PowerLogVO extends BaseVO{
	
	private int logId;
	private String partCity;
	private int partMm;
	private String areaId;
	private String areaName;
	private String employeeId;
	private String employeeName;
	private int operType;
	private String operName;
	private String operObj;
	private String objName;
	private String powerId;
	private String powerName;
	private String operateDate;
	private String note;

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public int getLogId() {
		return logId;
	}

	public void setLogId(int logId) {
		this.logId = logId;
	}


	public String getPowerId() {
		return powerId;
	}

	public void setPowerId(String powerId) {
		this.powerId = powerId;
	}

	public String getPowerName() {
		return powerName;
	}

	public void setPowerName(String powerName) {
		this.powerName = powerName;
	}

	public String getOperateDate() {
		return operateDate;
	}

	public void setOperateDate(String operateDate) {
		this.operateDate = operateDate;
	}

	public String getOperObj() {
		return operObj;
	}

	public void setOperObj(String operObj) {
		this.operObj = operObj;
	}

	public int getOperType() {
		return operType;
	}

	public void setOperType(int operType) {
		this.operType = operType;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getPartCity() {
		return partCity;
	}

	public void setPartCity(String partCity) {
		this.partCity = partCity;
	}

	public int getPartMm() {
		return partMm;
	}

	public void setPartMm(int partMm) {
		this.partMm = partMm;
	}

	public String getOperName() {
		return operName;
	}

	public void setOperName(String operName) {
		this.operName = operName;
	}

	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();
		for(int i=1;i<=metaData.getColumnCount();i++) {
			String columnName = metaData.getColumnName(i).toLowerCase();
			if(columnName.intern()=="f_log_id".intern())
				logId = resultSet.getInt(i);
			else if(columnName.intern()=="f_part_city".intern())
				partCity=resultSet.getString(i);
			else if(columnName.intern()=="f_part_mm".intern())
				partMm = resultSet.getInt(i);
			else if(columnName.intern()=="f_area_id".intern())
				areaId = resultSet.getString(i);
			else if(columnName.intern()=="f_area_name".intern())
				areaName = resultSet.getString(i);
			else if(columnName.intern()=="f_employee_id".intern())
				employeeId = resultSet.getString(i);
			else if(columnName.intern()=="f_employee_name".intern())
				employeeName = resultSet.getString(i);
			else if(columnName.intern()=="f_oper_type".intern()){
				operType = resultSet.getInt(i);
				if(operType == 0){
					operName = "功能赋权";
				}else if(operType == 1){
					operName ="权限微调";
				}
			}						
			else if(columnName.intern()=="f_oper_obj".intern())
				operObj = resultSet.getString(i);
			else if(columnName.intern()=="f_power_id".intern())
				powerId = resultSet.getString(i);
			else if(columnName.intern()=="f_power_name".intern())
				powerName = resultSet.getString(i);
			else if(columnName.intern()=="f_operate_time".intern())
				operateDate = resultSet.getString(i);
			else if(columnName.intern()=="f_note".intern())
				note = resultSet.getString(i);
			else if(columnName.intern()=="f_obj_name".intern())
				objName = resultSet.getString(i);
		}
	}

}
