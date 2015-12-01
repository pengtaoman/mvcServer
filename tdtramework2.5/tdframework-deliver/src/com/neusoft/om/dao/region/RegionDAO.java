package com.neusoft.om.dao.region;

import java.util.Map;
import java.util.Vector;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-11-01</p>
 * <p>Module     : om</p>
 * <p>Description: area maintenance</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface RegionDAO extends BaseDao {
	
	public static final String BEAN = "areaDAO";
	//public static final AreaDAO instance = (AreaDAO)OMAppContext.getBean(BEAN);
	/**
	 * ��������������������Ϣ
	 * @param areaId
	 * @return AreaVO
	 * @throws DataAccessException
	 */
	public AreaVO getAreaById(String areaId) throws DataAccessException;
	/**
	 * �õ�ȫ��������������
	 * @return
	 * @throws DataAccessException
	 */
	public AreaColl getAreaAllInfo() throws DataAccessException;
	
	public AreaColl getAreaAllInfo(String areaId) throws DataAccessException;
	
	public AreaColl getAreaInfoByOrgan(String organId) throws DataAccessException;
	/**
	 * ����areaId�õ�����areaId�������¼��������������
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public AreaColl getAreaChildColl(String areaId) throws DataAccessException;
	/**
	 * ������������Id�õ��ϼ���������ļ���
	 * @param areaId 
	 * @return areaLevel
	 * @throws DataAccessException
	 */
	public int getAreaLevelByAreaId(String areaId) throws DataAccessException;
	/**
	 * ���������������õ�������������
	 * @param areaId
	 * @return
	 * @throws DataAccessException
	 */
	public String getAreaNameByAreaId(String areaId) throws DataAccessException;
	/**
	 * ��������������Ϣ
	 * @param areaVO
	 * @return 1:�ɹ� 0:ʧ��
	 * @throws DataAccessException
	 */
	public int doAddAreaInfo(RegionVO areaVO) throws DataAccessException;
	/**
	 * ��������������Ϣ--ylm
	 * @param areaVO
	 * @return
	 * @throws DataAccessException
	 */
	public String addAreaInfo(RegionVO vo) throws DataAccessException;
	/**
	 * �޸�����������Ϣ
	 * @param areaVO
	 * @return 1:�ɹ� 0:ʧ��
	 * @throws DataAccessException
	 */
	public int doModifyAreaInfo(AreaVO areaVO) throws DataAccessException;
	/**
	 * �޸�����������Ϣ--ylm
	 * @param areaVO
	 * @return
	 * @throws DataAccessException
	 */
	public int modifyAreaInfo(AreaVO vo) throws DataAccessException;
	/**
	 * ��������ɾ������������Ϣ
	 * @param areaId
	 * @return 1:�ɹ� 0:ʧ��
	 * @throws DataAccessException
	 */
	public int doDeleteAreaInfo(String areaId) throws DataAccessException;
	
	public AreaColl getAreaInnerTree() throws DataAccessException;
	
	/**
	 * ����cityCode�õ�AreaVO
	 * @param cityCode
	 * @return
	 * @throws DataAccessException
	 */
	public AreaVO getAreaByCityCode(String cityCode) throws DataAccessException;

	/**
	 * �õ�������������֮������򼯺�
	 * @param level1
	 * @param level2
	 * @return
	 * @throws DataAccessException
	 */
    public AreaColl getAreaByLevel(int level1, int level2) throws DataAccessException;
    /**
     * �õ�ʡ��(minLevel)�����¼�������areaId���ϼ���areaIdȷ��������֮����������򼯺�
     * @param areaId
     * @return
     * @throws DataAccessException
     */
    public AreaColl getAreaCollByAuthAreaId(String areaId) throws DataAccessException;
    /**
     * ���ݲ�ѯ�������������Ϣ����
     * @param dataMap
     * @return
     * @throws DataAccessException
     */
    public AreaColl getAreaColl(Map dataMap) throws DataAccessException;
    /**
     * ���ݲ�ѯ�������������Ϣ����������
     * @param dataMap
     * @return
     * @throws DataAccessException
     */
    public int getAreaRowCount(Map dataMap) throws DataAccessException;
    /**
     * ���ݲ�ѯ�������������Ϣ����
     * @param dataMap
     * @return
     * @throws DataAccessException
     */
    public AreaColl getAreaCollInfo(Map dataMap) throws DataAccessException;
    /**
     * �õ��ϼ�����������areaId
     * @param parentAreaId
     * @return
     * @throws DataAccessException
     */
    public String getMaxAreaId(String parentAreaId) throws DataAccessException;
    /**
     * ���ݲ���Ա�����򼶱��ȡ��һ����������Ϣ
     * @param parentAreaId
     * @return
     * @throws DataAccessException
     */
    public String getFirseAreaInfo(int areaLevel) throws DataAccessException;
    /**
     * ���ݲ���Ա����������ȡ���е�������Ϣ
     * @param parentAreaId
     * @return
     * @throws DataAccessException
     */
    public Vector getAllAreaInfo(String areaId,int areaLevel) 
    	throws DataAccessException;
    /**
     * �����ϼ�����������ȡ������������򼶱�
     * @param parentAreaId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaLevelByParent(String areaId) 
    	throws DataAccessException;
    /**
     * ������������ȡ������������򼶱�
     * @param parentAreaId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaLevelById(String areaId) 
    	throws DataAccessException;
    
    /**
     * ���ݵ�¼�˺ŵõ�����Բ鿴�ĵ�����Ϣ�б�
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaCollByEmp(String employeeId) 
    	throws DataAccessException;
    
    /**
     * ���ݵ��б���õ����������صļ���
     * @param areaId
     * @return
     * @throws DataAccessException
     */
    public AreaColl getCountryColl(String areaId) throws DataAccessException;
    /**
     * ����area_id�� areaLevel����innerTree
     * @param areaId
     * @param areaLevel
     * @return
     * @throws DataAccessException
     */
    public Vector getAreaVec(String areaId,int areaLevel) 
		throws DataAccessException;
    
    public Map getAllCityColl() throws DataAccessException;
}
