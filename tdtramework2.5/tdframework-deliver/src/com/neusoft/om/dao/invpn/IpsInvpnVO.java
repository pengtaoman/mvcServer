package com.neusoft.om.dao.invpn;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;

public class IpsInvpnVO extends BaseVO{
	private String ipSegmentId;
	private String ipSegmentAddress;
	private String ipSegmentDesc;
	/**
		�յĹ��췽��
	*/
	public IpsInvpnVO(){
	}
	/**
		ͨ������ֵ����һ������
	*/
	public IpsInvpnVO(String ipSegmentId, String ipSegmentAddress, String ipSegmentDesc){
		
	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public IpsInvpnVO(IpsInvpnVO other){
		this.ipSegmentId = other.ipSegmentId;
		this.ipSegmentAddress = other.ipSegmentAddress;
		this.ipSegmentDesc = other.ipSegmentDesc;
	}
	public String getIpSegmentAddress() {
		return ipSegmentAddress;
	}
	public void setIpSegmentAddress(String ipSegmentAddress) {
		this.ipSegmentAddress = ipSegmentAddress;
	}
	public String getIpSegmentDesc() {
		return ipSegmentDesc;
	}
	public void setIpSegmentDesc(String ipSegmentDesc) {
		this.ipSegmentDesc = ipSegmentDesc;
	}
	public String getIpSegmentId() {
		return ipSegmentId;
	}
	public void setIpSegmentId(String ipSegmentId) {
		this.ipSegmentId = ipSegmentId;
	}
	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();	
		for(int i=1;i<=metaData.getColumnCount();i++) { 	
			String columnName = metaData.getColumnName(i).toLowerCase();	
			if(columnName.intern()=="ip_segment_id".intern())
				ipSegmentId = resultSet.getString(i);
			else if(columnName.intern()=="ip_segment_address".intern())
				ipSegmentAddress = resultSet.getString(i);
			else if(columnName.intern()=="ip_segment_desc".intern())
				ipSegmentDesc = resultSet.getString(i);
		}
	
	}
	
	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		ipSegmentId = NullProcessUtil.nvlToString( map.get("ipSegmentId"), "");
		ipSegmentAddress = NullProcessUtil.nvlToString(map.get("ipSegmentAddress"),"");
		ipSegmentDesc = NullProcessUtil.nvlToString(map.get("ipSegmentDesc"),"");
	}
}
