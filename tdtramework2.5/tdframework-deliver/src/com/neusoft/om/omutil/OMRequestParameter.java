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
 * ����J2EE WEB������ִ��ҵ����TABLIB��JSP����ز�����
 * 
 */
public class OMRequestParameter {
	
	/**
	 * ����Ա�嵥
	 */
	public static final String EMPLOYEE_LIST = EmployeeColl.class.getName();
	
	/**
	 * ����Ա��ϸ��Ϣ
	 */
	public static final String EMPLOYEE_INFO = EmployeeVO.class.getName();
	
	/**
	 *  ��ɫ�б�
	 */
	public static final String ROLE_LIST = RoleColl.class.getName();
	
	/**
	 * ְ����
	 */
	public static final String DUTY_TREE = "dutyTree";
	
	/**
	 * ���ܲ˵���
	 */
	public static final String MENU_TREE = "menuTree";
	
}
