package com.neusoft.om.dao.homepage;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuVO;

public class MainContentVO {
	
	private MenuVO menuVO; //frame
	private MenuColl menuColl;//view的集合
	
	/**
	 	空的构造方法
	*/
	public MainContentVO(){
	
	}
	/**
		通过属性值构造一个对象
	*/
	public MainContentVO(MenuVO menuVO, MenuColl menuColl){
	
	}
	/**
		通过一个已有对象构造一个对象
	*/
	public MainContentVO(MainContentVO other){
		if(this != other) {
			this.menuVO = other.menuVO;
			this.menuColl = other.menuColl;
		}
	}

	public MenuColl getMenuColl() {
		return menuColl;
	}
	
	public void setMenuColl(MenuColl menuColl) {
		this.menuColl = menuColl;
	}
	
	public MenuVO getMenuVO() {
		return menuVO;
	}
	
	public void setMenuVO(MenuVO menuVO) {
		this.menuVO = menuVO;
	}

}
