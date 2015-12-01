package com.neusoft.uniflow.web.taglib.formctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;

public class BodyTag extends ContentBaseTag
{private static final long serialVersionUID = 123481;
	private String onload;
	public String getOnload()
	{
		return onload;
	}
	public void setOnload(String onload)
	{
		this.onload = onload;
	}

	public void release()
	{
		super.release();
		onload = "";
	}
	protected String getHeader()
	{
	     StringBuffer out = new StringBuffer();
//		out.append("<body bgcolor=\"#FFFFFF\" text=\"#000000\"  leftmargin=\"0\" topmargin=\"0\" marginwidth=\"0\" marginheight=\"0\"");
         out.append("<body ");
	     if(onload!=null&&!onload.equals(""))
		{
			out.append(" onload=\"");
			out.append(onload);
			out.append("\"");
		}
		out.append(">");
		return out.toString();
	}
	protected String getTail()
	{
		return "</body>";
	}
}