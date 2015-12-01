package com.neusoft.om.dao.emplogintime;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class EmpLoginTimeColl extends ObjectCollection{
	
	public void addEmpLoginTime(EmpLoginTimeVO vo){
		addElement(vo);
	}
	
	public EmpLoginTimeVO getEmpIpLimit(int index){
		return (EmpLoginTimeVO)getElement(index);
	}
	
	
}
