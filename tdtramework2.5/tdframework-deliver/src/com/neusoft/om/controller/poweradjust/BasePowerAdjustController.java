/*
 * Created on 2005-4-1
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.controller.poweradjust;

import com.neusoft.om.bo.DynamicListBO;
import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.tdframework.core.BaseService;
import com.neusoft.tdframework.web.controller.BaseController;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public abstract class BasePowerAdjustController extends BaseController {
	private EmployeeManagementBO employeeManagementBO;
	private DynamicListBO dynamicListBO; 
		/**
		 * @param baseService
		 */
		public BasePowerAdjustController(BaseService baseService) {
			super(baseService);
			init();
		}
	
		protected void init() {
			employeeManagementBO = (EmployeeManagementBO)getBaseService(EmployeeManagementBO.BEAN);
			dynamicListBO = (DynamicListBO)getBaseService(DynamicListBO.BEAN);
		}
		
		/**
		 * 
		 * @return
		 */
		public EmployeeManagementBO getEmployeeManagementBO() {
			return employeeManagementBO;
		}

		/**
		 * 
		 * @param employeeManagementBO
		 */
		public void setEmployeeManagementBO(EmployeeManagementBO employeeManagementBO) {
			employeeManagementBO = this.employeeManagementBO;
		}

	/**
	 * @return
	 */
	public DynamicListBO getDynamicListBO() {
		return dynamicListBO;
	}

	/**
	 * @param listBO
	 */
	public void setDynamicListBO(DynamicListBO listBO) {
		dynamicListBO = listBO;
	}

}
