package com.neusoft.om.dao.address;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-08</p>
 * <p>Module     : om</p>
 * <p>Description: ��֯������ַ��dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface AddressDAO extends BaseDao {
	public static final String BEAN = "addressDAO";
	/**
	 * ����������ַ�����ѯ��ַ��Ϣ
	 * @param addressId
	 * @return AddressVO
	 * @throws DataAccessException
	 */
	public AddressVO getAddressInfoByAddressId(int addressId) throws DataAccessException;
	/**
	 * ������֯����Id��ѯ����֯�����ĵ�ַ��Ϣ
	 * @param organId
	 * @return AddressColl
	 * @throws DataAccessException
	 */
	public AddressColl getAddressInfoByOrganId(String organId) throws DataAccessException;
	/**
	 * ����һ����¼
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddAddressInfo(AddressVO vo) throws DataAccessException;
	/**
	 * ���������޸�һ����¼
	 * @param vo
	 * @return int
	 * @throws DataAccessException
	 */
	public int doModifyAddressInfo(AddressVO vo) throws DataAccessException;
	/**
	 * ��������addressIdɾ��һ����¼
	 * @param addressId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteAddressInfoById(int addressId)throws DataAccessException;
	/**
	 * ������֯����Idɾ������֯�����µ����е�ַ��Ϣ
	 * @param organId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteAddressInfoByOrganId(String organId)throws DataAccessException;

}