package com.neusoft.om.dao.region;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface CommonRegionDAO  extends BaseDao {
	public static final String BEAN_ID="commonRegionDAO";
	/**
	 * ��ȡ���Ź���������������
	 * @param commonRegionId
	 * @return
	 */
	CommonRegionColl getCommonRegionColl(long commonRegionId) throws DataAccessException;
	
	/**
	 * �������ƻ�ȡ���Ź���������������
	 * @param commonRegionId
	 * @return
	 */
	public CommonRegionColl getCommonRegionCollByName(long commonRegionId, String commonRegionName)  throws DataAccessException;
	
	/**
	 * ���չ������������ʶ������ȡ�������������ʶ
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	CommonRegionVO getCommonRegionVO(long commonRegionId) throws DataAccessException;
	
	
	/**
	 * �ж��Ƿ�Ϊ��ͼ���������
	 * @param regionType
	 * @return
	 * @throws DataAccessException
	 */
	boolean getIfViewButton(String regionType) throws DataAccessException;
	
	/**
	 * ���ݹ��ù��������ʶ��ɾ�����ù����������Ϣ
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	int deleteCommonRegion(long commonRegionId) throws DataAccessException;
	
	/**
	 * ��ȡ���ù������������б�
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	ParamObjectCollection getRegionTypeColl(long commonRegionId) throws DataAccessException;
	
	/**
	 * ��ȡ��ǰ���ù����������������
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	ParamObjectCollection getCurrentRegionTypeColl(long commonRegionId) throws DataAccessException;
	/**
	 * ��ȡ�µĹ��ù���������
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	long getRegionCode(long upCommonRegionId) throws DataAccessException;
	/**
	 * ��ȡ���򼶱�
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	int getRegionLevel(String regionType) throws DataAccessException;
	/**
	 * �������ù�������
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	int insertCommonRegion(CommonRegionVO vo) throws DataAccessException;
	
	/**
	 * �������ù�������
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	int updateCommonRegion(CommonRegionVO vo) throws DataAccessException;
	
	/**
	 * �������������Ƿ���Ա�ɾ��
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	boolean ifCanBeDelete(long commonRegionId) throws DataAccessException;
}
