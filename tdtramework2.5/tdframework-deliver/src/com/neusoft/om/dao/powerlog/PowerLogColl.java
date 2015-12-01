package com.neusoft.om.dao.powerlog;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class PowerLogColl extends ObjectCollection{
	
	public void addPowerLog(PowerLogVO powerLogVO){
		addElement(powerLogVO);
	}

	public PowerLogVO getPowerLogVO(int index){
		return (PowerLogVO)getElement(index);
	}
}
