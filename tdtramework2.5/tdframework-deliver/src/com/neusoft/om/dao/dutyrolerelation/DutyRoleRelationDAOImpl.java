package com.neusoft.om.dao.dutyrolerelation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;

/**brief description
 * <p>Date       : 2004-12-08</p>
 * <p>Module     : om</p>
 * <p>Description: organ maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */

public class DutyRoleRelationDAOImpl extends BaseDaoImpl implements DutyRoleRelationDAO {
	/**����ְ����Ҹ�ְ��Ľ�ɫ*/
	public DutyRoleRelationColl getRoleInfoByDutyId(int dutyId) throws DataAccessException{
		DutyRoleRelationColl coll = new DutyRoleRelationColl();
		DutyRoleRelationVO vo = null;
		
		String sql = "select f_duty_id,f_role_id " +
			"from om_duty_role_relation_t where f_duty_id = ?";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,dutyId);
			rest = pstmt.executeQuery();
	
			if(rest.next()){
				vo = new DutyRoleRelationVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--getRoleInfoByDutyId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--getRoleInfoByDutyId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 		
		return coll;
	}
	/**���ݽ�ɫ����ӵ�иý�ɫ��ְ�񼯺�*/
	public DutyRoleRelationColl getDutyInfoByRoleId(int roleId) throws DataAccessException{
		DutyRoleRelationColl coll = new DutyRoleRelationColl();
		DutyRoleRelationVO vo = null;

		String sql = "select f_duty_id,f_role_id " +
			"from om_duty_role_relation_t where f_role_id = ?";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			rest = pstmt.executeQuery();

			while(rest.next()){
				vo = new DutyRoleRelationVO();
				vo.setAttribute(rest);
				coll.addDutyRoleRelation(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--getDutyInfoByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--getDutyInfoByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 		
		return coll;
	}
	/**����һ����¼��ְ���ɫ����*/
	public int doAddDutyRoleRelation(DutyRoleRelationVO vo) throws DataAccessException{
		int code = 1;//�ɹ�
		String sql = "INSERT INTO om_duty_role_relation_t(f_duty_id,f_role_id) VALUES (?,?)";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,vo.getDutyId());
			pstmt.setInt(2,vo.getRoleId());
			
			code = pstmt.executeUpdate();
           
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--doAddDutyRoleRelation-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--doAddDutyRoleRelation-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 		
		return code;
	}
	
	/**ɾ������ʹ�øý�ɫ����Ϣ*/
	public int doDeleteAllInfoByRoleId(int roleId) throws DataAccessException{
		int code = 1;//�ɹ�
		String sql = "delete from om_duty_role_relation_t where f_role_id = ?";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,roleId);
			
			code = pstmt.executeUpdate();
			
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--doDeleteAllInfoByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--doDeleteAllInfoByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 		
		return code;
	}
	
	public int[] doAddDutyRoleRelation(DutyRoleRelationColl coll) throws DataAccessException {
		int code = 1;//�ɹ�
		int[] rt = null;
		StringBuffer buf = new StringBuffer();
		Connection conn = null;
		Statement  statement = null;

		try{
			conn = getConnection();
			statement = conn.createStatement();
			for(int i=0;i<coll.getRowCount();i++){
				DutyRoleRelationVO vo = null;
				vo = coll.getDutyRoleRelation(i);
				buf.append("insert into om_duty_role_relation_t (f_duty_id,f_role_id ) values(");
				buf.append(vo.getDutyId());
				buf.append(",");
				buf.append(vo.getRoleId());
				buf.append(")");
				String sql = buf.toString();
				statement.addBatch(sql);
				buf = new StringBuffer();
			}
			rt = statement.executeBatch();
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--doAddDutyRoleRelation-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--doAddDutyRoleRelation-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			try{
				statement.close();
			}catch(SQLException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl----doAddDutyRoleRelation--close-1:"+e.getMessage());
			}			
			close(conn);
		}
		return rt;
	}
	
	public int doDeleteAllInfoByDutyId(int dutyId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_duty_role_relation_t where f_duty_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,dutyId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--doDeleteAllInfoByDutyId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--doDeleteAllInfoByDutyId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteInfoByKey(int dutyId, int roleId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_duty_role_relation_t where f_duty_id = ? and f_role_id = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,dutyId);
			pstmt.setInt(2,roleId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--doDeleteInfoByKey-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutyRoleRelationDAOImpl--doDeleteInfoByKey-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
}