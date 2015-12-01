package com.neusoft.om.dao.container;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

public class ContainerVO extends BaseVO{
	private int key;
	private String container;
	public String getContainer() {
		return container;
	}
	public void setContainer(String container) {
		this.container = container;
	}
	public int getKey() {
		return key;
	}
	public void setKey(int key) {
		this.key = key;
	}
	
	public void setAttribute(ResultSet resultSet) throws SQLException {
		 ResultSetMetaData metaData = resultSet.getMetaData();
		for(int i=1;i<=metaData.getColumnCount();i++) { 
            String columnName = metaData.getColumnName(i).toLowerCase();
            if(columnName.intern()=="f_key".intern())
            	key = resultSet.getInt(i);
            else if(columnName.intern()=="f_container".intern())
            	container = nvl(resultSet.getString(i));
            
        } 
	}
	private String nvl(String str) {
		return str==null?"":str;
	}

}
