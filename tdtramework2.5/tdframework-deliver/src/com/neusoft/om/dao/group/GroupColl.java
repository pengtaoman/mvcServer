package com.neusoft.om.dao.group;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class GroupColl extends ObjectCollection{
	
	public GroupVO getGroup(int i){
		return (GroupVO)getElement(i); 
	}
	
	public void addGroup(GroupVO vo){
		addElement(vo);
	}

}
