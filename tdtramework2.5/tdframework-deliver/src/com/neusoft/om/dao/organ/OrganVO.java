package com.neusoft.om.dao.organ;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.util.XMLProperties;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2004-12-16
 * @author ren.hui@neusoft.com
 * @version
 */

public class OrganVO extends BaseVO { 
	private	String	organId;	//��֯��������
	private	String	organName;	//��֯��������
	private	int	organStatus;	//1.����2.����ͨ������ʽ3.����δͨ��4.����
	private	int	organKind;	//��֯��������
	private	String	parentOrganId;	//��֯��������
	private	String	areaId;	//��������
	private	int	innerDuty;	//1.��0.��
	private	String	principal;	//������
	private	String	activeDate;	//��Ч����
	private	String	inactiveDate;	//ʧЧ����
	private	String	organDesc;	//����
    private String cityCode; //���б���
    private int order;
    private String dutyParent;
    private long partyId;

	/**
		�յĹ��췽��
	*/
	public OrganVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public OrganVO(String organId, String organName, int organStatus, 
            int organKind, String parentOrganId, String areaId, int innerDuty, 
            String principal, String activeDate, String inactiveDate, 
            String organDesc, String cityCode,String dutyParent){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public OrganVO(OrganVO other){
		if(this != other) {
			this.organId = other.organId;
			this.organName = other.organName;
			this.organStatus = other.organStatus;
			this.organKind = other.organKind;
			this.parentOrganId = other.parentOrganId;
			this.areaId = other.areaId;
			this.innerDuty = other.innerDuty;
			this.principal = other.principal;
			this.activeDate = other.activeDate;
			this.inactiveDate = other.inactiveDate;
			this.organDesc = other.organDesc;
			this.cityCode = other.cityCode;
			this.dutyParent = other.dutyParent;
		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		������֯��������
	*/
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	/**
		��ȡ��֯��������
	*/
	public String getOrganId() {
		return (this.organId);
	}
	/**
		������֯��������
	*/
	public void setOrganName(String organName) {
		this.organName = organName;
	}
	/**
		��ȡ��֯��������
	*/
	public String getOrganName() {
		return XMLProperties.prepareXml(this.organName);
	}
	/**
		����1.����2.����ͨ������ʽ3.����δͨ��4.����
	*/
	public void setOrganStatus(int organStatus) {
		this.organStatus = organStatus;
	}
	/**
		��ȡ1.����2.����ͨ������ʽ3.����δͨ��4.����
	*/
	public int getOrganStatus() {
		return (this.organStatus);
	}
	/**
		������֯��������
	*/
	public void setOrganKind(int organKind) {
		this.organKind = organKind;
	}
	/**
		��ȡ��֯��������
	*/
	public int getOrganKind() {
		return (this.organKind);
	}
	/**
		������֯��������
	*/
	public void setParentOrganId(String parentOrganId) {
		this.parentOrganId = parentOrganId;
	}
	/**
		��ȡ��֯��������
	*/
	public String getParentOrganId() {
		return (this.parentOrganId);
	}
	/**
		������������
	*/
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
	/**
		��ȡ��������
	*/
	public String getAreaId() {
		return (this.areaId);
	}
	/**
		����1.��0.��
	*/
	public void setInnerDuty(int innerDuty) {
		this.innerDuty = innerDuty;
	}
	/**
		��ȡ1.��0.��
	*/
	public int getInnerDuty() {
		return (this.innerDuty);
	}
	/**
		���ø�����
	*/
	public void setPrincipal(String principal) {
		this.principal = principal;
	}
	/**
		��ȡ������
	*/
	public String getPrincipal() {
		return (this.principal);
	}
	/**
		������Ч����
	*/
	public void setActiveDate(String activeDate) {
		this.activeDate = activeDate;
	}
	/**
		��ȡ��Ч����
	*/
	public String getActiveDate() {
		return (this.activeDate);
	}
	/**
		����ʧЧ����
	*/
	public void setInactiveDate(String inactiveDate) {
		this.inactiveDate = inactiveDate;
	}
	/**
		��ȡʧЧ����
	*/
	public String getInactiveDate() {
		return (this.inactiveDate);
	}
	/**
		��������
	*/
	public void setOrganDesc(String organDesc) {
		this.organDesc = organDesc;
	}
	/**
		��ȡ����
	*/
	public String getOrganDesc() {
		return XMLProperties.prepareXml(this.organDesc);
	}

	public String getCityCode()
    {
        return cityCode;
    }
    public void setCityCode(String cityCode)
    {
        this.cityCode = cityCode;
    }
    
    /**
	 * @return the order
	 */
	public int getOrder() {
		return order;
	}
	/**
	 * @param order the order to set
	 */
	public void setOrder(int order) {
		this.order = order;
	}
	
	public String getDutyParent() {
		return dutyParent;
	}
	public void setDutyParent(String dutyParent) {
		this.dutyParent = dutyParent;
	}
	
	public long getPartyId() {
		return partyId;
	}
	public void setPartyId(long partyId) {
		this.partyId = partyId;
	}
	/**
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_organ_id".intern())
				organId = resultSet.getString(i);
			else if(columnName.intern()=="f_organ_name".intern())
				organName = resultSet.getString(i);
			else if(columnName.intern()=="f_organ_status".intern())
				organStatus = resultSet.getInt(i);
			else if(columnName.intern()=="f_organ_kind".intern())
				organKind = resultSet.getInt(i);
			else if(columnName.intern()=="f_parent_organ_id".intern())
				parentOrganId = resultSet.getString(i);
			else if(columnName.intern()=="f_area_id".intern())
				areaId = resultSet.getString(i);
			else if(columnName.intern()=="f_inner_duty".intern())
				innerDuty = resultSet.getInt(i);
			else if(columnName.intern()=="f_principal".intern())
				principal = resultSet.getString(i);
			else if(columnName.intern()=="f_active_date".intern())
				activeDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
			else if(columnName.intern()=="f_inactive_date".intern())
				inactiveDate = NullProcessUtil.nvlToString(DateUtil.stringDateTime((java.util.Date)resultSet.getObject(i),"yyyy-MM-dd"),"");
			else if(columnName.intern()=="f_organ_desc".intern())
				organDesc = resultSet.getString(i);
            else if(columnName.intern()=="f_city_code".intern())
                cityCode = resultSet.getString(i);  
            else if(columnName.intern()=="f_order".intern())
            	order = resultSet.getInt(i);
            else if(columnName.intern()=="f_duty_parent".intern())
            	dutyParent = resultSet.getString(i);
            else if(columnName.intern()=="f_party_id".intern())
            	partyId = resultSet.getLong(i);
		}

	}
	/**
	 * �������ַ���ת��������
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

//	private float parseFloatFromString(Object obj){
//		String str = NullProcessUtil.nvlToString(obj, "");
//		if("".equals(str)){
//			return 0;
//		}
//		return Float.parseFloat(str);		
//	}
	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		organId = NullProcessUtil.nvlToString(
			map.get("OrganId"),"");
		organName = NullProcessUtil.nvlToString(
			(String)map.get("OrganName"),"");
//		organStatus = Integer.parseInt(NullProcessUtil.nvlToString(
//			map.get("OrganStatus"), "2"));
		organKind = parseIntFromString(
			map.get("OrganKind"));
		parentOrganId = NullProcessUtil.nvlToString(
			map.get("ParentOrganId"),"");
		areaId = NullProcessUtil.nvlToString(
			map.get("AreaId"),"");
		innerDuty = parseIntFromString(
			map.get("InnerDuty"));
		principal = NullProcessUtil.nvlToString(
			map.get("Principal"),"");
//		activeDate = NullProcessUtil.nvlToString(
//			map.get("ActiveDate"),"");
//		inactiveDate = NullProcessUtil.nvlToString(
//			map.get("InactiveDate"),"");
		organDesc = NullProcessUtil.nvlToString(
			map.get("OrganDesc"),"");
        cityCode = NullProcessUtil.nvlToString(
            map.get("cityCode"),"");
        order = parseIntFromString(map.get("order"));
        dutyParent = NullProcessUtil.nvlToString(
                map.get("dutyParent"),"");
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<OrganId>").append(nvl(organId)).append("</OrganId>\n");
		ret.append(str_tab).append("<OrganName>").append(XMLProperties.prepareXml(nvl(organName))).append("</OrganName>\n");
		ret.append(str_tab).append("<OrganStatus>").append(organStatus).append("</OrganStatus>\n");
		ret.append(str_tab).append("<OrganKind>").append(organKind).append("</OrganKind>\n");
		ret.append(str_tab).append("<ParentOrganId>").append(nvl(parentOrganId)).append("</ParentOrganId>\n");
		ret.append(str_tab).append("<AreaId>").append(nvl(areaId)).append("</AreaId>\n");
		ret.append(str_tab).append("<InnerDuty>").append(innerDuty).append("</InnerDuty>\n");
		ret.append(str_tab).append("<Principal>").append(nvl(principal)).append("</Principal>\n");
		ret.append(str_tab).append("<ActiveDate>").append(nvl(activeDate)).append("</ActiveDate>\n");
		ret.append(str_tab).append("<InactiveDate>").append(nvl(inactiveDate)).append("</InactiveDate>\n");
		ret.append(str_tab).append("<OrganDesc>").append(XMLProperties.prepareXml(nvl(organDesc))).append("</OrganDesc>\n");
        ret.append(str_tab).append("<CityCode>").append(nvl(cityCode)).append("</CityCode>\n");
        ret.append(str_tab).append("<DutyParent>").append(dutyParent).append("</DutyParent>\n");
        ret.append(str_tab).append("<Order>").append(order).append("</Order>\n");
        return ret.toString();
	}

}