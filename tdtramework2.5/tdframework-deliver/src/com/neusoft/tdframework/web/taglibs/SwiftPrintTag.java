/*
 * Created on 2006-11-11
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.web.taglibs;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SwiftPrintTag extends TagSupport {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	public SwiftPrintTag() {
		super();
	}

	public int doEndTag() throws JspException {

		try {
			pageContext.getOut().write(getString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return super.doEndTag();
	}

	public int doStartTag() throws JspException {

		return super.doStartTag();
	}

	private String getString() {
		String result = "<object id=\"PrintObject\" classid=\"clsid:FBFD55C9-C23C-11D3-B65D-004005E66149\" width=\"0\"	height=\"0\">\n </object>";
		return result;
	}
}
