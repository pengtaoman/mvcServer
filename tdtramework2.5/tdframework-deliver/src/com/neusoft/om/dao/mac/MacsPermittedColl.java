package com.neusoft.om.dao.mac;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class MacsPermittedColl extends ObjectCollection{
	
	public void addMacsPermitted(MacsPermittedVO vo){
		addElement(vo);
	}
	
	public MacsPermittedVO getMacsPermitted(int index){
		return (MacsPermittedVO)getElement(index);
	}
	
	
}
