package com.neusoft.om.omutil;

import java.util.List;

import com.neusoft.tdframework.core.BaseBO;

public interface DataParamBO extends BaseBO{
	
	public List getShowableId(String employeeId, String tableName);
	

}
