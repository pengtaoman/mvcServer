package com.neusoft.uniflow.web.taglib.formctrl;


import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;


import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class NoCusListOrderThTag extends TagSupport {
	private static final long serialVersionUID = 123488;

	private String orderby;

	private String orderKey;

	private boolean ascending;

	private String value;

	public void release() {
		super.release();
		orderKey = "";
		ascending = true;
		orderby = "";
	}

	public int doStartTag() throws JspTagException {
		try {
			HttpSession session = pageContext.getSession();
			StringBuffer results = new StringBuffer();
			results.append("<td class=\"main_list_th\" valign=\"middle\"");
			if (orderby != null && !orderby.equals("")) {
				results.append("onclick=\"javascript:sort('");
				results.append(orderby);
				results.append("')\"");
			}
			results.append(" nowrap");
			results.append(">\n");
			if (this.value != null) {
				if (!MessageUtil.getString(this.value,session).equals("#-1"))
					results.append(MessageUtil.getString(this.value,session));
				else
					results.append(value);
			}
			if (this.orderKey != null && !orderKey.equals("") && orderKey.equals(orderby)) {
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
		} catch (Exception e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	public int doEndTag() throws JspTagException {
		StringBuffer results = new StringBuffer();
		try {
			results.append("</td>\n");
			pageContext.getOut().write(results.toString());
		} catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
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