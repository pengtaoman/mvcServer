package com.neusoft.om.dao.organkind;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
public class OrganKindDAOImpl extends BaseDaoImpl implements OrganKindDAO{
	public OrganKindVO getOrganKindInfoByOrganKind(int organKind) throws DataAccessException {
		OrganKindVO vo = null;
		String sql = "select * from om_organ_kind_t where f_organ_kind = ?";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,organKind);
			rest = pstmt.executeQuery();

			if(rest.next()){
				vo = new OrganKindVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--getOrganKindInfoByOrganKind-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--getOrganKindInfoByOrganKind-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return vo;
	}
	
	public OrganKindColl getOrganKindInfo() throws DataAccessException {
		OrganKindColl coll = new OrganKindColl();
		OrganKindVO vo = null;
		String sql = "select * from om_organ_kind_t ";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
	
			while(rest.next()){
				vo = new OrganKindVO();
				vo.setAttribute(rest);
				coll.addOrganKindVO(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--getOrganKindInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--getOrganKindInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	public OrganKindColl getChildOrganKindCollByOrganKind(int organKind) throws DataAccessException{
		OrganKindColl coll = new OrganKindColl();
		OrganKindVO vo = null;
		String sql = "select * from om_organ_kind_t where f_parent_organ_kind = ? ";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,organKind);
			rest = pstmt.executeQuery();

			while(rest.next()){
				vo = new OrganKindVO();
				vo.setAttribute(rest);
				coll.addOrganKindVO(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--getChildOrganKindCollByOrganKind-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--getChildOrganKindCollByOrganKind-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	public OrganKindColl getOrganKindCollByLevel(int areaLevel) throws DataAccessException{
		OrganKindColl coll = new OrganKindColl();
		OrganKindVO vo = null;
		String sql = "select * from om_organ_kind_t where f_area_level = ? and f_organ_kind_level = 1 ";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,areaLevel);
			rest = pstmt.executeQuery();

			while(rest.next()){
				vo = new OrganKindVO();
				vo.setAttribute(rest);
				coll.addOrganKindVO(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--getOrganKindCollByLevel-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--getOrganKindCollByLevel-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	public int doAddOrganKindInfo(OrganKindVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_organ_kind_t (f_organ_kind,f_area_level,f_kind_desc ) values(?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getOrganKind());
			pstmt.setInt(2,vo.getAreaLevel());
			pstmt.setString(3,vo.getKindDesc());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--doAddOrganKindInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--doAddOrganKindInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doModifyOrganKindInfo(OrganKindVO vo) throws DataAccessException {
		int code = 1;
		String sql ="update om_organ_kind_t set f_organ_kind = ?,f_area_level=?,f_kind_desc = ? where f_organ_kind = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getOrganKind());
			pstmt.setInt(2,vo.getAreaLevel());
			pstmt.setString(3,vo.getKindDesc());
			pstmt.setInt(4,vo.getOrganKind());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--doModifyOrganKindInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--doModifyOrganKindInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteOrganKindInfo(int organKind) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_organ_kind_t where f_organ_kind = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,organKind);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--doDeleteOrganKindInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganKindDAOImpl--doDeleteOrganKindInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
}
