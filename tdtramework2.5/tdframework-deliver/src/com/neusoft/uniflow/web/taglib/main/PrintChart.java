/*
 * Created on 2004-11-23
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.taglib.main;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;


public class PrintChart extends TagSupport {
	private static final long serialVersionUID = 123496;
	String src = "";
	String usemap = "";
	String width = "";
	String height = "";
		
	public String getSrc(){
		return this.src;
	}
	public void setSrc(String src){
		this.src = src;
	}
	public String getUsemap(){
		return this.usemap;
	}
	public void setUsemap(String usemap){
		this.usemap = usemap;
	}
	public int doStartTag() throws JspTagException{
		if ( (src == null) || (src.trim().length() < 1))
			src = "#";
			StringBuffer results = new StringBuffer();
			results.append("<img src=\"");
			results.append(src);
			results.append("\" width=\"");
			results.append(this.width);
			results.append("\" height=\"");
			results.append(this.height);
			results.append("\" border=\"0\"");
			results.append("usemap=\"#");
			results.append(usemap);
			results.append("\"");				
			try {
				pageContext.getOut().write(results.toString());
			}
			catch (java.io.IOException e) {
				e.printStackTrace();
			}
			return EVAL_PAGE;
	}
	public int doEndTag() throws JspTagException
	{
		StringBuffer results = new StringBuffer();
		results.append("\">");

		try {
			pageContext.getOut().write(results.toString());
		}
		catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;

	}

	public void release()
	{
		super.release();
		src = null;
		usemap = null;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}

}
