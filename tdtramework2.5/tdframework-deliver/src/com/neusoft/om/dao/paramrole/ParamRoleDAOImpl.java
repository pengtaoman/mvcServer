/*
 * �������� 2006-7-12
 *
 * TODO Ҫ���Ĵ����ɵ��ļ���ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
package com.neusoft.om.dao.paramrole;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/*******************************************************************************
 * ������ : ParamRoleDAOImpl.java 
 * ���� : 2006-7-12
 * ���� : wangwei@neusoft.com 
 * ģ�� : ���� :
 * ��ע :
 * 
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸���
 * �޸�ԭ�� 1 2
 ******************************************************************************/
public class ParamRoleDAOImpl extends BaseDaoImpl implements ParamRoleDAO{

    /**
	 * ����������ɫ��Ϣ
	 * @author yanglm
	 * @param paramroleVO
	 * @return int
	 * @throws DataAccessException
	 */
    public int doAddParamRole(ParamRoleVO paramroleVO) throws DataAccessException {
        
        int code = -1;
        String get_seq  = "SELECT om_role_s.NEXTVAL  f_sequence_value FROM dual";
        String add_role = "insert into om_param_role_t (f_role_id,f_role_name,f_creater)  values(?,?,?)";
		//String add_rel  = "insert into om_employee_param_role_rel_t(f_employee_id, " +
		//				  	  "f_param_role_id,f_usable_flag,f_admin_flag) values (?,?,?,?)";
		
		Connection conn = null;
		PreparedStatement pstmt = null;                                                                           
		ResultSet rest = null;
        
		try{
            conn = getConnection();
            conn.setAutoCommit(false);
            pstmt = conn.prepareStatement(get_seq);
            rest = pstmt.executeQuery();
            //��ȡ�������ݽ�ɫ��ʶ�����к�
            int roleSequence = -1;
            if(rest.next()){
            	roleSequence = rest.getInt(1);
            }
            //ȡ�����Ȱ����ݽ�ɫ��Ϣ�����ɫ��
            if(roleSequence > 0){
            	int i = 1;
                pstmt = conn.prepareStatement(add_role);
                pstmt.setInt(i++, roleSequence);
                pstmt.setString(i++, paramroleVO.getRoleName());
                pstmt.setString(i++, paramroleVO.getCreater());
                code = pstmt.executeUpdate();
                //��ɫ�����ɹ���ѽ�ɫ�ʹ����˲���ְԱ��ɫ��ϵ��
                /*
                if(code == 1){
                	pstmt = conn.prepareStatement(add_rel);
                	i = 1;
                	pstmt.setString(i++,paramroleVO.getCreater());
                	pstmt.setInt(i++,roleSequence);
                	pstmt.setInt(i++, 1);
                	pstmt.setInt(i++, 1);
                	code = pstmt.executeUpdate();
                }
                */
            }
            
            if(code > 0){
            	conn.commit();
            }
        }catch (SQLException se){
		    code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamRoleDAOImpl--doAddParamRole-1:" + se.getMessage());
			throw new DataAccessException(se);
        }catch (Exception e){
		    code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamRoleDAOImpl-- doAddParamRole-2:" + e.getMessage());
			throw new DataAccessException(e); 
	    }finally {
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"ParamRoleDAOImpl--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			close(rest, pstmt, conn);
		}
		
		return code;
    }

    /**
	 * �޸Ĳ�����ɫ
	 * @param paramRoleId
	 * @return int
	 * @throws DataAccessException
	 */
    public int doModifyParamRole(ParamRoleVO paramroleVO) throws DataAccessException{
        int code = -1;
		String sql = " update om_param_role_t set f_role_name=? where f_role_id = ? ";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,paramroleVO.getRoleName());
			pstmt.setInt(2,paramroleVO.getRoleId());
			code = pstmt.executeUpdate();
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"ParamRoleDAOImpl--doModifyParamRole-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"ParamRoleDAOImpl--doModifyParamRole-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
		return code;
    }

    /**
	 * ���ݲ�����ɫroleIdɾ����Ϣ
	 * ����ý�ɫ��ʶ�ѱ�ʹ��������ɾ��
	 * @author yanglm
	 * @param roleId
	 * @return int
	 * @throws DataAccessException
	 */
    public String doDeleteParamRole(int roleId) throws DataAccessException {
        int code = 0;
        String message = "true";
        
		String checkRoleSql = " select count(f_param_role_id) role_count from om_employee_param_role_rel_t where f_param_role_id = ? ";
		String sql1 = " delete om_param_role_t where f_role_id = ? ";
		String sql2 = " delete om_employee_param_role_rel_t where f_param_role_id = ? ";
		String sql3 = " delete om_param_role_table_relation_t where role_id = ? ";
		String sql4 = " delete om_param_data_info_t where role_id = ? ";
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			pstmt = conn.prepareStatement(checkRoleSql);
			pstmt.setInt(1,roleId);
			rest = pstmt.executeQuery();

			if(rest.next()){
				code = rest.getInt("role_count");
			}
			if(code < 2){
				int i = 0;
				List list = new ArrayList();
				list.add(sql1);
				list.add(sql2);
				list.add(sql3);
				list.add(sql4);
				while(i < 4){
					pstmt = conn.prepareStatement((String)list.get(i++));
					pstmt.setInt(1, roleId);
					code = pstmt.executeUpdate();
					if(code < 0){
						message = "ɾ�����ݽ�ɫʧ��";
						break;
					}
				}
				list = null;
				if(code >= 0){
					conn.commit();
				}
			}else{
				message = "�ý�ɫ�ѱ�ʹ��������ɾ��";
			}
		} catch (SQLException e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamRoleDAOImpl--doDeleteParamRole-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			code = 0;
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamRoleDAOImpl--doDeleteParamRole-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"ParamRoleDAOImpl--setAutoCommit()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			close(rest, pstmt, conn);
		}
		
		return message;
    }

    /**
	 * ����ְԱ����õ�������Ϣ
	 * @param emplyeeId
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    public ParamRoleColl getParamRoleInfoByEmployeeId(String emplyeeId) throws DataAccessException {
    	ParamRoleColl roleColl = new ParamRoleColl();
		if(emplyeeId==null){
			emplyeeId="";				
		}
		StringBuffer sql = new StringBuffer("");
		
		sql.append(" select a.*,b.F_USABLE_FLAG,b.F_ADMIN_FLAG , ");
		sql.append(" decode (f_creater,'" + emplyeeId + "',1,0) f_if_creater ");
		sql.append("from om_param_role_t a,om_employee_param_role_rel_t b ");
		sql.append(" where a.f_role_id = b.f_param_role_id ");
		if(emplyeeId!=null&&emplyeeId.intern()!="".intern()){
			sql.append("and b.f_Employee_id ='"+emplyeeId+"'");
		}
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql.toString());
			rest = pstmt.executeQuery();
			while (rest.next()) {
				ParamRoleVO vo = new ParamRoleVO();
				vo.setAttribute(rest);
				roleColl.addParamRole(vo);
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
	 * ���ݲ�����ɫ���Ƶõ�������Ϣ
	 * @param paramroleName
	 * @return ParamRoleColl
	 * @throws ServiceException
	 */
    public ParamRoleColl getParamRoleInfoByParamRoleName(String paramroleName,
    		String emplyeeId) throws DataAccessException {
        ParamRoleColl paramroleColl = new ParamRoleColl();
		StringBuffer sql = new StringBuffer("");
		
		sql.append(" select distinct a.*,0 F_USABLE_FLAG,0 F_ADMIN_FLAG , decode (f_creater,'"+emplyeeId+"',1,0) f_if_creater");
		sql.append(" from om_param_role_t a where  a.f_creater = '"+emplyeeId+"' and a.f_role_name like '%" +paramroleName+	"%'");
		sql.append("union 	select a.*,b.F_USABLE_FLAG,b.F_ADMIN_FLAG , decode (f_creater,'"+emplyeeId+"',1,0) f_if_creater " +
				" from om_param_role_t a,om_employee_param_role_rel_t b where a.f_role_id = b.f_param_role_id and b.f_Employee_id ='"+emplyeeId+"'");
		if(paramroleName!=null && !paramroleName.trim().equals("")){
			sql.append(" and a.f_role_name like '%" +paramroleName+	"%'");
		}
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql.toString());
		
			rest = pstmt.executeQuery();
			while (rest.next()) {
				ParamRoleVO vo = new ParamRoleVO();
				vo.setAttribute(rest);
				paramroleColl.addParamRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"ParamRoleDAOImpl--getParamRoleInfoByParamRoleName-1:"
					+ e.getMessage());
			throw new DataAccessException(e);
		} 
		catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
				"ParamRoleDAOImpl--getParamRoleInfoByParamRoleName-2:"
					+ e.getMessage());
			throw new DataAccessException(e);
		}finally {
			close(rest, pstmt, conn);
		}
		
		return paramroleColl;
		
    }   
    /**
     * �õ�����Ա���й���Ȩ�Ĳ�����ɫ
     * @param currentEmpId ����Ա��employeeId
     * @return
     * @throws ServiceException
     */
    public ParamRoleColl getAssignableParamRoleColl(String currentEmpId) throws DataAccessException {
        ParamRoleColl paramroleColl = new ParamRoleColl();
		String sql = "SELECT a.* FROM om_param_role_t a, om_employee_param_role_rel_t b WHERE b.f_employee_id = ? AND b.f_admin_flag = 1 AND a.f_role_id =b.f_param_role_id ";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, currentEmpId);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				ParamRoleVO vo = new ParamRoleVO();
				vo.setAttribute(rest);
				paramroleColl.addParamRole(vo);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"ParamRoleDAOImpl--getAssignableParamRoleColl--1:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		
		return paramroleColl;
    }
    
    /**
     * ���ְԱ����ʹ�õĲ�����ɫ�б�
     * @param employeeId
     * @return ParamRoleColl -- employeeId���ְԱ����ʹ�õĲ�����ɫ�б�
     * @throws DataAccessException
     */
    public ParamRoleColl getUsableParamRoleCollByEmployeeId(String employeeId) throws DataAccessException {
        ParamRoleColl paramroleColl = new ParamRoleColl();
        
        StringBuffer buf = new StringBuffer();
        buf.append(" SELECT a.*, b.* ");
        buf.append("   FROM om_param_role_t a, om_employee_param_role_rel_t b ");
        buf.append("  WHERE a.f_role_id = b.f_param_role_id ");
        buf.append("    AND b.f_employee_id = ? ");
        buf.append("    AND b.f_usable_flag = ? ");
        
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        String sql = buf.toString();
        
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, employeeId);
            pstmt.setInt(2, 1);
            rest = pstmt.executeQuery();
            while (rest.next()) {
                ParamRoleVO vo = new ParamRoleVO();
                vo.setAttribute(rest);
                paramroleColl.addParamRole(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR,
                 "ParamRoleDAOImpl--getAssignableParamRoleColl--1:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        
        return paramroleColl;
    }
	/**
	 * ͨ��ְԱ����õ��䴴���Ľ�ɫ�б�
	 * 
	 * @param account
	 * @return
	 * @throws DataAccessException
	 */
	public ParamRoleColl getCreateParamRoleColl(String employeeId)
			throws DataAccessException {
		ParamRoleColl roleColl = new ParamRoleColl();
		String sql = "SELECT * FROM om_param_role_t WHERE f_creater = '"
				+ employeeId +"'";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while (rest.next()) {
				ParamRoleVO vo = new ParamRoleVO();
				vo.setAttribute(rest);
				roleColl.addParamRole(vo);
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
	
	public boolean haveRepeatName(String name ) throws DataAccessException{
		boolean repeat = false;
		String sql = "SELECT * FROM om_param_role_t WHERE f_role_name = ? ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;	
		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, name);
			rest = pstmt.executeQuery();
			if (rest.next()) {
				repeat = true;
			}
		} catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"RoleDAOImpl--getCreateRoleColl-1:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return repeat;
	}
}
