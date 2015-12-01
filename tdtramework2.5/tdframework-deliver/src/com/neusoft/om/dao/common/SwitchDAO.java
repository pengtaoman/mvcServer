/*
 * <p>Title:       转换程序接口</p>
 * <p>Description: 实现通过id得到name或通过name得到id的方法</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.dao.common;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface SwitchDAO extends BaseDao
{
    public String getEmoployeeNameById(String employeeId) throws DataAccessException;
        
    public String getDutyNameByDutyId(String dutyId) throws DataAccessException;
    
    public String getOrganNameByOrganId(String organId) throws DataAccessException;
    
    public String getRoleNameByRoleId(int roleId) throws DataAccessException;
    
    public int getRoleNumByEmoployeeId(String employeeId) throws DataAccessException;
    
    public String getRoleInfoByEmoployeeId(String employeeId) throws DataAccessException;
    
    public String getAreaNameByAreaId(String areaId) throws DataAccessException;
    
    public String getSystemNameById(String systemId) throws DataAccessException;
    
    public String getPersonLevelNameById(int levelCode) throws DataAccessException;
 
    public String getDealerNameById(String dealerId) throws DataAccessException;
    
    public String getAreaLevelById(String areaId) throws DataAccessException;
    /**
     * 判断areaId2是否在areaId1的管辖范围内
     * @param areaId1
     * @param areaId2
     * @return
     * @throws DataAccessException
     */
    public boolean includeArea(String areaId1, String areaId2) throws DataAccessException;
}
