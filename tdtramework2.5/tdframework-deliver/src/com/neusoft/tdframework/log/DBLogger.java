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
	 * ��ѯ��־��Ϣ
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
     * �õ���־��Ϣ����
     * @param map
     * @return
     * @throws ServiceException
     */
	public int getLogRowCount(HashMap map) throws ServiceException;
	
    public LogColl getLogInfo(HashMap map,int startRow,int endRow) throws ServiceException;
    
    public LogVO getLogInfoBySequence(int no) throws ServiceException;
    /**
     * ���� ��¼�ʺ� �� ����ʱ�� ��ȡ��־��ϸ��Ϣ
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogVO getDetailLogInfo(String partCity,String workNo,
    	String operTime) throws ServiceException;
	/**
	 * д��־��Ϣ�ӿ�
	 * @param vo
	 * @return
	 * @throws ServiceException
	 */
	public int doAddLogInfo(LogVO vo) throws ServiceException;
    /**
     * ͨ���洢���̼�¼������־
     * @return
     */
    public int doAddLogInfoByProc(HashMap map) throws ServiceException;
    /**
     * ���������������󶨵İ�ťֵ����ֵ��ӦOM_MENU_T���е�����F_MENU_IDֵ
     * @param btnID
     * @return
     * @throws ServiceException
     * 20110504 by zhangjn
     */
    public LogVO isWriteLogs(String btnID) throws ServiceException;
	
}
