package com.neusoft.om.dao.dictionary;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-04</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���      ����      �޸���         �޸�ԭ��</p>
 * <p>   1                                       </p>
 */

public interface OMDictionaryDAO extends BaseDao{
    
    public static final String BEAN = "omDictionaryDAO";

    /**
     * ��ȡ�����Ա�Ĳ������ݣ�
     * 
     */ 
    public ParamObjectCollection getGenderColl() throws DataAccessException ;
    
    /**
     * ��ȡѧ����������
     * 
     */
    public ParamObjectCollection getEducateLevelColl() throws DataAccessException ;
    
    /**
     * ��ȡְλ�������� 
     *
     */
    public ParamObjectCollection getBusDutyColl() throws DataAccessException ;
    /**
     *��ȡн�ʷ�Χ 
     *
     */
    public ParamObjectCollection getIncomeColl() throws DataAccessException ;
    /**
     * ��ȡ��֯��������
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOrganKindColl() throws DataAccessException ;
    /**
     * ��ȡ����״��
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getMarriageStatusColl() throws DataAccessException ;
    
    /**
     * ��ȡ������֯������Ա��Ϣ
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOrganEmployeeColl(String organId,String employeeId) throws DataAccessException ;
    /**
     * ������֯����id�õ�ְ����Ϣ�б�
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getDutyColl (String organId) throws DataAccessException;
    
    
    public ParamObjectCollection getDutyColl () throws DataAccessException;
    
    public ParamObjectCollection getOrganInfoByAreaId (String areaId) throws DataAccessException;
    
    public ParamObjectCollection getAreaColl() throws DataAccessException;
    
    public ParamObjectCollection getAreaColl(String areaId) throws DataAccessException;
    
    public ParamObjectCollection getPersonLevelColl() throws DataAccessException;
    /**
     * ��ȡ���������б�
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOperLevelColl() throws DataAccessException;
    
    /**
     * ��ȡ������֯������Ա��Ϣ -- תΪ����ϵͳ�ṩ
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOrganEmployeeCollForChnl(String organId,String employeeId) throws DataAccessException ;
    /**
     * ���areaId�ǵ��У�level = 3����õ�areaIdȷ��������
     * ���areaId��ʡ�ݻ����ģ�level <= 2����õ�ʡ����ȫ���ĵ�����Ϣ 
     * ���areaId���������¼���������򷵻ؿ�
     * @param areaId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaCollLevel3(String areaId) throws DataAccessException;
    /**
     * ���areaId�ǵ��У�level = 3����õ�areaIdȷ��������
     * ���areaId��ʡ�ݻ����ģ�level <= 2����õ�ʡ����ȫ���ĵ�����Ϣ 
     * ���areaId���������¼���������򷵻ؿ�
     * @param areaId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaColl(String areaId,int areaLevel) throws DataAccessException;
    
    public ParamObjectCollection getAreaLevel() throws DataAccessException;
    
    public ParamObjectCollection getContainerColl() throws DataAccessException;
    
    public ParamObjectCollection getOperLevelColl(int adminLevel) throws DataAccessException;
}
