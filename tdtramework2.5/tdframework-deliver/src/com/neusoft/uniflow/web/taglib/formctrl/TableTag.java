package com.neusoft.uniflow.web.taglib.formctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;

public class TableTag extends ContentBaseTag
{private static final long serialVersionUID = 123491;
	private String style = null;
	public void release()
	{
		super.release();
	}
	protected String getHeader()
	{
		StringBuffer out = new StringBuffer();
		out.append("<table  cellspacing=\"0\" class=\"");
		out.append(style);
		out.append("\">\n");
		return out.toString();
	}
	protected String getTail()
	{
		StringBuffer out = new StringBuffer();
		out.append("</table>");

		return out.toString();
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
}