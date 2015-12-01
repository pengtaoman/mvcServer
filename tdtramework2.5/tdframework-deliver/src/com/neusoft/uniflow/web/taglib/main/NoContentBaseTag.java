package com.neusoft.uniflow.web.taglib.main;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;



public abstract class NoContentBaseTag extends TagSupport
{
	public int doEndTag() throws JspTagException
	{
		try {
			pageContext.getOut().write(getOutput());
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

	protected abstract String getOutput();

}