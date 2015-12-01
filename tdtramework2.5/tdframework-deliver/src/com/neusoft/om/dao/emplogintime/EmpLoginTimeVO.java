package com.neusoft.om.dao.emplogintime;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class EmpLoginTimeVO extends BaseVO{
	private String logId;
	private String workNo;
	private String startDate;
	private String startTime;
	private String endDate;
	private String endTime;
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
	public EmpLoginTimeVO(){
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
	 * @return the endDate
	 */
	public String getEndDate() {
		return endDate;
	}

	/**
	 * @param endDate the endDate to set
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	/**
	 * @return the endTime
	 */
	public String getEndTime() {
		return endTime;
	}

	/**
	 * @param endTime the endTime to set
	 */
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	/**
	 * @return the logId
	 */
	public String getLogId() {
		return logId;
	}

	/**
	 * @param logId the logId to set
	 */
	public void setLogId(String logId) {
		this.logId = logId;
	}

	/**
	 * @return the startDate
	 */
	public String getStartDate() {
		return startDate;
	}

	/**
	 * @param startDate the startDate to set
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	/**
	 * @return the startTime
	 */
	public String getStartTime() {
		return startTime;
	}

	/**
	 * @param startTime the startTime to set
	 */
	public void setStartTime(String startTime) {
		this.startTime = startTime;
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
			else if(columnName.intern()=="log_id".intern())
				logId = resultSet.getString(i);
			else if(columnName.intern()=="start_date".intern()){
				String time = resultSet.getString(i);
				if(time!= null && !time.trim().equals("")){
					startDate = time.substring(0, 10);
				}	
			}				
			else if(columnName.intern()=="start_time".intern())
				startTime = resultSet.getString(i);
			else if(columnName.intern()=="end_date".intern()){
				String time = resultSet.getString(i);
				if(time!= null && !time.trim().equals("")){
					endDate = time.substring(0, 10);
				}
			}
			else if(columnName.intern()=="end_time".intern())
				endTime = resultSet.getString(i);
			else if(columnName.intern()=="force_flag".intern()){
				forceFlag = resultSet.getInt(i);
				if(forceFlag == 1){
					forceName = "允许登录";
				}else{
					forceName = "不允许登录";
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
