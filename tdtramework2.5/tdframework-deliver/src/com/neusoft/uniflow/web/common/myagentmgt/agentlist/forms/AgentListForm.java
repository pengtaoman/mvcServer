package com.neusoft.uniflow.web.common.myagentmgt.agentlist.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class AgentListForm extends OpenListForm {
	private static final long serialVersionUID = 1234567825;
	private String operation = "";

	
	public void reset(ActionMapping mapping, HttpServletRequest request) {
	}

	/**
	 * @return Returns the operation.
	 */
	public String getOperation() {
		return operation;
	}

	/**
	 * @param operation
	 *            The operation to set.
	 */
	public void setOperation(String operation) {
		this.operation = operation;
	}

	
}