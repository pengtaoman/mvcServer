/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author chenzt
 *
 * �����Ĳ��Կ�����,�������κ�����,չ�ֲ���߼�������֮ǰ���Բ��øÿ�����
 * ��չ�ֲ����
 */
public class BaseTestController extends BaseController{
	
	/**
	 * @param baseService
	 */
	public BaseTestController(BaseService baseService) {
		super(baseService);
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#init()
	 */
	protected void init() {
		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#dataValidate(javax.servlet.http.HttpServletRequest, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	public void dataValidate(HttpServletRequest request, ControllerData controllerData) throws UnValidateException {
		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#serviceProcess(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, com.neusoft.tdframework.web.controller.ControllerData)
	 */
	public void serviceProcess(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, ControllerData controllerData) throws ActionException, ServiceException {
		request.setAttribute("debug","true");
		controllerData.setAlertMessage("����ִ�гɹ�!");		
	}

}
