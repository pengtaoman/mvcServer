/*
 * �������� 2006-7-12
 *
 * TODO Ҫ���Ĵ����ɵ��ļ���ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
package com.neusoft.om.bo;

import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.om.dao.paramrole.ParamRoleDAO;
import com.neusoft.om.dao.paramrole.ParamRoleVO;
import com.neusoft.om.dao.sequence.SequenceDAO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/*******************************************************************************
 * ������ : ParamRoleBOImpl.java 
 * ���� : 2006-7-12
 * ���� : wangwei@neusoft.com 
 * ģ�� : ���� :
 * ��ע :
 * 
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸���
 * �޸�ԭ�� 1 2
 ******************************************************************************/
public class ParamRoleBOImpl implements ParamRoleBO{

    
     private ParamRoleDAO paramroleDAO;
     private SequenceDAO sequenceDAO;
     /**
      * @param paramroleDAO Ҫ���õ� paramroleDAO��
      */
     public void setParamroleDAO(ParamRoleDAO paramroleDAO) {
         this.paramroleDAO = paramroleDAO;
     }
     /**
      * @param sequenceDAO Ҫ���õ� sequenceDAO��
      */
     public void setSequenceDAO(SequenceDAO sequenceDAO) {
         this.sequenceDAO = sequenceDAO;
     }
    
    /**
	 * ���Ӳ�����ɫ
	 * @param paramroleVO
	 * @return int
	 * @throws ServiceException
	 */
    public int doAddParamRole(ParamRoleVO paramroleVO) throws ServiceException {
        int code=1;
        
		try {
            code = paramroleDAO.doAddParamRole(paramroleVO);
        } catch (DataAccessException e) {
            code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"ParamRoleBOImpl--doAddParamRole:"+e.getMessage());
			throw new ServiceException(e);
        }
        
        return code;
    }

    /**
	 * �޸Ĳ�����ɫ
	 * @param paramRoleId
	 * @return int
	 * @throws ServiceException
	 */
    public int doModifyParamRole(ParamRoleVO paramroleVO) throws ServiceException {
        int code = -1; 
        
        try {
            code = paramroleDAO.doModifyParamRole(paramroleVO);
        } catch (DataAccessException e) {
            code=0;
            SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamRoleBOImpl --doModifyParamRole:"+ e.getMessage());
			throw new ServiceException(e);
        }
        
        return code;
    }
 
    /**
	 * ���ݲ�����ɫroleIdɾ����Ϣ
	 * ����ý�ɫ��ʶ�ѱ�ʹ��������ɾ��
	 * @param roleId
	 * @return int
	 * @throws ServiceException
	 */
    public String doDeleteParamRole(int roleId) throws ServiceException {
    	String message = ""; 
        
        try {
        	message = paramroleDAO.doDeleteParamRole(roleId);
        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamRoleBOImpl --doDeleteParamRole:"+ e.getMessage());
			throw new ServiceException(e);
        }
        
        return message;
    }

    /**
	 * ����ְԱ����õ�������Ϣ
	 * @param emplyeeId
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    public ParamRoleColl getParamRoleInfoByEmployeeId(String emplyeeId) 
    	throws ServiceException {
        ParamRoleColl coll=new ParamRoleColl();
        
        try {
            coll = paramroleDAO.getParamRoleInfoByEmployeeId(emplyeeId);
        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamRoleBOImpl --getParamRoleInfoByEmployeeId:"
							+ e.getMessage());
			throw new ServiceException(e);
        }
        
        return coll;
    }

    /**
	 * ���ݲ�����ɫ���Ƶõ�������Ϣ
	 * @param paramroleName
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    public ParamRoleColl getParamRoleInfoByParamRoleName(String paramroleName,
    		String emplyeeId) throws ServiceException {
        ParamRoleColl coll=new ParamRoleColl();
        
        try {
            coll = paramroleDAO.getParamRoleInfoByParamRoleName(paramroleName,emplyeeId);
        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamRoleBOImpl --getParamRoleInfoByParamRoleName:"
							+ e.getMessage());
			throw new ServiceException(e);
        }
        
        return coll;
    }
    
    /**
     * ���ְԱ����ʹ�õĲ�����ɫ�б�
     * @param employeeId
     * @return
     * @throws ServiceException
     */
    public ParamRoleColl getUsableParamRoleCollByEmployeeId(String employeeId) 
    	throws ServiceException{
        ParamRoleColl coll=new ParamRoleColl();
        
        try {
            coll = paramroleDAO.getUsableParamRoleCollByEmployeeId(employeeId);
        } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR,
                    "ParamRoleBOImpl --getUsableParamRoleCollByEmployeeId:"
                            + e.getMessage());
            throw new ServiceException(e);
        }
        
        return coll;
    }

    
}
