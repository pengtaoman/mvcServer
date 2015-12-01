package com.neusoft.uniflow.web.taglib.main;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.util.WorkflowManager;


public class MonitorActionTag extends TagSupport {
	private static final long serialVersionUID = 12349870;
	private String id;

	private String src;

	private String action;

	private String alt;

	public MonitorActionTag() {

	}

	public int doStartTag() throws JspTagException {
		try {
			StringBuffer rs = new StringBuffer();
			rs.append("<td width=\"25\" align=\"right\" valign=\"middle\" nowrap class=\"main_title_label_td\">\n");
			rs.append("<a id=\"");
			rs.append("a_" + this.id);
			rs.append("\"href=\"");
			rs.append(this.action);
			rs.append("\">\n");
			rs.append("<img id=\"");
			rs.append("img_" + this.id);
			rs.append("\" src='");
			rs.append(WorkflowManager.getWorkflowStylePath()+"/style1/monitor_img/");
			rs.append(this.src);
			rs.append("' width='16' height='16' alt='");
			rs.append(this.getAlt());
			rs.append("' border='0'>");
			rs.append("</a>");
			pageContext.getOut().write(rs.toString());
		} catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	public int doEndTag() throws JspTagException {
		try {
			pageContext.getOut().write("</td>");
		} catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;

	}

	public void release() {
		super.release();

	}

	public String getAlt() {
		return alt;
	}

	public void setAlt(String alt) {
		this.alt = alt;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
	}

}