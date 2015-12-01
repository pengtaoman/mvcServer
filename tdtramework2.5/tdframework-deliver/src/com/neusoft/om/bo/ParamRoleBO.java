/*
 * 创建日期 2006-7-12
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
package com.neusoft.om.bo;
import com.neusoft.om.dao.paramrole.ParamRoleVO;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;
/**
 * @author Administrator
 *
 * TODO 要更改此生成的类型注释的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
public interface ParamRoleBO extends BaseBO{
    
    public static final String BEAN ="paramRoleFacade";
    
    /**
	 * 增加参数角色
	 * @param paramroleVO
	 * @return int
	 * @throws ServiceException
	 */
   
    public int doAddParamRole(ParamRoleVO paramroleVO) throws ServiceException;
    
    
    /**
	 * 修改参数角色
	 * @param paramRoleId
	 * @return int
	 * @throws ServiceException
	 */
    
    public int doModifyParamRole(ParamRoleVO paramroleVO) throws ServiceException;
    
    /**
	 * 根据参数角色roleId删除信息
	 * 如果该角色标识已被使用则不允许删除
	 * @param roleId
	 * @return int
	 * @throws ServiceException
	 */
    public String doDeleteParamRole(int roleId) throws ServiceException;
    
    /**
	 * 根据职员编码得到参数信息
	 * @param emplyeeId
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    public ParamRoleColl getParamRoleInfoByEmployeeId(String emplyeeId) throws ServiceException;
    
    /**
	 * 根据参数角色名称得到参数信息
	 * @param paramroleName
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    
    public ParamRoleColl getParamRoleInfoByParamRoleName(String paramroleName,String emplyeeId) throws ServiceException;
    
    /**
     * 获得职员可以使用的参数角色列表
     * @param employeeId
     * @return
     * @throws ServiceException
     */
    public ParamRoleColl getUsableParamRoleCollByEmployeeId(String employeeId) throws ServiceException;
    
}
