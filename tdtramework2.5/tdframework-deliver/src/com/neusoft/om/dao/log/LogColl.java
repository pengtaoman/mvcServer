package com.neusoft.om.dao.log;

import com.neusoft.om.dao.log.LogVO;
import com.neusoft.tdframework.common.data.ObjectCollection;
/**
 * Title: ��־
 * Description: 
 * Company: neusoft
 * Date: 2004-12-07
 * @author renh
 * @version 
 */
public class LogColl extends ObjectCollection {

	public void addLog(LogVO vo){
		addElement(vo);
	}
	/**
	 * �����кŻ�ȡarea
	 * @param index
	 */
	public LogVO getLog(int index) {
		return (LogVO)getElement(index);
	}
}
