package com.neusoft.tdframework.home.action;

import java.util.Map;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.tdframework.exception.ServiceException;


public class HomePageBOImpl implements HomePageBO {

	private HomePageDAO homepageDAO;

	public MenuColl getHomePageMenuColl(Map map) throws ServiceException {
		MenuColl menuColl=null;
		try {
			menuColl=homepageDAO.getHomePageMenuColl(map);
		}catch(Exception e){
			menuColl=null;
		}
		return menuColl;
	}


	public HomePageDAO getHomepageDAO() {
		return homepageDAO;
	}



	public void setHomepageDAO(HomePageDAO homepageDAO) {
		this.homepageDAO = homepageDAO;
	} 

}