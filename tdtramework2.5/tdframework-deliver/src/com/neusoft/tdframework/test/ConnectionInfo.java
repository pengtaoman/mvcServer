/*
 * Created on 2006-10-12
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.test;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.neusoft.common.*;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class ConnectionInfo {
	private Date invokeTime = SysMaint.today();
	private String invoker = "never invoked";
	
	/**
		生成实例，传入调用者
	*/
	public ConnectionInfo() {
		//Thread.currentThread
		StackTraceElement[] stacks = new Throwable().getStackTrace();
		StackTraceElement ste = stacks[2];
		invoker = ste.getClassName()+"."+ste.getMethodName()+"(...)";
	}
	
	/**
	 * 正在使用时长
	 */
	public long currentUsedSeconds() {
		return (SysMaint.today().getTime() - invokeTime.getTime())/1000;
	}
	
	/**
	 * 获取使用时长
	 */
	public Date getInvokeTime () {
		return invokeTime;
	}
	
	/**
	 * 获取调用者信息
	 */
	public String getInvoker(){
		return invoker;	
	}
	
	public static ConnectionInfo test(){
		
		return new ConnectionInfo();
	}
	public static void main(String[] args) {
		//System.out.println(test().getInvoker());
		
		Map map = new HashMap();
		String a = new String("a");
		map.put(a,"b");
		
		//a = null;
		map.remove(a);
		map.remove(a);
		System.out.println(map.size());
		
	}

}
