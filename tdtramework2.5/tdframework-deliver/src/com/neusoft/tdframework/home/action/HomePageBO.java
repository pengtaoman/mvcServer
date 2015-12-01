package com.neusoft.tdframework.home.action;

import java.util.Map;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;


public interface HomePageBO extends BaseBO {
	public final static String HOMEPAGEBO_BEANNAME="homepageBO";
	
	public void setHomepageDAO(HomePageDAO hoempageDAO);	

	public MenuColl getHomePageMenuColl(Map map) throws ServiceException;
	
	
}