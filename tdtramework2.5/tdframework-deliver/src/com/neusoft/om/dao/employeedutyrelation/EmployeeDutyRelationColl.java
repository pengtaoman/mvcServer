package com.neusoft.om.dao.employeedutyrelation;

import com.neusoft.om.dao.employeedutyrelation.EmployeeDutyRelationVO;
import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: ְԱ��ְ���Ӧ��Ϣ
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
	 * �����кŻ�ȡarea
	 * @param index
	 */
	public EmployeeDutyRelationVO getEmployeeDutyRelation(int index) {
		return (EmployeeDutyRelationVO)getElement(index);
	}
}
