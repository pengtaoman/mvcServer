package com.neusoft.uniflow.web.taglib.formctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;



public class ButtonTableTag extends ContentBaseTag
{private static final long serialVersionUID = 123482;
	public void release()
	{
		super.release();
	}
	protected String getHeader()
	{
		StringBuffer out = new StringBuffer();
		out.append("<table class=\"button_table\" cellspacing=\"0\">\n");
		out.append("<tr align=\"right\">\n");
		return out.toString();
	}
	protected String getTail()
	{
		StringBuffer out = new StringBuffer();
		out.append("  </tr>\n");
		out.append("</table>");

		return out.toString();
	}
}