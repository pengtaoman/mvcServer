package com.neusoft.uniflow.web.taglib.formctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;


public class ListThTag extends ContentBaseTag
{private static final long serialVersionUID = 123485;
	public void release()
	{
		super.release();
	}
	protected String getHeader()
	{
		//return "<tr class=\"main_list_th\" valign=\"middle\" nowrap>";
		return "<tr>";
	}

	protected String getTail()
	{
		return "</tr>";
	}

}