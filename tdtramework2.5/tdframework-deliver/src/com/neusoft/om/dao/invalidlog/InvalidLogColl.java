package com.neusoft.om.dao.invalidlog;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class InvalidLogColl extends ObjectCollection{
	
	public void addInvalidLog(InvalidLogVO invalidLogVO){
		addElement(invalidLogVO);
	}

	public InvalidLogVO getInvalidLogVO(int index){
		return (InvalidLogVO)getElement(index);
	}
}
