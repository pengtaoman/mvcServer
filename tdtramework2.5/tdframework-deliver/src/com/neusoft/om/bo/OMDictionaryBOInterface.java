/*
 * <p>Title:       �򵥵ı���</p>
 * <p>Description: ����ϸ��˵��</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
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
     * �������ʵ��
     */
    public static final OMDictionaryBOInterface instance = null; // (OMDictionaryBO)OMAppContext.getParamBean(BEAN);

    /**
     * @param dictionaryDAO
     */
    public abstract void setDictionaryDAO(OMDictionaryDAO dictionaryDAO);

    /**
     * ��ȡְ����Ϣ��������
     * 
     * @return
     */
    public abstract ParamObjectCollection getBusDutyColl()
            throws DataAccessException;

    /**
     * 
     * ��ȡ�����̶Ȳ���������Ϣ
     * 
     * @return
     */
    public abstract ParamObjectCollection getEducateLevelColl()
            throws DataAccessException;

    /**
     * 
     * ��ȡ�Ա����ݲ���������Ϣ
     * 
     * @return
     */
    public abstract ParamObjectCollection getGenderColl()
            throws DataAccessException;

    /**
     * ����
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getIncomeColl()
            throws DataAccessException;

    /**
     * ����״��
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getMarriageStatusColl()
            throws DataAccessException;

    /**
     * ��֯��������
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getOrganKindColl()
            throws DataAccessException;

    /**
     * ����������Ա�б���Ϣ
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getOrganEmployeeColl(String organId,
            String employeeId) throws DataAccessException;
    /**
     * �������ڲ��ŵõ�ְ����Ϣ�б�
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
     * ����ְ����Ϣ�б�
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
     * ����������Ա�б���Ϣ -- ����ר��
     * @return
     * @throws DataAccessException
     */
    public abstract ParamObjectCollection getOrganEmployeeCollForChnl(String organId,
            String employeeId) throws DataAccessException;
}