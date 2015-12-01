package com.neusoft.uniflow.web.taglib.main;



public class TabTag extends ContentBaseTag
{private static final long serialVersionUID = 1234980;
	private String width = "";
	public void setWidth(String width)
	{
		this.width = width;
	}
	public String getWidth()
	{
		return this.width;
	}
	protected String getHeader()
	{
		StringBuffer out = new StringBuffer();

//		out.append("<table ");
//		if(!getWidth().equals(""))
//		{
//		    out.append("width=\"");
//		    out.append(getWidth());
//		    out.append("\" ");
//		}
//		out.append("border=\"0\" cellpadding=\"2\" cellspacing=\"0\" height=\"22\" class=\"v11_b1\">\n");
//		out.append("  <tr align=\"center\" valign=\"bottom\">\n");
		
		out.append("<table ");
		if (!this.width.equals(""))
			out.append(" width=\"").append(this.width).append("\" ");
		out.append("border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"main_tab_table_head\">\n");
		out.append("  <tr >\n");

		return out.toString();
	}

	protected String getTail()
	{
		StringBuffer out = new StringBuffer();
		out.append("    <td width=\"100%\" align=\"right\" valign=\"bottom\">&nbsp;</td> \n"); //add
		out.append("  </tr>\n");
		out.append("</table>\n");

		return out.toString();
	}

}