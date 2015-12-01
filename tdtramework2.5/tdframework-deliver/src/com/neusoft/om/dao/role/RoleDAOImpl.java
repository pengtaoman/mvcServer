package com.neusoft.om.dao.role;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.neusoft.om.OMAppContext;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

/**
 * brief description
 * <p>
 * Date : 2004-12-07
 * </p>
 * <p>
 * Module : om
 * </p>
 * <p>
 * Description: ʵ�ֽ�ɫά���Ľӿ�
 * </p>
 * <p>
 * Remark :
 * </p>
 * 
 * @author ren.hui@neusoft.com
 * @version
 *         <p>
 *         ------------------------------------------------------------
 *         </p>
 *         <p>
 *         �޸���ʷ
 *         </p>
 *         <p>
 *         ��� ���� �޸��� �޸�ԭ��
 *         </p>
 *         <p>
 *         1
 *         </p>
 */
public class RoleDAOImpl extends BaseDaoImpl implements RoleDAO {

	public RoleColl getRoleInfoByDutyIdRoleType(int dutyId, int roleType)
			throws DataAccessException {
		RoleColl coll = new RoleColl();
		StringBuffer buf = new StringBuffer("");

		if (0 == roleType) {
			buf.append("SELECT * FROM om_role_t where f_duty_id = ").append(
					dutyId);
		} else {
			buf.append("SELECT * FROM om_role_t where f_duty_id = ").append(
					dutyId);
			buf.append(" AND f_role_type =").append(roleType);
		}
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				coll.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getRoleInfoByDutyIdRoleType-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getRoleInfoByDutyIdRoleType-2:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}

	public RoleColl getAllRoleInfo() throws DataAccessException {
		RoleColl coll = new RoleColl();
		String sql = "SELECT * FROM om_role_t ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				coll.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getAllRoleInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getAllRoleInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}

	public RoleColl getRoleInfoByEmployeeId(String employeeId)
			throws DataAccessException {
		RoleColl coll = new RoleColl();
		String sql = "SELECT b.* "
				+ " FROM om_employee_role_relation_t a, om_role_t b "
				+ " WHERE a.f_role_id = b.f_role_id"
				+ " AND a.f_employee_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, employeeId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				coll.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getRoleInfoByEmployeeId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getRoleInfoByEmployeeId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}

	public RoleVO getRoleInfoByRoleId(int roleId) throws DataAccessException {
		RoleVO vo = null;
		StringBuffer buf = new StringBuffer("");
		buf.append("SELECT * From om_role_t where f_role_id = ?");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1, roleId);
			rest = pstmt.executeQuery();
			if (rest.next()) {
				vo = new RoleVO();
				vo.setAttribute(rest);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getRoleInfoByRoleId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getRoleInfoByRoleId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return vo;
	}

	public int doAddRoleInfo(RoleVO vo) throws DataAccessException {
		int code = 1;
		String om_role_tSql = "insert into om_role_t (f_duty_id,f_role_id,f_role_type" +
				" ,f_role_name,f_create_area_id,f_if_default,f_desc )  values(?,?,?,?,?,?,?) ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(om_role_tSql);
			int i = 1;
			pstmt.setInt(i++, vo.getDutyId());
			pstmt.setInt(i++, vo.getRoleId());
			pstmt.setInt(i++, vo.getRoleType());
			pstmt.setString(i++, vo.getRoleName());
			pstmt.setString(i++, vo.getCreateAreaId());
			pstmt.setInt(i++, vo.getIfDefault());
			pstmt.setString(i++, vo.getDesc());
			code = pstmt.executeUpdate();

			
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doAddRoleInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doAddRoleInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return code;
	}

	public int doModifyInfo(int roleId, String roleName, String roleDesc)
			throws DataAccessException {
		int code = 1;
		String sql = "update om_role_t set f_role_name = ?, f_desc = ? "
				+ " where f_role_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, roleName);
			pstmt.setString(2, roleDesc);
			pstmt.setInt(3, roleId);
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doModifyInfo-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doModifyInfo-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return code;
	}

	public int doDeleteInfoByRoleId(int roleId) throws DataAccessException {
		int code = 1;
		String sql = "delete from om_role_t where f_role_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, roleId);
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doDeleteInfoByRoleId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doDeleteInfoByRoleId-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return code;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.neusoft.om.dao.role.RoleDAO#getEmployeePermittedRoleColl(java.lang.String)
	 */
	public RoleColl getEmployeePermittedRoleColl(String employeeId)
			throws DataAccessException {
		RoleColl coll = new RoleColl();
        StringBuffer  sql = new StringBuffer();
        sql.append(" select b.* from om_employee_role_relation_t a, om_role_t b ");
        sql.append(" where a.f_role_id = b.f_role_id AND a.f_usable_flag=1 AND a.f_employee_id = ? ");

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql.toString());
			pstmt.setString(1, employeeId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				coll.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getRoleInfoByEmployeeId-1:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}

	/**
	 * ͨ��ְԱ����õ��䴴���Ľ�ɫ�б�
	 * 
	 * @param account
	 * @return
	 * @throws DataAccessException
	 */
	public RoleColl getCreateRoleColl(String employeeId)
			throws DataAccessException {
		RoleColl roleColl = new RoleColl();
		String sql = "SELECT * FROM om_role_t WHERE f_creater = '"
				+ employeeId +"'";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				roleColl.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getCreateRoleColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return roleColl;
	}
	/**
	 * ͨ������Ա����,����Ա��ŵõ���ǰ���Թ���Ľ�ɫ
	 * 
	 * @param f_admin_type,f_employee_id
	 * @return
	 * @throws DataAccessException
	 */
	public RoleColl  getEmployeePermittedRoleColl(String adminType,String employee_id)
			throws DataAccessException {
		RoleColl roleColl = new RoleColl();
		
		int iadminType = Integer.parseInt(adminType);
		StringBuffer buf = new StringBuffer();
		switch (iadminType){
			case 0:
				//��ͨ��Ա
				buf.append(" SELECT b.* ");
				buf.append(" FROM om_employee_role_relation_t a, om_role_t b ");
				buf.append(" WHERE a.f_role_id = b.f_role_id ");  
				buf.append(" AND a.f_admin_flag = 1 "); 
				buf.append(" and b.f_status = 1 ");   
				buf.append(" AND a.f_employee_id = '"+employee_id+"' ");  
				buf.append(" order by b.f_role_name ");
				buf.append(" UNION "); 
				buf.append(" SELECT * ");
				buf.append(" FROM om_role_t ");
				buf.append(" WHERE f_status = 1 "); 
				buf.append(" AND f_creater = '"+employee_id+"' "); 
				buf.append(" order by f_role_name ");
				break;
				//��Ȩ����
			case 1:
				buf.append(" select * from om_role_t where f_status = 1 order by f_role_name ");
				break;
				//��ͨ����Ա
			case 2:
				buf.append(" select a.* from om_role_t a,( ");
				buf.append(" select f_employee_id ");
				buf.append(" from om_employee_t where f_owner = '"+employee_id+"' ");
				buf.append(" or f_employee_id = '"+employee_id+"' ) b ");
				buf.append(" where a.f_creater = b.f_employee_id and a.f_status = 1 ");
				buf.append(" order by f_role_name ");
				buf.append(" union ");
				buf.append(" select a.* from  om_role_t a,om_employee_role_relation_t b ");
				buf.append(" where a.f_role_id = b.f_role_id and b.F_EMPLOYEE_ID = '"+employee_id+"' ");
				buf.append(" and a.f_status = 1 and b.F_ADMIN_FLAG = 1 ");
				buf.append(" order by f_role_name ");
				break;
			default:
				buf.append(" select * from om_role_t where f_role_id is null ");
			break;
		}

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				roleColl.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getEmployeePermittedRoleColl-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return roleColl;
	}
    /**
     * ͨ��ְԱ��ŵõ��䴴���������Ʒ��ϲ�ѯ�����Ľ�ɫ�б�
     * @param roleName
     * @param employeeId
     * @return
     * @throws DataAccessException
     */
    public RoleColl getCreateRoleColl(String roleName, String employeeId) throws DataAccessException{
    	RoleColl roleColl = new RoleColl();
		String sql = "SELECT * FROM om_role_t WHERE f_creater = '"
			+ employeeId +"' AND f_role_name like '%"+roleName+"%'";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
	
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				roleColl.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getCreateRoleColl:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	return roleColl;
    }
    /**
     * ͨ��ְԱ��ŵõ��䴴���������ƣ���ʶ���������ϲ�ѯ�����Ľ�ɫ�б�
     */
    public RoleColl getCreateRoleColl(String roleName, String employeeId, String roleId, String desc) throws DataAccessException{
    	RoleColl roleColl = new RoleColl();
		String sql = "SELECT * FROM om_role_t WHERE f_creater = '" + employeeId + "'";
		if(roleName != null && !roleName.trim().equals("")){
			sql = sql+" AND f_role_name like '%"+roleName+"%'";
		}
		if(roleId != null && !roleId.trim().equals("")){
			sql = sql + " AND f_role_id = '" + roleId + "'";
		}
		if(desc != null && !desc.trim().equals("")){
			sql = sql + " AND f_desc like '%"+desc+"%'";
		}
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
	
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				roleColl.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getCreateRoleColl:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
    	return roleColl;
    }
	/**
	 * ͨ��employeeId�õ���ɷ���Ľ�ɫ�б�
	 * 
	 * @param employeeId
	 * @return
	 * @throws DataAccessException
	 */
	public RoleColl getAssignableRoleColl(String employeeId)
			throws DataAccessException {
		RoleColl roleColl = new RoleColl();
		String sql = "SELECT a.* FROM om_role_t a, om_employee_role_relation_t b WHERE b.f_employee_id = "
				+ "'" + employeeId + "'"
				+ " AND b.f_admin_flag = 1 AND a.f_role_id = b.f_role_id";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				roleColl.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getCreateRole-1:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return roleColl;
	}

	// ���Է���
	public static void main(String args[]) {
		RoleDAO dao = (RoleDAO) OMAppContext.getBean(RoleDAO.BEAN);
		try {
			// RoleColl coll = dao.getRoleInfoByEmployeeId("001");
			// System.out.println("1:"+coll.getRole(0).getRoleName());

			RoleColl coll = dao.getEmployeePermittedRoleColl("002");
			System.out.println("1:" + coll.getRole(0).getRoleName());
			// RoleColl coll1 = dao.getRoleInfoByRoleKind(1);
			// System.out.println("2:"+coll1.getRole(0).getRoleName());
			// RoleVO vo= dao.getRoleInfoByKey(1);
			// System.out.println("3:"+vo.getRoleName());
			// int code;
			// RoleVO add = new RoleVO();
			// add.setRoleId(1);
			// add.setRoleName("testModify");
			// add.setRoleType(1);
			// code = dao.doAddRoleInfo(add);
			// code = dao.doDeleteInfoByRoleId(5);
			// code = dao.doModifyInfo(add);
			// RoleVO vo = null;
			// vo = dao.getRoleInfoByRoleId(102);
			// System.out.println(vo.getRoleName());
			// RoleColl coll = dao.getRoleInfoByDutyIdRoleType(1,1);
			// System.out.println(coll.getRowCount());
		} catch (DataAccessException e) {
			e.printStackTrace();
		}
	}

	public RoleColl getFuncRoleInfoByAdminEmpID(String adminEmpID)
			throws DataAccessException {
		RoleColl roleColl = null;
		roleColl = seachRoleName(null,adminEmpID);
		return roleColl;
	}

	public int doAddRole(RoleVO vo) throws DataAccessException {
		int code = 1;
		String sql = "insert into om_role_t (f_role_id,f_role_type,f_role_name,f_creater,f_desc)  values(?,?,?,?,?)";
//		String empRoleRelationSql = " insert into om_employee_role_relation_t(F_EMPLOYEE_ID, " +
//		"F_ROLE_ID, F_USABLE_FLAG, F_ADMIN_FLAG) values (?,?,?,?)";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			int i = 1;
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(i++, vo.getRoleId());
			pstmt.setInt(i++, vo.getRoleType());
			pstmt.setString(i++, vo.getRoleName());
			pstmt.setString(i++, vo.getCreater());
			pstmt.setString(i++, vo.getDesc());
			code = pstmt.executeUpdate();
			
//			if (code == 1) {
//				pstmt = conn.prepareStatement(empRoleRelationSql);
//				i = 1;
//				pstmt.setString(i++, vo.getCreater());
//				pstmt.setInt(i++, vo.getRoleId());
//				pstmt.setInt(i++, 1);
//				pstmt.setInt(i++, 1);
//				code = pstmt.executeUpdate();
//				
//			}
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doAddRole-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doAddRole-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return code;
	}

	public int doMofRole(RoleVO vo) throws DataAccessException {
		int code = 1;
		String sql = " update om_role_t set f_role_name=? where f_role_id = ? ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			int i = 1;
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(i++, vo.getRoleName());
			pstmt.setInt(i++, vo.getRoleId());
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doMofRole-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doMofRole-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return code;
	}

	public int doDelRole(int roleId) throws DataAccessException {
		int code = 1;
		String sql = " delete om_role_t where f_role_id = ? ";
		String sql1="delete om_employee_role_relation_t where f_role_id = ? ";
		String checkRoleSql = " select count(f_role_id) role_count from om_employee_role_relation_t where f_role_id = ? ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(checkRoleSql);
			pstmt.setInt(1,roleId);
			rest = pstmt.executeQuery();
			int ifRelEmp = 0;
			if(rest.next()){
				ifRelEmp = rest.getInt("role_count");
			}
			if(ifRelEmp >=1){
				code=2;
			}else{
				pstmt = conn.prepareStatement(sql);
				pstmt.setInt(1, roleId);
				code = pstmt.executeUpdate();
				if(ifRelEmp > 0 ){
					pstmt = conn.prepareStatement(sql1);
					pstmt.setInt(1, roleId);
					code = pstmt.executeUpdate();
				}
			}
			
			
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doDelRole-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--doDelRole-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return code;
	}
	
	public RoleColl seachRoleName(String roleName,String adminEmpId)throws DataAccessException{
		RoleColl roleColl = new RoleColl();
		if(adminEmpId==null){
			adminEmpId="";				
		}
		StringBuffer sql = new StringBuffer("");
		
		sql.append(" select a.*,b.F_USABLE_FLAG,b.F_ADMIN_FLAG , ");
		sql.append(" decode (f_creater,'" + adminEmpId + "',1,0) f_if_creater ");
		sql.append("from om_role_t a,om_employee_role_relation_t b ");
		sql.append(" where a.f_role_id = b.F_ROLE_ID ");
		if(roleName!=null&&roleName.intern()!="".intern()){
			sql.append(" and a.f_role_name like '%"+roleName+"%'");
		}
		if(adminEmpId!=null&&adminEmpId.intern()!="".intern()){
			sql.append("and b.f_Employee_id ='"+adminEmpId+"'");
		}
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql.toString());
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				roleColl.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--seachRoleName-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return roleColl;		
	}
	/**
	 * ���ݲ�ѯ�������в�ѯ, ��ɫ���ƣ���ɫ����Ϊģ����ѯ����ɫ��ʶΪ��ȷ��ѯ
	 */
	public RoleColl seachRoleName(String roleName,String adminEmpId,String roleId, String desc)throws DataAccessException{
		RoleColl roleColl = new RoleColl();
		if(adminEmpId==null){
			adminEmpId="";				
		}
		StringBuffer sql = new StringBuffer("");
		
		sql.append(" select a.*,b.F_USABLE_FLAG,b.F_ADMIN_FLAG , ");
		sql.append(" decode (f_creater,'" + adminEmpId + "',1,0) f_if_creater ");
		sql.append("from om_role_t a,om_employee_role_relation_t b ");
		sql.append(" where a.f_role_id = b.F_ROLE_ID ");
		if(roleName!=null&&roleName.intern()!="".intern()){
			sql.append(" and a.f_role_name like '%"+roleName+"%'");
		}
		if(adminEmpId!=null&&adminEmpId.intern()!="".intern()){
			sql.append(" and b.f_Employee_id ='"+adminEmpId+"'");
		}
		if(roleId != null && roleId.intern()!="".intern()){
			sql.append(" and a.f_role_id = '"+roleId+"'");
		}
		if(desc != null && desc.intern() != "".intern()){
			sql.append(" and a.f_desc like '%"+ desc +"%'");
		}
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql.toString());
			rest = pstmt.executeQuery();
			while (rest.next()) {
				RoleVO vo = new RoleVO();
				vo.setAttribute(rest);
				roleColl.addRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--seachRoleName-1:"
							+ e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return roleColl;		
	}
	/**
	 * ȷ���Ƿ���������ظ��Ľ�ɫ
	 * @param roleName
	 * @return
	 * @throws DataAccessException
	 */
	public boolean repeateName(String roleName) throws DataAccessException{
		boolean repeat = false;
        StringBuffer buf = new StringBuffer();         
        buf.append(" select f_role_name from om_role_t where f_role_name = ? ");
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, roleName);
            rest = pstmt.executeQuery();  
            while(rest.next()){
            	String rName = rest.getString("f_role_name");
            	if(rName.trim().equals(roleName)){
            		repeat = true;
            	}
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleDAOImpl--repeateName-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"FuncRoleDAOImpl--repeateName-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return repeat;
	}
	/**
	 * �õ�Ա�����õĽ�ɫid����
	 * @param empId
	 * @return
	 * @throws DataAccessException
	 */
	public List getUsableRoleId(String empId) throws DataAccessException{
		List list = new ArrayList();
        StringBuffer buf = new StringBuffer();         
        buf.append(" select f_role_id from om_employee_role_relation_t where f_employee_id = ? ");
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, empId);
            rest = pstmt.executeQuery();  
            while(rest.next()){
            	String roleId = rest.getString("f_role_id");
            	list.add(roleId);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleDAOImpl--getUsableRoleId(String empId)-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"RoleDAOImpl--getUsableRoleId(String empId)-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
		return list;
	}
}