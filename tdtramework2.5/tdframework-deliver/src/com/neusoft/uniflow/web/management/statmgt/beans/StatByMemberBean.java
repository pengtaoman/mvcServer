
package com.neusoft.uniflow.web.management.statmgt.beans;
import com.neusoft.uniflow.api.stat.NWStatbyMember;
import com.neusoft.uniflow.web.util.CommonInfoManager;

public class StatByMemberBean {
    private String memberInfo;
    private long taskNum;
    private long completeTaskNum;
    private long errorTaskNum;
    private long activeTaskNum;
    
    public StatByMemberBean(NWStatbyMember sbm){
    	this.memberInfo=CommonInfoManager.getMemberInfo(sbm.getMemberID());
    	//System.out.println(sbm.getMemberAcount());
    	this.taskNum=sbm.getWorkload();
    	this.completeTaskNum=sbm.getCompletedTask();
    	this.errorTaskNum=sbm.getIncidentTask();
    	this.activeTaskNum=sbm.getActiveTask();
    	
    }
    

	public long getActiveTaskNum() {
		return activeTaskNum;
	}

	public long getCompleteTaskNum() {
		return completeTaskNum;
	}

	public long getErrorTaskNum() {
		return errorTaskNum;
	}

	public String getMemberInfo() {
		return memberInfo;
	}

	public long getTaskNum() {
		return taskNum;
	}

	public void setActiveTaskNum(long activeTaskNum) {
		this.activeTaskNum = activeTaskNum;
	}

	public void setCompleteTaskNum(long completeTaskNum) {
		this.completeTaskNum = completeTaskNum;
	}

	public void setErrorTaskNum(long errorTaskNum) {
		this.errorTaskNum = errorTaskNum;
	}

	public void setMemberInfo(String memberInfo) {
		this.memberInfo = memberInfo;
	}

	public void setTaskNum(long taskNum) {
		this.taskNum = taskNum;
	}
}
