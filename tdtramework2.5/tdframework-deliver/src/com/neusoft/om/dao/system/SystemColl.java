package com.neusoft.om.dao.system;

import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.om.dao.system.SystemVO;

/**
 * Title: ϵͳ��Ϣ
 * Description: ����ϵͳ��Ϣ����
 * Company: neusoft
 * Date: 2004-11-24
 * @author renh
 * @version 
 */
public class SystemColl extends ObjectCollection{

	public void addSystem(SystemVO vo){
		addElement(vo);
		addElement(vo.getSystemId(),vo);
	}
	/**
	 * �����кŻ�ȡSystemVO
	 * @param index
	 */
	public SystemVO getSystem(int index) {
		return (SystemVO)getElement(index);
	}
	/**
	 * ����systemId�õ�systemVO
	 * @param systemId
	 * @return
	 */
	public SystemVO getSystem(String systemId)
	{
		return (SystemVO)getElement(systemId);	
	}
	
	public SystemVO getSystemById(String systemId, SystemColl sysColl){
		for(int i=0; i < sysColl.getRowCount(); i++){
			SystemVO sysVO = sysColl.getSystem(i);
			if(sysVO.getSystemId().equals(systemId)){
				return sysVO;
			}
		}
		return null;
	}
}
