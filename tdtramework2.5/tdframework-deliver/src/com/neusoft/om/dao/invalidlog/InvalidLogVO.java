package com.neusoft.om.dao.invalidlog;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class InvalidLogVO extends BaseVO{
	
	private String workNo;
	private String time;


	public String getTime() {
		return time;
	}


	public void setTime(String time) {
		this.time = time;
	}

	public String getWorkNo() {
		return workNo;
	}

	public void setWorkNo(String workNo) {
		this.workNo = workNo;
	}

	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();
		for(int i=1;i<=metaData.getColumnCount();i++) {
			String columnName = metaData.getColumnName(i).toLowerCase();
			if(columnName.intern()=="f_work_no".intern())
				workNo = resultSet.getString(i);
			else if(columnName.intern()=="f_time".intern())
				time = resultSet.getString(i);
		}
	}

}
