/*
 * 创建日期 2006-7-12
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
package com.neusoft.om.dao.paramrole;

import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;

/**
 * @author Administrator
 *
 * TODO 要更改此生成的类型注释的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
public interface ParamRoleDAO extends BaseDao{
    
    public static final String BEAN = "paramroleDAO";
    
    /**
	 * 增加参数角色
	 * @param paramroleVO
	 * @return int
	 * @throws DataAccessException
	 */
    public  int doAddParamRole(ParamRoleVO paramroleVO) throws DataAccessException;

    /**
	 * 修改参数角色
	 * @param paramRoleId
	 * @return int
	 * @throws DataAccessException
	 */
    public int doModifyParamRole(ParamRoleVO paramroleVO) throws DataAccessException;

    /**
	 * 根据参数角色roleId删除信息
	 * 如果该角色标识已被使用则不允许删除
	 * @param roleId
	 * @return int
	 * @throws DataAccessException
	 */
    public String doDeleteParamRole(int roleId) throws DataAccessException;
    
    /**
	 * 根据职员编码得到参数信息
	 * @param emplyeeId
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    public ParamRoleColl getParamRoleInfoByEmployeeId(String emplyeeId) throws DataAccessException;
       
    /**
	 * 根据参数角色名称得到参数信息
	 * @param paramroleName
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    public ParamRoleColl getParamRoleInfoByParamRoleName(String paramroleName,String emplyeeId) throws DataAccessException;
    
    
    /**
     * 得到操作员具有管理权的参数角色
     * @param currentEmpId 操作员的employeeId
     * @return
     * @throws ServiceException
     */

    public ParamRoleColl getAssignableParamRoleColl(String currentEmpId) throws DataAccessException;
    
    /**
     * 获得职员可以使用的参数角色列表
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public ParamRoleColl getUsableParamRoleCollByEmployeeId(String employeeId) throws DataAccessException;
    
	/**
	 * 通过职员编码得到其创建的角色列表
	 * 
	 * @param account
	 * @return
	 * @throws DataAccessException
	 */
    public ParamRoleColl getCreateParamRoleColl(String employeeId)	throws DataAccessException;
    
    public boolean haveRepeatName(String name ) throws DataAccessException;
    	
   
    
    
}
