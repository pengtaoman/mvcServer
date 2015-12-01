package com.neusoft.uniflow.web.standard.workitemmgt.operation.beans;

public class ParticipantBean {
	String participantId;
	String participantName;
	int type;
	String participantInfomation;
	public ParticipantBean(){
		participantId="";
		participantName="";
		participantInfomation="";
		type=0;
	}
	public String getParticipantId() {
		return participantId;
	}
	public void setParticipantId(String participantId) {
		this.participantId = participantId;
	}
	public String getParticipantName() {
		return participantName;
	}
	public void setParticipantName(String participantName) {
		this.participantName = participantName;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getParticipantInfomation() {
		return participantInfomation;
	}
	public void setParticipantInfomation(String participantInfo) {
		this.participantInfomation = participantInfo;
	}
	
}
