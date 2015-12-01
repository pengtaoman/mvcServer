package com.neusoft.om.dao.group;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class GroupEmpColl extends ObjectCollection{

	public GroupEmpVO getGroupEmpVO(int i){
		return (GroupEmpVO)getElement(i);
	}
	
	public void addGroupEmp(GroupEmpVO vo){
		addElement(vo);
	}
}
