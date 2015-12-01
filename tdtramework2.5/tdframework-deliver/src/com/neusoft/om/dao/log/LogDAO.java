package com.neusoft.om.dao.log;

import java.util.HashMap;
import java.util.Map;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-09</p>
 * <p>Module     : om</p>
 * <p>Description: 日志dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface LogDAO extends BaseDao {
	public static final String BEAN = "logDAO";
	/**
	 * 组合条件查询
	 * @param systemId
	 * @return
	 */
	public LogColl getLogInfo(String partCity, String systemId, String menuId, String partMonth, String begTime, String endTime) throws DataAccessException;
	/**
	 * 增加记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddLogInfo(LogVO vo) throws DataAccessException;
    /**
     * 通过存储过程记录操作日志
     * @return
     */
    //public int doAddLogInfoByProc(HashMap map) throws DataAccessException;
    
    /**
     * 得到日志信息集合
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogColl getLogInfo(HashMap map,int startRow,int endRow) throws DataAccessException;
    /**
     * 得到日志信息集合
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogColl getLogInfo(HashMap map) throws DataAccessException;
    
    /**
     * 得到日志信息集合总行数
     * @param map
     * @return
     * @throws DataAccessException
     */
    public int getLogRowCount(HashMap map) throws DataAccessException;
    
    public LogVO getLogInfoBySequence(int no) throws DataAccessException;
    /**
     * 根据 登录帐号 和 操作时间 获取日志详细信息
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogVO getDetailLogInfo(String partCity,int partMM,String workNo,
        String operTime) throws DataAccessException;
    
	public int doAddLogInfoByProc(HashMap map)  throws DataAccessException;
    
    /**
     * 根据menu_id获取权限信息，返回信息包括
     * 		bottomId		
     * 		bottomName		
     * 		menuId	
     * 		menuName		
     * 		systemId
     * 		log		日志类型，是否记录日志。1，记录日志；0，不记录日志		
     * @param menuId
     * @return
     * @throws DataAccessException
     */
    public Map<String,String> getPrivilegeInfoByMenuId(String bottomId,String systemId)throws DataAccessException;
    
    /**
     * 根据工号获取员工编码
     * @param menuId
     * @return
     * @throws DataAccessException
     */
    public String getEmployeeIdByWorkNo(String workNo) throws DataAccessException;
    
    /**
     * 根据登录账号得到其对应的区域编号
     * @param workNo
     * @return
     * @throws DataAccessException
     */
    public String getAreaIdByWorkNo(String workNo) throws DataAccessException;
    
    public String getPartCityByAreaId(String areaId) throws DataAccessException;
    /**
     * 根据隐藏域中所绑定的按钮值，该值对应OM_MENU_T表中的主键F_MENU_ID值
     * @param btnID
     * @return
     * @throws DataAccessException
     * 20110504 added by zhangjn
     */
    public LogVO isWriteLogs(String btnID) throws DataAccessException;

}
	