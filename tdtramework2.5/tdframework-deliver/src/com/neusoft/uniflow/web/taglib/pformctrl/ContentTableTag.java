package com.neusoft.uniflow.web.taglib.pformctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;


public class ContentTableTag extends ContentBaseTag
{private static final long serialVersionUID = 1234578;
	private String width;
    public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}
	protected String getHeader()
	{
		//return("      <table width=\"100%\" border=\"1\" cellpadding=\"3\" cellspacing=\"0\" class=\"v11_b1\" bordercolordark=\"#FFFFFF\" bordercolorlight=\"#cccccc\">");
		StringBuffer out = new StringBuffer();
		out.append("      <table cellspacing=\"0\" class=\"main_label_table\" ");
		if (width != null &&!getWidth().equals("")) {
			out.append("width=\"");
			out.append(getWidth());
			out.append("\"  >\n");
		} else
			out.append(">\n");
		return out.toString();
		
	
	}

	protected String getTail()
	{
		return("      </table>");
	}
}