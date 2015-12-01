package com.neusoft.tdframework.quartz.data;

import java.util.ArrayList;
import java.util.List;

public class JobVO {

	String jobName = "";
	

	String jobGroup = "";

	String jobClass = "";

	String jobDetailDes = "";

	List<TriggerVO> triggerVOLst = new ArrayList<TriggerVO>();

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getJobGroup() {
		return jobGroup;
	}

	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}

	public String getJobClass() {
		return jobClass;
	}

	public void setJobClass(String jobClass) {
		this.jobClass = jobClass;
	}

	public String getJobDetailDes() {
		return jobDetailDes;
	}

	public void setJobDetailDes(String jobDetailDes) {
		this.jobDetailDes = jobDetailDes;
	}

	public List<TriggerVO> getTriggerVO() {
		return triggerVOLst;
	}

	public void addTriggerVO(TriggerVO triggerVO) {
		triggerVOLst.add(triggerVO);
	}


}
