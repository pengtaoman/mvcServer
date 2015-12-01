package com.neusoft.om.taglibs;

import javax.servlet.jsp.tagext.Tag;
import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeVO;

import java.io.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

public class EmployeeList implements Tag
{
	/** 标签的名称。 */
	private String name;
	/** 标签里的默认值 */
	private String code;
	private EmployeeColl employeeColl;
	private PageContext pageContext;
	private Tag parent;
	
	public EmployeeList()
	{
	   name = null;
	   code = null;
	   employeeColl = new EmployeeColl();
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
	   if (employeeColl == null) {
		   stb.append("<option><value></value><caption></caption></option>");
	   } else {
		   if (code.intern() == "aaa".intern()) {
			   stb.append("	<option>\n");
			   stb.append("		<value>all</value>\n");
			   stb.append("		<caption>全部</caption>\n");
			   stb.append("	</option>\n");
		   }
		   EmployeeVO employeeVO = new EmployeeVO();
		   for (int i = 0; i < employeeColl.getRowCount(); i++) {
			   employeeVO = employeeColl.getEmployee(i);
			   stb.append("	<option> \n");
			   stb.append("		<value>" + employeeVO.getEmployeeId() + "</value> \n");
			   stb.append("		<caption>" + employeeVO.getEmployeeName() + "</caption> \n");
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
	
	public EmployeeColl getEmployeeColl()
	{
	   return employeeColl;
	}
	
	/** @param s */
	public void setEmployeeColl(EmployeeColl s)
	{
	   if (s != null)
	   	employeeColl = s;
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

