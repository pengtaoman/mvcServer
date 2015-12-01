package com.neusoft.uniflow.web.common.workdayorgtree.forms;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class WorkDayOrgTreeForm extends ActionForm {
	private String expandNodeId="";//展开节点的id
	private String selectNodeId="";//选中的节点id
	private String selectNodeName="";//
	private String operation="";
	private Vector workdayCategoryList;
	public String getExpandNodeId() {
		return expandNodeId;
	}

	public void setExpandNodeId(String expandNodeId) {
		this.expandNodeId = expandNodeId;
	}

	public String getSelectNodeId() {
		return selectNodeId;
	}

	public void setSelectNodeId(String selectNodeId) {
		this.selectNodeId = selectNodeId;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getSelectNodeName() {
		return selectNodeName;
	}

	public void setSelectNodeName(String selectNodeName) {
		this.selectNodeName = selectNodeName;
	}
	
	public Vector getWorkdayCategoryList() {
		return workdayCategoryList;
	}

	public void setWorkdayCategoryList(Vector workdayCategoryList) {
		this.workdayCategoryList = workdayCategoryList;
	}

	public void reset(ActionMapping mapping, HttpServletRequest request){
	    selectNodeId = "";
	    selectNodeName = "";
	    expandNodeId = "";
	  }
}