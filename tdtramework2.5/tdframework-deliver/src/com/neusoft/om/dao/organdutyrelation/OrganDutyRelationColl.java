package com.neusoft.om.dao.organdutyrelation;

import com.neusoft.om.dao.organdutyrelation.OrganDutyRelationVO;
import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-01
 * @author renh
 * @version 
 */
public class OrganDutyRelationColl extends ObjectCollection {

	public void addOrganDutyRelation(OrganDutyRelationVO vo){
		addElement(vo);
	}
	/**
	 * 根据行号获取area
	 * @param index
	 */
	public OrganDutyRelationVO getOrganDutyRelation(int index) {
		return (OrganDutyRelationVO)getElement(index);
	}
}
