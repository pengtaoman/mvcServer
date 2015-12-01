package com.neusoft.om.dao.address;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
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

public class AddressVO extends BaseVO { 
	private	int	addressId;	//��ַ����
	private	String	postalcode;	//��������
	private	String	custAddressDetail;	//��ϸ��Ϣ
	private	String	linkMan;	//��ϵ��
	private	String	telephone;	//�̶��绰
	private	String	mobile;	//�ƶ��绰
	private	String	email;	//�����ʼ�
	private	String	organId;	//��֯��������

	/**
		�յĹ��췽��
	*/
	public AddressVO(){

	}
	/**
		ͨ������ֵ����һ������
	*/
	public AddressVO(int addressId, String postalcode, String custAddressDetail, String linkMan, String telephone, String mobile, String email, String organId){

	}
	/**
		ͨ��һ�����ж�����һ������
	*/
	public AddressVO(AddressVO other){
		if(this != other) {
			this.addressId = other.addressId;
			this.postalcode = other.postalcode;
			this.custAddressDetail = other.custAddressDetail;
			this.linkMan = other.linkMan;
			this.telephone = other.telephone;
			this.mobile = other.mobile;
			this.email = other.email;
			this.organId = other.organId;

		}
	}
	/** 
		��ֵ����
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		���õ�ַ����
	*/
	public void setAddressId(int addressId) {
		this.addressId = addressId;
	}
	/**
		��ȡ��ַ����
	*/
	public int getAddressId() {
		return (this.addressId);
	}
	/**
		������������
	*/
	public void setPostalcode(String postalcode) {
		this.postalcode = postalcode;
	}
	/**
		��ȡ��������
	*/
	public String getPostalcode() {
		return (this.postalcode);
	}
	/**
		������ϸ��Ϣ
	*/
	public void setCustAddressDetail(String custAddressDetail) {
		this.custAddressDetail = custAddressDetail;
	}
	/**
		��ȡ��ϸ��Ϣ
	*/
	public String getCustAddressDetail() {
		return (this.custAddressDetail);
	}
	/**
		������ϵ��
	*/
	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}
	/**
		��ȡ��ϵ��
	*/
	public String getLinkMan() {
		return (this.linkMan);
	}
	/**
		���ù̶��绰
	*/
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	/**
		��ȡ�̶��绰
	*/
	public String getTelephone() {
		return (this.telephone);
	}
	/**
		�����ƶ��绰
	*/
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	/**
		��ȡ�ƶ��绰
	*/
	public String getMobile() {
		return (this.mobile);
	}
	/**
		���õ����ʼ�
	*/
	public void setEmail(String email) {
		this.email = email;
	}
	/**
		��ȡ�����ʼ�
	*/
	public String getEmail() {
		return (this.email);
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
		��SQL�Ľ������������
	*/
	public void setAttribute(ResultSet resultSet) throws SQLException {
		ResultSetMetaData metaData = resultSet.getMetaData();

		for(int i=1;i<=metaData.getColumnCount();i++) { 

			String columnName = metaData.getColumnName(i).toLowerCase();

			if(columnName.intern()=="f_address_id".intern())
				addressId = resultSet.getInt(i);
			else if(columnName.intern()=="f_postalcode".intern())
				postalcode = resultSet.getString(i);
			else if(columnName.intern()=="f_cust_address_detail".intern())
				custAddressDetail = resultSet.getString(i);
			else if(columnName.intern()=="f_link_man".intern())
				linkMan = resultSet.getString(i);
			else if(columnName.intern()=="f_telephone".intern())
				telephone = resultSet.getString(i);
			else if(columnName.intern()=="f_mobile".intern())
				mobile = resultSet.getString(i);
			else if(columnName.intern()=="f_email".intern())
				email = resultSet.getString(i);
			else if(columnName.intern()=="f_organ_id".intern())
				organId = resultSet.getString(i);
		}

	}

	/**
	* ͨ��MAP��ʼ����Ϣ
	*/
	public void setAttribute(java.util.HashMap map)throws NumberFormatException {
		addressId = Integer.parseInt(NullProcessUtil.nvlToString(
			map.get("addressId"), "-10"));
		postalcode = NullProcessUtil.nvlToString(
			map.get("postalcode"),"");
		custAddressDetail = NullProcessUtil.nvlToString(
			map.get("custAddressDetail"),"");
		linkMan = NullProcessUtil.nvlToString(
			map.get("linkMan"),"");
		telephone = NullProcessUtil.nvlToString(
			map.get("telephone"),"");
		mobile = NullProcessUtil.nvlToString(
			map.get("mobile"),"");
		email = NullProcessUtil.nvlToString(
			map.get("email"),"");
		organId = NullProcessUtil.nvlToString(
			map.get("organId"),"");
	}

	/**
		ת�����ַ���
	*/
	public String toString(int tabs) {
		StringBuffer ret = new StringBuffer();
		String str_tab = StringUtil.tabs(tabs);
		ret.append("<addressId>").append(addressId).append("</addressId>\n");
		ret.append(str_tab).append("<postalcode>").append(nvl(postalcode)).append("</postalcode>\n");
		ret.append(str_tab).append("<custAddressDetail>").append(nvl(custAddressDetail)).append("</custAddressDetail>\n");
		ret.append(str_tab).append("<linkMan>").append(XMLProperties.prepareXml(nvl(linkMan))).append("</linkMan>\n");
		ret.append(str_tab).append("<telephone>").append(nvl(telephone)).append("</telephone>\n");
		ret.append(str_tab).append("<mobile>").append(nvl(mobile)).append("</mobile>\n");
		ret.append(str_tab).append("<email>").append(nvl(email)).append("</email>\n");
		ret.append(str_tab).append("<organId>").append(nvl(organId)).append("</organId>\n");
		return ret.toString();
	}

}