package com.neusoft.om.dao.organization;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;

/**
 * 
 * @author zhaofan
 * 2009-9-30
 */
public class OrganVO extends BaseVO { 
	private	int	organId;	//组织机构编码
	private	String	organName;	//组织机构名称
	private	String	organType;	//组织机构类型
	private	int	parentOrganId;	//组织机构编码
	private	int	regionId;	//所属区域
    private String orgContent;
    private String regionName;
	public int getOrganId() {
		return organId;
	}
	public void setOrganId(int organId) {
		this.organId = organId;
	}
	public String getOrganName() {
		return organName;
	}
	public void setOrganName(String organName) {
		this.organName = organName;
	}
	public String getOrganType() {
		return organType;
	}
	public void setOrganType(String organType) {
		this.organType = organType;
	}
	public String getOrgContent() {
		return orgContent;
	}
	public void setOrgContent(String orgContent) {
		this.orgContent = orgContent;
	}
	public int getParentOrganId() {
		return parentOrganId;
	}
	public void setParentOrganId(int parentOrganId) {
		this.parentOrganId = parentOrganId;
	}
	public int getRegionId() {
		return regionId;
	}
	public void setRegionId(int regionId) {
		this.regionId = regionId;
	}
	
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}
	/**
		以SQL的结果集设置数据
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 
			String columnName = metaData.getColumnName(i).toLowerCase();
			if(columnName.intern()=="org_id".intern())
				organId = resultSet.getInt(i);
			else if(columnName.intern()=="org_type".intern())
				organType = resultSet.getString(i);
			else if(columnName.intern()=="parent_org_id".intern())
				parentOrganId = resultSet.getInt(i);
			else if(columnName.intern()=="common_region_id".intern())
				regionId = resultSet.getInt(i);
			else if(columnName.intern()=="org_content".intern()){
				orgContent = resultSet.getString(i);
				organName = resultSet.getString(i);
			}
			else if(columnName.intern()=="region_name".intern())
				regionName = resultSet.getString(i);	
		}

	}
	/**
	 * 处理由字符串转换成数字
	 * @param obj
	 * @return
	 */
	private int parseIntFromString(Object obj){
		String str = NullProcessUtil.nvlToString(obj, "");
		if("".equals(str)){
			return 0;
		}
		return Integer.parseInt(str);		
	}

	/**
	* 通过MAP初始化信息
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		organId = parseIntFromString(NullProcessUtil.nvlToString(map.get("OrganId"),""));
		organName = NullProcessUtil.nvlToString(
			(String)map.get("OrganName"),"");
		organType = NullProcessUtil.nvlToString(map.get("OrganType"),"");
		parentOrganId = parseIntFromString(NullProcessUtil.nvlToString(map.get("ParentOrganId"),""));
		regionId = parseIntFromString(NullProcessUtil.nvlToString(map.get("AreaId"),""));
		orgContent = NullProcessUtil.nvlToString(map.get("OrganName"),"");
		regionName = NullProcessUtil.nvlToString(map.get("AreaName"),"");
	}


}