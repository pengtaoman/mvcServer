package com.neusoft.om.dao.address;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: 组织机构地址信息集合
 * Description: 
 * Company: neusoft
 * Date: 2004-11-24
 * @author renh
 * @version 
 */
public class AddressColl extends ObjectCollection {
    final static long serialVersionUID = 0;
	public void addAddress(AddressVO vo){
		addElement(vo);
	}
	/**
	 * 根据行号获取
	 * @param index
	 */
	public AddressVO getAddress(int index) {
		return (AddressVO)getElement(index);
	}
}
