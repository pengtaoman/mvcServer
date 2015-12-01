/*
 * �������� 2006-7-13
 *
 * TODO Ҫ���Ĵ����ɵ��ļ���ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
package com.neusoft.om.dao.employeeparamrolerelation;



import com.neusoft.om.dao.employeeparamrolerelation.EmployeeParamRoleRelationColl;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;



/**
 * @author Administrator
 *
 * TODO Ҫ���Ĵ����ɵ�����ע�͵�ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
public interface EmployeeParamRoleRelationDAO extends BaseDao{
    
    public static final String BEAN ="employeeParamRoleRelationDAO";
    
    /**
     *ɾ��ְԱ������ɫ��ϵ��Ϣ
     * @param employeeId
     * @return int
     * @throws DataAccessException
     */

    public int doDeleteEmployeeParamRoleRelationInfoByEmployeeId(String employeeId, String authId) throws DataAccessException;
    
    
    /**
     *���ְԱ������ɫ��ϵ��Ϣ
     * @param employeeId
     * @return int []
     * @throws DataAccessException
     */

    public int[] doAddEmployeeParamRoleRelationInfo(EmployeeParamRoleRelationColl coll) throws DataAccessException;
    
    /**
     * ����ְԱ��ţ��õ�ְԱ������ɫ��ϵ��Ϣ�б�
     * @param employeeId
     * @return EmployeeParamRoleRelationColl
     * @throws DataAccessException
     */
   public ParamRoleColl getEmployeeParamRoleRelationInfoByEmployeeId(String employeeId) throws DataAccessException;
       
}
