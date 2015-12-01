package com.neusoft.om.dao.group;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class GroupVO extends BaseVO{
	String groupId;
	String groupName; 
	String groupDesc;
	
	public String getGroupDesc() {
		return groupDesc;
	}

	public void setGroupDesc(String groupDesc) {
		this.groupDesc = groupDesc;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) { 
            String columnName = metaData.getColumnName(i).toLowerCase();
            if(columnName.intern()=="f_group_id".intern()){
            	groupId = resultSet.getString(i);
            }else if(columnName.intern()=="f_group_name".intern()){
            	groupName = resultSet.getString(i);
            }else if(columnName.intern()=="f_group_desc".intern()){
            	groupDesc = resultSet.getString(i);
            }
        }
	}
}
