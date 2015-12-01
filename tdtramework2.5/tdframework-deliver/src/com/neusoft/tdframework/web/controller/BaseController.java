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
 * 基础的控制类，负责接受请求，然后调用BO获取数据信息.
 * 
 * 每个Controller可以根据操作方式(optrType)的不同实现多种数据操作.
 * 
 * 如：EmployeeListQuery, 可以根据不同查询方式查询返回EmployeeColl
 * <br>
 * 继承类里必须要定义不同的操作类型标识 operType的值
 * 
 */
public abstract class BaseController {
	BaseService baseService = null;
	
	/**
	 * 构造方法
	 * @param operType
	 */
	public BaseController(BaseService baseService) {
		this.baseService = baseService;
	}
	
	/**
	 * 获取BO对象，应用于初始化服务对象
	 * @param beanName
	 * @return
	 */
	protected Object getBaseService(String beanName) {
		return baseService.getServiceFacade(beanName);
	}
	
	/**
	 * 首先自动执行数据校验，如果校验失败，报异常
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
	 * @return ControllerData 控制处理的后的结果信息
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
