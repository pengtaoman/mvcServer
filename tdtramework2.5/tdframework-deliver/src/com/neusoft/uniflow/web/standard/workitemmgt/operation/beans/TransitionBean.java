package com.neusoft.uniflow.web.standard.workitemmgt.operation.beans;

import java.util.Vector;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class TransitionBean {
	private String transitionId;
	private String condition;
	private String transitionName;
	private String actdefId;
	private String actdefName;
	private NWActDef nwactdef;
	private Vector ptList;
	private int type;
	private String participantId;
	private String participantName;
	private boolean conditionValue;
	public TransitionBean(){
		transitionId="";
		condition="";
		transitionName="";
		participantId="";
		participantName="";
		conditionValue=false;
		ptList=new Vector();
	}

	public String getActdefId() {
		return actdefId;
	}

	public void setActdefId(String actdefId) {
		this.actdefId = actdefId;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public boolean getConditionValue() {
		return conditionValue;
	}

	public void setConditionValue(boolean conditionValue) {
		this.conditionValue = conditionValue;
	}

	public String getTransitionId() {
		return transitionId;
	}

	public void setTransitionId(String transitionId) {
		this.transitionId = transitionId;
	}

	public String getTransitionName() {
		return transitionName;
	}

	public void setTransitionName(String transitionName) {
		this.transitionName = transitionName;
	}

	public NWActDef getNwactdef() {
		return nwactdef;
	}

	public void setNwactdef(NWActDef nwactdef) {
		this.nwactdef = nwactdef;
	}

	public String getActdefName() {
		return actdefName;
	}

	public void setActdefName(String actdefName) {
		this.actdefName = actdefName;
	}

	public String getParticipantId() {
		return participantId;
	}

	public void setParticipantId() throws NWException {
		Vector participantList=openParticipantList();
		int size=participantList.size();
		for(int i=0;i<size;i++){
			NWParticipantEntity participantEntity=(NWParticipantEntity)participantList.elementAt(i);
			participantId=participantEntity.getEntityID();
		}
	}

	public String getParticipantName() {
		return participantName;
	}
	public void setParticipantName(String participantName){
		this.participantName=participantName;
	}
	public void setPtList() throws Exception {
		Vector participantList=openParticipantList();
		int size=participantList.size();
		for(int i=0;i<size;i++){
			NWParticipantEntity participantEntity=(NWParticipantEntity)participantList.elementAt(i);
			int type=participantEntity.getEntityType();
			if(type==NWParticipantEntity.PTCPTENTITY_TYPE_PERSON)
				participantName=WorkflowManager.getNWOrg().getPerson(participantEntity.getEntityID()).getName();
			else if(type==NWParticipantEntity.PTCPTENTITY_TYPE_ROLE)
				participantName=WorkflowManager.getNWOrg().getRole(participantEntity.getEntityID()).getName();
			else
				participantName="no detail participant";
			//System.out.print("participantEntityId"+participantEntity.getActionType());
			ParticipantBean participantbean=new ParticipantBean();
			participantbean.setParticipantId(participantEntity.getEntityID());
			participantbean.setParticipantInfomation(getParticipantType(type));
			participantbean.setParticipantName(participantName);
			//System.out.print("tttttt"+participantName);
			participantbean.setType(type);
			ptList.add(participantbean);
		}
	}
	public Vector getPtList(){
		try {
			this.setPtList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ptList;
	}
	private Vector openParticipantList() throws NWException{
		//System.out.print();
		return nwactdef.openParticipantList();
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}
	public String getParticipantType(int type){
		String participantInfo="";
		if (type==NWParticipantEntity.PTCPTENTITY_TYPE_ACTIVITY)
			participantInfo="其他节点参与者";
		else if(type==NWParticipantEntity.PTCPTENTITY_TYPE_INSTCREATOR)
			participantInfo="流程创建者";
		else if(type==NWParticipantEntity.PTCPTENTITY_TYPE_INSTCREATORSUPER)
			participantInfo="流程创建者上级";
		else if(type==NWParticipantEntity.PTCPTENTITY_TYPE_PREVPTCPT)
			participantInfo="前一节点";
		else if(type==NWParticipantEntity.PTCPTENTITY_TYPE_PREVPTCPTSUPER)
			participantInfo="前一节点上级";
		else if(type==NWParticipantEntity.PTCPTENTITY_TYPE_PERSON)
			participantInfo="人员";
		else if(type==NWParticipantEntity.PTCPTENTITY_TYPE_ROLE)
			participantInfo="角色";
		else
			participantInfo="error";
		return participantInfo;
			
	}
}
