package com.neusoft.tdframework.log;

import java.util.HashMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.GlobalParameters;

/**封装日志
 * <p>Date       : 2004-10-26</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author liyj
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class SysLog {
	
	/**
	 * trace级别的日志信息是否输出。
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledTrace(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isTraceEnabled();
	}

	/**
	 * debug级别的日志信息是否输出。
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledDebug(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isDebugEnabled();
	}

	/**
	 * info级别的日志信息是否输出。
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledInfo(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isInfoEnabled();
	}

	/**
	 * warn级别的日志信息是否输出。
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledWarn(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isWarnEnabled();
	}

	/**
	 * error级别的日志信息是否输出。
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledError(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isErrorEnabled();
	}

	/**
	 * fatal级别的日志信息是否输出。
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledFatal(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isFatalEnabled();
	}

/**
 * 写系统日志的方法
 * description: 
 * @param moduleName 模块名称，必须符合规范中定义的名称
 * @param logType 日志信息的类型，包括trace、debug、info、warn、error、fatal
 * @param logInfo 需要输出的日志信息
 * return
 */
	public static void writeLogs(String moduleName, 
								 String logType, 
								 String logInfo){
		Log logger = LogFactory.getLog(moduleName);
		if(logType.equals(GlobalParameters.TRACE))
			logger.trace(logInfo);
		else if(logType.equals(GlobalParameters.DEBUG))
			logger.debug(logInfo);
		else if(logType.equals(GlobalParameters.INFO))
			logger.info(logInfo);
		else if(logType.equals(GlobalParameters.WARN))
			logger.warn(logInfo);
		else if(logType.equals(GlobalParameters.ERROR))
			logger.error(logInfo);
		else if(logType.equals(GlobalParameters.FATAL))
			logger.fatal(logInfo);
	}

	/**
	 * 把异常的堆栈信息输出到日志信息中
	 * description: 
	 * @param moduleName 模块名称，必须符合规范中定义的名称
	 * @param logType 日志信息的类型，包括trace、debug、info、warn、error、fatal
	 * @param logInfo 需要输出的日志信息
	 * @param e 异常
	 * return
	 */
	public static void writeExceptionLogs(String moduleName, 
								 String logType, 
								 String logInfo,
								 Exception e){
		Log logger = LogFactory.getLog(moduleName);
		if(logType.equals("trace"))
			logger.trace(logInfo+StringUtil.getStackTrace(e));
		else if(logType.equals("debug"))
			logger.debug(logInfo+StringUtil.getStackTrace(e));
		else if(logType.equals("info"))
			logger.info(logInfo+StringUtil.getStackTrace(e));
		else if(logType.equals("warn"))
			logger.warn(logInfo+StringUtil.getStackTrace(e));
		else if(logType.equals("error"))
			logger.error(logInfo+StringUtil.getStackTrace(e));
		else if(logType.equals("fatal"))
			logger.fatal(logInfo+StringUtil.getStackTrace(e));
	}
	
	/**
	 * 
	 * description:
	 * @param session
	 * @param menuId
	 * @param operateDesc
	 * return
	 */
	public static void writeOMLogs(HashMap mapData,
								   String menuId,
								   String operateDesc){
	
	}

}
