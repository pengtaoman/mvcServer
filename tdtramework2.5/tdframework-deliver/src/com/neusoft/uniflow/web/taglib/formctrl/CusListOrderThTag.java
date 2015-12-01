package com.neusoft.uniflow.web.taglib.formctrl;

import java.util.ArrayList;
import java.util.Hashtable;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class CusListOrderThTag extends TagSupport {
	private static final long serialVersionUID = 123483;
	private String collection;

	private String name;

	private String orderby;
	
	private String orderKey;

	private boolean ascending;

	private String value;

	boolean flag = false;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public void release() {
		super.release();
		ascending = true;
		collection = "";
		name = "";
		orderby = "";
		orderKey = "";
	}

	public int doStartTag() throws JspTagException {
		try {
			HttpSession session = pageContext.getSession();
			String liststring = (String) session
					.getAttribute(SessionManager.CUSTOMATION);
			String elementlist = CustomHandler.getElements(collection,
					liststring);
			ServletContext ctx = session.getServletContext();
			Hashtable props = (Hashtable) ctx
					.getAttribute(CustomHandler.CUSTOM_PROPS);

			ArrayList components = new ArrayList();
			if (props.containsKey(collection)) {
				components = (ArrayList) props.get(collection);
			}
			if ((components.contains(name.trim()))
					&& (elementlist.charAt(components.indexOf(name.trim())) == '1')) {
				flag = true;
			}
			if (flag) {
				StringBuffer results = new StringBuffer();
				results.append("<td class=\"main_list_th\" align=\"center\" valign=\"middle\" ");
				results.append("onclick=\"javascript:sort('");
				results.append(orderby);
				results.append("')\"");
				results.append(" nowrap");
				results.append(">\n");
				if (this.value!=null){
					if(!MessageUtil.getString(this.value,session).equals("#-1"))
						results.append(MessageUtil.getString(this.value,session));
					else
						results.append(value);
				}
				if (this.orderKey != null && !orderKey.equals("")&& orderKey.equals(orderby)) {
					if (!this.ascending) {
						results.append("<img src=\"");
						results.append(WorkflowManager.getWorkflowStylePath());
						results.append("/style1/main_img/top.gif\" width=\"7\" height=\"7\">");
					} else {
						results.append("<img src=\"");
						results.append(WorkflowManager.getWorkflowStylePath());
						results.append("/style1/main_img/bottom.gif\" width=\"7\" height=\"7\">");
					}
				}				
				pageContext.getOut().write(results.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (flag)
			return (EVAL_BODY_INCLUDE);
		else
			return (SKIP_BODY);
	}

	public int doEndTag() throws JspTagException {
		StringBuffer results = new StringBuffer();
		try {
			if (flag) {				
				results.append("</td>\n");
				pageContext.getOut().write(results.toString());
			}
		} catch (java.io.IOException e) {
			e.printStackTrace();
		}
		flag = false;
		return EVAL_PAGE;

	}

	public String getCollection() {
		return collection;
	}

	public void setCollection(String collection) {
		this.collection = collection;
	}


	public String getOrderby() {
		return orderby;
	}

	public void setOrderby(String orderby) {
		this.orderby = orderby;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}


	public String getOrderKey() {
		return orderKey;
	}

	public void setOrderKey(String orderKey) {
		this.orderKey = orderKey;
	}

	public boolean isAscending() {
		return ascending;
	}

	public void setAscending(boolean ascending) {
		this.ascending = ascending;
	}
}