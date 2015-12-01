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
	private	int	addressId;	//地址编码
	private	String	postalcode;	//邮政编码
	private	String	custAddressDetail;	//详细信息
	private	String	linkMan;	//联系人
	private	String	telephone;	//固定电话
	private	String	mobile;	//移动电话
	private	String	email;	//电子邮件
	private	String	organId;	//组织机构编码

	/**
		空的构造方法
	*/
	public AddressVO(){

	}
	/**
		通过属性值构造一个对象
	*/
	public AddressVO(int addressId, String postalcode, String custAddressDetail, String linkMan, String telephone, String mobile, String email, String organId){

	}
	/**
		通过一个已有对象构造一个对象
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
		空值处理
	*/
	private String nvl(String str) {
		return str==null?"":str;
	}

	/**
		设置地址编码
	*/
	public void setAddressId(int addressId) {
		this.addressId = addressId;
	}
	/**
		获取地址编码
	*/
	public int getAddressId() {
		return (this.addressId);
	}
	/**
		设置邮政编码
	*/
	public void setPostalcode(String postalcode) {
		this.postalcode = postalcode;
	}
	/**
		获取邮政编码
	*/
	public String getPostalcode() {
		return (this.postalcode);
	}
	/**
		设置详细信息
	*/
	public void setCustAddressDetail(String custAddressDetail) {
		this.custAddressDetail = custAddressDetail;
	}
	/**
		获取详细信息
	*/
	public String getCustAddressDetail() {
		return (this.custAddressDetail);
	}
	/**
		设置联系人
	*/
	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}
	/**
		获取联系人
	*/
	public String getLinkMan() {
		return (this.linkMan);
	}
	/**
		设置固定电话
	*/
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	/**
		获取固定电话
	*/
	public String getTelephone() {
		return (this.telephone);
	}
	/**
		设置移动电话
	*/
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	/**
		获取移动电话
	*/
	public String getMobile() {
		return (this.mobile);
	}
	/**
		设置电子邮件
	*/
	public void setEmail(String email) {
		this.email = email;
	}
	/**
		获取电子邮件
	*/
	public String getEmail() {
		return (this.email);
	}
	/**
		设置组织机构编码
	*/
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	/**
		获取组织机构编码
	*/
	public String getOrganId() {
		return (this.organId);
	}

	/**
		以SQL的结果集设置数据
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
	* 通过MAP初始化信息
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
		转化成字符串
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