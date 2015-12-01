package com.neusoft.om.dao.funcrole;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: ���ܽ�ɫ��dao�ӿ�</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public interface FuncRoleDAO extends BaseDao {
	public static final String BEAN = "funcRoleDAO";
	/**
	 * ����������ѯ
	 * @param roleId
	 * @param menuId
	 * @return FuncRoleVO
	 * @throws DataAccessException
	 */
	public FuncRoleVO getFuncRoleInfoByKey(int roleId,String menuId) throws DataAccessException;
	/**
	 * ���ݽ�ɫ��ʶ��ѯ�˵���Ϣ
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public FuncRoleColl getFuncRoleInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * �õ�����ԭ���˵�ǰ��ɫ��,������ɫ�Ĳ˵���Ϣ
	 * �˷��ؽ����roleId��ʵ������
	 * adminStatus ��ʶ��ȨȨ�޵ĺ�(>=1˵��������ɫҲ���˸ò���Ա��Ȩ��)
	 * execStatus ��ʶִ��Ȩ�޵ĺ�(>=1˵��������ɫҲ���˸ò���Ա��Ȩ��)
	 * @param employeeId
	 * @param roleId
	 * @return FuncRoleColl
	 * @throws DataAccessException
	 */
	public FuncRoleColl getFuncRoleInfoByEmployeeId(String employeeId,int roleId) throws DataAccessException;
	/**
	 * ����һ�����ܽ�ɫ��Ϣ
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddFuncRole(FuncRoleVO vo) throws DataAccessException;
	/**
	 * ���ӹ��ܽ�ɫ�����
	 * @param coll
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddFuncRole(FuncRoleColl coll) throws DataAccessException;
	/**
	 * �޸�һ����¼
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyFuncRole(FuncRoleVO vo) throws DataAccessException;
	/**
	 * ����roleIdɾ����¼
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteFuncRoleByRoleId(int roleId) throws DataAccessException;
	/**
	 * ����ְ���ʶ�Ͳ˵���ʶ�ӹ��ܽ�ɫ����ɾ����¼(���н����ڸ�ְ���ϵĽ�ɫ,����õ��ò˵�,��Ӧɾ��)
	 * @param roleId
	 * @param menuId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteFuncRoleByDutyIdMenuId(int roleId,String menuId) throws DataAccessException;
	
	/**
	 * ɾ����ɫ�˵���Ӧ��ϵ
	 * @param funcRoleColl
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteFuncRole(FuncRoleColl funcRoleColl) throws DataAccessException;
	
	public int getRowCount(String employeeId) throws DataAccessException;
	
	public FuncRoleColl getFuncRole( int roleId,String systemId) throws DataAccessException;
	
	
}