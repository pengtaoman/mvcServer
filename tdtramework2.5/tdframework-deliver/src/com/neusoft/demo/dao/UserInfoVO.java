package com.neusoft.demo.dao;

public class UserInfoVO {
	
	
	private Integer userId=null;
	private String userName=null;
	private String password=null;
	private String userRole=null;
	private String regdate=null;
	private String email=null;
	private String gender=null;
	private String memo=null;
	private int age=0;
	
	public String toString(){
		StringBuffer strb=new StringBuffer();
		strb.append(super.toString()).append(" [\n");
		strb.append("userId").append("=").append(userId).append("\n");
		strb.append("userName").append("=").append(userName).append("\n");
		strb.append("password").append("=").append(password).append("\n");
		strb.append("userRole").append("=").append(userRole).append("\n");
		strb.append("regdate").append("=").append(regdate).append("\n");
		strb.append("email").append("=").append(email).append("\n");
		strb.append("gender").append("=").append(gender).append("\n");
		strb.append("memo").append("=").append(memo).append("\n");
		strb.append("age").append("=").append(age).append("\n");
		strb.append("]");
		return strb.toString();
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRegdate() {
		return regdate;
	}
	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}


    
}
