package com.neusoft.uniflow.web.taglib.pformctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;



public class TitleTag extends ContentBaseTag
{private static final long serialVersionUID = 12555678;
	private String width;
    public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}
	protected String getHeader()
	{
		StringBuffer out = new StringBuffer();

		//out.append("<table width=\"85%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"T_v12bk\" height=\"50\">\n");
		out.append("<table cellspacing=\"0\" class=\"main_title_table\" ");
		if (width != null &&!getWidth().equals("")) {
			out.append("width=\"");
			out.append(getWidth());
			out.append("\"  >\n");
		} else
			out.append(">\n");
		out.append("  <tr>\n");
		//out.append("    <td class=\"T_v14bk\">");
		out.append("    <td nowrap class=\"text_title\">");
		return out.toString();
	}

	protected String getTail()
	{
		StringBuffer out = new StringBuffer();

		out.append("    </td>\n");
		out.append("    <td align=\"right\" class=\"main_table2_td2\">&nbsp;</td>\n");
		out.append("  </tr>\n");
		out.append("</table>\n");

		return out.toString();
	}
}