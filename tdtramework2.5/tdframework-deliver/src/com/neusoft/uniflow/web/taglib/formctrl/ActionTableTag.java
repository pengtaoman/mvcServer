package com.neusoft.uniflow.web.taglib.formctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;



public class ActionTableTag extends ContentBaseTag
{private static final long serialVersionUID = 1234711;
	public void release()
	{
		super.release();
	}
	protected String getHeader()
	{
		StringBuffer out = new StringBuffer();

		out.append("<table width=\"95%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"36\">\n");
		out.append("  <tr>\n");
		out.append("    <td>\n");
		out.append("      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"37\" class=\"v11_b1\" width=\"100%\">");

		return out.toString();
	}
	protected String getTail()
	{
		StringBuffer out = new StringBuffer();

		out.append("      </table>\n");
		out.append("    </td>\n");
		out.append("  </tr>\n");
		out.append("</table>");

		return out.toString();
	}
}