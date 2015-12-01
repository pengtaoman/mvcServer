/*
 * Created on 2006-3-15
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.dao.common;

import java.util.List;

import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;

/**
 * @author zhangjn
 */
public class DemoDictionaryDAOCacheImpl implements DemoDictionaryDAO {

	private ICacheManager manager = CacheConfig.manager;
	private DemoDictionaryDAO demoDictionaryDAO = null;

	/**
	 * 
	 * @param demoDictionaryDAO
	 */
	public void setDemoDictionaryDAO(DemoDictionaryDAO demoDictionaryDAO) {
		this.demoDictionaryDAO = demoDictionaryDAO;
	}

	/**
	 * 
	 */
	public List getAreaColl() {
		List areaColl = null;
		try {
			areaColl = (List) manager.peek("areaColl");
			if (areaColl == null) {
				manager.putCacheObject("areaColl", demoDictionaryDAO.getAreaColl());
				areaColl = (List) manager.peek("areaColl");
			}
		} catch (CachingException ce) {
		}
		return areaColl;
	}

	/**
	 * 
	 */
	public List getOrgColl() {
		List orgColl = null;
		try {
			orgColl = (List) manager.peek("orgColl");
			if (orgColl == null) {
				manager.putCacheObject("orgColl", demoDictionaryDAO.getAreaColl());
				orgColl = (List) manager.peek("orgColl");
			}
		} catch (CachingException ce) {
		}
		return orgColl;
	}
}
