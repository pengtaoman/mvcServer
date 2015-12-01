package com.neusoft.om.dao.dealer;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
//渠道类别
public class DealerTypeVO extends BaseVO{
	private int dealerType = 0; //类别编码
	private String dealerTypeName;//类别名称
	private int useFlag = 0;
	private String remarkInfo;
	
	public int getDealerType() {
		return dealerType;
	}
	public void setDealerType(int dealerType) {
		this.dealerType = dealerType;
	}
	public String getDealerTypeName() {
		return dealerTypeName;
	}
	public void setDealerTypeName(String dealerTypeName) {
		this.dealerTypeName = dealerTypeName;
	}
	public String getRemarkInfo() {
		return remarkInfo;
	}
	public void setRemarkInfo(String remarkInfo) {
		this.remarkInfo = remarkInfo;
	}
	public int getUseFlag() {
		return useFlag;
	}
	public void setUseFlag(int useFlag) {
		this.useFlag = useFlag;
	}
	
    /** 
	    空值处理
	*/
	private String nvl(String str) {
	    return str==null?"":str;
	}
	/**
	    以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
	    ResultSetMetaData metaData = resultSet.getMetaData();
	
	    for(int i=1;i<=metaData.getColumnCount();i++) { 
	
	        String columnName = metaData.getColumnName(i).toLowerCase();
	        if(columnName.intern()=="dealer_type".intern())
	        	dealerType = resultSet.getInt(i);
	        else if(columnName.intern()=="dealer_type_name".intern())
	        	dealerTypeName = nvl(resultSet.getString(i));
	        else if(columnName.intern()=="use_flag".intern())
	        	useFlag = resultSet.getInt(i);
	        else if(columnName.intern()=="remark_info".intern())
	        	remarkInfo = nvl(resultSet.getString(i));
	    }
	}
}