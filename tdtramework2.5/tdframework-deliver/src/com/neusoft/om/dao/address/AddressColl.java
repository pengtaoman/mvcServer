package com.neusoft.om.dao.address;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: ��֯������ַ��Ϣ����
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
	 * �����кŻ�ȡ
	 * @param index
	 */
	public AddressVO getAddress(int index) {
		return (AddressVO)getElement(index);
	}
}
