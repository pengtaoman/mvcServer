package com.neusoft.om.dao.organkind;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface OrganKindDAO extends BaseDao{
	/**
	 * ������֯�������Ͳ���֯��������Ψһ��¼��Ϣ
	 * @return OrganKindVO
	 * @throws DataAccessException
	 */
	public OrganKindVO getOrganKindInfoByOrganKind(int organKind) throws DataAccessException;
	/**
	 * ��ѯ������֯����������Ϣ
	 * @return OrganKindColl
	 * @throws DataAccessException
	 */
	public OrganKindColl getOrganKindInfo() throws DataAccessException;
	/**
	 * ������֯����������Ϣ
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddOrganKindInfo(OrganKindVO vo) throws DataAccessException;
	/**
	 * �޸���֯����������Ϣ
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyOrganKindInfo(OrganKindVO vo) throws DataAccessException;
	/**
	 * ɾ����֯����������Ϣ
	 * @param organKind
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteOrganKindInfo(int organKind) throws DataAccessException;
	/**
	 * ������֯�������͵õ�ֱ���¼�����֯��������
	 * @param organKind
	 * @return OrganKindColl
	 */
	public OrganKindColl getChildOrganKindCollByOrganKind(int organKind) throws DataAccessException;
	/**
	 * ������֯�������������򼶱�,�õ���֯������Ϣ,ֻȡ��һ��(ʵ��ֻ��һ��,���ﷵ��collΪ�˳���ʵ�ַ���)
	 * @param areaLevel
	 * @return OrganKindColl
	 * @throws DataAccessException
	 */
	public OrganKindColl getOrganKindCollByLevel(int areaLevel) throws DataAccessException;

}
