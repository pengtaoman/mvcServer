/*
 * 创建日期 2006-7-13
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
package com.neusoft.om.dao.employeeparamrolerelation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.om.dao.paramrole.ParamRoleVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author Administrator
 *
 * TODO 要更改此生成的类型注释的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
public class EmployeeParamRoleRelationDAOImpl extends BaseDaoImpl implements EmployeeParamRoleRelationDAO{

    /**
     *删除职员参数角色关系信息
     * @param employeeId
     * @return int
     * @throws DataAccessException
     */

    public int doDeleteEmployeeParamRoleRelationInfoByEmployeeId(String employeeId, String authId) throws DataAccessException {
        int code = 1;
        StringBuffer buf = new StringBuffer();
        buf.append("delete from om_employee_param_role_rel_t where f_employee_id = ? ");
        buf.append(" and f_param_role_id in (select f_role_id from om_param_role_t where f_creater = ? ");
        buf.append(" union select f_param_role_id from om_employee_param_role_rel_t where f_employee_id = ? and f_admin_flag =1 )");
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			pstmt.setString(2, authId);
			pstmt.setString(3, authId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeParamRoleRelationDAOImpl--doDeleteEmployeeParamRoleRelationInfoByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeParamRoleRelationDAOImpl--doDeleteEmployeeParamRoleRelationInfoByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
    }

    /**
     *添加职员参数角色关系信息
     * @param employeeId
     * @return int []
     * @throws DataAccessException
     */
    public int[] doAddEmployeeParamRoleRelationInfo(EmployeeParamRoleRelationColl coll) throws DataAccessException {
        int[] code = null;//成功
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_employee_param_role_rel_t ");
		buf.append(" (f_employee_id,f_param_role_id,f_admin_flag,f_usable_flag) ");
		buf.append(" values(?,?,?,?)");
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			if(conn !=null){
				for(int i=0;i<coll.getRowCount();i++){
					pstmt.setString(1,coll.getEmployeeParamRoleRelation(i).getEmployeeId());
					pstmt.setInt(2,coll.getEmployeeParamRoleRelation(i).getParamRoleId());
					pstmt.setInt(3,coll.getEmployeeParamRoleRelation(i).getAdminFlag());
                    pstmt.setInt(4,coll.getEmployeeParamRoleRelation(i).getUsableFlag());
                    
                    pstmt.addBatch();
				}
				code = pstmt.executeBatch();
			}
	}catch(SQLException e){
		SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeParamRoleRelationDAOImpl--doAddEmployeeParamRoleRelationInfo-1:"+e.getMessage());
		throw new DataAccessException(e);
	}catch(Exception e){
		SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeParamRoleRelationDAOImpl--doAddEmployeeParamRoleRelationInfo-2:"+e.getMessage());
		throw new DataAccessException(e);
	}finally{
		close(pstmt,conn);
	}
	return code;
    }

    /**
     * 根据职员编号，得到职员参数角色关系信息列表
     * @param employeeId
     * @return ParamRoleColl
     * @throws DataAccessException
     */
    public ParamRoleColl getEmployeeParamRoleRelationInfoByEmployeeId(String employeeId) throws DataAccessException {
        ParamRoleColl empRoleColl = new ParamRoleColl();
        StringBuffer sql = new StringBuffer("");
		
		sql.append(" select a.*,b.F_USABLE_FLAG,b.F_ADMIN_FLAG ");
		sql.append("from om_param_role_t a,om_employee_param_role_rel_t b ");
		sql.append(" where a.f_role_id = b.f_param_role_id ");
		sql.append("and b.f_employee_id = ? ");
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;

    try{
        conn = getConnection();
        pstmt = conn.prepareStatement(sql.toString());
        pstmt.setString(1,employeeId);
        rest = pstmt.executeQuery();
        while(rest.next()) {
            ParamRoleVO vo = new ParamRoleVO();
            vo.setAttribute(rest);
            empRoleColl.addParamRole(vo);
        }
    }catch(SQLException e){
        SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeParamRoleRelationDAOImpl--getEmployeeParamRoleRelationInfoByEmployeeId-1:"+e.getMessage());
        throw new DataAccessException(e);
    }catch(Exception e){
        SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeParamRoleRelationDAOImpl--getEmployeeParamRoleRelationInfoByEmployeeId-2:"+e.getMessage());
        throw new DataAccessException(e);
    }finally{
        close(rest,pstmt,conn);
    }        
        return empRoleColl;
    }

}
