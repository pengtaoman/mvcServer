package com.neusoft.om.dao.module;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;
/**brief description
 * <p>Date       : 2004-12-17</p>
 * <p>Module     : om</p>
 * <p>Description: module maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class ModuleDAOImpl extends BaseDaoImpl implements ModuleDAO {

	public ModuleVO getModuleInfoByModuleId(String moduleId) throws DataAccessException {
		ModuleVO vo = null;
		String sql = "select * from om_module_t where f_module_id = ?" ;
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,moduleId);
			rest = pstmt.executeQuery();
			
			if(rest.next()){
				vo = new ModuleVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--getModuleInfoByModuleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--getModuleInfoByModuleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}

	public ModuleColl getModuleInfoBySystemId(String systemId) throws DataAccessException {
		ModuleVO vo = null;
		ModuleColl coll = new ModuleColl();
		String sql = "select * from om_module_t where f_system_id = ?" ;
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,systemId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new ModuleVO();
				vo.setAttribute(rest);
				coll.addModule(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--getModuleInfoBySystemId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--getModuleInfoBySystemId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}

	public int doAddModule(ModuleVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_module_t (f_module_id,f_system_id,f_parent_module_id,f_module_desc,f_module_type ) values(?,?,?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		ResultSet rest = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getModuleId());
			pstmt.setString(2,vo.getSystemId());
			pstmt.setString(3,vo.getParentModuleId());
			pstmt.setString(4,vo.getModuleDesc());
			pstmt.setString(5,vo.getModuleType());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--doAddModule-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--doAddModule-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return code;
	}

	public int doModifyModule(ModuleVO vo) throws DataAccessException {
		int code = 1;
		String sql ="update om_module_t set f_module_id = ?,f_system_id = ?,f_parent_module_id = ?," +
					" f_module_desc = ?,f_module_type = ? " +
					" where f_module_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getModuleId());
			pstmt.setString(2,vo.getSystemId());
			pstmt.setString(3,vo.getParentModuleId());
			pstmt.setString(4,vo.getModuleDesc());
			pstmt.setString(5,vo.getModuleType());
			pstmt.setString(6,vo.getModuleId());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--doModifyModule-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--doModifyModule-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteModuleByModuleId(String moduleId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_module_t where f_module_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,moduleId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--doDeleteModuleByModuleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--doDeleteModuleByModuleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteModuleBySystemId(String systemId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_module_t where f_system_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,systemId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--doDeleteModuleBySystemId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"ModuleDAOImpl--doDeleteModuleBySystemId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
}