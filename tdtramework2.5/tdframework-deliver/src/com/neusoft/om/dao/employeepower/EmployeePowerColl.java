package com.neusoft.om.dao.employeepower;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class EmployeePowerColl extends ObjectCollection {
	public void addOmswitch(EmployeePowerVO vo){
			addElement(vo);
		}
	
			/**
			 * 根据行号获取
			 * @param index
			 */
		public EmployeePowerVO getModule(int index) {
			return (EmployeePowerVO)getElement(index);
		}

}
