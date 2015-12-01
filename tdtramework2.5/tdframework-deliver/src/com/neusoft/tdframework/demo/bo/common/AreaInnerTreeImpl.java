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
 * <p> 修改历史</p>
 * <p>  序号		日期		   修改人			修改原因   			</p>
 * <p>   1      2006-4-19  zhangjn                        </p>
 */
public class AreaInnerTreeImpl implements CreateSelectTreeData {
	
	public AreaInnerTreeImpl() {
	}

	/**
	 * 刷新向量树，在需要对数据库中的内容进行刷新时调用此方法 若不需要刷新数据库内容，可以省略此方法
	 */
	public void refreshVector() {
		// init();
	}

	/**
	 * 得到部门编码
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
