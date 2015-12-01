package com.neusoft.uniflow.web.taglib.pformctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;


public class ContentTrTag extends ContentBaseTag
{private static final long serialVersionUID = 1234568;
	protected String getHeader()
	{
		StringBuffer out = new StringBuffer();

		//out.append("      <tr class=\"td1\"> \n");
		out.append("      <tr > \n");

		return out.toString();
	}

	protected String getTail()
	{
		StringBuffer out = new StringBuffer();

		out.append("      </tr>\n");

		return out.toString();
	}

}