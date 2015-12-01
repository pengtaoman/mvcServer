package com.neusoft.om.dao.dutyrolerelation;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;


/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: ʵ��ְ��ͽ�ɫ��ϵ��dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface DutyRoleRelationDAO extends BaseDao {

	public static final String BEAN = "dutyRoleRelationDAO";
	/**
	 * ����һ����¼��ְ�����ɫ��Ӧ��ϵ����
	 * @param vo
	 * @return int 1:�ɹ�;0:ʧ��
	 * @throws DataAccessException
	 */
	public int doAddDutyRoleRelation(DutyRoleRelationVO vo) throws DataAccessException;
	/**
	 * ���Ӷ�����¼��ְ���ɫ��Ӧ��ϵ����
	 * @param vo
	 * @return int[] 
	 * @throws DataAccessException
	 */
	public int[] doAddDutyRoleRelation(DutyRoleRelationColl coll) throws DataAccessException;
	/**
	 * ���ݽ�ɫ��ʶɾ����Ϣ
	 * @param roleId
	 * @return int 1:�ɹ�;0:ʧ��
	 * @throws DataAccessException
	 */
	public int doDeleteAllInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * ����ְ���ʶɾ����Ϣ
	 * @param dutyId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteAllInfoByDutyId(int dutyId) throws DataAccessException;
	/**
	 * ��������ɾ����Ϣ
	 * @param dutyId
	 * @param roleId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteInfoByKey(int dutyId,int roleId) throws DataAccessException;
}
