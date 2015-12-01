package com.neusoft.tdframework.authorization;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-24
 * @author renh
 * @version 
 */
public class FrameMenuColl extends ObjectCollection {

	public void addMenu(FrameMenuVO vo){
		addElement(vo);
		addElement(vo.getMenuId(),vo);
	}
	/**
	 * 根据行号获取menu
	 * @param index
	 */
	public FrameMenuVO getMenu(int index) {
		return (FrameMenuVO)getElement(index);
	}
	
	public FrameMenuVO getMenu(String menuId)
	{
		return (FrameMenuVO)getElement(menuId);
//		for(int i=0;i<getRowCount();i++){
//			MenuVO vo = getMenu(i);
//			String menuIdTmp = String.valueOf(vo.getMenuId());
//			if(menuIdTmp.equals(menuId))
//				return vo;
//		}
//	
//		return null;	
	}
}
