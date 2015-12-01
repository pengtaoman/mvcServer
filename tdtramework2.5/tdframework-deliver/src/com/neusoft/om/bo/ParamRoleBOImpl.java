/*
 * 创建日期 2006-7-12
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
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
 * 程序名 : ParamRoleBOImpl.java 
 * 日期 : 2006-7-12
 * 作者 : wangwei@neusoft.com 
 * 模块 : 描述 :
 * 备注 :
 * 
 * ------------------------------------------------------------
 * 修改历史 序号 日期 修改人
 * 修改原因 1 2
 ******************************************************************************/
public class ParamRoleBOImpl implements ParamRoleBO{

    
     private ParamRoleDAO paramroleDAO;
     private SequenceDAO sequenceDAO;
     /**
      * @param paramroleDAO 要设置的 paramroleDAO。
      */
     public void setParamroleDAO(ParamRoleDAO paramroleDAO) {
         this.paramroleDAO = paramroleDAO;
     }
     /**
      * @param sequenceDAO 要设置的 sequenceDAO。
      */
     public void setSequenceDAO(SequenceDAO sequenceDAO) {
         this.sequenceDAO = sequenceDAO;
     }
    
    /**
	 * 增加参数角色
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
	 * 修改参数角色
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
	 * 根据参数角色roleId删除信息
	 * 如果该角色标识已被使用则不允许删除
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
	 * 根据职员编码得到参数信息
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
	 * 根据参数角色名称得到参数信息
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
     * 获得职员可以使用的参数角色列表
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
