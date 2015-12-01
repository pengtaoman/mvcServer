package com.neusoft.tdframework.log;

import java.util.HashMap;

import com.neusoft.om.dao.log.LogColl;
import com.neusoft.om.dao.log.LogVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

public interface DBLogger extends BaseBO{
	public static final String BEAN = "logFacade";
	/**
	 * 查询日志信息
	 * @param partCity
	 * @param systemId
	 * @param menuId
	 * @param partMonth
	 * @param begTime
	 * @param endTime
	 * @return LogColl
	 * @throws ServiceException
	 */
	public LogColl getLogInfo(String partCity,String systemId,String menuId,String partMonth,String begTime,String endTime) throws ServiceException;

    
    /**
     * 得到日志信息集合
     * @param map
     * @return
     * @throws ServiceException
     */
	public int getLogRowCount(HashMap map) throws ServiceException;
	
    public LogColl getLogInfo(HashMap map,int startRow,int endRow) throws ServiceException;
    
    public LogVO getLogInfoBySequence(int no) throws ServiceException;
    /**
     * 根据 登录帐号 和 操作时间 获取日志详细信息
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogVO getDetailLogInfo(String partCity,String workNo,
    	String operTime) throws ServiceException;
	/**
	 * 写日志信息接口
	 * @param vo
	 * @return
	 * @throws ServiceException
	 */
	public int doAddLogInfo(LogVO vo) throws ServiceException;
    /**
     * 通过存储过程记录操作日志
     * @return
     */
    public int doAddLogInfoByProc(HashMap map) throws ServiceException;
    /**
     * 根据隐藏域中所绑定的按钮值，该值对应OM_MENU_T表中的主键F_MENU_ID值
     * @param btnID
     * @return
     * @throws ServiceException
     * 20110504 by zhangjn
     */
    public LogVO isWriteLogs(String btnID) throws ServiceException;
	
}
