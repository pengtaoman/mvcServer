package com.neusoft.uniflow.web.common.notify.forms;

import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class NotifyInfoForm extends ActionForm implements Serializable {
	private static final long serialVersionUID = 1345678227;

	private String action = "";
	private String nextact = "";
	private String nextuser = "";
	private boolean ifmail = false;
	private boolean ifmessage = false;
	private boolean ifother = false;
	private String subject = "";
	private String content = "";
	private String wid = "";

	public void reset(ActionMapping actionMapping,
			HttpServletRequest httpServletRequest) {
		action = "";
		nextact = "";
		nextuser = "";
		subject = "";
		content = "";
		ifmail = false;
		ifmessage = false;
		ifother = false;
		wid = "";

	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getNextact() {
		return nextact;
	}

	public void setNextact(String nextact) {
		this.nextact = nextact;
	}

	public String getNextuser() {
		return nextuser;
	}

	public void setNextuser(String nextuser) {
		this.nextuser = nextuser;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}


	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public boolean isIfmail() {
		return ifmail;
	}

	public void setIfmail(boolean ifmail) {
		this.ifmail = ifmail;
	}

	public boolean isIfmessage() {
		return ifmessage;
	}

	public void setIfmessage(boolean ifmessage) {
		this.ifmessage = ifmessage;
	}

	public boolean isIfother() {
		return ifother;
	}

	public void setIfother(boolean ifother) {
		this.ifother = ifother;
	}

	public String getWid() {
		return wid;
	}

	public void setWid(String wid) {
		this.wid = wid;
	}

}