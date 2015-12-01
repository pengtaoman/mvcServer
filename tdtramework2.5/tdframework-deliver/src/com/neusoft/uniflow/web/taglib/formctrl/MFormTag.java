package com.neusoft.uniflow.web.taglib.formctrl;

import javax.servlet.jsp.JspException;

import org.apache.struts.taglib.html.FormTag;


public class MFormTag extends FormTag
{private static final long serialVersionUID = 123487;
	public int doStartTag() throws JspException
	{
		this.printBeforeHead();
		super.doStartTag();
		this.printAfterHead();

		return EVAL_PAGE;
	}

	public int doEndTag() throws JspException
	{
		this.printBeforeTail();
		super.doEndTag();
		this.printAfterTail();

		return EVAL_PAGE;
	}

	private void printBeforeHead()
	{
//		try {
//			pageContext.getOut().write("<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n<tr>\n");
//		}
//		catch (java.io.IOException e) {
//			e.printStackTrace();
//		}
	}

	private void printAfterHead()
	{
//		try {
//			pageContext.getOut().write("\n<td align=\"center\">");
//		}
//		catch (java.io.IOException e) {
//			e.printStackTrace();
//		}
	}

	private void printBeforeTail()
	{
//		try {
//			pageContext.getOut().write("</td>");
//		}
//		catch (java.io.IOException e) {
//			e.printStackTrace();
//		}
	}

	private void printAfterTail()
	{
//		try {
//			pageContext.getOut().write("\t<tr>\n</table>");
//		}
//		catch (java.io.IOException e) {
//			e.printStackTrace();
//		}
	}
}