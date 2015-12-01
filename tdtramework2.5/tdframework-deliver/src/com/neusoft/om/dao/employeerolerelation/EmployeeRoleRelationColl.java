package com.neusoft.om.dao.employeerolerelation;

import com.neusoft.om.dao.employeerolerelation.EmployeeRoleRelationVO;
import com.neusoft.tdframework.common.data.ObjectCollection;


/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-12-09
 * @author renhui.@neusoft.com
 * @version 
 */
public class EmployeeRoleRelationColl extends ObjectCollection {

	public void addEmployeeRoleRelation(EmployeeRoleRelationVO vo){
		addElement(vo);
	}
	/**
	 * 根据行号获取area
	 * @param index
	 */
	public EmployeeRoleRelationVO getEmployeeRoleRelation(int index) {
		return (EmployeeRoleRelationVO)getElement(index);
	}
}
