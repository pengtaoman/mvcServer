package com.neusoft.om.dao.organdutyrelation;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: ��֯������ְ���Ӧ��ϵ��dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface OrganDutyRelationDAO extends BaseDao {
	public static final String BEAN = "organDutyRelationDAO";
	/**
	 * ����һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddOrganDutyRelationInfo(OrganDutyRelationVO vo)throws DataAccessException;
	/**
	 * ���Ӷ�����¼
	 * @param coll
	 * @return int[]
	 * @throws DataAccessException
	 */
	public int[] doAddOrganDutyRelationInfo(OrganDutyRelationColl coll)throws DataAccessException;
	/**
	 * ������֯�������ͺ�ְ�����ά���������ڸ����͵���֯����,�����Ӵ�ְ��
	 * @param organKind
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddOrganDutyRelationInfo(int organKind,int dutyId)throws DataAccessException;
	/**
	 * ���ݴ������֯����Id���Ӹ���֯�����µ�ְ����Ϣ
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddOrganDutyRelationInfo(String organId,int organKind) throws DataAccessException;
	/**
	 * ����֯����idɾ����¼
	 * @param organId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteOrganDutyRelationInfoByOrganId(String organId)throws DataAccessException;
	/**
	 * ��ְ��idɾ��
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteOrganDutyRelationInfoByDuytId(int dutyId)throws DataAccessException;
	
}
