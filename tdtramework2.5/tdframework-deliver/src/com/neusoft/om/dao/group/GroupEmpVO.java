package com.neusoft.om.dao.group;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class GroupEmpVO extends BaseVO{
	String groupId;
	String employeeId;
	
    public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) { 
            String columnName = metaData.getColumnName(i).toLowerCase();
            if(columnName.intern()=="f_group_id".intern())
            	groupId = resultSet.getString(i);
            else if(columnName.intern()=="f_employee_id".intern())
            	employeeId = resultSet.getString(i);
        }
    }

}
