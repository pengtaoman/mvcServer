package com.neusoft.om.dao.employee;

import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.om.dao.employee.EmployeeVO;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-01
 * @author renh
 * @version 
 */
public class EmployeeColl extends ObjectCollection {
    final static long serialVersionUID = 0;

	public void addEmployee(EmployeeVO vo){
		addElement(vo);
	}
	public EmployeeVO getEmployee(int index) {
		return (EmployeeVO)getElement(index);
	}
}
