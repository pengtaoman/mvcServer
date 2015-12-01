/*
 * <p>Title:       ת������ӿ�</p>
 * <p>Description: ʵ��ͨ��id�õ�name��ͨ��name�õ�id�ķ���</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
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
     * �ж�areaId2�Ƿ���areaId1�Ĺ�Ͻ��Χ��
     * @param areaId1
     * @param areaId2
     * @return
     * @throws DataAccessException
     */
    public boolean includeArea(String areaId1, String areaId2) throws DataAccessException;
}
