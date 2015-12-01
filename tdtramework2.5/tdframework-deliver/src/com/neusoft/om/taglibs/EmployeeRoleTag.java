package com.neusoft.om.taglibs;
import javax.servlet.jsp.tagext.Tag;

import com.neusoft.om.bo.DynamicListBO;
import com.neusoft.om.bo.OMDictionaryBO;
import com.neusoft.om.bo.OMDictionaryBOInterface;
import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.context.FrameAppContext;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

import java.io.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
	
	public class EmployeeRoleTag implements Tag
	{
		/** 标签的名称。 */
		private String name;
		/** 标签里的默认值 */
		private String code;
		private RoleColl roleColl;
		private RoleColl allRoleColl;
		private RoleColl finalRoleColl;
		private PageContext pageContext;
		private Tag parent;
		private DutyColl dutyColl;
		private ParamObjectCollection organKindColl;
		
		public EmployeeRoleTag()
		{
		   name = null;
		   code = null;
		   roleColl = new RoleColl();
		   allRoleColl = new RoleColl();
		}
	
		/** @exception JspException */
		public int doStartTag() throws JspException
		{
		   return 0;
		}
	
		/** @exception JspException */
		public int doEndTag() throws JspException
		{	
			//OMDictionaryBO omDictionaryBO = (OMDictionaryBO)FrameAppContext.getBean(pageContext.getServletContext(),OMDictionaryBO.BEAN);
            InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
            AppContext appContext = new AppContextImpl();
            appContext.setApplicationName("om");
            OMDictionaryBO omDictionaryBO = (OMDictionaryBO) factory
                    .getInteractionObject("omDictionaryFacade", appContext);

			try{
				organKindColl = omDictionaryBO.getOrganKindColl();
				
			}catch(Exception e){
				throw new JspException("参数错误!无法得到组织机构类型!");
			}

			//DynamicListBO dynamicListBO = (DynamicListBO)FrameAppContext.getBean(pageContext.getServletContext(),DynamicListBO.BEAN);
            DynamicListBO dynamicListBO = (DynamicListBO) factory
                    .getInteractionObject(DynamicListBO.BEAN, appContext);
			try{
				dutyColl = dynamicListBO.getDutyList(); 
			}catch(Exception e){
				throw new JspException("参数错误!无法得到职务信息!");
			}
			//根据key查VO的方法为啥不好用?
			StringBuffer buf = new StringBuffer("");
			StringBuffer bufNotSelected = new StringBuffer("");
			buf.append( "<" + name + "> \n");
			if(allRoleColl!=null){
				for(int i=0;i<allRoleColl.getRowCount();i++){
					RoleVO roleVO = allRoleColl.getRole(i);
					DutyVO dutyVO  = dutyColl.getDutyVO(roleVO.getDutyId());
					int roleId = roleVO.getRoleId();
					if(roleColl.isExists(roleId)){
						buf.append("	<RoleInfo> \n");
						buf.append("		<orgnaKindName>").append(organKindColl.getParamObjectByKey(String.valueOf(dutyVO.getOrganKind())).getName()).append("</orgnaKindName> \n");
						buf.append("		<dutyName>").append(dutyVO.getDutyName()).append("</dutyName> \n");
						buf.append(roleVO.toString(2));
						buf.append(	"		<isExit>true</isExit> \n");
						buf.append("	</RoleInfo> \n");
					}else{
						bufNotSelected.append("	<RoleInfo> \n");
						bufNotSelected.append("		<orgnaKindName>").append(organKindColl.getParamObjectByKey(String.valueOf(dutyVO.getOrganKind())).getName()).append("</orgnaKindName> \n");
						bufNotSelected.append("		<dutyName>").append(dutyVO.getDutyName()).append("</dutyName> \n");
						bufNotSelected.append(allRoleColl.getRole(i).toString(2));
						bufNotSelected.append("		<isExit>false</isExit> \n");
						
						bufNotSelected.append("	</RoleInfo> \n");
					}
				}
				buf.append(bufNotSelected.toString());
			}
			buf.append("</" + name +">");
		   
		   try {
			   pageContext.getOut().write(buf.toString());
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
		
		/** @param s */
		public void setAllRoleColl(RoleColl s)
		{
		   if (s != null)
			allRoleColl = s;
		}
		
		public RoleColl getAllRoleColl()
		{
		   return allRoleColl;
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
