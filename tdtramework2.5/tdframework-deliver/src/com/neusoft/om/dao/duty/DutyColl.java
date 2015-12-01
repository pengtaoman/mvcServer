package com.neusoft.om.dao.duty;

import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.tdframework.common.data.ObjectCollection;


/**
 * Title: 
 * Description: 
 * Company: neusoft
 * Date: 2004-11-01
 * @author renh
 * @version 
 */
public class DutyColl extends ObjectCollection {

	public void addDuty(DutyVO vo){
		addElement(vo);
		addElement(new Integer(vo.getDutyId()),vo);
	}
	/**
	 * 根据行号获取area
	 * @param index
	 */
	public DutyVO getDuty(int index) {
		return (DutyVO)getElement(index);
	}
	/**
	 * 根据dutyId得到dutyVO
	 * @param dutyId
	 * @return
	 */
	public DutyVO getDutyVO(int dutyId) {
		return (DutyVO)getElement(new Integer(dutyId));
	}
}
