package com.neusoft.om.dao.funcrole;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: funcrole maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class FuncRoleDAOImpl extends BaseDaoImpl implements FuncRoleDAO {
	
	public FuncRoleVO getFuncRoleInfoByKey(int roleId,String menuId) throws DataAccessException{
		FuncRoleVO vo = null;
		String sql = "select * from om_func_role_t where f_role_id = ? and f_menu_id = ?" ;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			pstmt.setString(2,menuId);
			rest = pstmt.executeQuery();
			
			if(rest.next()){
				vo = new FuncRoleVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--getFuncRoleInfoByKey-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--getFuncRoleInfoByKey-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}

	public FuncRoleColl getFuncRoleInfoByRoleId(int roleId) throws DataAccessException{
		FuncRoleColl coll = new FuncRoleColl();
		FuncRoleVO vo = null;
		String sql = "select * from om_func_role_t where f_role_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			rest = pstmt.executeQuery();
	
			while(rest.next()){
				vo = new FuncRoleVO();
				vo.setAttribute(rest);
				coll.addFuncRole(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--getFuncRoleInfoByKey-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--getFuncRoleInfoByKey-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;	
	}
	
	public FuncRoleColl getFuncRoleInfoByEmployeeId(String employeeId, int roleId) throws DataAccessException {
		FuncRoleColl coll = new FuncRoleColl();
		FuncRoleVO vo = null;
		
		StringBuffer buf = new StringBuffer();
		buf.append("SELECT 1,F_ROLE_ID,F_MENU_ID,SUM(b.F_ADMIN_STATUS),SUM(B.F_EXEC_STATUS) ");
		buf.append(" FROM om_employee_role_relation_t a,om_func_role_t b");
		buf.append(" WHERE a.f_employee_id = '001' ");
		buf.append(" AND a.f_role_id = b.f_role_id");
		buf.append(" AND a.f_role_id <> 1");
		buf.append(" GROUP BY F_MENU_ID");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			pstmt.setInt(2,roleId);
			rest = pstmt.executeQuery();

			while(rest.next()){
				vo = new FuncRoleVO();
				vo.setAttribute(rest);
				coll.addFuncRole(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--getFuncRoleInfoByKey-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--getFuncRoleInfoByKey-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	
	public int doAddFuncRole(FuncRoleVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_func_role_t (f_role_id,f_menu_id,f_admin_status,f_exec_status ) values(?,?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getRoleId());
			pstmt.setString(2,vo.getMenuId());
			pstmt.setInt(3,vo.getAdminStatus());
			pstmt.setInt(4,vo.getExecStatus());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doAddFuncRole-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doAddFuncRole-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	//增加结果集
	public int doAddFuncRole(FuncRoleColl coll) throws DataAccessException {
		int code = 1;//成功
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_func_role_t ");
		buf.append(" (f_role_id,f_menu_id,f_admin_status,f_exec_status ) ");
		buf.append(" values(?,?,?,?)");
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			if(conn !=null){
				for(int i=0;i<coll.getRowCount();i++){
					pstmt.setInt(1,coll.getFuncRole(i).getRoleId());
					pstmt.setString(2,coll.getFuncRole(i).getMenuId());
					pstmt.setInt(3,coll.getFuncRole(i).getAdminStatus());
					pstmt.setInt(4,coll.getFuncRole(i).getExecStatus());
					pstmt.addBatch();
				}
				pstmt.executeBatch();
			}
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doAddFuncRole-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doAddFuncRole-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int doModifyFuncRole(FuncRoleVO vo) throws DataAccessException {
		int code = 1;
		String sql ="update om_func_role_t set f_role_id = ?,f_menu_id = ?," +
					" f_admin_status = ?,f_exec_status = ? where f_role_id = ? and f_menu_Id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getRoleId());
			pstmt.setString(2,vo.getMenuId());
			pstmt.setInt(3,vo.getAdminStatus());
			pstmt.setInt(4,vo.getExecStatus());
			pstmt.setInt(5,vo.getRoleId());
			pstmt.setString(6,vo.getMenuId());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doModifyFuncRole-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doModifyFuncRole-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteFuncRoleByRoleId(int roleId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_func_role_t where f_role_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doDeleteFuncRoleByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doDeleteFuncRoleByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	public int doDeleteFuncRoleByDutyIdMenuId(int dutyId,String menuId) throws DataAccessException {
		int code = 1;
		StringBuffer buf = new StringBuffer("");
		buf.append(" DELETE FROM OM_FUNC_ROLE_T"); 
		buf.append(" WHERE F_ROLE_ID IN(SELECT f_role_id FROM om_role_t WHERE f_role_type = 1 AND f_duty_id = ?)");
		buf.append(" AND F_MENU_ID = ?");
		Connection conn = null;
		PreparedStatement  pstmt = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1,dutyId);
			pstmt.setString(2,menuId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doDeleteFuncRoleByRoleIdMenuId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doDeleteFuncRoleByRoleIdMenuId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
    
	/**
	 * 删除角色菜单对应关系
	 * @param funcRoleColl
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteFuncRole(FuncRoleColl funcRoleColl) throws DataAccessException{
		int code = 1;		
		StringBuffer buf = new StringBuffer("");
		buf.append(" DELETE FROM OM_FUNC_ROLE_T"); 
		buf.append(" WHERE 1=2 ");
		for(int i = 0; i < funcRoleColl.getRowCount(); i++){
			FuncRoleVO vo = funcRoleColl.getFuncRole(i);
			buf.append("OR (f_role_id=" + vo.getRoleId() +" AND f_menu_id ='" + vo.getMenuId() +	"' )");
		}
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doDeleteFuncRole-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doDeleteFuncRole-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
    public int getRowCount(String employeeId) throws DataAccessException {
        int allRows = 0;
        int adminRow = 0;
        int createRow = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
		if(employeeId==null){
			employeeId="";				
		}
		StringBuffer sql = new StringBuffer("");		
		sql.append(" select a.*,b.F_USABLE_FLAG,b.F_ADMIN_FLAG , ");
		sql.append(" decode (f_creater,?,1,0) f_if_creater ");
		sql.append(" from om_role_t a,om_employee_role_relation_t b ");
		sql.append(" where a.f_role_id = b.F_ROLE_ID ");
		if(employeeId!=null&&employeeId.intern()!="".intern()){
			sql.append("and b.f_Employee_id =?");
		}
		
		String sqlstr = "SELECT * FROM om_role_t WHERE f_creater = ?";
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql.toString());
            pstmt.setString(1, employeeId);
            if(employeeId!=null&&employeeId.intern()!="".intern()){
            	pstmt.setString(2, employeeId);
    		}            
            rest = pstmt.executeQuery();
            if (rest.next()) {
            	adminRow = rest.getInt(1);
            }
            pstmt = conn.prepareStatement(sqlstr);
            pstmt.setString(1, employeeId);
            rest = pstmt.executeQuery();
            if (rest.next()) {
            	createRow = rest.getInt(1);
            }
            allRows = adminRow + createRow;
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "EmpIpLimitDAOImpl--getRowCount()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "EmpIpLimitDAOImpl--getRowCount()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return allRows;
    }
    
    public FuncRoleColl getFuncRole( int roleId,String systemId) throws DataAccessException{
		FuncRoleColl coll = new FuncRoleColl();
		FuncRoleVO vo = null;
		String sql = "select distinct * from (" +
				" select a.* from om_func_role_t a, om_menu_t b " +
				" where a.f_menu_id=b.f_menu_id and a.f_role_id = ? and b.f_system_id =  ? " +
				" union " +
				" select a.* from om_func_role_t a, om_menu_t b, om_system_t c " +
				" where a.f_menu_id = b.f_menu_id and b.f_system_id = c.f_system_id " +
				" and c.f_parent_system_id = ? and a.f_role_id = ?)";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			pstmt.setString(2,systemId);
			pstmt.setString(3,systemId);
			pstmt.setInt(4,roleId);
			rest = pstmt.executeQuery();
	
			while(rest.next()){
				vo = new FuncRoleVO();
				vo.setAttribute(rest);
				coll.addFuncRole(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--getFuncRole-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--getFuncRole-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;	
    }
	
}
