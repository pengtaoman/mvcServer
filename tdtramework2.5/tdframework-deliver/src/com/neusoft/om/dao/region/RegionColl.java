package com.neusoft.om.dao.region;

import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.om.dao.region.RegionVO;

/**
 * 
 * @author zhaofan
 * 2009-9-30
 */
public class RegionColl extends ObjectCollection {

	public void addRegion(RegionVO vo){
		addElement(vo);
		addElement(vo.getRegionId(),vo);
	}
	/**
	 * 根据行号获取Region
	 * @param index
	 */
	public RegionVO getRegion(int index) {
		return (RegionVO)getElement(index);
	}
	
	/**
	 * 根据RegionId得到RegionVO
	 * @param RegionId
	 * @return
	 */
	public RegionVO getRegion(String RegionId) {
		return (RegionVO)getElement(RegionId);
	}
	
	public RegionVO getRegionById(int RegionId){
		RegionVO vo = null;
		for(int i=0; i < this.getRowCount(); i++){
			RegionVO RegionVO = this.getRegion(i);
			if(RegionVO.getRegionId()== RegionId){
				vo = RegionVO;
			}
		}
		return vo;
	}
	
}
