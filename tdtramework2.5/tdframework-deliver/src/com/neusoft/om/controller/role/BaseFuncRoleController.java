/*
 * Created on 2005-2-21
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.controller.role;

import com.neusoft.om.bo.FuncRoleBO;
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.web.controller.BaseController;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public abstract class BaseFuncRoleController extends BaseController {
	private FuncRoleBO funcRoleBO; 
	/**
	 * @param baseService
	 */
	public BaseFuncRoleController(BaseService baseService) {
		super(baseService);
		init();
	}
	
	protected void init() {
		funcRoleBO = (FuncRoleBO)getBaseService(FuncRoleBO.BEAN);
	}
		
	/**
	 * @return
	 */
	public FuncRoleBO getFuncRoleBO() {
		return funcRoleBO;
	}

	/**
	 * @param roleBO
	 */
	public void setFuncRoleBO(FuncRoleBO roleBO) {
		funcRoleBO = roleBO;
	}

}
