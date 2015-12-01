package com.neusoft.om.dao.employeerolerelation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.neusoft.om.OMAppContext;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;

/**brief description
 * <p>Date       : 2004-12-07</p>
 * <p>Module     : om</p>
 * <p>Description: employeerolerelation maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class EmployeeRoleRelationDAOImpl extends BaseDaoImpl implements EmployeeRoleRelationDAO{
	public int doAddEmployeeRoleRelationInfo(EmployeeRoleRelationVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_employee_role_relation_t (f_employee_id,f_role_id,f_usable_flag,f_admin_flag ) values(?,?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getEmployeeId());
			pstmt.setInt(2,vo.getRoleId());
            pstmt.setInt(3,vo.getUsableFlag());
            pstmt.setInt(4, vo.getAdminFlag());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doAddEmployeeRoleRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doAddEmployeeRoleRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int doAddEmployeeRoleRelationInfo(String employeeId, int dutyId) throws DataAccessException {
		int code = 1;
		String sql = " INSERT INTO om_employee_role_relation_t ( f_employee_id,f_role_id) " +
						" SELECT ? ,f_role_id " +
						" FROM om_duty_role_relation_t"+
						" WHERE f_duty_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			pstmt.setInt(2,dutyId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doAddEmployeeRoleRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doAddEmployeeRoleRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	public int[] doAddEmployeeRoleRelationInfo(EmployeeRoleRelationColl coll) throws DataAccessException {	
			int[] code = null;//成功
			StringBuffer buf = new StringBuffer();
			buf.append("insert into om_employee_role_relation_t ");
			buf.append(" (f_employee_id,f_role_id,f_admin_flag,f_usable_flag) ");
			buf.append(" values(?,?,?,?)");
			Connection conn = null;
			PreparedStatement pstmt = null;
			try{
				conn = getConnection();
				pstmt = conn.prepareStatement(buf.toString());
				if(conn !=null){
					for(int i=0;i<coll.getRowCount();i++){
						pstmt.setString(1,coll.getEmployeeRoleRelation(i).getEmployeeId());
						pstmt.setInt(2,coll.getEmployeeRoleRelation(i).getRoleId());
						pstmt.setInt(3,coll.getEmployeeRoleRelation(i).getAdminFlag());
                        pstmt.setInt(4,coll.getEmployeeRoleRelation(i).getUsableFlag());
                        
                        pstmt.addBatch();
					}
					code = pstmt.executeBatch();
				}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doAddEmployeeRoleRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doAddEmployeeRoleRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public void doAddEmployeeRoleRelationInfo(String employeeId) throws DataAccessException {
		StringBuffer buf = new StringBuffer();
		
		buf.append(" insert into om_employee_role_relation_t (f_employee_id, f_role_id)");
		buf.append(" SELECT ?,b.f_role_id");
		buf.append(" FROM om_employee_duty_relation_t a,om_duty_role_relation_t b");
		buf.append(" WHERE a.f_duty_id = b.f_duty_id");
		buf.append(" AND a.f_employee_id = ?");
		buf.append(" GROUP BY b.f_role_id");
		
		Connection conn = null;
		PreparedStatement  pstmt = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			pstmt.setString(2,employeeId);
			pstmt.executeUpdate();
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doAddEmployeeRoleRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doAddEmployeeRoleRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
	}
	public int doDeleteEmployeeRoleRelationInfoByEmployeeId(String employeeId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_employee_role_relation_t where f_employee_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doDeleteEmployeeRoleRelationInfoByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doDeleteEmployeeRoleRelationInfoByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int doDelEmpRoleRelByEmpIdAndCreater(String employeeId, String creater) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_employee_role_relation_t where f_employee_id = ? " +
				" and f_role_id in (select f_role_id from om_role_t where f_creater = ? " +
				" union select f_role_id from om_employee_role_relation_t where f_employee_id = ? and f_admin_flag =1)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			pstmt.setString(2,creater);
			pstmt.setString(3,creater);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doDeleteEmployeeRoleRelationInfoByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doDeleteEmployeeRoleRelationInfoByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int doDeleteEmployeeRoleRelationInfoByRoleId(String roleId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_employee_role_relation_t where f_role_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,roleId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doDeleteEmployeeRoleRelationInfoByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doDeleteEmployeeRoleRelationInfoByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteEmployeeRoleRelationInfoByEmployeeIdDutyId(String employeeId, int dutyId) throws DataAccessException {
		int code = 1;
		StringBuffer buf = new StringBuffer("");
		buf.append("delete from om_employee_role_relation_t ");
		buf.append(" where f_employee_id = ? ");
		buf.append(" and f_role_id in ( select f_role_id from om_role_t where f_duty_id = ?)");
		Connection conn = null;
		PreparedStatement  pstmt = null;
	String sql = buf.toString();
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			pstmt.setInt(2,dutyId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doDeleteEmployeeRoleRelationInfoByEmployeeIdDutyId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--doDeleteEmployeeRoleRelationInfoByEmployeeIdDutyId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
    /**
     * 根据职员编号，得到职员职务关系信息列表
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public EmployeeRoleRelationColl getEmployeeRoleRelationInfoByEmployeeId(String employeeId) throws DataAccessException{
        EmployeeRoleRelationColl empRoleColl = new EmployeeRoleRelationColl();
        String sql = "SELECT a.* " +
        " FROM om_employee_role_relation_t a, om_role_t b " +
        " WHERE a.f_role_id = b.f_role_id" +
        " AND a.f_employee_id = ?";
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;

    try{
        conn = getConnection();
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1,employeeId);
        rest = pstmt.executeQuery();
        while(rest.next()) {
            EmployeeRoleRelationVO vo = new EmployeeRoleRelationVO();
            vo.setAttribute(rest);
            empRoleColl.addEmployeeRoleRelation(vo);
        }
    }catch(SQLException e){
        SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--getEmployeeRoleRelationInfoByEmployeeId-1:"+e.getMessage());
        throw new DataAccessException(e);
    }catch(Exception e){
        SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--getEmployeeRoleRelationInfoByEmployeeId-2:"+e.getMessage());
        throw new DataAccessException(e);
    }finally{
        close(rest,pstmt,conn);
    }        
        return empRoleColl;
    }
    
	
	//	测试方法
	public static void main(String args[]){
		EmployeeRoleRelationDAO dao = (EmployeeRoleRelationDAO)OMAppContext.getBean(EmployeeRoleRelationDAO.BEAN);
		  try {
				 //System.out.println(dao.doAddEmployeeRoleRelationInfo("011",1));
				 dao.doAddEmployeeRoleRelationInfo("001");
		   }
		  catch (DataAccessException e) {
			  e.printStackTrace();
		  }
	  }
}
