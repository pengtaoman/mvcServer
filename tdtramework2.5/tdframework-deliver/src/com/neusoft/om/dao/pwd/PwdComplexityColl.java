package com.neusoft.om.dao.pwd;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class PwdComplexityColl extends ObjectCollection{

	public void addPwdComplexityVO(PwdComplexityVO pwdComplexityVO){
		addElement(pwdComplexityVO);
	}
	
	public PwdComplexityVO getPwdComplexityVO(int index){
		return (PwdComplexityVO)getElement(index);
	}
}
