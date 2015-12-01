package com.neusoft.uniflow.web.taglib.pformctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;



public class ContentWrapperTag extends ContentBaseTag {
	private static final long serialVersionUID = 12343478;
	private String width;
    public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}
	protected String getHeader() {
	
    	StringBuffer out = new StringBuffer();

//	out.append("<table width=\"85%\" border=\"1\" cellpadding=\"8\" cellspacing=\"0\" bordercolordark=\"#FFFFFF\" bordercolorlight=\"#cccccc\">\n");
//	out.append("  <tr>\n");
//	out.append("    <td class=\"td3\">\n");
	out.append("<table border=\"0\" cellpadding=\"0\" cellspacing=\"10\" class=\"main_label_outline3\" ");
	if (width != null &&!getWidth().equals("")) {
		out.append("width=\"");
		out.append(getWidth());
		out.append("\"  >\n");
	} else
		out.append(">\n");
	out.append("  <tr>\n");
	out.append("    <td width=\"365\"> \n");
	return out.toString();
}

protected String getTail() {
	StringBuffer out = new StringBuffer();

	out.append("    </td>\n");
	out.append("  </tr>\n");
	out.append("</table>\n");

	return out.toString();
}

}