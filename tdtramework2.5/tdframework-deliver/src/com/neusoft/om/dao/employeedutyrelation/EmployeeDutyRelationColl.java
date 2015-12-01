package com.neusoft.om.dao.employeedutyrelation;

import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationVO;
import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 职员与职务对应信息
 * Description: 
 * Company: neusoft
 * Date: 2004-12-07
 * @author ren.hui@neusoft.com
 * @version 
 */
public class EmployeeDutyRelationColl extends ObjectCollection {

	public void addEmployeeDutyRelation(EmployeeDutyRelationVO vo){
		addElement(vo);
	}
	/**
	 * 根据行号获取area
	 * @param index
	 */
	public EmployeeDutyRelationVO getEmployeeDutyRelation(int index) {
		return (EmployeeDutyRelationVO)getElement(index);
	}
}
