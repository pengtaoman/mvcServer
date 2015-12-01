package com.neusoft.tdframework.admin.login;

import java.util.Date;

public interface LoginUserDAO {

	public abstract void delUserList(String sessionId,String cityCode);

	public abstract void insertUserList(String sessionId, String psName,
			String logType, String ipInfo, Date inDate, Date outDate,
			String location,String mac,String dnsname);
	//asdfasdfasdf
	public abstract void doUpdateLastLoginTime(String workNo);
	
	public abstract void doInsertLastLoginTime(String workNo);
	
	public abstract boolean haveRecord(String workNo);

}