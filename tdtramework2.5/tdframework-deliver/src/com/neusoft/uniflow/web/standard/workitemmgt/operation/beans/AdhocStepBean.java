package com.neusoft.uniflow.web.standard.workitemmgt.operation.beans;

import com.neusoft.uniflow.api.handler.NWADHocStep;


public class AdhocStepBean implements NWADHocStep{
  private String workitemID;
  private String stepID;
  private String postStepID="";
  private int participantType;
  private String participantID;
  private boolean commitWI=false;

  private int number;
  private boolean completed;
  private String participantName;

  public AdhocStepBean()
  {
    this.workitemID = "";
    this.stepID = "";
    this.postStepID = "";
    this.participantType = 0;
    this.participantID = "";
    completed = false;
    participantName = "";
  }
  public AdhocStepBean(NWADHocStep step){
    this.workitemID = step.getWorkitemID();
    this.stepID = step.getStepID();
    this.postStepID = step.getPostStepID();
    this.participantType = step.getParticipantType();
    this.participantID = step.getParticipantID();
    completed = false;
    participantName = "";
  }

  public String getWorkitemID(){
    return workitemID;
  }

  public String getStepID(){
    return stepID;
  }

  public String getPostStepID(){
    return postStepID;
  }

  public int getParticipantType(){
    return participantType;
  }

  public String getParticipantID(){
    return participantID;
  }

  public boolean isCommitPermitted(){
    return commitWI;
  }

  public void setWorkitemID(String workitemID){
    this.workitemID = workitemID;
  }

  public void setPostStepID(String postStepID){
    this.postStepID = postStepID;
  }

  public void setParticipantType(int type){
    this.participantType = type;
  }

  public void setParticipantID(String participantID){
    this.participantID = participantID;
  }

  public void setCommitPermitted(boolean commitSrcWorkitem){
    this.commitWI = commitSrcWorkitem;
  }

  public int getNumber(){
    return this.number;
  }

  public void setNumber(int number){
    this.number = number;
  }
  public boolean isCompleted() {
    return completed;
  }
  public void setCompleted(boolean completed) {
    this.completed = completed;
  }
  public String getParticipantName() {
    return participantName;
  }
  public void setParticipantName(String participantName) {
    this.participantName = participantName;
  }
}