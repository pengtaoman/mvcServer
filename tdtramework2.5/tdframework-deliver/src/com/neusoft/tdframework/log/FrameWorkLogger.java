/*
 * Created on 2004-12-21
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.log;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.context.FrameAppContext;

/**
 * @author chenzt
 *
 * øÚº‹»’÷æ
 */
public class FrameWorkLogger {
	public static void debug(String info) {
		SysLog.writeLogs(FrameAppContext.PREFIX,GlobalParameters.DEBUG,info);
	}
	public static void info(String info) {
		SysLog.writeLogs(FrameAppContext.PREFIX,GlobalParameters.INFO,info);
	}
	public static void warn(String info) {
		SysLog.writeLogs(FrameAppContext.PREFIX,GlobalParameters.WARN,info);
	}
	public static void error(String info) {
		SysLog.writeLogs(FrameAppContext.PREFIX,GlobalParameters.ERROR,info);
	}
	public static void error(String info,Exception e) {
		SysLog.writeExceptionLogs(FrameAppContext.PREFIX,GlobalParameters.ERROR,info,e);
	}
	public static void fatal(String info) {
		SysLog.writeLogs(FrameAppContext.PREFIX,GlobalParameters.FATAL,info);
	}
	
}
