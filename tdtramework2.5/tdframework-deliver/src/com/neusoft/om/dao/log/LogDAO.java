package com.neusoft.om.dao.log;

import java.util.HashMap;
import java.util.Map;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: ��־dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface LogDAO extends BaseDao {
	public static final String BEAN = "logDAO";
	/**
	 * ���������ѯ
	 * @param systemId
	 * @return
	 */
	public LogColl getLogInfo(String partCity, String systemId, String menuId, String partMonth, String begTime, String endTime) throws DataAccessException;
	/**
	 * ���Ӽ�¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddLogInfo(LogVO vo) throws DataAccessException;
    /**
     * ͨ���洢���̼�¼������־
     * @return
     */
    //public int doAddLogInfoByProc(HashMap map) throws DataAccessException;
    
    /**
     * �õ���־��Ϣ����
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogColl getLogInfo(HashMap map,int startRow,int endRow) throws DataAccessException;
    /**
     * �õ���־��Ϣ����
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogColl getLogInfo(HashMap map) throws DataAccessException;
    
    /**
     * �õ���־��Ϣ����������
     * @param map
     * @return
     * @throws DataAccessException
     */
    public int getLogRowCount(HashMap map) throws DataAccessException;
    
    public LogVO getLogInfoBySequence(int no) throws DataAccessException;
    /**
     * ���� ��¼�ʺ� �� ����ʱ�� ��ȡ��־��ϸ��Ϣ
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogVO getDetailLogInfo(String partCity,int partMM,String workNo,
        String operTime) throws DataAccessException;
    
	public int doAddLogInfoByProc(HashMap map)  throws DataAccessException;
    
    /**
     * ����menu_id��ȡȨ����Ϣ��������Ϣ����
     * 		bottomId		
     * 		bottomName		
     * 		menuId	
     * 		menuName		
     * 		systemId
     * 		log		��־���ͣ��Ƿ��¼��־��1����¼��־��0������¼��־		
     * @param menuId
     * @return
     * @throws DataAccessException
     */
    public Map<String,String> getPrivilegeInfoByMenuId(String bottomId,String systemId)throws DataAccessException;
    
    /**
     * ���ݹ��Ż�ȡԱ������
     * @param menuId
     * @return
     * @throws DataAccessException
     */
    public String getEmployeeIdByWorkNo(String workNo) throws DataAccessException;
    
    /**
     * ���ݵ�¼�˺ŵõ����Ӧ��������
     * @param workNo
     * @return
     * @throws DataAccessException
     */
    public String getAreaIdByWorkNo(String workNo) throws DataAccessException;
    
    public String getPartCityByAreaId(String areaId) throws DataAccessException;
    /**
     * ���������������󶨵İ�ťֵ����ֵ��ӦOM_MENU_T���е�����F_MENU_IDֵ
     * @param btnID
     * @return
     * @throws DataAccessException
     * 20110504 added by zhangjn
     */
    public LogVO isWriteLogs(String btnID) throws DataAccessException;

}
	