package com.neusoft.om.dao.container;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class ContainerColl extends ObjectCollection{

	public void addContainer(ContainerVO contanerVO){
		addElement(contanerVO);
	}
	public ContainerVO getArea(int index) {
		return (ContainerVO)getElement(index);
	}
}
