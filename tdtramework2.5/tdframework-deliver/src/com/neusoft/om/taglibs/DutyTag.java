package com.neusoft.om.taglibs;
import javax.servlet.jsp.tagext.Tag;

import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.duty.DutyVO;

import java.io.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
	
	public class DutyTag implements Tag
	{
		/** 标签的名称。 */
		private String name;
		/** 标签里的默认值 */
		private String code;
		private DutyColl dutyColl;
		private PageContext pageContext;
		private Tag parent;
	
		public DutyTag()
		{
		   name = null;
		   code = null;
		   dutyColl = new DutyColl();
		}
	
		/** @exception JspException */
		public int doStartTag() throws JspException
		{
		   return 0;
		}
	
		/** @exception JspException */
		public int doEndTag() throws JspException
		{
		   StringBuffer stb = new StringBuffer("");
		   stb.append("<" + name + "> \n");
		   if (dutyColl == null) {
			   stb.append("<option><value></value><caption></caption></option>");
		   } else {
			   if (code.intern() == "aaa".intern()) {
				   stb.append("	<option>\n");
				   stb.append("		<value>all</value>\n");
				   stb.append("		<caption>全部</caption>\n");
				   stb.append("	</option>\n");
			   }
			   DutyVO dutyVO = new DutyVO();
			   for (int i = 0; i < dutyColl.getRowCount(); i++) {
				   dutyVO = dutyColl.getDuty(i);
				   stb.append("	<option> \n");
				   stb.append("		<value>" + dutyVO.getDutyId() + "</value> \n");
				   stb.append("		<caption>" + dutyVO.getDutyName() + "</caption> \n");
				   stb.append("	</option> \n");
			   }
			   stb.append("	<selected>" + code + "</selected> \n");
		   }
			   stb.append("</" + name + "> \n");
		   try {
			   pageContext.getOut().write(stb.toString());
		   } catch (IOException ioexception) {
			   throw new JspException("IO Error: " + ioexception.getMessage());
		   }
		   return 6;
		}
	
		public String getName()
		{
		   return name;
		}
	
		/** @param s */
		public void setName(String s)
		{
		   name = s;
		}
	
		public String getCode()
		{
		   return code;
		}
	
		/** @param s */
		public void setCode(String s)
		{
		   code = s;
		}
	
		public DutyColl getDutyColl()
		{
		   return dutyColl;
		}
	
		/** @param s */
		public void setDutyColl(DutyColl s)
		{
		   if (s != null)
			dutyColl = s;
		}
	
		public Tag getParent()
		{
		   return parent;
		}
	
		/** @param tag */
		public void setParent(Tag tag)
		{
		   parent = tag;
		}
	
		public void release()
		{
		   name = null;
		}
	
		/** @param pagecontext */
		public void setPageContext(PageContext pagecontext)
		{
		   pageContext = pagecontext;
		}

}
