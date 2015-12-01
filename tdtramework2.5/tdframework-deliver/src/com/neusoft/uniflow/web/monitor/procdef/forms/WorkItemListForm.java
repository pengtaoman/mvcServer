package com.neusoft.uniflow.web.monitor.procdef.forms;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;

public class WorkItemListForm extends OpenListForm {
	private static final long serialVersionUID = 1234567821;
	private String actDefID;
	private long state;

	public void reset(ActionMapping mapping, HttpServletRequest request) {
		super.reset(mapping, request);
		actDefID = "";
		state = -1;
	}

	public String getActDefID() {
		return actDefID;
	}

	public void setActDefID(String actDefID) {
		this.actDefID = actDefID;
	}

	/**
	 * @return Returns the state.
	 */
	public long getState() {
		return state;
	}

	/**
	 * @param state
	 *            The state to set.
	 */
	public void setState(long state) {
		this.state = state;
	}

}