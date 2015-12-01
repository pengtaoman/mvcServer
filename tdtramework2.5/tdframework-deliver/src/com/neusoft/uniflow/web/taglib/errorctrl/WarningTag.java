package com.neusoft.uniflow.web.taglib.errorctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;



public class WarningTag extends ContentBaseTag
{private static final long serialVersionUID = 1234710;
	//<span class="v11_r1">Ad-hoc </span>
	protected String getHeader()
	{
		//return("    <span id=\"warning_info\" class=\"v11_r1\">&nbsp;\n");
		return("<span id=\"warning_info\" class=\"warning_red\">&nbsp;\n");
	}
	protected String getTail()
	{
		return("</span>\n");
	}
}