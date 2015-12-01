package com.neusoft.om.dao.organdisplay;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-12-01
 * @author renh
 * @version 
 */
public class OrganDisplayColl extends ObjectCollection {

	public void addOrganDisplay(OrganDisplayVO vo){
		addElement(vo);
	}
	/**
	 * 根据行号获取area
	 * @param index
	 */
	public OrganDisplayVO getOrganDisplay(int index) {
		return (OrganDisplayVO)getElement(index);
	}
	
	public boolean ExistOrganId(String id ){
		boolean exist = false;
		for(int i=0; i <this.getRowCount(); i++){
			OrganDisplayVO organVO = this.getOrganDisplay(i);
			if(organVO.getOrganId().equals(id)){
				exist = true;
				break;
			}
		}
		return exist;
	}
}
