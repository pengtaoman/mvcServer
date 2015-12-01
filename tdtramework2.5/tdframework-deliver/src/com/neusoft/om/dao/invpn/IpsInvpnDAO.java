package com.neusoft.om.dao.invpn;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface IpsInvpnDAO extends BaseDao{
	/**
	 * ͨ����ַ���Ψһ��¼
	 * @param address
	 * @return
	 */
	public IpsInvpnVO getIpsInvpnVO(String address);
	
	/**
	 * ͨ����ַ��������ģ����ѯ�õ������
	 * @param address
	 * @param description
	 * @return
	 */
	public IpsInvpnColl getIpsInvpn(String address, String description);
	
	/**
	 * ����һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddIpsInvpn(IpsInvpnVO vo) throws DataAccessException;
	
	/**
	 * �޸�
	 * @param vo,priAddress
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyIpsInvpn(IpsInvpnVO vo,String priAddress) throws DataAccessException;
	
	/**
	 * ɾ��
	 * @param address
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteIpsInvpn(String address) throws DataAccessException;
	
	/**
	 * ��ѯ������ҳ
	 * @param address
	 * @param desc
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws DataAccessException
	 */
	public List getIpsInvpnList(String address, String desc, int beginNum, int endNum) throws DataAccessException;
	
	public int getRowCount(String address, String desc) throws DataAccessException;
}
