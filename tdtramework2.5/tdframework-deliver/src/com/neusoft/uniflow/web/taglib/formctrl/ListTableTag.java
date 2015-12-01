package com.neusoft.uniflow.web.taglib.formctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;


public class ListTableTag extends ContentBaseTag
{private static final long serialVersionUID = 123484;
	public void release()
	{
		super.release();
	}
	protected String getHeader()
	{
		return "<table width=\"95%\" border=\"1\" cellpadding=\"0\" cellspacing=\"0\"  bordercolordark=\"#FFFFFF\" bordercolorlight=\"#cccccc\" class=\"cellpad\">";
	}

	protected String getTail()
	{
		 return "</table>";
	}

}