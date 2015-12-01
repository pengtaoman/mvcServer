package com.neusoft.om.dao.organ;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-01
 * @author renh
 * @version 
 */
public class OrganColl extends ObjectCollection {

    final static long serialVersionUID = 0;
    
	public void addOrgan(OrganVO vo){
		addElement(vo);
	}
	/**
	 * �����кŻ�ȡarea
	 * @param index
	 */
	public OrganVO getOrgan(int index) {
		return (OrganVO)getElement(index);
	}
	
	public OrganVO getOrganById(String organId){
		OrganVO vo = new OrganVO();
		for(int i=0; i < this.getRowCount(); i++){
			OrganVO oVO = this.getOrgan(i);
			if(oVO.getOrganId().equals(organId)){
				vo = oVO;
			}
		}
		return vo;
	}
}
