package com.neusoft.om.dao.staff;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;

public class StaffVO extends BaseVO{
	private long staffId;
	private String staffCode;
	private long orgId;
	private String staffName;
	private String staffDesc;
	private String statusCd;
	private String statusDate;
	private String createDate;
	private long partyId;
	private long parentStaffId;
	private String regionName;
	private String organName;
	private String cityCode;
	private String commonRegionId;
	private long positionId;
	
	
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public long getOrgId() {
		return orgId;
	}
	public void setOrgId(long orgId) {
		this.orgId = orgId;
	}
	public long getPartyId() {
		return partyId;
	}
	public void setPartyId(long partyId) {
		this.partyId = partyId;
	}
	public String getStaffCode() {
		return staffCode;
	}
	public void setStaffCode(String staffCode) {
		this.staffCode = staffCode;
	}
	public String getStaffDesc() {
		return staffDesc;
	}
	public void setStaffDesc(String staffDesc) {
		this.staffDesc = staffDesc;
	}
	public long getStaffId() {
		return staffId;
	}
	public void setStaffId(long staffId) {
		this.staffId = staffId;
	}
	public String getStaffName() {
		return staffName;
	}
	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}
	
    public long getParentStaffId() {
		return parentStaffId;
	}
	public void setParentStaffId(long parentStaffId) {
		this.parentStaffId = parentStaffId;
	}
	
	public String getOrganName() {
		return organName;
	}
	public void setOrganName(String organName) {
		this.organName = organName;
	}
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}	
	public String getCityCode() {
		return cityCode;
	}
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}
	
	public String getCommonRegionId() {
		return commonRegionId;
	}
	public void setCommonRegionId(String commonRegionId) {
		this.commonRegionId = commonRegionId;
	}
	public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) { 
            String columnName = metaData.getColumnName(i).toLowerCase();
            if(columnName.intern()=="staff_id".intern())
                staffId = resultSet.getLong(i);
            else if(columnName.intern()=="staff_code".intern())
                staffCode = nvl(resultSet.getString(i));
            else if(columnName.intern()=="org_id".intern())
                orgId = resultSet.getLong(i);
            else if(columnName.intern()=="staff_name".intern())
            	staffName = nvl(resultSet.getString(i));
            else if(columnName.intern()=="staff_desc".intern())
            	staffDesc = nvl(resultSet.getString(i));            
            else if(columnName.intern()=="status_cd".intern())
            	statusCd = nvl(resultSet.getString(i));
            else if(columnName.intern()=="status_date".intern())
            	statusDate = nvl(resultSet.getString(i));
            else if(columnName.intern()=="create_date".intern())
            	createDate = nvl(resultSet.getString(i));
            else if(columnName.intern()=="party_id".intern())
            	partyId = resultSet.getLong(i); 
            else if(columnName.intern()=="parent_staff_id".intern())
            	parentStaffId = resultSet.getLong(i); 
            else if(columnName.intern()=="org_content".intern())
            	organName = resultSet.getString(i);
            else if(columnName.intern()=="region_name".intern())
            	regionName = resultSet.getString(i);
            else if( columnName.intern()=="city_code".intern())
            	cityCode= resultSet.getString(i);
            else if( columnName.intern()=="common_region_id".intern())
            	commonRegionId= resultSet.getString(i);
        } 
    }
    private String nvl(String str) {
        return str==null?"":str;
    }
    
    /**
     * 通过MAP初始化信息
    */
     public void setAttribute(java.util.HashMap map)throws NumberFormatException {
    	 if (!"".equals(map.get("staffId"))) {
        	 staffId = Long.parseLong(NullProcessUtil.nvlToString(map.get("staffId"),"0"));
    	 }
    	 staffCode = NullProcessUtil.nvlToString(map.get("staffCode"),"");
    	 if (!"".equals(map.get("orgId"))) {
        	 orgId = Long.parseLong(NullProcessUtil.nvlToString(map.get("orgId"),"0")); 
    	 }
    	 staffName = NullProcessUtil.nvlToString(map.get("staffName"),"");
    	 staffDesc = NullProcessUtil.nvlToString(map.get("staffDesc"),"");
    	 statusCd = NullProcessUtil.nvlToString(map.get("statusCd"),"");
    	 if (!"".equals(map.get("parentStaffId"))) {
        	 parentStaffId = Long.parseLong(NullProcessUtil.nvlToString(map.get("parentStaffId"),"0"));
    	 }
    	 
    	 if (!"".equals(map.get("positionId"))) {
        	 positionId = Long.parseLong(NullProcessUtil.nvlToString(map.get("positionId"),"-1")); 
    	 }
     }
	public long getPositionId() {
		return positionId;
	}
	public void setPositionId(long positionId) {
		this.positionId = positionId;
	}
	/**
	 * @return the statusCd
	 */
	public String getStatusCd() {
		return statusCd;
	}
	/**
	 * @param statusCd the statusCd to set
	 */
	public void setStatusCd(String statusCd) {
		this.statusCd = statusCd;
	}
	/**
	 * @return the statusDate
	 */
	public String getStatusDate() {
		return statusDate;
	}
	/**
	 * @param statusDate the statusDate to set
	 */
	public void setStatusDate(String statusDate) {
		this.statusDate = statusDate;
	}
}
