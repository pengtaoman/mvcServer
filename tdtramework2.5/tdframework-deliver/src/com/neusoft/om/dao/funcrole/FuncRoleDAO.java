package com.neusoft.om.dao.funcrole;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: 功能角色的dao接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface FuncRoleDAO extends BaseDao {
	public static final String BEAN = "funcRoleDAO";
	/**
	 * 根据主键查询
	 * @param roleId
	 * @param menuId
	 * @return FuncRoleVO
	 * @throws DataAccessException
	 */
	public FuncRoleVO getFuncRoleInfoByKey(int roleId,String menuId) throws DataAccessException;
	/**
	 * 根据角色标识查询菜单信息
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public FuncRoleColl getFuncRoleInfoByRoleId(int roleId) throws DataAccessException;
	/**
	 * 得到操作原除了当前角色外,其他角色的菜单信息
	 * 此返回结果中roleId无实际意义
	 * adminStatus 标识授权权限的合(>=1说明其他角色也给了该操作员此权限)
	 * execStatus 标识执行权限的合(>=1说明其他角色也给了该操作员此权限)
	 * @param employeeId
	 * @param roleId
	 * @return FuncRoleColl
	 * @throws DataAccessException
	 */
	public FuncRoleColl getFuncRoleInfoByEmployeeId(String employeeId,int roleId) throws DataAccessException;
	/**
	 * 增加一条功能角色信息
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddFuncRole(FuncRoleVO vo) throws DataAccessException;
	/**
	 * 增加功能角色结果集
	 * @param coll
	 * @return int
	 * @throws DataAccessException
	 */
	public int doAddFuncRole(FuncRoleColl coll) throws DataAccessException;
	/**
	 * 修改一条记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyFuncRole(FuncRoleVO vo) throws DataAccessException;
	/**
	 * 根据roleId删除记录
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteFuncRoleByRoleId(int roleId) throws DataAccessException;
	/**
	 * 根据职务标识和菜单标识从功能角色表中删除记录(所有建立在该职务上的角色,如果用到该菜单,都应删除)
	 * @param roleId
	 * @param menuId
	 * @return int
	 * @throws DataAccessException
	 */
	public int doDeleteFuncRoleByDutyIdMenuId(int roleId,String menuId) throws DataAccessException;
	
	/**
	 * 删除角色菜单对应关系
	 * @param funcRoleColl
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteFuncRole(FuncRoleColl funcRoleColl) throws DataAccessException;
	
	public int getRowCount(String employeeId) throws DataAccessException;
	
	public FuncRoleColl getFuncRole( int roleId,String systemId) throws DataAccessException;
	
	
}