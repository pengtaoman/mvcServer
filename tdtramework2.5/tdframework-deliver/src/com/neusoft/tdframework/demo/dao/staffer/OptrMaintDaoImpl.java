/*
 * Created on 2006-3-7
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.dao.staffer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author zhangjn
 */
public class OptrMaintDaoImpl extends BaseDaoImpl implements OptrMaintDao {
	
	public int getOptrsByWorkNo(String workNo) throws DataAccessException {
		
		int allRows = 0;
		
//		String sql = "select f_employee_id, f_employee_name,f_area_id,"
//				+ "f_organ_id,f_work_no from td_demo_employee_t where f_work_no ='"
//				+ workNo + "'";
		
		StringBuffer buf = new StringBuffer();
		buf.append("select f_employee_id, f_employee_name,f_area_id,f_organ_id,f_work_no");
		buf.append(" from td_demo_employee_t");
		buf.append(" where f_work_no ='"+ workNo + "'");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			if (rest.next()) {
				allRows = rest.getInt(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return allRows;
	}

	/**
	 * 
	 */
	public EmployeeVO findOptrById(String id) throws DataAccessException {
		
		// System.out.println("变量类型是:"+id);

//		String sql = "select a.f_employee_id, f_employee_name,f_area_id,"
//				+ "f_organ_id,f_work_no,f_work_pwd,f_create_date,f_stature,f_work_telephone,"
//				+ "f_email,f_income,f_notes " + "from td_demo_employee_t a "
//				+ " where a.f_work_no ='" + id + "'";
		
		StringBuffer buf = new StringBuffer();
		buf.append("select a.f_employee_id, f_employee_name,f_area_id,f_organ_id,f_work_no,f_work_pwd,");
		buf.append("f_create_date,f_stature,f_work_telephone,f_email,f_income,f_notes");
		buf.append(" from td_demo_employee_t a ");
		buf.append(" where a.f_work_no ='" + id + "'");
	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		EmployeeVO vo = new EmployeeVO();

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			while (rest.next()) {
				vo.setAccountNo(rest.getString("f_employee_id"));
				vo.setName(rest.getString("f_employee_name"));
				vo.setAreaId(rest.getString("f_area_id"));
				vo.setOrgId(rest.getString("f_organ_id"));
				vo.setPassword(rest.getString("f_work_pwd"));
				vo.setCreateDate(rest.getString("f_create_date"));
				vo.setStature(rest.getString("f_stature"));
				vo.setTelephone(rest.getString("f_work_telephone"));
				vo.setEmail(rest.getString("f_email"));
				vo.setMoney(rest.getString("f_income"));
				vo.setRemark(rest.getString("f_notes"));
				//vo.setCertType(rest.getString("F_CERT_TYPE"));
				//vo.setCertNumber(rest.getString("F_CERT_ID"));
			}
		} catch (SQLException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--findOptrById-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--findOptrById-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return vo;
	}

	/**
	 * 
	 */
	public int updateOptrById(String id, EmployeeVO vo)
			throws DataAccessException {
		
		int code = 1; // 成功
		
		StringBuffer buf = new StringBuffer();
		buf.append("UPDATE td_demo_employee_t");
		buf.append(" set f_employee_name = ? ");
		/*
		 * buf.append(" set f_employee_name = ? ,"); buf.append(" f_area_id = ?
		 * ,"); buf.append(" f_organ_id = ? ,"); buf.append(" f_work_telephone = ? ,
		 * f_email = ? ,"); buf.append(" f_income = ? ,"); buf.append("
		 * f_hired_date = to_date(?,'yyyy-mm-dd') ");
		 */
		buf.append(" WHERE f_employee_id = ? ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, vo.getName());
			/*
			 * pstmt.setString(2,vo.getAreaId());
			 * pstmt.setString(3,vo.getOrgId());
			 * pstmt.setString(4,vo.getTelephone());
			 * pstmt.setString(5,vo.getEmail());
			 * pstmt.setString(6,vo.getMoney());
			 * //pstmt.setString(1,vo.getWorkPwd());
			 * pstmt.setString(7,vo.getCreateDate());
			 * pstmt.setString(8,vo.getRemark());
			 */
			pstmt.setString(2, vo.getAccountNo());
			pstmt.executeUpdate();

		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDaoImpl--updateOptrById()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDaoImpl--updateOptrById()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return code;
	}

	/**
	 * 
	 */
	public int deleteOptrById(String id) throws DataAccessException {
		
		int code = 1; // 成功
		
		StringBuffer buf = new StringBuffer();
		buf.append("delete from td_demo_employee_t");
		buf.append(" WHERE f_employee_id = ? ");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, id);
			pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDaoImpl--deleteOptrById()-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDaoImpl--updateOptrById()-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return code;
	}

	/**
	 * 
	 */
	public List getOptrsByRole(String areaId, String roleId, int beginNum,
			int endNum) throws DataAccessException {
		
		List optrs = new ArrayList();
		
		StringBuffer sqlBuf = new StringBuffer();
		
		sqlBuf.append("select * from (");
		sqlBuf.append("select rownum rowcound,");
		sqlBuf.append("a.f_employee_id, f_employee_name,f_area_id,f_organ_id,f_work_no ");
		sqlBuf.append("from td_demo_employee_t a, td_demo_employee_role_t b ");
		sqlBuf.append("where f_area_id = ? and a.f_employee_id = b.f_employee_id and b.f_role_id = ? ");
		sqlBuf.append("and rownum < ? ");
		sqlBuf.append(" ) ");
		sqlBuf.append("where rowcound >= ? ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			
			conn = getConnection();
			
			pstmt = conn.prepareStatement(sqlBuf.toString());
			pstmt.setString(1, areaId);
			pstmt.setString(2, roleId);
			pstmt.setInt(3, endNum);
			pstmt.setInt(4, beginNum);
			
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				Employee empl = new Employee();
				empl.setId(rest.getString("f_employee_id"));
				empl.setName(rest.getString("f_employee_name"));
				empl.setArea(rest.getString("f_area_id"));
				empl.setOrgan(rest.getString("f_organ_id"));
				empl.setWorkno(rest.getString("f_work_no"));
				optrs.add(empl);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return optrs;
	}

	/**
	 * 
	 */
	public List getAllOptrsByRole(String areaId, String roleId)
			throws DataAccessException {
		
		List optrs = new ArrayList();

		StringBuffer sqlBuf = new StringBuffer();
		
		sqlBuf.append("select a.f_employee_id, f_employee_name,f_area_id,f_organ_id,f_work_no ");
		sqlBuf.append("from td_demo_employee_t a, td_demo_employee_role_t b ");
		sqlBuf.append("where f_area_id = ? and a.f_employee_id = b.f_employee_id and b.f_role_id = ? ");
		sqlBuf.append("order by a.f_employee_id ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuf.toString());
			pstmt.setString(1, areaId);
			pstmt.setString(2, roleId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				Employee empl = new Employee();
				empl.setId(rest.getString("f_employee_id"));
				empl.setName(rest.getString("f_employee_name"));
				empl.setArea(rest.getString("f_area_id"));
				empl.setOrgan(rest.getString("f_organ_id"));
				empl.setWorkno(rest.getString("f_work_no"));
				optrs.add(empl);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return optrs;
	}

	/**
	 * 
	 */
	public int getOptrsByRole(String areaId, String roleId)
			throws DataAccessException {

		int allRows = 0;
		
//		String sql = "select count(a.f_employee_id) "
//				+ "from td_demo_employee_t a, td_demo_employee_role_t b "
//				+ "where f_area_id = '" + areaId
//				+ "' and a.f_employee_id = b.f_employee_id and b.f_role_id = "
//				+ Integer.parseInt(roleId);
//		
		StringBuffer sqlBuf = new StringBuffer();
		sqlBuf.append("select count(a.f_employee_id) ");
		sqlBuf.append("from td_demo_employee_t a, td_demo_employee_role_t b ");
		sqlBuf.append("where f_area_id = '" + areaId);
		sqlBuf.append("' and a.f_employee_id = b.f_employee_id and b.f_role_id = ");
		sqlBuf.append(Integer.parseInt(roleId));
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuf.toString());
			rest = pstmt.executeQuery();
			if (rest.next()) {
				allRows = rest.getInt(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		// System.out.println(allRows);
		return allRows;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.neusoft.tdframework.demo.dao.staffer.OptrMaintDao#getOptrsByOrg(java.lang.String,
	 *      java.lang.String)
	 */
	public int getOptrsByOrg(String areaId, String orgId)
			throws DataAccessException {
		
		int allRows = 0;
		
//		String sql = "select a.f_employee_id, f_employee_name,f_area_id,"
//				+ "f_organ_id,f_work_no from td_demo_employee_t a "
//				+ "where f_area_id = '" + areaId + "' and a.f_organ_id = '"
//				+ orgId + "'";
		
		StringBuffer sqlBuf = new StringBuffer();
		sqlBuf.append("select a.f_employee_id, f_employee_name,f_area_id,f_organ_id,f_work_no");
		sqlBuf.append(" from td_demo_employee_t a ");
		sqlBuf.append("where f_area_id = '" + areaId + "' and a.f_organ_id = '"+ orgId + "'");
			
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuf.toString());
			rest = pstmt.executeQuery();
			if (rest.next()) {
				allRows = rest.getInt(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return allRows;
	}

	/**
	 * 
	 */
	public int getOptrsByDate(String startDate, String endDate)
			throws DataAccessException {
		
		int allRows = 0;
		
//		String sql = "select a.f_employee_id, f_employee_name,f_area_id,"
//				+ "f_organ_id,f_work_no from td_demo_employee_t a "
//				+ "where f_create_date between = '" + startDate + "' and '"
//				+ endDate + "'";
		
		StringBuffer sqlBuf = new StringBuffer();
		sqlBuf.append("select a.f_employee_id, f_employee_name,f_area_id,f_organ_id,f_work_no");
		sqlBuf.append(" from td_demo_employee_t a ");
		sqlBuf.append("where f_create_date between = '" + startDate + "' and '"+ endDate + "'");
	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sqlBuf.toString());
			rest = pstmt.executeQuery();
			if (rest.next()) {
				allRows = rest.getInt(1);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"OptrMaintDao--getOptrsByWorkNo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return allRows;
	}
}