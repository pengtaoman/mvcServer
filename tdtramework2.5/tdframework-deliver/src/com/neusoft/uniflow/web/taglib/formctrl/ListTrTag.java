package com.neusoft.uniflow.web.taglib.formctrl;

import com.neusoft.uniflow.web.taglib.main.ContentBaseTag;


public class ListTrTag extends ContentBaseTag
{private static final long serialVersionUID = 123486;
	private String onclick = "";
	private int row = -1;
	public String getOnclick()
	{
		return onclick;
	}
	public void setOnclick(String onclick)
	{
		this.onclick = onclick;
	}

	public void release()
	{
		super.release();
		this.onclick = "";
		this.row = -1;
	}
	protected String getHeader()
	{
		StringBuffer out = new StringBuffer();

		out.append("<tr name=\"tr");
		out.append(getRow());
		out.append("\" id = \"tr");
		out.append(getRow());
		out.append("\" class=\"main_list_td\"");
		out.append(" onclick=\"");
		out.append("javascript:itemSelected(");
		out.append(row);
		out.append(")\" onmouseover=\"");
		out.append("javascript:itemMouseOver(");
		out.append(row);
		out.append(")\" onmouseout=\"");
		out.append("javascript:itemMouseOut(");
		out.append(row);
		out.append(")\"");
		out.append(" >");

		return out.toString();
	}
	protected String getTail()
	{
		StringBuffer out = new StringBuffer();

		out.append("</tr>");

		return out.toString();
	}
	public int getRow()
	{
		return row;
	}
	public void setRow(int row)
	{
		this.row = row;
	}
}