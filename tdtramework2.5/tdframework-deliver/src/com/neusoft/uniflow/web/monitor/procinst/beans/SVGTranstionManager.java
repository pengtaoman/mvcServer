package com.neusoft.uniflow.web.monitor.procinst.beans;

import java.util.Hashtable;
/*
 * SVGTranstionManager
 * 由于在procmonitor jsp中需要计算maxX maxY的值，而这些值恰恰需要初始化tran，但是在SVGCreateFactory中
 * 也用到了tran，为了session的洁净以及防止重复计算，同时考虑到资源同步，利用hashtable存储tran，key为流程实例
 */
public class SVGTranstionManager {

	private Hashtable trans=new Hashtable();
	static private SVGTranstionManager tranManager;
	
	public SVGTranstionManager()
	{}
	static public SVGTranstionManager getInstance()
	{
		if (null == tranManager) {
			synchronized (SVGTranstionManager.class) {
				if (null == tranManager)
					tranManager = new SVGTranstionManager();
			}
			return tranManager;
		} else
			return tranManager;
			
			
	}
	
	public void  put(String key,SVGTranstion tran)
	{
		trans.put(key, tran);
	}
	
	public SVGTranstion getTranstion(String key)
	{
		return (SVGTranstion)trans.remove(key);
	}
	
	
	public void remove(String key){
		trans.remove(key);
	}
	
}
