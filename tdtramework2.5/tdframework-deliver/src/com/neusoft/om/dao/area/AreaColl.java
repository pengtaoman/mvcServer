package com.neusoft.om.dao.area;

import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.om.dao.area.AreaVO;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-01
 * @author renh
 * @version 
 */
public class AreaColl extends ObjectCollection {

	public void addArea(AreaVO vo){
		addElement(vo);
		addElement(vo.getAreaId(),vo);
	}
	/**
	 * 根据行号获取area
	 * @param index
	 */
	public AreaVO getArea(int index) {
		return (AreaVO)getElement(index);
	}
	
	/**
	 * 根据areaId得到AreaVO
	 * @param areaId
	 * @return
	 */
	public AreaVO getArea(String areaId) {
		return (AreaVO)getElement(areaId);
	}
	
	public AreaVO getAreaById(String areaId){
		AreaVO vo = null;
		for(int i=0; i < this.getRowCount(); i++){
			AreaVO areaVO = this.getArea(i);
			if(areaVO.getAreaId().equals(areaId)){
				vo = areaVO;
			}
		}
		return vo;
	}
	
}
