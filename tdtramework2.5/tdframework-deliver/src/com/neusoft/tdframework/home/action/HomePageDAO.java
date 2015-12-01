/*
 * Created on 2004-11-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.home.action;

import java.util.Map;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


public interface HomePageDAO extends BaseDao {
	public static final String BEAN = "homePageDAO";

	public ObjectCollection getMainContentColl(Map map) throws DataAccessException;
	
	public MenuColl getHomePageMenuColl(Map map) throws DataAccessException;


}
