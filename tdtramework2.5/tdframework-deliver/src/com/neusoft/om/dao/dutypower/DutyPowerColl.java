/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.dao.dutypower;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * @author renh
 *
 * ְ��͹��ܶ�Ӧ��ϵ�����
 *  
 */
public class DutyPowerColl extends ObjectCollection {
	
	/**
	 * ����һ����Ӧ��ϵ
	 * @param vo
	 */
	public void addDutyPower(DutyPowerVO vo){
		addElement(vo);
	}
	
	/**
	 * �����кŻ�ȡһ����Ӧ��ϵ
	 * @param index
	 * @return
	 */
	public DutyPowerVO getDutyPower(int index) {
		return (DutyPowerVO)getElement(index);
	}
}
