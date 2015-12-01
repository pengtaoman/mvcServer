package com.neusoft.uniflow.web.management.organization.forms;
/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
import java.io.UnsupportedEncodingException;


import com.neusoft.uniflow.web.common.list.OpenListForm;

public class PersonForm extends OpenListForm {
	private static final long serialVersionUID = 1234567356;
	private String operation = "";
	private String page = "";
	private String account = "";
	private String department = "";
	private String email = "";
	private String fax = "";
	private String homeAddress = "";
	private String homeTel = "";
	private String mobilePhone = "";
	private String name = "";
	private String officeAddress = "";
	private String officeTel = "";
	private String pager = "";
	private String password = "";
	private String confpass = "";
	private String postalCode = "";
	private String reserved01 = "";
	private String reserved02 = "";
	private String reserved03 = "";
	private String reserved04 = "";
	private String reserved05 = "";
	private String reserved06 = "";
	private String reserved07 = "";
	private String reserved08 = "";
	private String reserved09 = "";
	private String reserved10 = "";
	private int sex;
	public PersonForm() {
	}
	public String getOperation() {
		return this.operation;
	}
	public void setOperation(String operation) {
		this.operation = operation;
	}
	public String getPage() {
		return this.page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public void setAccount(String account) {
		try {
			this.account = new String(account.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
	
			e.printStackTrace();
		}
		if (this.account.indexOf("?") != -1) {
			this.account = account;
		}
	}
	public String getAccount() {
		return account;
	}
	public void setDepartment(String department) {
		try{
			this.department = new String(department.getBytes("iso-8859-1"));
		}
		catch(Exception e){
			e.printStackTrace();
		}
		if(this.department.indexOf("?")!=-1){
			this.department = department;
		}
	}
	public String getDepartment() {
		return department;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getEmail() {
		return email;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getFax() {
		return fax;
	}
	public void setHomeAddress(String homeAddress) {

		try{
			this.homeAddress = new String(homeAddress.getBytes("iso-8859-1"));
		}
		catch(Exception e){
			e.printStackTrace();
		}
		if(this.homeAddress.indexOf("?")!=-1){
			this.homeAddress = homeAddress;
		}
	}
	public String getHomeAddress() {
		return homeAddress;
	}
	public void setHomeTel(String homeTel) {
		this.homeTel = homeTel;
	}
	public String getHomeTel() {
		return homeTel;
	}
	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}
	public String getMobilePhone() {
		return mobilePhone;
	}
	public void setName(String name) {
		try {
			this.name = new String(name.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.name.indexOf("?") != -1) {
			this.name = name;
		}
	}
	public String getName() {
		return name;
	}
	public void setOfficeAddress(String officeAddress) {
		try {
			this.officeAddress =
				new String(officeAddress.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.officeAddress.indexOf("?") != -1) {
			this.officeAddress = officeAddress;
		}
	}
	public String getOfficeAddress() {
		return officeAddress;
	}
	public void setOfficeTel(String officeTel) {
		this.officeTel = officeTel;
	}
	public String getOfficeTel() {
		return officeTel;
	}
	public void setPager(String pager) {
		this.pager = pager;
	}
	public String getPager() {
		return pager;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPassword() {
		return password;
	}
	public String getConfpass() {
		return confpass;
	}
	public void setConfpass(String confpass) {
		this.confpass = confpass;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setReserved01(String reserved01) {
		try {
			this.reserved01 = new String(reserved01.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.reserved01.indexOf("?") != -1) {
			this.reserved01 = reserved01;
		}
	}
	public String getReserved01() {
		return reserved01;
	}
	public void setReserved02(String reserved02) {
		try {
			this.reserved02 = new String(reserved02.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.reserved02.indexOf("?") != -1) {
			this.reserved02 = reserved02;
		}
	}
	public String getReserved02() {
		return reserved02;
	}
	public void setReserved03(String reserved03) {
		try {
			this.reserved03 = new String(reserved03.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.reserved03.indexOf("?") != -1) {
			this.reserved03 = reserved03;
		}
	}
	public String getReserved03() {
		return reserved03;
	}
	public void setReserved04(String reserved04) {
		try {
			this.reserved04 = new String(reserved04.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.reserved04.indexOf("?") != -1) {
			this.reserved04 = reserved04;
		}
	}
	public String getReserved04() {
		return reserved04;
	}
	public void setReserved05(String reserved05) {
		try {
			this.reserved05 = new String(reserved05.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.reserved05.indexOf("?") != -1) {
			this.reserved05 = reserved05;
		}
	}
	public String getReserved05() {
		return reserved05;
	}
	public void setReserved06(String reserved06) {
		try {
			this.reserved06 = new String(reserved06.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.reserved06.indexOf("?") != -1) {
			this.reserved06 = reserved06;
		}
	}
	public String getReserved06() {
		return reserved06;
	}
	public void setReserved07(String reserved07) {
		try {
			this.reserved07 = new String(reserved07.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.reserved07.indexOf("?") != -1) {
			this.reserved07 = reserved07;
		}
	}
	public String getReserved07() {
		return reserved07;
	}
	public void setReserved08(String reserved08) {
		try {
			this.reserved08 = new String(reserved08.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.reserved08.indexOf("?") != -1) {
			this.reserved08 = reserved08;
		}
	}
	public String getReserved08() {
		return reserved08;
	}
	public void setReserved09(String reserved09) {
		try {
			this.reserved09 = new String(reserved09.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.reserved09.indexOf("?") != -1) {
			this.reserved09 = reserved09;
		}
	}
	public String getReserved09() {
		return reserved09;
	}
	public void setReserved10(String reserved10) {
		try {
			this.reserved10 = new String(reserved10.getBytes("iso-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (this.reserved10.indexOf("?") != -1) {
			this.reserved10 = reserved10;
		}
	}
	public String getReserved10() {
		return reserved10;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public int getSex() {
		return sex;
	}


}