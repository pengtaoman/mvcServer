package com.neusoft.om.dao.poweradjust;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.om.dao.employee.AdjEmployeeColl;
import com.neusoft.om.dao.employee.AdjEmployeeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class PowerAdjustDAOImpl extends BaseDaoImpl implements PowerAdjustDAO{

	public int doAddPowerAdjustInfo(PowerAdjustVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_power_adjust_t (f_employee_id,f_menu_id,f_system_id,f_admin_adjust,f_exec_adjust ) values(?,?,?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getEmployeeId());
			pstmt.setString(2,vo.getMenuId());
			pstmt.setString(3,vo.getSystemId());
			pstmt.setInt(4,vo.getAdminAdjust());
			pstmt.setInt(5,vo.getExecAdjust());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerAdjustDAOImpl--doAddPowerAdjustInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerAdjustDAOImpl--doAddPowerAdjustInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeletePowerAdjustInfo(String employeeId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_power_adjust_t where f_employee_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerAdjustDAOImpl--doDeletePowerAdjustInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerAdjustDAOImpl--doDeletePowerAdjustInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeletePowerAdjustInfo(String employeeId, String menuId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_power_adjust_t where f_employee_id = ? and f_menu_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			pstmt.setString(2,menuId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerAdjustDAOImpl--doDeletePowerAdjustInfo-3:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerAdjustDAOImpl--doDeletePowerAdjustInfo-4:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	/**
	 * 根据职员编码得到其权限微调信息集合
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public PowerAdjustColl getPowerAdjustCollByEmpId(String employeeId) throws DataAccessException{
		PowerAdjustColl adjustColl = new PowerAdjustColl();
		String sql ="select * from om_power_adjust_t where f_employee_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				PowerAdjustVO vo = new PowerAdjustVO();
				vo.setAttribute(rest);
				adjustColl.addElement(vo);	
			} 
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerAdjustDAOImpl--getPowerAdjustCollByEmpId-3:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerAdjustDAOImpl--getPowerAdjustCollByEmpId-4:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return adjustColl;
	}
	/**
	 * 批量增加权限微调信息
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddPowerAdjust(PowerAdjustColl coll) throws DataAccessException{
		int code = 1;//成功
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_power_adjust_t");
		buf.append("(f_employee_id,f_menu_id,f_system_id,f_admin_adjust,f_exec_adjust )");
		buf.append("values(?,?,?,?,?)");
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			if(conn !=null){
				for(int i=0;i<coll.getRowCount();i++){
					pstmt.setString(1,coll.getPowerAdjust(i).getEmployeeId());
					pstmt.setString(2,coll.getPowerAdjust(i).getMenuId());
					pstmt.setString(3,coll.getPowerAdjust(i).getSystemId());
					pstmt.setInt(4,coll.getPowerAdjust(i).getAdminAdjust());
					pstmt.setInt(5,coll.getPowerAdjust(i).getExecAdjust());
					pstmt.addBatch();
				}
				pstmt.executeBatch();
			}
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doAddPowerAdjust-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doAddPowerAdjust-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	/**
	 * 批量删除微调信息
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeletePowerAdjust(PowerAdjustColl coll) throws DataAccessException{
		int code = 1;//成功
		StringBuffer buf = new StringBuffer();
		buf.append("delete from om_power_adjust_t " +
				"where f_employee_id = ? and f_menu_id = ? and f_admin_adjust=? and f_exec_adjust=?");
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			if(conn !=null){
				for(int i=0;i<coll.getRowCount();i++){
					pstmt.setString(1,coll.getPowerAdjust(i).getEmployeeId());
					pstmt.setString(2,coll.getPowerAdjust(i).getMenuId());
					pstmt.setInt(3,coll.getPowerAdjust(i).getAdminAdjust());
					pstmt.setInt(4,coll.getPowerAdjust(i).getExecAdjust());
					pstmt.addBatch();
				}
				pstmt.executeBatch();
			}
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doDeletePowerAdjust-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleImpl--doDeletePowerAdjust-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	/**
	 * 得到集合中职员所有的微调信息
	 * @param empColl
	 * @return
	 * @throws DataAccessException
	 */
	public AdjEmployeeColl getPowerAdjustCollByEmpColl () throws DataAccessException{
		AdjEmployeeColl adjustColl = new AdjEmployeeColl();
		StringBuffer buf = new StringBuffer();
		buf.append(" select a.*,b.F_MENU_ID,c.f_menu_name,c.f_parent_menu_id,b.F_EXEC_ADJUST");
		buf.append("  from om_temp_emp_t a, om_power_adjust_t b, om_menu_t c ");
		buf.append(" where a.f_employee_id = b.f_employee_id and b.f_menu_id = c.f_menu_id ");
		buf.append(" order by a.f_employee_id, b.f_menu_id");
		String sql = buf.toString();
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while(rest.next()){
				AdjEmployeeVO vo = new AdjEmployeeVO();
				vo.setAttribute(rest);
				adjustColl.addElement(vo);	
			} 
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerAdjustDAOImpl--getPowerAdjustCollByEmpColl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerAdjustDAOImpl--getPowerAdjustCollByEmpColl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return adjustColl;
	}
}
