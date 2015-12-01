package com.neusoft.om.interfase.ebisp.data;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-11-08
 * @author ren.hui@neusoft.com
 * @version
 */

public class WindowNodeColl extends ObjectCollection { 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
		����һ�� WindowNodeVO ���� 
	*/ 
	public void addWindowNodeVO(WindowNode vo) {
		addElement(vo);
	}

	/** 
		�����кŻ�ȡһ�� WindowNodeVO ���� 
	*/ 
	public WindowNode getWindowNode(int index) {
		return (WindowNode)getElement(index);
	}


}