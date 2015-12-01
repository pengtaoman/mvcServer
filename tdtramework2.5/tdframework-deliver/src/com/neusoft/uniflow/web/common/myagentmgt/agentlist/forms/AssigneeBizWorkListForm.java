package com.neusoft.uniflow.web.common.myagentmgt.agentlist.forms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.list.OpenListForm;


public class AssigneeBizWorkListForm extends OpenListForm {
	private static final long serialVersionUID = 1234567837;

	private String categoryview;
	private String cond;
	private String oper;
	private String condvalue;
	private String[] querys;
	private String filter="";
	private String conOper;
	private String state;

	private String agentid;

	public void reset(ActionMapping mapping, HttpServletRequest request)
	{
	  super.reset(mapping,request);

	  this.categoryview="";
	  this.cond="";
	  this.oper="";
	  this.condvalue="";
	  this.querys=new String[0];
	  this.filter="";
	  this.conOper="";
	
	}

	public String getCategoryview() {
		return categoryview;
	}
	public void setCategoryview(String categoryview) {
		this.categoryview = categoryview;
	}
	public String getCond() {
		return cond;
	}
	public void setCond(String cond) {
		this.cond = cond;
	}
	public String getCondvalue() {
		return condvalue;
	}
	public void setCondvalue(String condvalue) {
		this.condvalue = condvalue;
	}
	public String getFilter() {
		return filter;
	}
	public void setFilter(String filter) {
		this.filter = filter;
	}
	public String getOper() {
		return oper;
	}
	public void setOper(String oper) {
		this.oper = oper;
	}
	public String[] getQuerys() {
		return querys;
	}
	public void setQuerys(String[] querys) {
		this.querys = querys;
	}
	public String getConOper() {
		return conOper;
	}
	public void setConOper(String conOper) {
		this.conOper = conOper;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}

	public String getAgentid() {
		return agentid;
	}
	public void setAgentid(String agentid) {
		this.agentid = agentid;
	}


}
