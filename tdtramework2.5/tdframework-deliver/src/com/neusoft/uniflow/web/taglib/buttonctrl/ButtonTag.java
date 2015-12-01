package com.neusoft.uniflow.web.taglib.buttonctrl;

/**
 * @author tianj
 * @version 1.0
 */

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.util.MessageUtil;

public class ButtonTag extends TagSupport {
	private static final long serialVersionUID = 123475;
	private String id = null;

	private String action = null;

	private String width = null;

	private String name = null;

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

	public ButtonTag() {
	}

	public int doStartTag() throws JspTagException {
		if ((action == null) || (action.trim().length() < 1))
			action = "#";
		HttpSession session = pageContext.getSession();
		StringBuffer results = new StringBuffer();
		results.append("<td class=\"button_td\" >\n");
		results.append("<input type=\"button\" name=\"");
		results.append(id);
		results.append("\" value=\"");
		if (this.name!=null){
			if(!MessageUtil.getString(this.name,session).equals("#-1"))
				results.append(MessageUtil.getString(this.name,session));
			else
				results.append(name);
		}	
		try {
			pageContext.getOut().write(results.toString());
		} catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	public int doEndTag() throws JspTagException {
		StringBuffer results = new StringBuffer();
		if (width != null) {
			results.append("\" class=\"button_normal\" style=\"width:");
			results.append(this.width);
			results.append("px;");
		} else {
			results.append("\" class=\"button_normal");
		}
		if(!action.equals("#")){
			results.append("\" onclick=\"");
			results.append(action);
		}
		results.append("\">");
//			results.append("\" class=\"button_normal\" ");
//			results.append("onclick=\"");
//			results.append(action);
//			results.append("\">");
		
		results.append("</td>");
		try {
			pageContext.getOut().write(results.toString());
		} catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;

	}

	public void release() {
		super.release();
		id = null;
		action = null;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}
}