package com.neusoft.om.dao.empiplimit;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class EmpIpLimitColl extends ObjectCollection{
	
	public void addIpLimit(EmpIpLimitVO vo){
		addElement(vo);
	}
	
	public EmpIpLimitVO getEmpIpLimit(int index){
		return (EmpIpLimitVO)getElement(index);
	}
	
	
}
