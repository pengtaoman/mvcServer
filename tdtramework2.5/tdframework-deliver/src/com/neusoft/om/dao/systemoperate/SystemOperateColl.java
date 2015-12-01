package com.neusoft.om.dao.systemoperate;

import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.om.dao.systemoperate.SystemOperateVO;

/**
 * Title: 系统信息
 * Description: 定义系统信息集合
 * Company: neusoft
 * Date: 2004-11-24
 * @author renh
 * @version 
 */
public class SystemOperateColl extends ObjectCollection{

	public void addSystem(SystemOperateVO vo){
		addElement(vo);
		addElement(vo.getSystemId(),vo);
	}
	/**
	 * 根据行号获取SystemVO
	 * @param index
	 */
	public SystemOperateVO getSystem(int index) {
		return (SystemOperateVO)getElement(index);
	}
	/**
	 * 根据systemId得到systemVO
	 * @param systemId
	 * @return
	 */
	public SystemOperateVO getSystem(String systemId)
	{
		return (SystemOperateVO)getElement(systemId);	
	}
}
