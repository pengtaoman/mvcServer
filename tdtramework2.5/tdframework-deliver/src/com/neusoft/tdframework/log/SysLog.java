package com.neusoft.tdframework.log;

import java.util.HashMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.common.GlobalParameters;

/**��װ��־
 * <p>Date       : 2004-10-26</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author liyj
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public class SysLog {
	
	/**
	 * trace�������־��Ϣ�Ƿ������
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledTrace(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isTraceEnabled();
	}

	/**
	 * debug�������־��Ϣ�Ƿ������
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledDebug(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isDebugEnabled();
	}

	/**
	 * info�������־��Ϣ�Ƿ������
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledInfo(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isInfoEnabled();
	}

	/**
	 * warn�������־��Ϣ�Ƿ������
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledWarn(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isWarnEnabled();
	}

	/**
	 * error�������־��Ϣ�Ƿ������
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledError(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isErrorEnabled();
	}

	/**
	 * fatal�������־��Ϣ�Ƿ������
	 * description: 
	 * @param moduleName
	 * @return
	 */
	public static boolean isEnabledFatal(String moduleName){
		Log logger = LogFactory.getLog(moduleName);
		return logger.isFatalEnabled();
	}

/**
 * дϵͳ��־�ķ���
 * description: 
 * @param moduleName ģ�����ƣ�������Ϲ淶�ж��������
 * @param logType ��־��Ϣ�����ͣ�����trace��debug��info��warn��error��fatal
 * @param logInfo ��Ҫ�������־��Ϣ
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
	 * ���쳣�Ķ�ջ��Ϣ�������־��Ϣ��
	 * description: 
	 * @param moduleName ģ�����ƣ�������Ϲ淶�ж��������
	 * @param logType ��־��Ϣ�����ͣ�����trace��debug��info��warn��error��fatal
	 * @param logInfo ��Ҫ�������־��Ϣ
	 * @param e �쳣
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
