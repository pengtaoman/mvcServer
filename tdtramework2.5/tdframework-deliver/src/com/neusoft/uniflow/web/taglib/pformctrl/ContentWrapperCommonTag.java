package com.neusoft.uniflow.web.taglib.pformctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;



public class ContentWrapperCommonTag extends ContentBaseTag {
	private static final long serialVersionUID = 123456238;
	private String width;
	private String styleClass;
    public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	protected String getHeader() {
	StringBuffer out = new StringBuffer();
	if (this.styleClass != null && !this.styleClass.equals("")){
	    out.append("<table border=\"0\" cellpadding=\"0\" cellspacing=\"10\" class=\"");
	    out.append(this.styleClass).append("\" ");
	}else{
		out.append("<table border=\"0\" cellpadding=\"0\" cellspacing=\"10\" class=\"main_label_outline\" ");
	}
	
	if (width != null &&!getWidth().equals("")) {
		out.append("width=\"");
		out.append(getWidth());
		out.append("\"  >\n");
	} else{
		out.append(">\n");
	}
	out.append("  <tr>\n");
	out.append("    <td> \n");

	return out.toString();
}

protected String getTail() {
	StringBuffer out = new StringBuffer();

	out.append("    </td>\n");
	out.append("  </tr>\n");
	out.append("</table>\n");

	return out.toString();
}

public String getStyleClass() {
	return styleClass;
}

public void setStyleClass(String styleClass) {
	this.styleClass = styleClass;
}

}