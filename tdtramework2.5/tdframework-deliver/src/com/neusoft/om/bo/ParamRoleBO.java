/*
 * �������� 2006-7-12
 *
 * TODO Ҫ���Ĵ����ɵ��ļ���ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
package com.neusoft.om.bo;
import com.neusoft.om.dao.paramrole.ParamRoleVO;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;
/**
 * @author Administrator
 *
 * TODO Ҫ���Ĵ����ɵ�����ע�͵�ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
public interface ParamRoleBO extends BaseBO{
    
    public static final String BEAN ="paramRoleFacade";
    
    /**
	 * ���Ӳ�����ɫ
	 * @param paramroleVO
	 * @return int
	 * @throws ServiceException
	 */
   
    public int doAddParamRole(ParamRoleVO paramroleVO) throws ServiceException;
    
    
    /**
	 * �޸Ĳ�����ɫ
	 * @param paramRoleId
	 * @return int
	 * @throws ServiceException
	 */
    
    public int doModifyParamRole(ParamRoleVO paramroleVO) throws ServiceException;
    
    /**
	 * ���ݲ�����ɫroleIdɾ����Ϣ
	 * ����ý�ɫ��ʶ�ѱ�ʹ��������ɾ��
	 * @param roleId
	 * @return int
	 * @throws ServiceException
	 */
    public String doDeleteParamRole(int roleId) throws ServiceException;
    
    /**
	 * ����ְԱ����õ�������Ϣ
	 * @param emplyeeId
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    public ParamRoleColl getParamRoleInfoByEmployeeId(String emplyeeId) throws ServiceException;
    
    /**
	 * ���ݲ�����ɫ���Ƶõ�������Ϣ
	 * @param paramroleName
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    
    public ParamRoleColl getParamRoleInfoByParamRoleName(String paramroleName,String emplyeeId) throws ServiceException;
    
    /**
     * ���ְԱ����ʹ�õĲ�����ɫ�б�
     * @param employeeId
     * @return
     * @throws ServiceException
     */
    public ParamRoleColl getUsableParamRoleCollByEmployeeId(String employeeId) throws ServiceException;
    
}
