package com.neusoft.om.dao.employee;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-01
 * @author renh
 * @version 
 */
public class AdjEmployeeColl extends ObjectCollection {
    final static long serialVersionUID = 0;

	public void addAdjEmployee(AdjEmployeeVO vo){
		addElement(vo);
	}
	public AdjEmployeeVO getAdjEmployee(int index) {
		return (AdjEmployeeVO)getElement(index);
	}
}
