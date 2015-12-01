package com.neusoft.om.dao.employee;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-06-10
 * @author ren.hui@neusoft.com
 * @version
 */

public class AdjEmployeeVO extends BaseVO {
    private String  employeeId; //职员编码
    private String  employeeName;   //职员名称
    private String  areaId; //所属行政区域
    private String  areaName;//所属区域信息
    private String  cityCode; //城市编码
    private String  cityName;
    private String  organName;//组织机构名称
    private String  organId;    //所属组织机构
    private String  workNo; //登录账号
    private String  menuId;  //
    private String  menuName; //
    private String  parentMenuId;    //
    private String  adjustMethod;    //   
    
   
    /**
        空的构造方法
    */
    public AdjEmployeeVO(){

    }	
    /** 
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	public String getAdjustMethod() {
		return adjustMethod;
	}

	public void setAdjustMethod(String adjustMethod) {
		this.adjustMethod = adjustMethod;
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}

	public String getCityCode() {
		return cityCode;
	}

	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
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

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getOrganId() {
		return organId;
	}

	public void setOrganId(String organId) {
		this.organId = organId;
	}

	public String getOrganName() {
		return organName;
	}

	public void setOrganName(String organName) {
		this.organName = organName;
	}

	public String getParentMenuId() {
		return parentMenuId;
	}

	public void setParentMenuId(String parentMenuId) {
		this.parentMenuId = parentMenuId;
	}

	public String getWorkNo() {
		return workNo;
	}

	public void setWorkNo(String workNo) {
		this.workNo = workNo;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	
	/**
        以SQL的结果集设置数据
    */
    public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) { 
            String columnName = metaData.getColumnName(i).toLowerCase();
            if(columnName.intern()=="f_employee_id".intern())
                employeeId = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_employee_name".intern())
                employeeName = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_area_id".intern())
                areaId = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_organ_id".intern())
                organId = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_work_no".intern())
                workNo = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_area_name".intern())
            	areaName = nvl(resultSet.getString("f_area_name"));
            else if(columnName.intern()=="f_organ_name".intern())
            	organName = nvl(resultSet.getString("f_organ_name"));
            else if(columnName.intern()=="f_city_code".intern())
                cityCode = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_city_name".intern())
                cityName = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_menu_id".intern())
                menuId = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_menu_name".intern())
                menuName = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_parent_menu_id".intern())
                parentMenuId = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_exec_adjust".intern())
            {
            	 int execAdjust = resultSet.getInt(i);
            	 if(execAdjust == 1){
            		 adjustMethod = "增加权限";
            	 }else{
            		 adjustMethod = "减少权限";
            	 }
            }
        }
 
    }
 


}