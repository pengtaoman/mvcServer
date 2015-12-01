package com.neusoft.om.dao.homepage;

import java.util.HashMap;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.tdframework.common.data.ObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;


public interface HomePageDAO extends BaseDao{
	
	public ObjectCollection getMainContentColl(HashMap map);
	
	public MenuColl getHomePageMenuColl(HashMap map);
}
