/*
 * <p>Title:       简单的标题</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.bo;

import com.neusoft.om.dao.dictionary.OMDictionaryDAO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.DataAccessException;

public interface OMDictionaryBOInterface extends BaseBO
{

    public static final String BEAN = "omDictionaryFacade";

    /**
     * 参数类的实例
     */
    public static final OMDictionaryBOInterface instance = null; // (OMDictionaryBO)OMAppContext.getParamBean(BEAN);

    /**
     * @param dictionaryDAO
     */
    public abstract void setDictionaryDAO(OMDictionaryDAO dictionaryDAO);

    /**
     * 获取职务信息参数数据
     * 
     * @return
     */
    public abstract ParamObjectCollection getBusDutyColl()
            throws DataAccessException;

    /**
     * 
     * 获取教育程度参数数据信息
     * 
     * @return
     */
    public abstract ParamObjectCollection getEducateLevelColl()
            throws DataAccessException;

    /**
     * 
     * 获取性别数据参数数据信息
     * 
     * @return
     */
    public abstract ParamObjectCollection getGenderColl()
            throws DataAccessException;

    /**
     * 收入
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getIncomeColl()
            throws DataAccessException;

    /**
     * 婚姻状况
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getMarriageStatusColl()
            throws DataAccessException;

    /**
     * 组织机构类型
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getOrganKindColl()
            throws DataAccessException;

    /**
     * 所属机构人员列表信息
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getOrganEmployeeColl(String organId,
            String employeeId) throws DataAccessException;
    /**
     * 根据所在部门得到职务信息列表
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getDutyColl(String organId) throws DataAccessException;
    /**
     * @param collection
     */
    public abstract void setBusDutyColl() throws DataAccessException;

    /**
     * @param collection
     */
    public abstract void setEducateLevelColl() throws DataAccessException;

    /**
     * @param collection
     */
    public abstract void setGenderColl() throws DataAccessException;

    /**
     * 
     * @throws DataAccessException
     */
    public abstract void setIncomeColl() throws DataAccessException;

    public abstract void setOrganKindColl() throws DataAccessException;

    public abstract void setMarriageStatusColl() throws DataAccessException;

    public abstract void setOrganEmployeeColl(String organId, String employeeId)
            throws DataAccessException;
    /**
     * 设置职务信息列表
     * @param organId
     * @throws DataAccessException
     */
    public abstract void setDutyColl (String organId) throws DataAccessException;    
    
    public abstract void setDutyCollection() throws DataAccessException ;
    
    public abstract void setOrganCollByAreaId(String areaId) throws DataAccessException;
    
    public abstract void setAreaColl() throws DataAccessException ;
    
    public abstract ParamObjectCollection getDutyCollection() throws DataAccessException ;
    
    public abstract ParamObjectCollection getAreaColl() throws DataAccessException;
    
    public abstract ParamObjectCollection getAreaCollByAreaId(String areaId) throws DataAccessException;
    
    public abstract ParamObjectCollection getOrganCollByAreaId(String areaId) throws DataAccessException ;
    
    public abstract ParamObjectCollection getPersonLevelColl() throws DataAccessException;
    
    public abstract ParamObjectCollection getOperLevelColl() throws DataAccessException;
    
    /**
     * 所属机构人员列表信息 -- 渠道专用
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getOrganEmployeeCollForChnl(String organId,
            String employeeId) throws DataAccessException;
}