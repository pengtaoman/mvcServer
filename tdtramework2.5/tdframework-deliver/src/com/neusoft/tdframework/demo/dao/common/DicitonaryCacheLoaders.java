/*
 * Created on 2006-3-19
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.dao.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.service.cache.ICacheLoaders;
import com.neusoft.unieap.service.cache.exception.CachingException;

/**
 * @author zhangjn
 */
public class DicitonaryCacheLoaders implements ICacheLoaders {
	
	private static final long serialVersionUID = 1L;

	public Object loadCacheObjects() throws CachingException {

		Map ret = new HashMap();
		ret.put("areaInfo", getAreaInfo());
		ret.put("orgInfo", getOrgInfo());
		return ret;
	}

	private List getAreaInfo() {
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("tdframework");
		DemoDictionaryDAO dao = (DemoDictionaryDAO) factory.getInteractionObject("demoDictionaryDAO", appContext);
		return dao.getAreaColl();
	}

	private List getOrgInfo() {
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("tdframework");
		DemoDictionaryDAO dao = (DemoDictionaryDAO) factory.getInteractionObject("demoDictionaryDAO", appContext);
		return dao.getAreaColl();
	}
}
