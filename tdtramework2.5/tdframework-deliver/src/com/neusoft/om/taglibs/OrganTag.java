package com.neusoft.om.taglibs;
import javax.servlet.jsp.tagext.Tag;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganVO;

import java.io.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
	
	public class OrganTag implements Tag
	{
		/** 标签的名称。 */
		private String name;
		/** 标签里的默认值 */
		private String code;
		private OrganColl organColl;
		private PageContext pageContext;
		private Tag parent;
	
		public OrganTag()
		{
		   name = null;
		   code = null;
		   organColl = new OrganColl();
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
		   if (organColl == null) {
			   stb.append("<option><value></value><caption></caption></option>");
		   } else {
			   if (code.intern() == "aaa".intern()) {
				   stb.append("	<option>\n");
				   stb.append("		<value>all</value>\n");
				   stb.append("		<caption>全部</caption>\n");
				   stb.append("		<kind>000</kind>\n");
				   stb.append("	</option>\n");
			   }
			   OrganVO organVO = new OrganVO();
			   for (int i = 0; i < organColl.getRowCount(); i++) {
				   organVO = organColl.getOrgan(i);
				   stb.append("	<option> \n");
				   stb.append("		<value>" + organVO.getOrganId() + "</value> \n");
				   stb.append("		<caption>" + organVO.getOrganName() + "</caption> \n");
				   stb.append("		<kind>"+ organVO.getOrganKind() +"</kind>\n");
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
	
		public OrganColl getOrganColl()
		{
		   return organColl;
		}
	
		/** @param s */
		public void setOrganColl(OrganColl s)
		{
		   if (s != null)
			organColl = s;
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
