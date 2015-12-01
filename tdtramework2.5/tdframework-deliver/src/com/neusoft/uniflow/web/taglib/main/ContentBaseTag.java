package com.neusoft.uniflow.web.taglib.main;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;



public abstract class ContentBaseTag extends TagSupport
{
	public int doStartTag() throws JspTagException
	{
		try {
			pageContext.getOut().write(getHeader());
		}
		catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	public int doEndTag() throws JspTagException
	{
		try {
			pageContext.getOut().write(getTail());
		}
		catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
	public void release()
	{
		super.release();
	}

	protected abstract String getHeader();

	protected abstract String getTail();

}