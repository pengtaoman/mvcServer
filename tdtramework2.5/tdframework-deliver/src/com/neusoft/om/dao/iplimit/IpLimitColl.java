package com.neusoft.om.dao.iplimit;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class IpLimitColl extends ObjectCollection{
	
	public void addIpLimit(IpLimitVO vo){
		addElement(vo);
	}
	
	public IpLimitVO getIpLimit(int index){
		return (IpLimitVO)getElement(index);
	}
	
	
}
