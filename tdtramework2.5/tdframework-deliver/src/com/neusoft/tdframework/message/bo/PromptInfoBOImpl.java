/**
 * 
 */
package com.neusoft.tdframework.message.bo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.memcache.CacheManagerProxy;
import com.neusoft.tdframework.message.dao.PromptInfoDAO;
import com.neusoft.tdframework.message.data.PromptInfoVO;

/**
 * @author yintj@neusoft.com
 * @version 2012-5-4 ÏÂÎç2:53:26
 */
@SuppressWarnings("serial")
public class PromptInfoBOImpl implements PromptInfoBO {
	private PromptInfoDAO	promptInfoDAO;
	
	public static final String CACHE_ID = "Prompt_Message_Cache";

	/* (non-Javadoc)
	 * @see com.neusoft.crm.ordermgr.common.prompt.bo.PromptInfoBO#getPromptInfo(com.neusoft.crm.ordermgr.common.prompt.data.PromptInfoVO)
	 */
	public PromptInfoVO getPromptInfo(String busiCode) throws Exception {

		CacheManagerProxy cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
		@SuppressWarnings("unchecked")
		Map<String,PromptInfoVO> caccheMap = (Map<String,PromptInfoVO>)cacheManagerProxy.peek(CACHE_ID);
		PromptInfoVO returnMessage = null;
		if (caccheMap == null || caccheMap.isEmpty() || caccheMap.get(busiCode) == null) {
			returnMessage = promptInfoDAO.getPromptInfo(busiCode);
		} else {
			returnMessage = (PromptInfoVO)caccheMap.get(busiCode);
		}
		
		return returnMessage;
	}
	
	public void putMessageInfoToCache() throws Exception {
		CacheManagerProxy cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
		Map<String, PromptInfoVO> cacheMap = promptInfoDAO.preCacheMessageInfo();
		cacheManagerProxy.putObjectDirectly(CACHE_ID, cacheMap);
	}


	public void setPromptInfoDAO(PromptInfoDAO promptInfoDAO) {
		this.promptInfoDAO = promptInfoDAO;
	}

}
