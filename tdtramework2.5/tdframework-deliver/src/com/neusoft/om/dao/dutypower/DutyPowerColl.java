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
 * 职务和功能对应关系结果集
 *  
 */
public class DutyPowerColl extends ObjectCollection {
	
	/**
	 * 增加一个对应关系
	 * @param vo
	 */
	public void addDutyPower(DutyPowerVO vo){
		addElement(vo);
	}
	
	/**
	 * 根据行号获取一个对应关系
	 * @param index
	 * @return
	 */
	public DutyPowerVO getDutyPower(int index) {
		return (DutyPowerVO)getElement(index);
	}
}
