package com.neusoft.uniflow.web.taglib.pformctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;

public class ActionTableTag extends ContentBaseTag {
	private static final long serialVersionUID = 2345678;
	private String width;

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	protected String getHeader() {
		StringBuffer out = new StringBuffer();
		out.append("<table  cellspacing=\"0\" class=\"main_button\" ");
		if (width != null && !getWidth().equals("")) {
			out.append("width=\"");
			out.append(getWidth());
			out.append("\"  >\n");
		} else
			out.append(">\n");
		out.append("  <tr>\n");
		out.append("      <td align=\"right\"> <table  cellspacing=\"0\" class=\"button_table\" >\n");
		out.append("           <tr align=\"right\">\n");

		return out.toString();
	}

	protected String getTail() {
		StringBuffer out = new StringBuffer();
		out.append("       </tr>\n");
		out.append("    </table></td>\n");
		out.append("  </tr>\n");
		out.append("</table>\n");

		return out.toString();
	}
}