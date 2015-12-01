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

import com.neusoft.om.bo.DutyBO;
import com.neusoft.om.dao.duty.DutyDAO;
import com.neusoft.tdframework.core.BaseService;

import com.neusoft.tdframework.web.controller.BaseController;

/**
 * @author chenzt
 *
 * Ö°Îñ
 * 
 */
public abstract class BaseDutyController extends BaseController{
	
	//private DutyDAO dutyDAO = null;
	private DutyBO dutyBO; 
	
	/**
	 * @param baseService
	 */
	public BaseDutyController(BaseService baseService) {
		super(baseService);
		init();
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.controller.BaseController#init()
	 */
	protected void init() {
		dutyBO = (DutyBO)getBaseService(DutyBO.BEAN);
	}
	
	/**
	 * @return
	 */
	protected DutyBO getDutyBO() {
		return dutyBO;
	}

	/**
	 * @param dutyBO
	 */
	protected void setDutyBO(DutyBO dutyBO) {
		this.dutyBO = dutyBO;
	}

}
