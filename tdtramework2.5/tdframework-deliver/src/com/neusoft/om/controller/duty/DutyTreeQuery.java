/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.controller.duty;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.duty.OrganKindDutyColl;
import com.neusoft.om.omutil.OMRequestParameter;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.controller.UnValidateException;

/**
 * @author chenzt
 *
 * 查询职务树
 */
public class DutyTreeQuery extends BaseDutyController{
	
	/**
	 * @param baseService
	 */
	public DutyTreeQuery(BaseService baseService) {
		super(baseService);
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#dataValidate(javax.servlet.http.HttpServletRequest, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	public void dataValidate(HttpServletRequest request, ControllerData controllerData) throws UnValidateException {
		
	}

	/* (non-Javadoc)
	 * 
	 * 调用DAO得到OrganKindDuty对象,以属性 dutyTree 写入 请求
	 * 
	 * @see com.neusoft.tdframework.web.controller.BaseController#serviceProcess(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	public void serviceProcess(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, ControllerData controllerData) throws ActionException, ServiceException {
		
		OrganKindDutyColl organKindDutyColl = getDutyBO().getOrganKindDuty();
		OrganKindDutyColl coll = new OrganKindDutyColl();
		//根据操作员的地市级别过滤
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		int operatorLevel = authvo.getAreaLevel();
		int currentLevel;
		for(int i=0;i<organKindDutyColl.getRowCount();i++){
			currentLevel = organKindDutyColl.getOrganKindDuty(i).getAreaLevel();
			if(currentLevel>=operatorLevel){
				coll.addOrganKindDuty(organKindDutyColl.getOrganKindDuty(i));
			}
		}
		request.setAttribute(OMRequestParameter.DUTY_TREE,coll);
	}

}
