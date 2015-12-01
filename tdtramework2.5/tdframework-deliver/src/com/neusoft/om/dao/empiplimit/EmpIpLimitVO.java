package com.neusoft.om.dao.empiplimit;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class EmpIpLimitVO extends BaseVO{
	private String workNo;
	private String ipStartAdd;
	private String ipEndAdd;
	private String areaId;
	private int forceFlag;
	private String detailDesc;
	private String updateDate;
	private String updateEmp;
	private String updateOrgan;
	private String areaName;
	private String updOrganName;
	private String updaetEmployeeName;
	private String forceName;
	private String employeeName;
	/**
		空的构造方法
	*/
	public EmpIpLimitVO(){
	}

	/**
	 * @return the areaId
	 */
	public String getAreaId() {
		return areaId;
	}

	/**
	 * @param areaId the areaId to set
	 */
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}

	/**
	 * @return the detailDesc
	 */
	public String getDetailDesc() {
		return detailDesc;
	}

	/**
	 * @param detailDesc the detailDesc to set
	 */
	public void setDetailDesc(String detailDesc) {
		this.detailDesc = detailDesc;
	}

	/**
	 * @return the forceFlag
	 */
	public int getForceFlag() {
		return forceFlag;
	}

	/**
	 * @param forceFlag the forceFlag to set
	 */
	public void setForceFlag(int forceFlag) {
		this.forceFlag = forceFlag;
	}

	/**
	 * @return the ipEndAdd
	 */
	public String getIpEndAdd() {
		return ipEndAdd;
	}

	/**
	 * @param ipEndAdd the ipEndAdd to set
	 */
	public void setIpEndAdd(String ipEndAdd) {
		this.ipEndAdd = ipEndAdd;
	}

	/**
	 * @return the ipStartAdd
	 */
	public String getIpStartAdd() {
		return ipStartAdd;
	}

	/**
	 * @param ipStartAdd the ipStartAdd to set
	 */
	public void setIpStartAdd(String ipStartAdd) {
		this.ipStartAdd = ipStartAdd;
	}

	/**
	 * @return the updateDate
	 */
	public String getUpdateDate() {
		return updateDate;
	}

	/**
	 * @param updateDate the updateDate to set
	 */
	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	/**
	 * @return the updateEmp
	 */
	public String getUpdateEmp() {
		return updateEmp;
	}

	/**
	 * @param updateEmp the updateEmp to set
	 */
	public void setUpdateEmp(String updateEmp) {
		this.updateEmp = updateEmp;
	}

	/**
	 * @return the updateOrgan
	 */
	public String getUpdateOrgan() {
		return updateOrgan;
	}

	/**
	 * @param updateOrgan the updateOrgan to set
	 */
	public void setUpdateOrgan(String updateOrgan) {
		this.updateOrgan = updateOrgan;
	}

	/**
	 * @return the areaName
	 */
	public String getAreaName() {
		return areaName;
	}

	/**
	 * @param areaName the areaName to set
	 */
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	/**
	 * @return the updOrganName
	 */
	public String getUpdOrganName() {
		return updOrganName;
	}

	/**
	 * @param updOrganName the updOrganName to set
	 */
	public void setUpdOrganName(String updOrganName) {
		this.updOrganName = updOrganName;
	}

	/**
	 * @return the forceName
	 */
	public String getForceName() {
		return forceName;
	}

	/**
	 * @param forceName the forceName to set
	 */
	public void setForceName(String forceName) {
		this.forceName = forceName;
	}
	/**
	 * @return the updaetEmployeeName
	 */
	public String getUpdaetEmployeeName() {
		return updaetEmployeeName;
	}
	/**
	 * @param updaetEmployeeName the updaetEmployeeName to set
	 */
	public void setUpdaetEmployeeName(String updaetEmployeeName) {
		this.updaetEmployeeName = updaetEmployeeName;
	}	

	/**
	 * @return the employeeName
	 */
	public String getEmployeeName() {
		return employeeName;
	}

	/**
	 * @param employeeName the employeeName to set
	 */
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	/**
	 * @return the workNo
	 */
	public String getWorkNo() {
		return workNo;
	}

	/**
	 * @param workNo the workNo to set
	 */
	public void setWorkNo(String workNo) {
		this.workNo = workNo;
	}
	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();	
		for(int i=1;i<=metaData.getColumnCount();i++) { 	
			String columnName = metaData.getColumnName(i).toLowerCase();
			if(columnName.intern()=="work_no".intern())
				workNo = resultSet.getString(i);			
			else if(columnName.intern()=="ip_start_add".intern())
				ipStartAdd = resultSet.getString(i);
			else if(columnName.intern()=="ip_end_add".intern())
				ipEndAdd = resultSet.getString(i);
			else if(columnName.intern()=="area_id".intern())
				areaId = resultSet.getString(i);
			else if(columnName.intern()=="force_flag".intern()){
				forceFlag = resultSet.getInt(i);
				if(forceFlag == 1){
					forceName = "是";
				}else{
					forceName = "否";
				}
			}				
			else if(columnName.intern()=="detail_desc".intern())
				detailDesc = resultSet.getString(i);
			else if(columnName.intern()=="update_date".intern()){
				String upTime = resultSet.getString(i);
				if(upTime!= null && !upTime.trim().equals("")){
					updateDate = upTime.substring(0, 10);
				}					
			}				
			else if(columnName.intern()=="update_emp".intern())
				updateEmp = resultSet.getString(i);
			else if(columnName.intern()=="update_organ".intern())
				updateOrgan = resultSet.getString(i);
			else if(columnName.intern()=="area_name".intern())
				areaName = resultSet.getString(i);
			else if(columnName.intern()=="updateorganname".intern())
				updOrganName = resultSet.getString(i);
			else if(columnName.intern()=="updateemployeename".intern())
				updaetEmployeeName = resultSet.getString(i);
			else if(columnName.intern()=="employeename".intern())
				employeeName = resultSet.getString(i);
		}
	
	}

}
