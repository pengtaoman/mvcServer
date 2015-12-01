package com.neusoft.uniflow.web.monitor.procdef.beans;

import java.util.HashMap;
/*
 * SVGTranstionManager
 * 由于在procmonitor jsp中需要计算maxX maxY的值，而这些值恰恰需要初始化tran，但是在SVGCreateFactory中
 * 也用到了tran，但是为了session的洁净以及防止重复计算，加上线程的安全性，利用hashmap存储tran，key为流程实例
 */
public class SVGTranstionManager {

	private HashMap trans=new HashMap();
	static private SVGTranstionManager tranManager;
	
	public SVGTranstionManager()
	{}
	static public SVGTranstionManager getInstance()
	{
		if(tranManager==null){
			
			tranManager=new SVGTranstionManager();
			return tranManager;
		}
		else 
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
	
	public void removeAll(){
		trans.clear();
	
	}
	
}