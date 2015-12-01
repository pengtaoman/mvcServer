package com.neusoft.om.taglibs;
import javax.servlet.jsp.tagext.Tag;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.om.dao.system.SystemVO;

import java.io.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
	
	public class SystemTag implements Tag
	{
		/** 标签的名称。 */
		private String name;
		/** 标签里的默认值 */
		private String code;
		private SystemColl systemColl;
		private PageContext pageContext;
		private Tag parent;
	
		public SystemTag()
		{
		   name = null;
		   code = null;
		   systemColl = new SystemColl();
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
		   if (systemColl == null) {
			   stb.append("<option><value></value><caption></caption></option>");
		   } else {
			   if (code.intern() == "aaa".intern()) {
				   stb.append("	<option>\n");
				   stb.append("		<value>all</value>\n");
				   stb.append("		<caption>全部</caption>\n");
				   stb.append("	</option>\n");
			   }
			   SystemVO systemVO = new SystemVO();
			   for (int i = 0; i < systemColl.getRowCount(); i++) {
				   systemVO = systemColl.getSystem(i);
				   stb.append("	<option> \n");
				   stb.append("		<value>" + systemVO.getSystemId() + "</value> \n");
				   stb.append("		<caption>" + systemVO.getSystemName() + "</caption> \n");
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
	
		public SystemColl getSystemColl()
		{
		   return systemColl;
		}
	
		/** @param s */
		public void setSystemColl(SystemColl s)
		{
		   if (s != null)
			systemColl = s;
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
