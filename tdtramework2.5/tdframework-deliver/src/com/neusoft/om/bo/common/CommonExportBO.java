package com.neusoft.om.bo.common;

import java.util.Vector;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

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

public interface CommonExportBO extends BaseBO {
	public static final String BEAN = "areaFacade";
	/**
	 * ����AreaDAO
	 * @param dao
	 */
	public void setAreaDAO(AreaDAO dao);
	/**
	 * ������������Id��ѯ����������Ϣ
	 * @param areaId
	 * @return AreaVO
	 * @throws ServiceException
	 */
	public AreaVO getAreaInfoById(String areaId) throws ServiceException;
	/**
	 * �õ���������������Ϣ
	 * @return
	 * @throws ServiceException
	 */
	public AreaColl getAreaAllInfo() throws ServiceException;
	/**
	 * �޸�����������Ϣ
	 * @param areaVO
	 * @return 1:�ɹ� 0:ʧ��
	 * @throws ServiceException
	 */
	public int doModifyAreaInfo(AreaVO areaVO) throws ServiceException;
	/**
	 * �޸�����������Ϣ--ylm
	 * @param areaVO
	 * @return
	 * @throws DataAccessException
	 */
	public String modifyAreaInfo(AreaVO vo) throws ServiceException;
	/**
	 * ��������������Ϣ
	 * @param areaVO
	 * @return 1:�ɹ� 0:ʧ��
	 * @throws ServiceException
	 */
	public int doAddAreaInfo(AreaVO areaVO) throws ServiceException;
	/**
	 * ������������IDɾ����Ϣ
	 * @param areaId
	 * @return 1:�ɹ� 0:ʧ��
	 * @throws ServiceException
	 */
	public int doDeleteAreaInfoById(String areaId) throws ServiceException;
	/**
	 * ����areaId�õ�����������Ϣ
	 * @param areaId
	 * @return String
	 * @throws ServiceException
	 */
	public String getPartCityByAreaId(String areaId) throws ServiceException;
    
    /**
     * ������������Id�õ��ϼ���������ļ���
     * @param areaId 
     * @return areaLevel
     * @throws DataAccessException
     */
    public int getAreaLevelByAreaId(String areaId) throws ServiceException;
    /**
     * ���ݲ���Ա����������ȡ���е�������Ϣ
     * @param areaId areaLevel
     * @return areaLevel
     * @throws DataAccessException
     */
    public Vector getAllAreaInfo(String areaId,int areaLevel) throws ServiceException;
    
    
    
}
