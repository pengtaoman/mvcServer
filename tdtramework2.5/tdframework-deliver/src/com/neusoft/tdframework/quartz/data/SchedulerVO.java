package com.neusoft.tdframework.quartz.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SchedulerVO {
	
	

	private String schName = "";
	
	private int tNumber;
	
	private String beginTime = "";
	
	private String scheSummary = "";
	
	private String httpInfo = "";
	
	private List<JobVO> jobVoLst = new ArrayList<JobVO>();
	
	private boolean isScheStarted;
	
	public boolean isScheStarted() {
		return isScheStarted;
	}

	public void setScheStarted(boolean isScheStarted) {
		this.isScheStarted = isScheStarted;
	}

	public String getSchName() {
		return schName;
	}

	public void setSchName(String schName) {
		this.schName = schName;
	}

	public int gettNumber() {
		return tNumber;
	}

	public void settNumber(int tNumber) {
		this.tNumber = tNumber;
	}

	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getScheSummary() {
		return scheSummary;
	}

	public void setScheSummary(String scheSummary) {
		this.scheSummary = scheSummary;
	}

	public String getHttpInfo() {
		return httpInfo;
	}

	public void setHttpInfo(String httpInfo) {
		this.httpInfo = httpInfo;
	}

	public List<JobVO> getJobVoLst() {
		return jobVoLst;
	}

	public void addJob(JobVO jobVO) {
		jobVoLst.add(jobVO);
	}

	
	

}
