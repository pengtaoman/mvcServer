/*
 * Created on 2005-1-21
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
 * @deprecated
 * @author chenzt
 *
 * �����Ŀ����࣬�����������Ȼ�����BO��ȡ������Ϣ.
 * 
 * ÿ��Controller���Ը��ݲ�����ʽ(optrType)�Ĳ�ͬʵ�ֶ������ݲ���.
 * 
 * �磺EmployeeListQuery, ���Ը��ݲ�ͬ��ѯ��ʽ��ѯ����EmployeeColl
 * <br>
 * �̳��������Ҫ���岻ͬ�Ĳ������ͱ�ʶ operType��ֵ
 * 
 */
public abstract class BaseController {
	BaseService baseService = null;
	
	/**
	 * ���췽��
	 * @param operType
	 */
	public BaseController(BaseService baseService) {
		this.baseService = baseService;
	}
	
	/**
	 * ��ȡBO����Ӧ���ڳ�ʼ���������
	 * @param beanName
	 * @return
	 */
	protected Object getBaseService(String beanName) {
		return baseService.getServiceFacade(beanName);
	}
	
	/**
	 * �����Զ�ִ������У�飬���У��ʧ�ܣ����쳣
	 * @param request
	 * @throws UnValidateException
	 */
	public abstract void dataValidate(HttpServletRequest request,ControllerData controllerData) throws UnValidateException;
	
	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @param controllerData
	 * @return ControllerData ���ƴ���ĺ�Ľ����Ϣ
	 * @throws ActionException
	 */
	public abstract void serviceProcess(ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response,
		ControllerData controllerData) throws ActionException,ServiceException;

	/**
	 * @return
	 */
	public BaseService getBaseService() {
		return baseService;
	}

}
