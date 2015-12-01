package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.transitionForms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.workflow.model.Expression;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.Transition;

public class TransitionForm extends ActionForm{
	private static final long serialVersionUID = 1111110;
	
	private String expression = "";
	
	private String data1 = "";
	private String data2 = "";
	private String str1 = "";
	private String str2 = "";
	private String operator = "";
	
	private String id = null;
	private String name = null;
	private String desc = null;
	private String priority = "0";
	private String transType = "0";
	
	private String xmlStr = null;
	
	public void reset(ActionMapping mapping , HttpServletRequest request){
    	expression = null;
    	id = null;
    	name = null;
    	desc = null;
    	priority = "0";
    	transType = "0";
    }


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}


	public String getExpression() {
		return expression;
	}


	public void setExpression(String expression) {
		this.expression = expression;
	}


	public String getPriority() {
		return priority;
	}


	public void setPriority(String priority) {
		this.priority = priority;
	}


	public String getTransType() {
		return transType;
	}


	public void setTransType(String transType) {
		this.transType = transType;
	}


	public String getXmlStr() {
		return xmlStr;
	}


	public void setXmlStr(String xmlStr) {
		this.xmlStr = xmlStr;
	}

	public String getOperator() {
		return operator;
	}


	public void setOperator(String operator) {
		this.operator = operator;
	}


	public String getData1() {
		return data1;
	}


	public void setData1(String data1) {
		this.data1 = data1;
	}


	public String getData2() {
		return data2;
	}


	public void setData2(String data2) {
		this.data2 = data2;
	}


	public String getStr1() {
		return str1;
	}


	public void setStr1(String str1) {
		this.str1 = str1;
	}


	public String getStr2() {
		return str2;
	}


	public void setStr2(String str2) {
		this.str2 = str2;
	}

}
