/*
 * �������� 2006-7-12
 *
 * TODO Ҫ���Ĵ����ɵ��ļ���ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
package com.neusoft.om.dao.paramrole;

import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author Administrator
 *
 * TODO Ҫ���Ĵ����ɵ�����ע�͵�ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
public interface ParamRoleDAO extends BaseDao{
    
    public static final String BEAN = "paramroleDAO";
    
    /**
	 * ���Ӳ�����ɫ
	 * @param paramroleVO
	 * @return int
	 * @throws DataAccessException
	 */
    public  int doAddParamRole(ParamRoleVO paramroleVO) throws DataAccessException;

    /**
	 * �޸Ĳ�����ɫ
	 * @param paramRoleId
	 * @return int
	 * @throws DataAccessException
	 */
    public int doModifyParamRole(ParamRoleVO paramroleVO) throws DataAccessException;

    /**
	 * ���ݲ�����ɫroleIdɾ����Ϣ
	 * ����ý�ɫ��ʶ�ѱ�ʹ��������ɾ��
	 * @param roleId
	 * @return int
	 * @throws DataAccessException
	 */
    public String doDeleteParamRole(int roleId) throws DataAccessException;
    
    /**
	 * ����ְԱ����õ�������Ϣ
	 * @param emplyeeId
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    public ParamRoleColl getParamRoleInfoByEmployeeId(String emplyeeId) throws DataAccessException;
       
    /**
	 * ���ݲ�����ɫ���Ƶõ�������Ϣ
	 * @param paramroleName
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    public ParamRoleColl getParamRoleInfoByParamRoleName(String paramroleName,String emplyeeId) throws DataAccessException;
    
    
    /**
     * �õ�����Ա���й���Ȩ�Ĳ�����ɫ
     * @param currentEmpId ����Ա��employeeId
     * @return
     * @throws ServiceException
     */

    public ParamRoleColl getAssignableParamRoleColl(String currentEmpId) throws DataAccessException;
    
    /**
     * ���ְԱ����ʹ�õĲ�����ɫ�б�
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public ParamRoleColl getUsableParamRoleCollByEmployeeId(String employeeId) throws DataAccessException;
    
	/**
	 * ͨ��ְԱ����õ��䴴���Ľ�ɫ�б�
	 * 
	 * @param account
	 * @return
	 * @throws DataAccessException
	 */
    public ParamRoleColl getCreateParamRoleColl(String employeeId)	throws DataAccessException;
    
    public boolean haveRepeatName(String name ) throws DataAccessException;
    	
   
    
    
}
