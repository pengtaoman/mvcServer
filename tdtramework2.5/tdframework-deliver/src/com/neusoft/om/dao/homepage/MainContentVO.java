package com.neusoft.om.dao.homepage;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuVO;

public class MainContentVO {
	
	private MenuVO menuVO; //frame
	private MenuColl menuColl;//view�ļ���
	
	/**
	 	�յĹ��췽��
	*/
	public MainContentVO(){
	
	}
	/**
		ͨ������ֵ����һ������
	*/
	public MainContentVO(MenuVO menuVO, MenuColl menuColl){
	
	}
	/**
		ͨ��һ�����ж�����һ������
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
