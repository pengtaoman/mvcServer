/*
 * Created on 2004-12-21
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author chenzt
 *
 * 组织机构管理系统的日志类，直接调用SysLog
 */
public class OMLogger {
	public static void debug(String info) {
		SysLog.writeLogs(OMAppContext.PREFIX,GlobalParameters.DEBUG,info);
	}
	public static void info(String info) {
		SysLog.writeLogs(OMAppContext.PREFIX,GlobalParameters.INFO,info);
	}
	public static void warn(String info) {
		SysLog.writeLogs(OMAppContext.PREFIX,GlobalParameters.WARN,info);
	}
	public static void error(String info) {
		SysLog.writeLogs(OMAppContext.PREFIX,GlobalParameters.ERROR,info);
	}
	public static void error(String info,Exception e) {
		SysLog.writeExceptionLogs(OMAppContext.PREFIX,GlobalParameters.ERROR,info,e);
	}
	public static void fatal(String info) {
		SysLog.writeLogs(OMAppContext.PREFIX,GlobalParameters.FATAL,info);
	}
	
}
