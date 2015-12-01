/*
 * Created on 2005-1-20
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.omutil;

import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.role.RoleColl;

/**
 * @author Administrator
 *
 * 设置J2EE WEB请求中执行业务处理传TABLIB及JSP的相关参数。
 * 
 */
public class OMRequestParameter {
	
	/**
	 * 操作员清单
	 */
	public static final String EMPLOYEE_LIST = EmployeeColl.class.getName();
	
	/**
	 * 操作员详细信息
	 */
	public static final String EMPLOYEE_INFO = EmployeeVO.class.getName();
	
	/**
	 *  角色列表
	 */
	public static final String ROLE_LIST = RoleColl.class.getName();
	
	/**
	 * 职务树
	 */
	public static final String DUTY_TREE = "dutyTree";
	
	/**
	 * 功能菜单树
	 */
	public static final String MENU_TREE = "menuTree";
	
}
