package com.neusoft.om.dao.omswitch;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OmSwitchColl extends ObjectCollection{
	public void addOmSwitch(OmSwitchVO vo){
		addElement(vo);
	}
	
		/**
		 * 根据行号获取
		 * @param index
		 */
	public OmSwitchVO getModule(int index) {
		return (OmSwitchVO)getElement(index);
	}
}
