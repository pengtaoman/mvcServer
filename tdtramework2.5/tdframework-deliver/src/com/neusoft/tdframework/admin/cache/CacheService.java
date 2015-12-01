package com.neusoft.tdframework.admin.cache;

import java.util.List;

public interface CacheService {
	public void reLoadCachedObjects(String[] list); 
	public List getObjects(String appName);
	public void reMoveObjects(String appName, String cacheObjKey);
	
	public void reLoadCachedObject(String key); 
	
	public void reLoadPromptMessage();
}
