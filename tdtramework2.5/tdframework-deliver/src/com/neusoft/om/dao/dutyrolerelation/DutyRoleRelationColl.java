package com.neusoft.om.dao.dutyrolerelation;

import com.neusoft.om.dao.dutyrolerelation.DutyRoleRelationVO;
import com.neusoft.tdframework.common.data.ObjectCollection;


/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-12-07
 * @author renh
 * @version 
 */
public class DutyRoleRelationColl extends ObjectCollection {

	public void addDutyRoleRelation(DutyRoleRelationVO vo){
		addElement(vo);
	}
	/**
	 * 根据行号获取
	 * @param index
	 */
	public DutyRoleRelationVO getDutyRoleRelation(int index) {
		return (DutyRoleRelationVO)getElement(index);
	}
}
