package com.neusoft.om.dao.homepage;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class MainContentColl extends ObjectCollection{
    final static long serialVersionUID = 0;

	public void addMainContent(MainContentVO vo){
		addElement(vo);
	}
	public MainContentVO getMainContent(int index) {
		return (MainContentVO)getElement(index);
	}
}
