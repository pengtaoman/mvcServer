/*
 * 创建日期 2006-7-13
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
package com.neusoft.om.dao.employeeparamrolerelation;



import com.neusoft.om.dao.employeeparamrolerelation.EmployeeParamRoleRelationColl;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;



/**
 * @author Administrator
 *
 * TODO 要更改此生成的类型注释的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
public interface EmployeeParamRoleRelationDAO extends BaseDao{
    
    public static final String BEAN ="employeeParamRoleRelationDAO";
    
    /**
     *删除职员参数角色关系信息
     * @param employeeId
     * @return int
     * @throws DataAccessException
     */

    public int doDeleteEmployeeParamRoleRelationInfoByEmployeeId(String employeeId, String authId) throws DataAccessException;
    
    
    /**
     *添加职员参数角色关系信息
     * @param employeeId
     * @return int []
     * @throws DataAccessException
     */

    public int[] doAddEmployeeParamRoleRelationInfo(EmployeeParamRoleRelationColl coll) throws DataAccessException;
    
    /**
     * 根据职员编号，得到职员参数角色关系信息列表
     * @param employeeId
     * @return EmployeeParamRoleRelationColl
     * @throws DataAccessException
     */
   public ParamRoleColl getEmployeeParamRoleRelationInfoByEmployeeId(String employeeId) throws DataAccessException;
       
}
