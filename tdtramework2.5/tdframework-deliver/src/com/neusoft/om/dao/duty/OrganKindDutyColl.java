package com.neusoft.om.dao.duty;

import com.neusoft.tdframework.common.data.ObjectCollection;


/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-01
 * @author renh
 * @version 
 */
public class OrganKindDutyColl extends ObjectCollection {

	public void addOrganKindDuty(OrganKindDutyVO vo){
		addElement(vo);
	}
	/**
	 * 根据行号获取
	 * @param index
	 */
	public OrganKindDutyVO getOrganKindDuty(int index) {
		return (OrganKindDutyVO)getElement(index);
	}
}
