package com.neusoft.om.dao.menu;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-24
 * @author renh
 * @version 
 */
public class MenuColl extends ObjectCollection {

	public void addMenu(MenuVO vo){
		addElement(vo);
		addElement(vo.getMenuId(),vo);
	}
	/**
	 * 根据行号获取menu
	 * @param index
	 */
	public MenuVO getMenu(int index) {
		return (MenuVO)getElement(index);
	}
	
	public MenuVO getMenu(String menuId)
	{
		//return (MenuVO)getElement(menuId);
		for(int i=0;i<getRowCount();i++){
			MenuVO vo = getMenu(i);
			String menuIdTmp = String.valueOf(vo.getMenuId());
			if(menuIdTmp.equals(menuId))
				return vo;
		}
	
		return null;	
	}
}
