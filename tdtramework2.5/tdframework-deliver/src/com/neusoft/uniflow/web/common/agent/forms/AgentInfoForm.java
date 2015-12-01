package com.neusoft.uniflow.web.common.agent.forms;


import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class AgentInfoForm extends ActionForm {
	
	private static final long serialVersionUID = 123456790;
    private String assignee = "无";//工作代理人
    private String assigner = "无";//工作指派人
    private String startDate = "无";
    private String endDate = "无";
    

    public void reset(ActionMapping mapping, HttpServletRequest request){
    	assignee = "无";
    	assigner = "无";
        startDate = "无";
        endDate = "无";
    }
	

	/**
	 * @return Returns the assignee.
	 */
	public String getAssignee() {
		return assignee;
	}
	/**
	 * @param assignee The assignee to set.
	 */
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	/**
	 * @return Returns the assigner.
	 */
	public String getAssigner() {
		return assigner;
	}
	/**
	 * @param assigner The assigner to set.
	 */
	public void setAssigner(String assigner) {
		this.assigner = assigner;
	}
	/**
	 * @return Returns the endDate.
	 */
	public String getEndDate() {
		return endDate;
	}
	/**
	 * @param endDate The endDate to set.
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	/**
	 * @return Returns the startDate.
	 */
	public String getStartDate() {
		return startDate;
	}
	/**
	 * @param startDate The startDate to set.
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
}