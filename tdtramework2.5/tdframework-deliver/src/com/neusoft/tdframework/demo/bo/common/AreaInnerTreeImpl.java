/*
 * Created on 2006-3-6
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.bo.common;

import java.util.Enumeration;
import java.util.Vector;

import com.neusoft.tdframework.demo.dao.common.InnerTreeDao;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.taglib.innertree.CreateSelectTreeData;
import com.neusoft.unieap.taglib.innertree.TreeData;

/**brief description
 * <p>Date       : 2006-4-19</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author zhangjn
 * @version 1.0
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		   �޸���			�޸�ԭ��   			</p>
 * <p>   1      2006-4-19  zhangjn                        </p>
 */
public class AreaInnerTreeImpl implements CreateSelectTreeData {
	
	public AreaInnerTreeImpl() {
	}

	/**
	 * ˢ��������������Ҫ�����ݿ��е����ݽ���ˢ��ʱ���ô˷��� ������Ҫˢ�����ݿ����ݣ�����ʡ�Դ˷���
	 */
	public void refreshVector() {
		// init();
	}

	/**
	 * �õ����ű���
	 */
	public Vector getTreeDataVector() {
		
		Vector vec = new Vector();
		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("tdframework");

		InnerTreeDao dao = (InnerTreeDao) factory.getInteractionObject("innerTreeDAO", appContext);
		vec = dao.getAreaData();
		Enumeration en = vec.elements();
		
		while (en.hasMoreElements()) {
			TreeData treeData = (TreeData) en.nextElement();
		}
		return vec;
	}
}
