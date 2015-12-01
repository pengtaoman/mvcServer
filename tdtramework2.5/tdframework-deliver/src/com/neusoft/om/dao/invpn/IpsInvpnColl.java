package com.neusoft.om.dao.invpn;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class IpsInvpnColl extends ObjectCollection{
	
	public void addIpsInvpn(IpsInvpnVO vo){
		addElement(vo);
	}
	
	public IpsInvpnVO getIpsInvpn(int index){
		return (IpsInvpnVO)getElement(index);
	}
	
	
}
