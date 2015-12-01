/*
 * Created on 2006-4-20
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.bo.common;

import java.util.ArrayList;
import java.util.List;

import com.neusoft.tdframework.demo.dao.common.DemoDictionaryDAO;
import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;

/**
 * 
 * 类DemoDictionaryBOImpl的实现描述：字典表
 * 
 * @author zhangjianing zhangjn@neusoft.com
 * @version 1.0 Date 2006-4-20
 * @see java.lang.Class History: <author> <time> <version> <desc>
 */
public class DemoDictionaryBOImpl {
	
	private DemoDictionaryDAO demoDictionaryDAO = null;
	private ICacheManager manager = CacheConfig.manager;

	/**
	 * 
	 * @param demoDictionaryDAO
	 */
	public void setDemoDictionaryDAO(DemoDictionaryDAO demoDictionaryDAO) {
		this.demoDictionaryDAO = demoDictionaryDAO;
	}

	/**
	 * 
	 * @return
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
			return new ArrayList();
		}
		return areaColl;
	}

	/**
	 * 
	 * @return
	 */
	public List getOrgColl() {
		List orgColl = null;
		try {
			orgColl = (List) manager.peek("orgColl");
			if (orgColl == null) {
				manager.putCacheObject("orgColl", demoDictionaryDAO.getOrgColl());
				orgColl = (List) manager.peek("orgColl");
			}
		} catch (CachingException ce) {
			return new ArrayList();
		}
		return orgColl;
	}
}
