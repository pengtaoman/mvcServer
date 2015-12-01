package com.neusoft.om.dao.region;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface PoliticalLocationDAO   extends BaseDao {
	public static final String BEAN_ID="politicalLocationDAO";
	
	/**
	 * ���ݹ��ù��������ţ���ȡ������������������Ϣ
	 * @param commonRegionId
	 * @return
	 */
	PoliticalLocationColl getPoliticalLocationColl(long commonRegionId) throws DataAccessException;;
	
	/**
	 * ɾ�����ù�����������������Ĺ�����ϵ
	 * @param commonRegionId
	 * @return
	 */
	int deletePoliticalLocation(long commonRegionId) throws DataAccessException;;
	
	/**
	 * ��������������μ���
	 * @param politicalLocationRoot
	 * @return
	 */
	PoliticalLocationColl getPoliticalLocationTreeColl(PoliticalLocationColl politicalLocationRoot) throws DataAccessException;
 
	/**
	 * �������ù�����������������Ĺ�����ϵ
	 * @param commonRegionId
	 * @return
	 */
	int insertPoliticalLocation(PoliticalLocationVO vo) throws DataAccessException;;
}
