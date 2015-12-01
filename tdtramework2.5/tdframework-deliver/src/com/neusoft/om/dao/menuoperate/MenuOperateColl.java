package com.neusoft.om.dao.menuoperate;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class MenuOperateColl extends ObjectCollection {

	public void addMenu(MenuOperateVO vo){
		addElement(vo);
		addElement(vo.getMenuId(),vo);
	}
	/**
	 * 根据行号获取menu
	 * @param index
	 */
	public MenuOperateVO getMenu(int index) {
		return (MenuOperateVO)getElement(index);
	}
	
	public MenuOperateVO getMenu(String menuId)
	{
		return (MenuOperateVO)getElement(menuId);
//		for(int i=0;i<getRowCount();i++){
//			MenuOperateVO vo = getMenu(i);
//			String menuIdTmp = String.valueOf(vo.getMenuId());
//			if(menuIdTmp.equals(menuId))
//				return vo;
//		}
//	
//		return null;	
	}
}
