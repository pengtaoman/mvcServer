package com.neusoft.om.dao.module;

import com.neusoft.om.dao.module.ModuleVO;
import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title: ModuleColl
 * Description: 
 * Company: neusoft
 * Date: 2004-12-08
 * @author renh
 * @version 
 */
public class ModuleColl extends ObjectCollection {

	public void addModule(ModuleVO vo){
		addElement(vo);
	}
	
	/**
	 * 根据行号获取
	 * @param index
	 */
	public ModuleVO getModule(int index) {
		return (ModuleVO)getElement(index);
	}
}

