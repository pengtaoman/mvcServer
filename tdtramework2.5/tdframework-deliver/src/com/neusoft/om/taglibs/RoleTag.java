package com.neusoft.om.taglibs;
import javax.servlet.jsp.tagext.Tag;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleVO;

import java.io.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
	
	public class RoleTag implements Tag
	{
		/** 标签的名称。 */
		private String name;
		/** 标签里的默认值 */
		private String code;
		private RoleColl roleColl;
		private PageContext pageContext;
		private Tag parent;
	
		public RoleTag()
		{
		   name = null;
		   code = null;
		   roleColl = new RoleColl();
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
		   if (roleColl == null) {
			   stb.append("<option><value></value><caption></caption></option>");
		   } else {
			   if (code.intern() == "aaa".intern()) {
				   stb.append("	<option>\n");
				   stb.append("		<value>all</value>\n");
				   stb.append("		<caption>全部</caption>\n");
				   stb.append("	</option>\n");
			   }
			   RoleVO roleVO = new RoleVO();
			   for (int i = 0; i < roleColl.getRowCount(); i++) {
				   roleVO = roleColl.getRole(i);
				   stb.append("	<option> \n");
				   stb.append("		<value>" + roleVO.getRoleId() + "</value> \n");
				   stb.append("		<caption>" + roleVO.getRoleName() + "</caption> \n");
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
	
		public RoleColl getRoleColl()
		{
		   return roleColl;
		}
	
		/** @param s */
		public void setRoleColl(RoleColl s)
		{
		   if (s != null)
			roleColl = s;
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
