package com.neusoft.om.dao.systemoperate;

import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.om.dao.systemoperate.SystemOperateVO;

/**
 * Title: ϵͳ��Ϣ
 * Description: ����ϵͳ��Ϣ����
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
	 * �����кŻ�ȡSystemVO
	 * @param index
	 */
	public SystemOperateVO getSystem(int index) {
		return (SystemOperateVO)getElement(index);
	}
	/**
	 * ����systemId�õ�systemVO
	 * @param systemId
	 * @return
	 */
	public SystemOperateVO getSystem(String systemId)
	{
		return (SystemOperateVO)getElement(systemId);	
	}
}
