package com.neusoft.om.dao.organdutyrelation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

import com.neusoft.om.OMAppContext;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;
/**brief description
 * <p>Date       : 2004-12-06</p>
 * <p>Module     : om</p>
 * <p>Description: organdutyrelation maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class OrganDutyRelationDAOImpl extends BaseDaoImpl implements OrganDutyRelationDAO {

	public int doAddOrganDutyRelationInfo(OrganDutyRelationVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_organ_duty_relation_t (f_organ_id,f_duty_id,f_parent_duty_id ) values(?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getOrganId());
			pstmt.setInt(2,vo.getDutyId());
			pstmt.setInt(3,vo.getParentDutyId());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doAddOrganDutyRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doAddOrganDutyRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int[] doAddOrganDutyRelationInfo(OrganDutyRelationColl coll) throws DataAccessException {
		int[] rt = null;
		StringBuffer buf = new StringBuffer();
		Connection conn = null;
		Statement  statement = null;
		
		try{
			conn = getConnection();
			statement = conn.createStatement();
			for(int i=0;i<coll.getRowCount();i++){
				OrganDutyRelationVO vo = null;
				vo = coll.getOrganDutyRelation(i);
				buf.append("insert into om_organ_duty_relation_t (f_organ_id,f_duty_id,f_parent_duty_id ) values(");
				buf.append(vo.getOrganId());
				buf.append(",");
				buf.append(vo.getDutyId());
				buf.append(",");
				buf.append(vo.getParentDutyId());
				buf.append(")");
				String sql = buf.toString();
				statement.addBatch(sql);
				buf = new StringBuffer();
			}
			rt = statement.executeBatch();
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doAddOrganDutyRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doAddOrganDutyRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			try{
				statement.close();
			}catch(SQLException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeRoleRelationDAOImpl--close-1:"+e.getMessage());
			}			
			close(conn);
		}
		return rt;
	}
	
	public int doAddOrganDutyRelationInfo(String organId,int organKind) throws DataAccessException {
		int code = 1;
		String sql = "INSERT INTO OM_ORGAN_DUTY_RELATION_T (F_ORGAN_ID,F_DUTY_ID,F_PARENT_DUTY_ID) " +
			" SELECT ?,f_duty_id,f_parent_duty_id FROM OM_DUTY_T WHERE f_organ_kind = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			pstmt.setInt(2,organKind);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doAddOrganDutyRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doAddOrganDutyRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int doAddOrganDutyRelationInfo(int organKind, int dutyId) throws DataAccessException {
		int code = 1;
		String sql ="INSERT INTO OM_ORGAN_DUTY_RELATION_T(f_organ_id, f_duty_id, f_parent_duty_id) " +
			" SELECT a.f_organ_id,b.f_duty_id,b.f_parent_duty_id " +
			" FROM OM_ORGAN_T a,OM_DUTY_T b" +
			" WHERE a.f_organ_kind = ?" +
			" AND b.f_duty_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,organKind);
			pstmt.setInt(2,dutyId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doAddOrganDutyRelationInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doAddOrganDutyRelationInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
				
	public int doDeleteOrganDutyRelationInfoByOrganId(String organId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_organ_duty_relation_t where f_organ_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doDeleteOrganDutyRelationInfoByOrganId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doDeleteOrganDutyRelationInfoByOrganId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteOrganDutyRelationInfoByDuytId(int dutyId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_organ_duty_relation_t where f_dutyId_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,dutyId);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doDeleteOrganDutyRelationInfoByDuytId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OrganDutyRelationDAOImpl--doDeleteOrganDutyRelationInfoByDuytId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	//测试方法
	public static void main(String args[]) {
		OrganDutyRelationDAO dao = (OrganDutyRelationDAO)OMAppContext.getBean(OrganDutyRelationDAO.BEAN);
		try {
			System.out.println(dao.doAddOrganDutyRelationInfo(2,6));
		}catch (DataAccessException e) {
			e.printStackTrace();
		}
	}
}                                                                                                                      