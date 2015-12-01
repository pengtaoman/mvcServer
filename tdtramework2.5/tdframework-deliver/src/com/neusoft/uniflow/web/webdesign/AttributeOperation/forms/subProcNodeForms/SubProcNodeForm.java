package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.subProcNodeForms;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.ActivityNodeForm;
import com.neusoft.workflow.model.CoupleType;
import com.neusoft.workflow.model.InvokeModeType;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.SubProc;

public class SubProcNodeForm extends ActivityNodeForm{
	private static final long serialVersionUID = 1111110;
	
	private String invokeType = "1";
	private String coupleType = "";
	private String exAlertActionName = "";
	private String exActionName = "";
	private String procName="";
	private String subproc="";
	private String parentVariable="";
	private String supprocVariable="";
	private String mapType="";
	private String versionName="";
	private String subprocName="";
	public String getSubprocName() {
		return subprocName;
	}

	public void setSubprocName(String subprocName) {
		this.subprocName = subprocName;
	}

	public String getVersionName() {
		return versionName;
	}

	public void setVersionName(String versionName) {
		this.versionName = versionName;
	}

	public String getParentVariable() {
		return parentVariable;
	}

	public void setParentVariable(String parentVariable) {
		this.parentVariable = parentVariable;
	}

	public String getSupprocVariable() {
		return supprocVariable;
	}

	public void setSupprocVariable(String supprocVariable) {
		this.supprocVariable = supprocVariable;
	}

	public String getMapType() {
		return mapType;
	}

	public void setMapType(String mapType) {
		this.mapType = mapType;
	}

	public String getExAlertActionName() {
		return exAlertActionName;
	}

	public void setExAlertActionName(String exAlertActionName) {
		this.exAlertActionName = exAlertActionName;
	}

	public String getExActionName() {
		return exActionName;
	}

	public void setExActionName(String exActionName) {
		this.exActionName = exActionName;
	}

	public String getInvokeType() {
		return invokeType;
	}

	public void setInvokeType(String invokeType) {
		this.invokeType = invokeType;
	}

	public String getCoupleType() {
		return coupleType;
	}

	public void setCoupleType(String coupleType) {
		this.coupleType = coupleType;
	}

	public String getProcName() {
		return procName;
	}

	public void setProcName(String procName) {
		this.procName = procName;
	}

	public String getSubproc() {
		return subproc;
	}

	public void setSubproc(String subproc) {
		this.subproc = subproc;
	}

	
	
	
}
