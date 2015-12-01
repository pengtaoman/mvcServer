package com.neusoft.uniflow.web.taglib.pformctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;

public class BodyTag extends ContentBaseTag {
	private static final long serialVersionUID = 1235678;
	private String onload;

	private String width;

	public String getOnload() {
		return onload;
	}

	public void setOnload(String onload) {
		this.onload = onload;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public void release() {
		super.release();
		onload = "";
	}

	protected String getHeader() {
		StringBuffer out = new StringBuffer();

		// out.append("<body bgcolor=\"#ffffff\" text=\"#000000\"
		// leftmargin=\"0\" topmargin=\"0\" marginwidth=\"0\" marginheight=\"0\"
		// class=\"tcbg\"");
		out.append("<body ");

		if (onload != null && !onload.equals("")) {
			out.append(" onload=\"");
			out.append(onload);
			out.append("\"");
		}
		out.append(">\n");
		out.append("<center>");
		out.append("   <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" ");
		if (width != null &&!getWidth().equals("")) {
			out.append("width=\"");
			out.append(getWidth());
			out.append("\"  >\n");
		} else
			out.append(">\n");
		out.append("      <tr>\n");
		out.append("         <td>\n");
		return out.toString();
	}

	protected String getTail() {
		StringBuffer out = new StringBuffer();
		out.append("         </td>\n");
		out.append("      </tr>\n");
		out.append("   </table>\n");
		out.append("</center>");
		out.append("</body>\n");

		return out.toString();
	}
}