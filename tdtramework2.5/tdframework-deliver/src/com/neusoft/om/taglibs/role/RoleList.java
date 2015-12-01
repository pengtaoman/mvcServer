/*
 * Created on 2005-1-21
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.taglibs.role;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.om.OMAppContext;
import com.neusoft.om.OMLogger;
import com.neusoft.om.bo.AreaBO;
import com.neusoft.om.bo.OMDictionaryBO;
import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.om.omutil.OMRequestParameter;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.context.FrameAppContext;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.taglibs.BaseXMLTagLib;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author Administrator
 *
 * 角色列表
 */
public class RoleList extends BaseXMLTagLib {
	
	RoleColl roleColl = null;
	AuthorizeVO vo = null;
	String operatorAreaId = "";
	String operFlag ="0";//不允许修改
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.taglibs.BaseXMLTagLib#init(javax.servlet.http.HttpServletRequest)
	 */
	protected void init(HttpServletRequest request) {
		roleColl = (RoleColl)request.getAttribute(OMRequestParameter.ROLE_LIST);
		vo = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		operatorAreaId = vo.getAreaId();
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.taglibs.BaseXMLTagLib#createTagBody()
	 */
	protected void createTagBody() throws IOException {
		if(isDebug()) {
			test();
			return;
		}

		if(roleColl==null) return;
		
		//AreaBO areaBO = (AreaBO)getObjectBO(AreaBO.BEAN);
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        AreaBO areaBO = (AreaBO) factory
                .getInteractionObject(AreaBO.BEAN, appContext);

		AreaColl areaColl = null;
		try {
			areaColl = areaBO.getAreaAllInfo();
		} catch (ServiceException e) {
			processServiceException(e);
			return;
		}
		
		write("<roleColl>\n");
		for(int i=0;i<roleColl.getRowCount();i++) {
			RoleVO vo = roleColl.getRole(i);
			write("<role>\n");
			writeXMLTag("rowNo",String.valueOf(i));
			writeXMLTag("roleId",String.valueOf(vo.getRoleId()));
			writeXMLTag("roleName",vo.getRoleName());
			writeXMLTag("createAreaId",vo.getCreateAreaId());
			writeXMLTag("createAreaName",areaColl.getArea(vo.getCreateAreaId()).getAreaName());
			if(vo.getCreateAreaId().intern()==operatorAreaId.intern()){
				operFlag="true";
			}else{
				operFlag="false";
			}
			writeXMLTag("ifModify",operFlag);
			write("</role>\n");
		}
		write("</roleColl>\n");
				
	}
	
	/**
	 * 测试方法
	 * @throws IOException
	 */
	private void test() throws IOException {
		write("<roleColl>								\n");
		write("<role>                                   \n");
		write("   <roleId>1</roleId>                    \n");
		write("   <roleName>test_1</roleName>           \n");
		write("   <createAreaId>050</createAreaId>      \n");
		write("   <createAreaName>海口</createAreaName> \n");
		write("</role>                                  \n");
		write("<role>                                   \n");
		write("   <roleId>2</roleId>                    \n");
		write("   <roleName>test_2</roleName>           \n");
		write("   <createAreaId>050</createAreaId>      \n");
		write("   <createAreaName>海口</createAreaName> \n");
		write("</role>                                  \n");
		write("</roleColl>                              \n");
	}
	
	/**
	 * @return
	 */
	public RoleColl getRoleColl() {
		return roleColl;
	}

	/**
	 * @param coll
	 */
	public void setRoleColl(RoleColl coll) {
		roleColl = coll;
	}
	
	public static void main(String args[]) {
		printTagConfig("RoleList",RoleList.class);
	}
	
}
