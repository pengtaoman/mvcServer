package com.neusoft.om.dao.employee;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import com.neusoft.om.bo.EmployeeInfoReq;
import com.neusoft.om.bo.EmployeeInfoResp;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.om.omutil.PassWord;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.DESUtil;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.taglib.innertree.TreeData;
/**brief description
 * <p>Date       : 2004-10-28</p>
 * <p>Module     : om</p>
 * <p>Description: employee maintance</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class EmployeeDAOImpl extends BaseDaoImpl implements EmployeeDAO {
	/**
	 * 根据 employeeId 查找唯一一条记录
	 * @author 
	 * @param
	 * @return
	 */
	public EmployeeVO getEmployeeInfoById(String employeeId) throws DataAccessException{
		EmployeeVO vo = null;
		
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT a.*,b.f_area_name,c.f_organ_name");
		buf.append(" FROM om_employee_t a,");
		buf.append(" om_area_t b,");
		buf.append(" om_organ_t c");
		buf.append(" WHERE a.f_employee_id = ?");
		buf.append(" AND a.f_area_id = b.f_area_id");
		buf.append(" AND a.f_organ_id = c.f_organ_id");
		
		String sql = buf.toString();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			rest = pstmt.executeQuery();
			
			if(rest.next()){
				vo = new EmployeeVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
    /**
     * 查询所属渠道信息
     * @param name
     * @return
     * @throws DataAccessException
     */
     public String getDealerNameById(String dealerId) throws DataAccessException{
             String dealerName= "";
             StringBuffer buf = new StringBuffer();
             buf.append("select DEALER_NAME from BD_DEALER_T where DEALER_ID = ? ");            
             String sql = buf.toString();            
             Connection conn = null;
             PreparedStatement pstmt = null;
             ResultSet rest = null;
             try{
                 conn = getConnection();
                 pstmt = conn.prepareStatement(sql);
                 pstmt.setString(1,dealerId);
                 rest = pstmt.executeQuery();  
                 if(rest.next()){
               	  dealerName = rest.getString(1);
                 }
             }catch(SQLException e){
                 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByName-1:"+e.getMessage());
                 throw new DataAccessException(e);
             }catch(Exception e){
                 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByName-2:"+e.getMessage());
                 throw new DataAccessException(e);
             }finally{
                 close(rest,pstmt,conn);
             }  
             return dealerName;
     }

	public EmployeeVO getEmployeeInfoByWorkNo(String workNo) throws DataAccessException {
		EmployeeVO vo = null;
		StringBuffer buf = new StringBuffer();
        buf.append(" SELECT * ");
		buf.append(" FROM om_employee_t WHERE f_work_no = ?");
			
		String sql = buf.toString();
			
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,workNo);
			rest = pstmt.executeQuery();
				
			if(rest.next()){
				vo = new EmployeeVO();
				vo.setAttribute(rest);
			}       
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByWorkNo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByWorkNo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	/**
     * 根据姓名模糊查询职员信息
     * @param name
     * @return
     * @throws DataAccessException
     */
     public EmployeeColl getEmployeeInfoByName(String name,int cityLevel) throws DataAccessException{
             EmployeeColl empColl = new EmployeeColl();
             StringBuffer buf = new StringBuffer();
             
             buf.append("SELECT a.* FROM om_employee_t a, om_area_t b " +
                    " WHERE a.f_area_id = b.f_area_id AND a.f_employee_name LIKE ? AND b.f_area_level >=? ");            
             String sql = buf.toString();            
             Connection conn = null;
             PreparedStatement pstmt = null;
             ResultSet rest = null;
             try{
                 conn = getConnection();
                 pstmt = conn.prepareStatement(sql);
                 pstmt.setString(1,"%"+name+"%");
                 pstmt.setInt(2, cityLevel);
                 rest = pstmt.executeQuery();  
                 while(rest.next()){
                     EmployeeVO vo = new EmployeeVO();
                     vo.setAttribute(rest);
                     empColl.addEmployee(vo);
                 }
             }catch(SQLException e){
                 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByName-1:"+e.getMessage());
                 throw new DataAccessException(e);
             }catch(Exception e){
                 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByName-2:"+e.getMessage());
                 throw new DataAccessException(e);
             }finally{
                 close(rest,pstmt,conn);
             }  
             return empColl;
     }
		
	/**
	 * 根据条件查找职员信息结果集(如果职务为非空,则查兼职信息)
	 */
	public EmployeeColl getEmployeeInfo(String areaId,String organId,String dutyId) throws DataAccessException{
		EmployeeColl coll = new EmployeeColl();
		StringBuffer sql = new StringBuffer("");
		StringBuffer sql1 = new StringBuffer("");
		sql1.append("SELECT * FROM om_employee_t WHERE 1=1");
		if (!areaId.equals("")){
			sql1.append(" and f_area_id = ?");
		}
		if(!organId.equals("")){
			sql1.append(" and f_organ_id = ?");
		}
		
		if(!dutyId.equals("")){
			//sql1.append(" and f_duty_id = "+dutyId );
			sql1 = new StringBuffer();
			sql1.append("SELECT a.* ");
			sql1.append(" FROM om_employee_t a,om_employee_duty_relation_t b");
			sql1.append(" WHERE b.f_organ_id = ?");
			sql1.append(" AND b.f_duty_id = ?");
			sql1.append(" AND a.f_employee_id = b.f_employee_id ");
		}
		
		sql.append(sql1);	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql.toString());
			int i=0;
			if (!areaId.equals("")){
				i++;
				pstmt.setString(i,areaId);
			}
			if(!organId.equals("")){
				i++;
				pstmt.setString(i,organId);
			}
			
			if(!dutyId.equals("")){
				i++;
				pstmt.setString(i,organId);
				i++;
				pstmt.setString(i,dutyId);
			}
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				EmployeeVO vo = new EmployeeVO();
				vo.setAttribute(rest);
				coll.addEmployee(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	
	public EmployeeColl getEmployeeInfoLikeWorkNo(String workNo) throws DataAccessException{
		EmployeeColl coll = new EmployeeColl();
		EmployeeVO vo = null;
		StringBuffer buf = new StringBuffer();
        buf.append(" SELECT * ");
		buf.append(" FROM om_employee_t WHERE f_work_no like ?");
	
		String sql = buf.toString();
	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,workNo);
			rest = pstmt.executeQuery();
		
			while(rest.next()){
				vo = new EmployeeVO();
				vo.setAttribute(rest);
				coll.addEmployee(vo);
			}       
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoLikeWorkNo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoLikeWorkNo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;
	}
	
	public EmployeeColl getEmployeeInfoByOrganId(String organId) throws DataAccessException {
		EmployeeColl coll = new EmployeeColl();
		String sql = "select * from om_employee_t where f_organ_id = ? and f_status = 0";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				EmployeeVO vo = new EmployeeVO();
				vo.setAttribute(rest);
				coll.addEmployee(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByOrganId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByOrganId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);		
		}	
		return coll;
	}

	public EmployeeColl getAllEmployeeInfoByOrganId(String organId) throws DataAccessException {
		EmployeeColl coll = new EmployeeColl();
		String sql = "SELECT a.* " +
			" FROM OM_EMPLOYEE_T a,OM_EMPLOYEE_DUTY_RELATION_T b" +
			" WHERE a.f_employee_id = b.f_employee_id" +
			" AND b.f_organ_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				EmployeeVO vo = new EmployeeVO();
				vo.setAttribute(rest);
				coll.addEmployee(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getAllEmployeeInfoByOrganId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getAllEmployeeInfoByOrganId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);		
		}	
		return coll;
	}
	
	public EmployeeColl getEmployeeInfo(String organId, int dutyId) throws DataAccessException {
		EmployeeColl coll = new EmployeeColl();
		String sql = "SELECT * " +
			" FROM om_employee_t " +
			" WHERE f_organ_id = ?" +
			" AND f_duty_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			pstmt.setInt(2,dutyId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				EmployeeVO vo = new EmployeeVO();
				vo.setAttribute(rest);
				coll.addEmployee(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);		
		}	
		return coll;
	}
			
	public EmployeeColl getAllEmployeeInfo(String organId, int dutyId) throws DataAccessException {
		EmployeeColl coll = new EmployeeColl();
		String sql = "SELECT a.* " +
			" FROM om_employee_t a,om_employee_duty_relation_t b" +
			" WHERE b.f_organ_id = ?" +
			" AND b.f_duty_id = ?" +
			" AND a.f_employee_id = b.f_employee_id";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			pstmt.setInt(2,dutyId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				EmployeeVO vo = new EmployeeVO();
				vo.setAttribute(rest);
				coll.addEmployee(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getAllEmployeeInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getAllEmployeeInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);		
		}	
		return coll;
	}
	
	public EmployeeColl getPartTimeEmployeeInfo(String organId, int dutyId) throws DataAccessException {
		EmployeeColl coll = new EmployeeColl();
		String sql = "SELECT a.* " +
			" FROM om_employee_t a,om_employee_duty_relation_t b" +
			" WHERE b.f_organ_id = ?" +
			" AND b.f_duty_id = ? " +
			" AND b.f_kind = 2 " +
			" AND a.f_employee_id = b.f_employee_id";
			
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,organId);
			pstmt.setInt(2,dutyId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				EmployeeVO vo = new EmployeeVO();
				vo.setAttribute(rest);
				coll.addEmployee(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getPartTimeEmployeeInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getPartTimeEmployeeInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);		
		}	
		return coll;
	}
		
	public EmployeeColl getAllEmployeeInfoByDutyId(int dutyId) throws DataAccessException {
		EmployeeColl coll = new EmployeeColl();
		StringBuffer buf = new StringBuffer();
		buf.append("SELECT a.* ");
		buf.append(" FROM om_employee_t a,om_employee_duty_relation_t b" );
		buf.append(" WHERE b.f_duty_id = ?" );
		buf.append(" AND a.f_employee_id = b.f_employee_id");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1,dutyId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				EmployeeVO vo = new EmployeeVO();
				vo.setAttribute(rest);
				coll.addEmployee(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getAllEmployeeInfoByDutyId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getAllEmployeeInfoByDutyId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);		
		}	
		return coll;
	}
	
	public EmployeeColl getEmployeeInfoFromEmployeeRoleRelation(int roleId) throws DataAccessException{
		EmployeeColl coll = new EmployeeColl();
		StringBuffer buf = new StringBuffer();
		buf.append(" SELECT a.* FROM om_employee_t a,om_employee_role_relation_t b");
		buf.append(" WHERE a.F_employee_ID = b.f_employee_id");
		buf.append(" AND b.f_role_id = ?");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1,roleId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				EmployeeVO vo = new EmployeeVO();
				vo.setAttribute(rest);
				coll.addEmployee(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoFromEmployeeRoleRelation-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoFromEmployeeRoleRelation-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);		
		}	
		return coll;
	}
	
	//插入职员信息
	public int doAddEmployee(EmployeeVO vo) throws DataAccessException{
		int code = 1; //成功
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_employee_t (");
		buf.append("f_employee_id,f_bus_duty_id,f_employee_name,f_duty_id,");
		buf.append("f_area_id,f_organ_id,f_parent_employee_id,f_work_no,");
		buf.append("f_work_pwd,f_inactive_date,f_inactive_pwd_date,f_employee_type,");
		buf.append("f_educate_level,f_work_address,f_work_telephone,f_email,");
		buf.append("f_hone_telephone,f_mobile,f_fax,f_home_address,");
		buf.append("f_birthday,f_gender,f_income,f_marriage_status,");
		buf.append("f_hired_date,f_contract_date,f_resigned_date,f_update_date,");
		buf.append("f_login_ip,f_mac "); 
        buf.append(", f_owner,f_admin_type ");  //add 4 field 060610
        buf.append(", f_city_code, f_person_level, f_status, f_dealer_id " +
        		", f_login_ip2, f_mac2, f_email2,f_order,f_oper_level ");
        buf.append(" ,f_party_id");
		buf.append(" )values(");
		buf.append("?,?,?,?,");
		buf.append("?,?,?,?,");
		buf.append("?,to_date(?,'yyyy-mm-dd'),to_date(?,'yyyy-mm-dd'),?,");
		buf.append("?,?,?,?,");
		buf.append("?,?,?,?,");
		buf.append("to_date(?,'yyyy-mm-dd'),?,?,?,");
		buf.append("to_date(?,'yyyy-mm-dd'),to_date(?,'yyyy-mm-dd'),to_date(?,'yyyy-mm-dd'),to_date(?,'yyyy-mm-dd'),");
        buf.append("?,?,");
        buf.append("?,?,?,?,?,?,?,?,?,?,?,?)");
        
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,vo.getEmployeeId());
			pstmt.setInt(2,vo.getBusDutyId());
			pstmt.setString(3,vo.getEmployeeName());
			pstmt.setInt(4,vo.getDutyId());
			pstmt.setString(5,vo.getAreaId());
			pstmt.setString(6,vo.getOrganId());
			pstmt.setString(7,vo.getParentEmployeeId());
			pstmt.setString(8,vo.getWorkNo().trim());
			pstmt.setString(9,vo.getWorkPwd());
			pstmt.setString(10,vo.getInactiveDate());
			pstmt.setString(11,vo.getInactivePwdDate());
			pstmt.setInt(12,vo.getEmployeeType());
			pstmt.setInt(13,vo.getEducateLevel());
			pstmt.setString(14,vo.getWorkAddress());
			pstmt.setString(15,vo.getWorkTelephone());
			pstmt.setString(16,vo.getEmail());
			pstmt.setString(17,vo.getHoneTelephone());
			pstmt.setString(18,vo.getMobile());
			pstmt.setString(19,vo.getFax());
			pstmt.setString(20,vo.getHomeAddress());
			pstmt.setString(21,vo.getBirthday());
			pstmt.setInt(22,vo.getGender());
			pstmt.setFloat(23,vo.getIncome());
			pstmt.setInt(24,vo.getMarriageStatus());
			pstmt.setString(25,vo.getHiredDate());
			pstmt.setString(26,vo.getContractDate());
			pstmt.setString(27,vo.getResignedDate());
			pstmt.setString(28,vo.getUpdateDate());
			pstmt.setString(29,vo.getLoginIp());
			pstmt.setString(30,vo.getMac());
            pstmt.setString(31,vo.getOwner());
            pstmt.setInt(32,vo.getAdminType());
            pstmt.setString(33,getCityCodeByAreaId(vo.getAreaId()));
            pstmt.setInt(34,vo.getPersonLevel());
            pstmt.setInt(35, vo.getStatus());
            pstmt.setString(36, vo.getDealerId());
            pstmt.setString(37, vo.getLoginIp2());
            pstmt.setString(38, vo.getMac2());
            pstmt.setString(39, vo.getEmail2());
            pstmt.setInt(40, vo.getOrder());
            pstmt.setInt(41, vo.getOperLevel());
            pstmt.setLong(42, vo.getPartyId());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doAddEmployee()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doAddEmployee()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}  
		
		return code;
	}
	
	/**根据主键更新职员信息(不包括密码)*/
	public int doModifyEmployeeById(EmployeeVO vo) throws DataAccessException{
		int code = 1; //成功
		StringBuffer buf = new StringBuffer();
		buf.append("UPDATE om_employee_t"); 
		buf.append(" set f_bus_duty_id = ? ,f_employee_name = ? ,");
		buf.append(" f_duty_id = ? ,f_area_id = ? ,");
		buf.append(" f_organ_id = ? ,f_parent_employee_id = ? ,");
		buf.append(" f_inactive_date = to_date(?,'yyyy-mm-dd') ,");
		buf.append(" f_inactive_pwd_date = to_date(?,'yyyy-mm-dd') ,f_employee_type = ? ,");
		buf.append(" f_educate_level = ? ,f_work_address = ? ,");
		buf.append(" f_work_telephone = ? , f_email = ? ,");
		buf.append(" f_hone_telephone = ? ,f_mobile = ? ,");
		buf.append(" f_fax = ? ,f_home_address = ? ,");
		buf.append(" f_birthday = to_date(?,'yyyy-mm-dd') ,f_gender = ? ,");
		buf.append(" f_income = ? ,f_marriage_status = ? ,");
		buf.append(" f_hired_date = to_date(?,'yyyy-mm-dd') ,f_contract_date = to_date(?,'yyyy-mm-dd') ,");
		buf.append(" f_resigned_date = to_date(?,'yyyy-mm-dd') ,");
		//buf.append(" f_update_date = to_date(?,'yyyy-mm-dd') ,");
		buf.append(" f_login_ip = ?, f_mac = ? ,");
        buf.append(" f_admin_type = ?"); //管理员类型，不更新上次密码修改时间和创建者
        buf.append(" , f_city_code = ?, f_person_level = ?, f_work_no = ? ");
        buf.append(" , f_status = ?, f_dealer_id = ?");
        buf.append(" , f_login_ip2=?, f_mac2=?, f_email2=?,f_order=?,f_oper_level=? ");
		buf.append(" WHERE f_employee_id = ? ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setInt(1,vo.getBusDutyId());
			pstmt.setString(2,vo.getEmployeeName());
			pstmt.setInt(3,vo.getDutyId());
			pstmt.setString(4,vo.getAreaId());
			pstmt.setString(5,vo.getOrganId());
			pstmt.setString(6,vo.getParentEmployeeId());
			//pstmt.setString(1,vo.getWorkPwd());
			pstmt.setString(7,vo.getInactiveDate());
			pstmt.setString(8,vo.getInactivePwdDate());
			pstmt.setInt(9,vo.getEmployeeType());
			pstmt.setInt(10,vo.getEducateLevel());
			pstmt.setString(11,vo.getWorkAddress());
			pstmt.setString(12,vo.getWorkTelephone());
			pstmt.setString(13,vo.getEmail());
			pstmt.setString(14,vo.getHoneTelephone());
			pstmt.setString(15,vo.getMobile());
			pstmt.setString(16,vo.getFax());
			pstmt.setString(17,vo.getHomeAddress());
			pstmt.setString(18,vo.getBirthday());
			pstmt.setInt(19,vo.getGender());
			pstmt.setFloat(20,vo.getIncome());
			pstmt.setInt(21,vo.getMarriageStatus());
			pstmt.setString(22,vo.getHiredDate());
			pstmt.setString(23,vo.getContractDate());
			pstmt.setString(24,vo.getResignedDate());
			//pstmt.setString(25,vo.getUpdateDate());
			pstmt.setString(25,vo.getLoginIp());
			pstmt.setString(26,vo.getMac());			
			pstmt.setInt(27,vo.getAdminType());
            pstmt.setString(28,getCityCodeByAreaId(vo.getAreaId()));
            pstmt.setInt(29, vo.getPersonLevel());  
            pstmt.setString(30, vo.getWorkNo());
            pstmt.setInt(31, vo.getStatus());
            pstmt.setString(32, vo.getDealerId());
            pstmt.setString(33, vo.getLoginIp2());
            pstmt.setString(34, vo.getMac2());
            pstmt.setString(35, vo.getEmail2());
            pstmt.setInt(36, vo.getOrder());
            pstmt.setInt(37,vo.getOperLevel());
            pstmt.setString(38,vo.getEmployeeId());
            
            code = pstmt.executeUpdate();
			
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doModifyEmployeeById()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doModifyEmployeeById()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return code;
	}
	/**根据主键删除职员信息*/
	public int doDeleteEmployeeById(String employeeId) throws DataAccessException{
		int code = 1; //成功
		
		String sql ="delete from om_employee_t where f_employee_id = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
	
			code = pstmt.executeUpdate();
	
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doDeleteEmployeeById()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doDeleteEmployeeById()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return code;
	}
	
	public int doPasswordUpdate(String workNo, String workPwd) throws DataAccessException {
		int code = 1; //成功
		String sql = " UPDATE om_employee_t SET f_work_pwd = ?,f_pwd_update = null " +
					" WHERE f_work_no = ? ";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,workPwd);
            pstmt.setString(2,workNo);
            
			pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doPasswordUpdate()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doPasswordUpdate()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return code;
	}	

    /**
     * 得到某组织机构下所有兼职人员列表
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getPartTimeEmployeeInfoByOrganId(String organId) throws DataAccessException{
        EmployeeColl empColl = new EmployeeColl();
        StringBuffer buf = new StringBuffer();
       
        buf.append("SELECT distinct a.* " +
                " FROM om_employee_t a, om_employee_duty_relation_t b, om_duty_t c, om_organ_t d " +
                " WHERE (a.f_employee_id in b.f_employee_id) " +
                " and c.f_duty_id = b.f_duty_id " +
                " and d.f_organ_kind = c.f_organ_kind " +
                " and d.f_organ_id = ? " +
                " and b.f_organ_id = ? " );
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, organId);
            pstmt.setString(2, organId);
            rest = pstmt.executeQuery();  
            while(rest.next()){
                EmployeeVO vo = new EmployeeVO();
                vo.setAttribute(rest);
                empColl.addEmployee(vo);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByWorkNoOrName-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByWorkNoOrName-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }  
        return empColl;
    }
    /**
     * 更新密码
     * @param workNo
     * @param password
     * @return
     * @throws DataAccessException
     */
    public int doUpdatePassWord(String workNo, String password) throws DataAccessException {
        int code = 1; //成功
        String sql = " UPDATE om_employee_t set f_work_pwd = ?,f_pwd_update = sysdate " +
                    " where f_work_no = ? ";
        Connection conn = null;
        PreparedStatement pstmt = null;
        PreparedStatement pstmt1 = null;
        PreparedStatement pstmt2 = null;
        ResultSet rest = null;
        ResultSet rest1 = null;
        try{
        	
			String primaryPwd = PassWord.decode(password);
			String fUrlPwd = DESUtil.encrypt(primaryPwd);
        	
            conn = getConnection();
            conn.setAutoCommit(false);
            
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,password);
            pstmt.setString(2,workNo);
            pstmt.executeUpdate();
            
            
            
            String sqlGetUrl = "Select a.f_page_link,a.F_EMPLOYEE_ID,a.F_MENU_ID,a.F_SYSTEM_ID from OM_FAVORITE_T a, om_employee_t b where a.F_EMPLOYEE_ID=b.F_EMPLOYEE_ID and b.f_work_no='"+workNo+"'";
            pstmt1 = conn.prepareStatement(sqlGetUrl);
            rest1 = pstmt1.executeQuery();
			while(rest1.next()){
				String url = rest1.getString(1);
				String eid = rest1.getString(2);
				String menuId= rest1.getString(3);
				String sysId= rest1.getString(4);
				if (url.indexOf("PASSWORD=") != -1) {
					String partUrl = url.substring(url.indexOf("PASSWORD="));
					if (partUrl.indexOf("&") != -1) {
						partUrl= partUrl.substring(0, partUrl.indexOf("&"));
					} else {
						//nothing
					}
					url = url.replace(partUrl, new StringBuilder("PASSWORD=").append(fUrlPwd));
					StringBuilder sqlUpUrl = new StringBuilder("update OM_FAVORITE_T set F_PAGE_LINK='")
					        .append(url)
					        .append("' where F_EMPLOYEE_ID='")
					        .append(eid)
					        .append("' and F_MENU_ID='")
					        .append(menuId)
					        .append("' and F_SYSTEM_ID='")
					        .append(sysId)
					        .append("'");
					pstmt2 = conn.prepareStatement(sqlUpUrl.toString());
					pstmt2.execute();
				} else {
					//nothing
				}
			}   
			conn.commit();
			conn.setAutoCommit(true);
        }catch(SQLException e){
        	if (conn != null) {
        		try {
        		    conn.rollback();
        		} catch (Exception ex) {
        			code = 0;
        			ex.printStackTrace();
        		}
        	}
            code = 0;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doUpdatePassWord()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
        	if (conn != null) {
        		try {
        		    conn.rollback();
        		} catch (Exception ex) {
        			code = 0;
        			ex.printStackTrace();
        		}
        	}
            code = 0;
            SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doUpdatePassWord()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
        	try {
	            if (rest1 != null) {
	            	rest1.close();
	            }
	            if (pstmt1 != null) {
	            	pstmt1.close();
	            }
	            if (pstmt2 != null) {
	            	pstmt2.close();
	            }
        	} catch (Exception ex) {
        		code = 0;
        		ex.printStackTrace();
        	}
            close(rest,pstmt,conn);
        }  
        return code;
    }
    
    
    
    public EmployeeVO getEmployeeInfoByWorkNoFilter(String workNo,String employeeId,int areaLevel,int adminType) throws DataAccessException {
		EmployeeVO vo = null;
		StringBuffer buf = new StringBuffer();
        buf.append(" SELECT a.* FROM om_employee_t a, om_area_t b");
		buf.append(" WHERE a.f_area_id = b.f_area_id AND a.f_work_no = ?");
		buf.append(" AND b.f_area_level >=?");
		
		if(adminType==0)
		{
		    return vo;
		}
		else if(adminType==2)
		{
		    buf.append(" AND a.f_owner =?");
		}
		else
		{
		}
		String sql = buf.toString();
		System.out.println("areaLevel:"+areaLevel+" adminType:"+adminType);	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		int i=1;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(i++,workNo);
			pstmt.setInt(i++,areaLevel);
			if(adminType==2)
			    pstmt.setString(i++,employeeId);   
			rest = pstmt.executeQuery();
				
			if(rest.next()){
				vo = new EmployeeVO();
				vo.setAttribute(rest);
			}       
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByWorkNoFilter-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByWorkNoFilter-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	/**
     * 根据姓名模糊查询职员信息
     * @param name
     * @return
     * @throws DataAccessException
     */
     public EmployeeColl getEmployeeInfoByNameFilter(String name,String employeeId,int areaLevel,int adminType) throws DataAccessException{
             EmployeeColl empColl = new EmployeeColl();
             StringBuffer buf = new StringBuffer();
             
             buf.append("SELECT a.* FROM om_employee_t a, om_area_t b " +
                    " WHERE a.f_area_id = b.f_area_id AND a.f_employee_name LIKE '%"+name+"%' AND b.f_area_level >="+areaLevel);  
             if(adminType==0)
     		{
     		    return empColl;
     		}
     		else if(adminType==2)
     		{
     		    buf.append(" AND a.f_owner =?");
     		}
     		else
     		{
     		}
             String sql = buf.toString();            
             Connection conn = null;
             PreparedStatement pstmt = null;
             ResultSet rest = null;
             int i=1;
             try{
                 conn = getConnection();
                 pstmt = conn.prepareStatement(sql);
                 if(adminType==2)
                 pstmt.setString(i++,employeeId);
                 rest = pstmt.executeQuery();  
                 while(rest.next()){
                     EmployeeVO vo = new EmployeeVO();
                     vo.setAttribute(rest);
                     empColl.addEmployee(vo);
                 }
             }catch(SQLException e){
                 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByName-1:"+e.getMessage());
                 throw new DataAccessException(e);
             }catch(Exception e){
                 SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByName-2:"+e.getMessage());
                 throw new DataAccessException(e);
             }finally{
                 close(rest,pstmt,conn);
             }  
             return empColl;
     }
    
    
     
     private String getCityCodeByAreaId(String areaId){
         String cityCode = "";
         int cityLevel = 0;
         StringBuffer buf = new StringBuffer();         
         buf.append("SELECT * FROM om_area_t " +
                " WHERE f_area_id = ?");            
         String sql = buf.toString();            
         Connection conn = null;
         PreparedStatement pstmt = null;
         ResultSet rest = null;
         try{
             conn = getConnection();
             pstmt = conn.prepareStatement(sql);
             pstmt.setString(1,areaId);
             rest = pstmt.executeQuery();  
             while(rest.next()){
            	 areaId = rest.getString("f_area_id");
                 cityCode = rest.getString("f_city_code");
                 cityLevel = rest.getInt("f_area_level");
             }
         }catch(SQLException e){
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getCityCodeByAreaId-1:"+e.getMessage());
             throw new DataAccessException(e);
         }catch(Exception e){
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getCityCodeByAreaId-2:"+e.getMessage());
             throw new DataAccessException(e);
         }finally{
             close(rest,pstmt,conn);
         }  
         if(cityLevel > 3 && cityCode.length() >= 6){
        	 cityCode = cityCode.substring(0,3);
         }
         return cityCode;
     }

     /**
      * 得到组织机构职员列表
      * @param  EmployeeColl
      * @return
      * @throws ServiceException
      */
     private String getAdminTypeName(int adminType){
    	 if(adminType == 0){
    		 return "普通操作员";
    	 }else if(adminType == 1){
    		 return "特权管理员";
    	 }else if(adminType == 2){
    		 return "普通管理员";
    	 }else{
    		 return "";
    	 }
     }
     
     public EmployeeColl getEmployeeInfoFilter(Map filterInfo) throws DataAccessException {
         EmployeeColl coll = new EmployeeColl();
  		
  		StringBuffer sql = new StringBuffer("");
  		sql.append(" SELECT distinct a.*,b.f_role_num,nvl(c.f_duty_name,'无'),e.f_level_name,f.f_organ_name, g.f_area_name");
  		sql.append(" FROM om_employee_t a,om_duty_t c,om_person_level_t e,om_organ_t f,");
  		sql.append(" (select a.f_employee_id,count(b.f_role_id) f_role_num from om_employee_t a,om_employee_role_relation_t b");
  		sql.append(" where a.f_employee_id = b.f_employee_id(+) group by a.f_employee_id) b,om_area_t g");
  		sql.append(" WHERE ");
  		sql.append(" a.f_area_id = g.f_area_id and g.f_area_level >= ? ");
  		sql.append(" and a.F_EMPLOYEE_ID = b.f_employee_id and a.f_duty_id = c.f_duty_id(+)");
  		sql.append(" and a.f_person_level = e.f_level_code(+) and a.f_organ_id = f.f_organ_id(+) ");
  		//sql.append(" and f_dealer_id = d.dealer_id(+) ");
  		
  		Iterator keys = filterInfo.keySet().iterator();
  		while (keys.hasNext()){
  			String key = (String)keys.next();
  			if(key.startsWith("f_"))
  				sql.append(" and a."+filterInfo.get(key)+" ");
  		}
  		
  		if(filterInfo.containsKey("s_role_id")) {
  			sql.append(" and a.f_employee_id in ( ");
  			sql.append(" SELECT i.f_employee_id ");
  			sql.append(" FROM om_employee_t i, om_employee_role_relation_t j ");
  			sql.append(" WHERE i.f_employee_id = j.f_employee_id AND j.f_role_id = "+filterInfo.get("s_role_id"));
  			if (filterInfo.get("s_flagType") != null) {
  				sql.append(" AND j." + filterInfo.get("s_flagType"));
  			}
  			sql.append(" ) ");
  		}
  		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		String adminTypeName = null;
 			
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(sql.toString());
 			pstmt.setInt(1,Integer.parseInt((String)filterInfo.get("areaLevel")));
 			rest = pstmt.executeQuery();			
 			while(rest.next()){
 				EmployeeVO vo = new EmployeeVO();
 				vo.setAttribute(rest);
 				
 				adminTypeName = getAdminTypeName(vo.getAdminType());
 				vo.setAdminTypeName(adminTypeName);
 				
 				if(vo.getStatus() == 0){
                	vo.setStatusInfo("正常");
                }else{
                	vo.setStatusInfo("停用");
                }
 				
 				coll.addEmployee(vo);
 			}
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoFilter(Map)-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(Exception e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoFilter(Map)-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
 			close(rest,pstmt,conn);
 		}  
 		return coll;
     } 
     /**
      * 20100618modify by jianglh
      * sql 中，增加了om_group_emp_t.f_group_id的查询
      */
     
     public EmployeeColl getEmployeeInfoFilter(Map filterInfo, int startRow, int endRow) throws DataAccessException {
         EmployeeColl coll = new EmployeeColl();
  		
  		StringBuffer sql = new StringBuffer("");
  		sql.append(" SELECT * FROM ( ");
  		sql.append(" SELECT distinct a.*,b.f_role_num,nvl(c.f_duty_name,'无'),e.f_level_name,f.f_organ_name,rownum rowcount");
  		sql.append(" FROM om_employee_t a,om_duty_t c,om_person_level_t e,om_organ_t f,");
  		sql.append(" (select a.f_employee_id,count(b.f_role_id) f_role_num from om_employee_t a,om_employee_role_relation_t b");
  		sql.append(" where a.f_employee_id = b.f_employee_id(+) group by a.f_employee_id) b,om_area_t g");
  		sql.append(" WHERE ");
  		sql.append(" a.f_area_id = g.f_area_id and g.f_area_level >= ? ");
  		sql.append(" and a.F_EMPLOYEE_ID = b.f_employee_id and a.f_duty_id = c.f_duty_id(+)");
  		sql.append(" and a.f_person_level = e.f_level_code(+) and a.f_organ_id = f.f_organ_id(+)");
  		//sql.append(" and f_dealer_id = d.dealer_id(+) ");
  		
  		Iterator keys = filterInfo.keySet().iterator();
  		while (keys.hasNext()){
  			String key = (String)keys.next();
  			if(key.startsWith("f_"))
  				sql.append(" and a."+(String)filterInfo.get(key));
  		}
  		
  		if(filterInfo.containsKey("s_role_id")) {
  			sql.append(" and a.f_employee_id in ( ");
  			sql.append(" SELECT i.f_employee_id ");
  			sql.append(" FROM om_employee_t i, om_employee_role_relation_t j ");
  			sql.append(" WHERE i.f_employee_id = j.f_employee_id AND j.f_role_id = "+(String)filterInfo.get("s_role_id"));
  			if (filterInfo.get("s_flagType") != null) {
  				sql.append(" AND j."+(String)filterInfo.get("s_flagType"));
  			}
  			sql.append(" ) ");
  		}
	    sql.append(" and rownum < ? "); 
	    sql.append(" ) "); 
	    sql.append(" where rowcount >= ? "); 
	    sql.append(" order by f_order");
  		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		String adminTypeName = null;
 			
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(sql.toString());
 			pstmt.setInt(1,Integer.parseInt((String)filterInfo.get("areaLevel")));

 			pstmt.setInt(2, endRow);
 			pstmt.setInt(3, startRow);
 			rest = pstmt.executeQuery();			
 			while(rest.next()){
 				EmployeeVO vo = new EmployeeVO();
 				vo.setAttribute(rest);
 				
 				adminTypeName = getAdminTypeName(vo.getAdminType());
 				vo.setAdminTypeName(adminTypeName);
 				
 				if(vo.getStatus() == 0){
                	vo.setStatusInfo("正常");
                }else{
                	vo.setStatusInfo("停用");
                }
 				
 				coll.addEmployee(vo);
 			}
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoFilter(Map)-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(Exception e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoFilter(Map)-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
 			close(rest,pstmt,conn);
 		}  
 		return coll;
     } 
     
     public int getEmployeeInfoRowCountFilter(Map filterInfo) throws DataAccessException {
  		StringBuffer sql = new StringBuffer("");
  		sql.append(" SELECT count(a.f_employee_id) total_rows ");
  		sql.append(" FROM om_employee_t a,om_duty_t c,om_person_level_t e,om_organ_t f,");
  		sql.append(" (select a.f_employee_id,count(b.f_role_id) f_role_num from om_employee_t a,om_employee_role_relation_t b");
  		sql.append(" where a.f_employee_id = b.f_employee_id(+) group by a.f_employee_id) b,om_area_t g");
  		sql.append(" WHERE ");
  		sql.append(" a.f_area_id = g.f_area_id and g.f_area_level >= ? ");
  		sql.append(" and a.F_EMPLOYEE_ID = b.f_employee_id and a.f_duty_id = c.f_duty_id(+)");
  		sql.append(" and a.f_person_level = e.f_level_code(+) and a.f_organ_id = f.f_organ_id(+) ");
  		//sql.append(" and f_dealer_id = d.dealer_id(+) ");
  		
  		Iterator keys = filterInfo.keySet().iterator();
  		while (keys.hasNext()){
  			String key = (String)keys.next();
  			if(key.startsWith("f_"))
  				sql.append(" and a."+(String)filterInfo.get(key));
  		}
  		
  		if(filterInfo.containsKey("s_role_id")) {
  			sql.append(" and a.f_employee_id in ( ");
  			sql.append(" SELECT i.f_employee_id ");
  			sql.append(" FROM om_employee_t i, om_employee_role_relation_t j ");
  			sql.append(" WHERE i.f_employee_id = j.f_employee_id AND j.f_role_id = "+(String)filterInfo.get("s_role_id"));
  			if (filterInfo.get("s_flagType") != null) {
  				sql.append(" AND j."+(String)filterInfo.get("s_flagType"));
  				}
  			sql.append(" ) ");
  		}
  		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		int totalRows = 0;
 			
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(sql.toString());
 			pstmt.setInt(1,Integer.parseInt((String)filterInfo.get("areaLevel")));
 			rest = pstmt.executeQuery();
 			
 			if(rest.next()){
 				totalRows = rest.getInt(1);
 			}
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoRowCountFilter(Map)-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(Exception e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoRowCountFilter(Map)-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
 			close(rest,pstmt,conn);
 		}  
 		return totalRows;
     } 
     
     public EmployeeColl getEmployeeInfoFilter(String areaId, String organId, 
     		String employeeId, int areaLevel, int adminType) throws DataAccessException {
        EmployeeColl coll = new EmployeeColl();
 		
 		StringBuffer sql = new StringBuffer("");
 		sql.append(" SELECT distinct a.*,b.f_role_num,nvl(c.f_duty_name,'无'),e.f_level_name,f.f_organ_name,g.f_area_name");
 		sql.append(" FROM om_employee_t a,om_duty_t c,om_person_level_t e,om_organ_t f,");
 		sql.append(" (select a.f_employee_id,count(b.f_role_id) f_role_num from om_employee_t a,om_employee_role_relation_t b");
 		sql.append(" where a.f_employee_id = b.f_employee_id(+) group by a.f_employee_id) b,om_area_t g");
 		sql.append(" WHERE g.f_area_level >=? and g.f_area_id = a.f_area_id");
 		sql.append(" and a.F_EMPLOYEE_ID = b.f_employee_id and a.f_duty_id = c.f_duty_id(+)");
 		sql.append(" and a.f_person_level = e.f_level_code(+) and a.f_organ_id = f.f_organ_id(+) ");
 		//sql.append(" and f_dealer_id = d.dealer_id(+) ");
 		//普通操作员
 		if(adminType==0) {
 			sql.append(" and a.f_employee_id = ?"); 
   		}else{ 
   			if (!areaId.equals("")){
   				sql.append(" and a.f_area_id in (select f_area_id from om_area_t start with f_area_id = ? " +
   						" CONNECT BY PRIOR f_area_id = f_parent_area_id)");
   			}
   			if(!organId.equals("")){
   				sql.append(" and a.f_organ_id in (select f_organ_id from om_organ_t start with f_organ_id = ? " +
   						" CONNECT BY PRIOR f_organ_id = f_parent_organ_id)");
   			}
   			if(adminType!=1){
   				sql.append(" AND a.f_owner =?");
   			}
   		    
   		}
 		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		String adminTypeName = null;
 			
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(sql.toString());
 			pstmt.setInt(1, areaLevel);
 			int i=1;
 			if(adminType==0) {
 				i ++;
 				pstmt.setString(i, employeeId);
 			}else{
 				if (!areaId.equals("")){
 					i ++;
 					pstmt.setString(i, areaId);
 				}
 				if(!organId.equals("")){
 					i ++;
 					pstmt.setString(i, organId);
 				}
 				if(adminType!=1){
 					i ++;
 					pstmt.setString(i, employeeId);
 				}
 			}
 			rest = pstmt.executeQuery();			
 			while(rest.next()){
 				EmployeeVO vo = new EmployeeVO(); 				
 				vo.setAttribute(rest);
 				
 				adminTypeName = getAdminTypeName(vo.getAdminType());
 				vo.setAdminTypeName(adminTypeName);
 				
 				if(vo.getStatus() == 0){
                	vo.setStatusInfo("正常");
                }else if(vo.getStatus() == 1){
                	vo.setStatusInfo("停用");
                }else{
                	vo.setStatusInfo("停用");
                }
 				
 				coll.addEmployee(vo);
 			}
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoFilter-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(Exception e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoFilter-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
 			close(rest,pstmt,conn);
 		}  
 		return coll;
     } 
    /**
     * 20100618modify by jianglh
     * sql 中，增加了om_group_emp_t.f_group_id的查询
     */
    
    public EmployeeColl getEmployeeInfoFilter(String areaId, String organId, 
    		String employeeId, int areaLevel, int adminType,
    			int beginNum,int endNum) throws DataAccessException {
    	EmployeeColl coll = new EmployeeColl();
 		
 		StringBuffer sql = new StringBuffer("");
 		sql.append("SELECT * FROM ( ");
	 		sql.append(" SELECT distinct a.*,b.f_role_num,nvl(c.f_duty_name,'无'),e.f_level_name,f.f_organ_name,rownum rowcount ");
	 		sql.append(" FROM om_employee_t a,om_duty_t c,om_person_level_t e,om_organ_t f,");
	 		sql.append(" (select a.f_employee_id,count(b.f_role_id) f_role_num from om_employee_t a,om_employee_role_relation_t b");
	 		sql.append(" where a.f_employee_id = b.f_employee_id(+) group by a.f_employee_id) b,om_area_t g");
	 		sql.append(" WHERE g.f_area_level >=? and g.f_area_id = a.f_area_id");
	 		sql.append(" and a.F_EMPLOYEE_ID = b.f_employee_id and a.f_duty_id = c.f_duty_id(+)");
	 		sql.append(" and a.f_person_level = e.f_level_code(+) and a.f_organ_id = f.f_organ_id(+)");
	 		//sql.append(" and f_dealer_id = d.dealer_id(+) ");
 		
 		//普通操作员
 		if(adminType==0) {
 			sql.append(" and a.f_employee_id = ?");
   		}else{ 
   			if (!areaId.equals("")){   				
   				sql.append(" and a.f_area_id in (select f_area_id from om_area_t start with f_area_id = ?" +
   						" CONNECT BY PRIOR f_area_id = f_parent_area_id)");
   			}
   			if(!organId.equals("")){   				
   				sql.append(" and a.f_organ_id in (select f_organ_id from om_organ_t start with f_organ_id = ?" +
   						" CONNECT BY PRIOR f_organ_id = f_parent_organ_id)");
   			}
   			if(adminType!=1){
   				sql.append(" AND a.f_owner =?");
   			}
   		    
   		}
	    sql.append(" and rownum < ? "); 
	    sql.append(" ) "); 
	    sql.append(" where rowcount >= ? "); 
	    sql.append(" order by f_order");
 		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		String adminTypeName = null;
 			
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(sql.toString());
 			pstmt.setInt(1, areaLevel);
 			int i = 1;
 			if(adminType==0) {
 				i ++;
 				pstmt.setString(i, employeeId);
 			}else {
 				if (!areaId.equals("")){  
 					i ++;
 	 				pstmt.setString(i, areaId);
 				}
 				if(!organId.equals("")){ 
 					i ++;
 	 				pstmt.setString(i, organId);
 				}
 				if(adminType!=1){
 					i ++;
 	 				pstmt.setString(i, employeeId);
 	   			}
 			}			
 			pstmt.setInt(i+1, endNum);
 			pstmt.setInt(i+2, beginNum);
 			rest = pstmt.executeQuery();
 			while (rest.next()) {
				EmployeeVO vo = new EmployeeVO();
				vo.setAttribute(rest);

				adminTypeName = getAdminTypeName(vo.getAdminType());
				vo.setAdminTypeName(adminTypeName);

				if (vo.getStatus() == 0) {
					vo.setStatusInfo("正常");
				} else if (vo.getStatus() == 1) {
					vo.setStatusInfo("停用");
				} else {
					vo.setStatusInfo("停用");
				}

				for (int j = beginNum; j < endNum; j++) {

				}
				coll.addEmployee(vo);
			}
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoFilter-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(Exception e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoFilter-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
 			close(rest,pstmt,conn);
 		}  
 		return coll;
    }
    
    public int getEmployeeRowCount(String areaId, String organId, String employeeId, 
    		int areaLevel, int adminType) throws DataAccessException {
        int allRows = 0;
		
        StringBuffer sql = new StringBuffer("");
 		sql.append(" SELECT count(distinct a.f_employee_id)");
 		sql.append(" FROM om_employee_t a,om_duty_t c,om_person_level_t e,om_organ_t f,");
 		sql.append(" om_area_t g");
 		sql.append(" WHERE g.f_area_level >= ? and g.f_area_id = a.f_area_id");
 		sql.append(" and a.f_duty_id = c.f_duty_id(+)");
 		sql.append(" and a.f_person_level = e.f_level_code(+) and a.f_organ_id = f.f_organ_id(+) ");
 		//sql.append(" and f_dealer_id = d.dealer_id(+) ");
 		//普通操作员
 		if(adminType==0) {
 			sql.append(" and a.f_employee_id =? "); 
   		}else{ 
   			if (!areaId.equals("")){
   				sql.append(" and a.f_area_id in (select f_area_id from om_area_t start with f_area_id = ?" );
   				sql.append(" CONNECT BY PRIOR f_area_id = f_parent_area_id)");
   			}
   			if(!organId.equals("")){
   				sql.append(" and a.f_organ_id in (select f_organ_id from om_organ_t start with f_organ_id = ?" );
   				sql.append(" CONNECT BY PRIOR f_organ_id = f_parent_organ_id)");
   			}
   			if(adminType!=1){
   				sql.append(" AND a.f_owner =?");
   			}   		    
   		} 		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql.toString());
			pstmt.setInt(1, areaLevel);
			int i = 1;
			if(adminType==0) {
				i++;
				pstmt.setString(i, employeeId);
	   		}else{ 
	   			if (!areaId.equals("")){
	   				i++;
					pstmt.setString(i, areaId);
	   			}
	   			if(!organId.equals("")){
	   				i++;
					pstmt.setString(i, organId);
	   			}
	   			if(adminType!=1){
	   				i++;
					pstmt.setString(i, employeeId);
	   			}	   		    
	   		} 		
			
			rest = pstmt.executeQuery();			
			if(rest.next()){
				allRows = rest.getInt(1);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeRowCount-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeRowCount-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return allRows;
    }
    /**
     * 查找某子系统的所有用户
     * @param systemId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getEmployeeCollBySystemId(String systemId) throws DataAccessException{
    	EmployeeColl employeeColl = new EmployeeColl();
        StringBuffer buf = new StringBuffer();         
        buf.append("SELECT DISTINCT a.* " +
        		" FROM om_employee_t a, om_menu_t b, om_employee_role_relation_t c, om_func_role_t d " +
        		" WHERE a.f_employee_id = c.f_employee_id AND d.f_menu_id = b.f_menu_id " +
        		" AND c.f_role_id = d.f_role_id AND b.f_system_id =? ");            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,systemId);
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	EmployeeVO employeeVO = new EmployeeVO();
            	employeeVO.setAttribute(rest);
            	employeeColl.addElement(employeeVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getEmployeeCollBySystemId-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getEmployeeCollBySystemId-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
    	return employeeColl;
    }
    
    /**
     * 得到两个级别之间区域的所有职员
     * @param level1
     * @param level2
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getEmployeeByAreaLevel(int level1, int level2) throws DataAccessException{
    	EmployeeColl employeeColl = new EmployeeColl();
        StringBuffer buf = new StringBuffer();        
        String level = getLevel(level1, level2);
        buf.append("SELECT a.f_employee_id, a.f_employee_name, a.f_work_no, a.f_area_id, a.f_organ_id " +
        		" FROM OM_EMPLOYEE_T a, OM_AREA_T b " +
        		" WHERE a.f_area_id = b.f_area_id AND b.f_area_level IN (" + level + ") and f_status = 0");            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	EmployeeVO employeeVO = new EmployeeVO();
            	employeeVO.setAttribute(rest);
            	employeeColl.addElement(employeeVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getEmployeeByAreaLevel-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getEmployeeByAreaLevel-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
    	return employeeColl;
    }
    public EmployeeColl getEmployeeByArea(String areaId) throws DataAccessException{
    	EmployeeColl employeeColl = new EmployeeColl();
    	List areaIdList = getAreaIdList(areaId);
    	String idField = "('"+areaId+"'";
    	for(int i=1; i < areaIdList.size(); i++){
    		idField = idField + ",'"+(String)areaIdList.get(i)+"'";
    	}
    	idField = idField + ")";
        StringBuffer buf = new StringBuffer();   
        buf.append(" select a.*");
        buf.append(" from om_employee_t a, om_area_t b, om_organ_t c");
        buf.append(" where a.f_organ_id = c.f_organ_id ");
        buf.append(" and b.f_area_id = c.F_AREA_ID and b.F_AREA_Id in ");
        buf.append(idField);
        buf.append(" and a.f_status = 0 ");            
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	EmployeeVO employeeVO = new EmployeeVO();
            	//employeeVO.setAttribute(rest);
            	employeeVO.setEmployeeId(rest.getString("f_employee_id"));
            	employeeVO.setEmployeeName(rest.getString("f_employee_name"));
            	employeeVO.setAreaId(rest.getString("f_area_id"));
            	employeeVO.setOrganId(rest.getString("f_organ_id"));
            	employeeColl.addElement(employeeVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getEmployeeByArea-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getEmployeeByArea-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }

    	return employeeColl;
    }
    /*
     * 得到areaId确定的区域上级，上级的上级....直至省份的所有areaId
     */
    private List getAreaIdList(String areaId){
    	List list = new ArrayList();
    	String parentAreaId="";
    	int areaLevel = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
    	try{
    		conn = getConnection();
	    	while(areaLevel != 2){
		        StringBuffer buf = new StringBuffer();   
		        buf.append(" select f_parent_area_id, f_area_level from om_area_t where f_area_id = '"+areaId+"'");            
		        String sql = buf.toString();  	            
	            pstmt = conn.prepareStatement(sql);
	            rest = pstmt.executeQuery();              
	            while(rest.next()){
	            	parentAreaId = rest.getString("f_parent_area_id");
	            	areaLevel = rest.getInt("f_area_level");
	            	list.add(areaId);
	            	areaId = parentAreaId;
	            }
	            if(rest!=null){
	            	rest.close();
	            }
	            if(pstmt!=null){
	            	pstmt.close();
	            }
	    	}
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getAreaIdList-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getAreaIdList-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }

    	return list;
    	
    }
    
    private String getLevel(int level1, int level2){
    	String level = null;
    	for(int i = level1; i < level2+1; i ++){
    		if(level == null || level.trim().equals("")){
    			level = String.valueOf(i);
    		}else{
    			level = level+","+String.valueOf(i);
    		}    		
    	}
    	return level;
    }
    
    public int getDealerEmployeeRowCount(String dealerId, int areaLevel, int adminType, String employeeId) throws DataAccessException {
    	int rowcount = 0;
        StringBuffer buf = new StringBuffer();  
        buf.append("SELECT count(a.f_employee_id) rowcount ");
        buf.append(" FROM OM_EMPLOYEE_T a, OM_AREA_T b, ");
        buf.append(" (select a.f_employee_id,count(b.f_role_id) f_role_num from om_employee_t a,om_employee_role_relation_t b where a.f_employee_id = b.f_employee_id(+) group by a.f_employee_id) d ");
        buf.append(" WHERE a.f_dealer_id = ? " );
        buf.append(" AND a.f_employee_id = d.f_employee_id ");
        buf.append(" AND a.f_area_id = b.f_area_id AND b.f_area_level >= ?" );  
        
		if(adminType==0) //普通操作员
	  	{
			buf.append(" AND a.f_employee_id = ? ");
	  	}else if(adminType==2)//普通管理员
	  	{ 
	  		buf.append(" AND a.f_owner=?");
	  	}
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, dealerId);
            pstmt.setString(2, String.valueOf(areaLevel));
            int i = 2;
            if(adminType==0) //普通操作员
    	  	{
            	i++;
            	pstmt.setString(i, employeeId);
    	  	}else if(adminType==2)//普通管理员
    	  	{ 
    	  		i++;
    	  		pstmt.setString(i, employeeId);
    	  	}
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	rowcount = rest.getInt("rowcount");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getDealerEmployee-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getDealerEmployee-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
    	return rowcount;
    }
    
    /**
     * 得到渠道人员集合 (数据库分页)
     * @param dealerId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getDealerEmployee(String dealerId, int areaLevel, int adminType,String employeeId, int beginRow, int endRow) throws DataAccessException{
    	EmployeeColl employeeColl = new EmployeeColl();
        StringBuffer buf = new StringBuffer();  
        buf.append(" SELECT * FROM ( ");
        buf.append("SELECT rownum rowcount, a.*, d.f_role_num " );
        buf.append(" FROM OM_EMPLOYEE_T a, OM_AREA_T b, " );
        buf.append(" (select a.f_employee_id,count(b.f_role_id) f_role_num from om_employee_t a,om_employee_role_relation_t b where a.f_employee_id = b.f_employee_id(+) group by a.f_employee_id) d " );
        buf.append(" WHERE a.f_dealer_id = ? " );
        buf.append(" AND a.f_employee_id = d.f_employee_id " );
        buf.append(" AND a.f_area_id = b.f_area_id AND b.f_area_level >= ?");  
        
		if(adminType==0) //普通操作员
	  	{
			buf.append(" AND a.f_employee_id = ? ");
	  	}else if(adminType==2)//普通管理员
	  	{ 
	  		buf.append(" AND a.f_owner=?");
	  	}
		buf.append(" and rownum < ? "); 
		buf.append(" ) "); 
		buf.append(" where rowcount >= ? "); 
	    
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, dealerId);
            pstmt.setString(2, String.valueOf(areaLevel));
            int i = 2;
            if(adminType==0) //普通操作员
    	  	{
            	i ++;
            	pstmt.setString(i, employeeId);
    	  	}else if(adminType==2)//普通管理员
    	  	{ 
    	  		i ++;
            	pstmt.setString(i, employeeId);
    	  	}           
            pstmt.setInt(i+1, endRow);
            pstmt.setInt(i+2, beginRow);
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	EmployeeVO employeeVO = new EmployeeVO();
            	employeeVO.setAttribute(rest);
            	String adminTypeName = getAdminTypeName(employeeVO.getAdminType());
            	employeeVO.setAdminTypeName(adminTypeName);
 				
 				if(employeeVO.getStatus() == 0){
 					employeeVO.setStatusInfo("正常");
                }else if(employeeVO.getStatus() == 1){
                	employeeVO.setStatusInfo("停用");
                }else{
                	employeeVO.setStatusInfo("停用");
                }
            	employeeColl.addElement(employeeVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getDealerEmployee-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getDealerEmployee-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
    	return employeeColl;
    }
    
    /**
     * 得到渠道人员集合
     * @param dealerId
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getDealerEmployee(String dealerId, int areaLevel, int adminType,String employeeId) throws DataAccessException{
    	EmployeeColl employeeColl = new EmployeeColl();
        StringBuffer buf = new StringBuffer();  
        buf.append("SELECT a.*, d.f_role_num " +
        		" FROM OM_EMPLOYEE_T a, OM_AREA_T b, " +
        		" (select a.f_employee_id,count(b.f_role_id) f_role_num from om_employee_t a,om_employee_role_relation_t b where a.f_employee_id = b.f_employee_id(+) group by a.f_employee_id) d " +
        		" WHERE a.f_dealer_id = ? " +
        		" AND a.f_employee_id = d.f_employee_id " +
        		" AND a.f_area_id = b.f_area_id AND b.f_area_level >= ?");  
        
		if(adminType==0) //普通操作员
	  	{
			buf.append(" AND a.f_employee_id = ?");
	  	}else if(adminType==2)//普通管理员
	  	{ 
	  		buf.append(" AND a.f_owner=?");
	  	}
        String sql = buf.toString();            
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, dealerId);
            pstmt.setString(2, String.valueOf(areaLevel));
            int i = 2;
            if(adminType==0) //普通操作员
    	  	{
            	i ++;
            	pstmt.setString(i, employeeId);
    	  	}else if(adminType==2)//普通管理员
    	  	{ 
    	  		i ++;
            	pstmt.setString(i, employeeId);
    	  	}
            
            rest = pstmt.executeQuery();              
            while(rest.next()){
            	EmployeeVO employeeVO = new EmployeeVO();
            	employeeVO.setAttribute(rest);
            	String adminTypeName = getAdminTypeName(employeeVO.getAdminType());
            	employeeVO.setAdminTypeName(adminTypeName);
 				
 				if(employeeVO.getStatus() == 0){
 					employeeVO.setStatusInfo("正常");
                }else if(employeeVO.getStatus() == 1){
                	employeeVO.setStatusInfo("停用");
                }else{
                	employeeVO.setStatusInfo("停用");
                }
            	employeeColl.addElement(employeeVO);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getDealerEmployee-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            		"EmployeeDAOImpl--getDealerEmployee-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }
    	return employeeColl;
    }
    
    public EmployeeColl getDealerEmpByName(String name,String employeeId,int areaLevel,int adminType) throws DataAccessException{
    	  EmployeeColl empColl = new EmployeeColl();
          StringBuffer buf = new StringBuffer();
          
          buf.append("SELECT a.* FROM om_employee_t a, om_area_t b " +
                 " WHERE a.f_area_id = b.f_area_id AND a.f_employee_name LIKE '%"+name+"%' AND b.f_area_level >="+areaLevel); 
          //buf.append(" AND a.f_dealer_id IS NOT NULL");
          if(adminType==0)
  		{
  		    return empColl;
  		}
  		else if(adminType==2)
  		{
  		    buf.append(" AND a.f_owner =?");
  		}
  		else
  		{
  		}
          String sql = buf.toString();            
          Connection conn = null;
          PreparedStatement pstmt = null;
          ResultSet rest = null;
          int i=1;
          try{
              conn = getConnection();
              pstmt = conn.prepareStatement(sql);
              if(adminType==2)
              pstmt.setString(i++,employeeId);
              rest = pstmt.executeQuery();  
              while(rest.next()){
                  EmployeeVO vo = new EmployeeVO();
                  vo.setAttribute(rest);
                  empColl.addEmployee(vo);
              }
          }catch(SQLException e){
              SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getDealerEmpByName-1:"+e.getMessage());
              throw new DataAccessException(e);
          }catch(Exception e){
              SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getDealerEmpByName-2:"+e.getMessage());
              throw new DataAccessException(e);
          }finally{
              close(rest,pstmt,conn);
          }  
          return empColl;
    }
    public EmployeeVO getDealerEmpByWorkNo(String workNo,String employeeId,int areaLevel,int adminType) throws DataAccessException {
		EmployeeVO vo = null;
		StringBuffer buf = new StringBuffer();
        buf.append(" SELECT a.* FROM om_employee_t a, om_area_t b");
		buf.append(" WHERE a.f_area_id = b.f_area_id AND a.f_work_no = ?");
		buf.append(" AND b.f_area_level >=?");		
		if(adminType==0)
		{
		    return vo;
		}
		else if(adminType==2)
		{
		    buf.append(" AND a.f_owner =?");
		}
		else
		{
		}
		String sql = buf.toString();	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		int i=1;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(i++,workNo);
			pstmt.setInt(i++,areaLevel);
			if(adminType==2)
			    pstmt.setString(i++,employeeId);   
			rest = pstmt.executeQuery();
				
			if(rest.next()){
				vo = new EmployeeVO();
				vo.setAttribute(rest);
			}       
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getDealerEmpByWorkNo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getDealerEmpByWorkNo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
    
    /**
 	 * 根据登陆账号得到职员信息 -- 为渠道系统提供
 	 * @param workNo
 	 * @return
 	 * @throws DataAccessException
 	 */
 	public EmployeeVO getEmployeeInfoByWorkNoFilterForChnl(String workNo,String employeeId,int areaLevel,int adminType) throws DataAccessException{
		EmployeeVO vo = null;
		StringBuffer buf = new StringBuffer();
        buf.append(" SELECT a.* FROM om_employee_t a, om_area_t b");
		buf.append(" WHERE a.f_area_id = b.f_area_id AND a.f_work_no = ?");
		buf.append(" AND b.f_area_level >=? and a.f_dealer_id is not null ");
		
		if(adminType==0)
		{
		    return vo;
		}
		else if(adminType==2)
		{
		    buf.append(" AND a.f_owner =?");
		}
		else
		{
		}
		String sql = buf.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		int i=1;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(i++,workNo);
			pstmt.setInt(i++,areaLevel);
			if(adminType==2)
			    pstmt.setString(i++,employeeId);   
			rest = pstmt.executeQuery();
				
			if(rest.next()){
				vo = new EmployeeVO();
				vo.setAttribute(rest);
			}       
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByWorkNoFilterForChnl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByWorkNoFilterForChnl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
 	}
 	
	/**
     * 根据姓名模糊查询职员信息 -- 为渠道系统提供
     * @param name
     * @return
     * @throws DataAccessException
     */
     public EmployeeColl getEmployeeInfoByNameFilterForChnl(String name,String employeeId,int areaLevel,int adminType) throws DataAccessException{
         EmployeeColl empColl = new EmployeeColl();
         StringBuffer buf = new StringBuffer();
         
         buf.append("SELECT a.* FROM om_employee_t a, om_area_t b " +
                " WHERE a.f_area_id = b.f_area_id AND a.f_employee_name LIKE '%"+name+"%' " +
                " AND b.f_area_level >="+areaLevel+" and a.f_dealer_id is not null ");  
         if(adminType==0)
 		{
 		    return empColl;
 		}
 		else if(adminType==2)
 		{
 		    buf.append(" AND a.f_owner =?");
 		}
 		else
 		{
 		}
         String sql = buf.toString();            
         Connection conn = null;
         PreparedStatement pstmt = null;
         ResultSet rest = null;
         int i=1;
         try{
             conn = getConnection();
             pstmt = conn.prepareStatement(sql);
             if(adminType==2)
             pstmt.setString(i++,employeeId);
             rest = pstmt.executeQuery();  
             while(rest.next()){
                 EmployeeVO vo = new EmployeeVO();
                 vo.setAttribute(rest);
                 empColl.addEmployee(vo);
             }
         }catch(SQLException e){
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByName-1:"+e.getMessage());
             throw new DataAccessException(e);
         }catch(Exception e){
             SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeInfoByName-2:"+e.getMessage());
             throw new DataAccessException(e);
         }finally{
             close(rest,pstmt,conn);
         }  
         return empColl;

     }
     /**
      * 得到可以转交权力的人员列表
      * @param areaId
      * @param employeeId
      * @param adminType
      * @return
      */
     public EmployeeColl getDeliverEmployee(String areaId, String employeeId, int adminType){
    	EmployeeColl employeeColl = new EmployeeColl();
 		StringBuffer buf = new StringBuffer();
        buf.append(" SELECT a.*, b.f_organ_name FROM om_employee_t a, om_organ_t b ");
		buf.append(" WHERE a.f_area_id = ? AND a.f_organ_id = b.f_organ_id");
		buf.append(" AND a.f_employee_id != ?");
		buf.append(" AND a.f_admin_type != 0");
		if(adminType==2)//普通管理员
		{
		    buf.append(" AND a.f_owner =?");
		}
		String sql = buf.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,areaId);
			pstmt.setString(2, employeeId);
			if(adminType==2)
			    pstmt.setInt(3,adminType);   
			rest = pstmt.executeQuery();
				
			while(rest.next()){
				EmployeeVO vo = new EmployeeVO();
				vo.setAttribute(rest);
				employeeColl.addEmployee(vo);
			}       
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getDeliverEmployee-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getDeliverEmployee-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
    	return employeeColl;
     }
     /**
      * 提交,将fromId创建的人员创建者字段修改为toId
      * @param fromId
      * @param toId
      * @return
      * @throws DataAccessException
      */
     public int doDeliverEmployee(String fromId, String toId) throws DataAccessException{
 		int code = 1; //成功
		StringBuffer buf = new StringBuffer();
		buf.append("UPDATE om_employee_t"); 
		buf.append(" set f_owner = ? ");
		buf.append(" WHERE f_owner = ? ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,toId);
			pstmt.setString(2,fromId);            
			pstmt.executeUpdate();			
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doDeliverEmployee()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doDeliverEmployee()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return code;
     }
     /**
      * 取消权限微调的数据
      * @param employeeId
      * @return
      * @throws DataAccessException
      */
     public int cancelInching(String employeeId) throws DataAccessException{
  		int code = 1; //成功
		StringBuffer buf = new StringBuffer();
		buf.append("delete from om_power_adjust_t where f_employee_id = "+employeeId);
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			code = pstmt.executeUpdate();			
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--cancelInching()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--cancelInching()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return code;
     }
     /**
      * 取消权限微调的数据,包括功能权限微调和数据权限微调
      * @param employeeId
      * @return
      * @throws DataAccessException
      */
     public String undoPowerAdjust(String employeeId,String[] powerType) throws DataAccessException{
  		int code = -1; //成功
  		String message = "true";
  		//取消功能赋权微调信息
		StringBuffer buf1 = new StringBuffer();
		buf1.append("delete from om_power_adjust_t where f_employee_id = ?");
		//取消数据赋权微调信息
		StringBuffer buf2 = new StringBuffer();
		buf2.append("delete from OM_PARAM_EMPLOYEE_DATA_REL_T where employee_id = ?");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		try{
			conn = getConnection();
			conn.setAutoCommit(false);
			if(powerType!=null && powerType.length>0){
				for(int i=0;i<powerType.length;i++){
					if(powerType[i].trim().equals("1")){
						pstmt = conn.prepareStatement(buf1.toString());
						pstmt.setString(1,employeeId);
						code = pstmt.executeUpdate();
						
						if(code < 0){
							message = "取消功能赋权微调信息失败";
							break;
						}
					}else if(powerType[i].trim().equals("2")){
						pstmt = conn.prepareStatement(buf2.toString());
						pstmt.setString(1,employeeId);
						code = pstmt.executeUpdate();
						
						if(code < 0){
							message = "取消数据赋权微调信息失败";
							break;
						}
					}else{
						message = "取消赋权微调信息失败";
						break;
					}
				}
				
				if(code < 0){
					conn.rollback();
				}else{
					conn.commit();
				}
			}				
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--undoPowerAdjust()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--undoPowerAdjust()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			try{
				conn.setAutoCommit(true);
			}catch (Exception e) {
				SysLog.writeLogs("om", GlobalParameters.ERROR,
						"EmployeeDAOImpl--undoPowerAdjust()-1:" + e.getMessage());
				throw new DataAccessException(e);
			}
			
			close(rest,pstmt,conn);
		}
		return message;
     }
 	/**
 	 * 校验组织机构或职员是否在工作流中存在工作项没有完成 为权限提供接口程序
 	 * @param paramId
 	 * @param type
 	 * @return
 	 * @throws DataAccessException
 	 */
 	public int checkOrgan(String paramId,int type)throws DataAccessException{
 		int flag = 0;
 		Connection conn = null;
 		CallableStatement cstmt = null;
 		StringBuffer sqlBuf = new StringBuffer(200);
 		sqlBuf.append(" call pm_check_employee_if_used_p(?,?,?,?) ");
 		try {
 			conn = getConnection();
 			cstmt = conn.prepareCall(sqlBuf.toString());
 			
 			cstmt.setString(1, paramId);
 			cstmt.setInt(2, type);
 			cstmt.registerOutParameter(3, Types.NUMERIC);
 			cstmt.registerOutParameter(4, Types.VARCHAR);
 			cstmt.execute();
 			flag = cstmt.getInt(3);
 		} catch (SQLException e) {
 			SysLog.writeLogs("CheckOrganDAOImpl", GlobalParameters.ERROR,
 					"CheckOrganDAOImpl-checkOrgan:" + e.getMessage());
 			throw new DataAccessException(e.getMessage());
 		} catch (Exception e) {
 			SysLog.writeLogs("CheckOrganDAOImpl", GlobalParameters.ERROR,
 					"CheckOrganDAOImpl-checkOrgan:" + e.getMessage());
 			throw new DataAccessException(e.getMessage());
 		} finally {
 			close(cstmt, conn);
 		}
 		return flag;
 	}
 	/**
  	 * 得到所有微调过的职员信息集合
  	 * @return
  	 * @throws DataAccessException
  	 */
  	public List getPowerAdjustEmpColl() throws DataAccessException{
    	List list = new ArrayList();
 		StringBuffer buf = new StringBuffer();
        buf.append("SELECT distinct a.f_employee_id ");
        buf.append(" FROM om_power_adjust_t b, om_employee_t a ");
        buf.append(" WHERE a.f_employee_id = b.f_employee_id");
		String sql = buf.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();				
			while(rest.next()){
				String employeeId = rest.getString("f_employee_id");
				list.add(employeeId);
			}       
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getDeliverEmployee-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getDeliverEmployee-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
    	return list;
  	}
  	
  	/**
     * 同步统一认证平台传入的职员信息
     * @param employeeInfo
     * @return
     * @throws ServiceException
     */
    public EmployeeInfoResp doSynFromAuthPlat(EmployeeInfoReq employeeInfo) throws DataAccessException{
    	EmployeeInfoResp resp = new EmployeeInfoResp();
    	String workNo = employeeInfo.getExt_username();
    	String pwd = employeeInfo.getExt_password(); 
    	String pwdCode = "TNL=(YD4TN0+8$4*[#[#[#[#[#[#<J";//PassWord.encode(pwd); 默认初始密码都是8个a
    	String token = employeeInfo.getToken();
    	int method = employeeInfo.getMethod();//1 创建，2 修改，3 删除
    	String tokenShow = DESUtil.decrypt(token);
    	int code = 0; //成功
    	String message = "";
    	if(tokenShow == null || !tokenShow.equals("NEU##AUTH")){
    		code = 1;
    		message = "信任标识不符！";
    	}else{
    		StringBuffer buf = new StringBuffer();
    		StringBuffer bufDel = new StringBuffer();
        	if(method == 1){//insert     		
        		buf.append("insert into OM_SYN_EMPLOYEE_T (work_no, pwd, token, method)");
        		buf.append(" values (?,?,?,?)");
        		message = "新增成功";
        	}else if(method == 2){//update
        		buf.append("update om_employee_t set F_WORK_PWD=? where f_work_no=(?)");
        		message = "修改成功";
        	}else if(method == 3){//delete
        		buf.append("delete from om_employee_t where f_work_no = upper(?)");
        		message = "删除成功";
        		bufDel.append("delete from OM_SYN_EMPLOYEE_T where upper(work_no)=upper(?)");
        	}   		
    		Connection conn = null; 
    		PreparedStatement pstmt = null;
    		try{  
    			conn = getConnection();
    			pstmt = conn.prepareStatement(buf.toString());
    			if(method == 1){
    				pstmt.setString(1,workNo);
    				pstmt.setString(2,pwdCode);
    				pstmt.setString(3,token);
    				pstmt.setInt(4,method);
    			}    			
    			if(method == 2){
    				pstmt.setString(1,pwdCode);
    				pstmt.setString(1,workNo);
    			}
    			pstmt.executeUpdate();
    			if(method == 3){// 同时删除同步中间表中的数据，如果统一认证管理新增职员，BSS尚没有新增，此时统一认证删除，要把中间表中的数据删除
    				pstmt = conn.prepareStatement(bufDel.toString());
    				pstmt.setString(1, workNo);
    				pstmt.setString(2, workNo);
    				pstmt.executeUpdate();
    			}
    		}catch(SQLException e){
    			message = "同步失败："+e.getMessage();
    			code = 1;
    			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doSynFromAuthPlat()-1:"+e.getMessage());
    			throw new DataAccessException(e);
    		}catch(Exception e){
    			code = 1;
    			message = "同步失败："+e.getMessage();
    			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doSynFromAuthPlat()-2:"+e.getMessage());
    			throw new DataAccessException(e);
    		}finally{
    			close(pstmt,conn);
    		}  
    	}		
    	resp.setRetFlag(code);
    	resp.setRetMsg(message);
    	return resp;
    }
    
    /**
     * 得到由统一认证系统同步来的职员信息
     * @return
     * @throws DataAccessException
     */
    public  List getEmployeeReq(int startNum, int endNum) throws DataAccessException{
    	List list = new ArrayList();
 		StringBuffer buf = new StringBuffer();
 		buf.append("select * from (");
        buf.append("SELECT rownum rowcount, work_no, pwd ");
        buf.append(" FROM OM_SYN_EMPLOYEE_T where rownum <? ) where rowcount >= ?");
        
		String sql = buf.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, endNum);
			pstmt.setInt(2, startNum);
			rest = pstmt.executeQuery();				
			while(rest.next()){
				String workNo = rest.getString("work_no");
				String pwd = rest.getString("pwd");
				EmployeeInfoReq req = new EmployeeInfoReq();
				req.setExt_username(workNo);
				req.setExt_password(pwd);
				list.add(req);
			}       
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeReq-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeReq-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
    	return list;
    }
    
    public int getTotalRowsOfEmpReq() throws DataAccessException{
    	int rows = 0;
    	String sql = "select count(*) from OM_SYN_EMPLOYEE_T";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();				
			if(rest.next()){
				rows = rest.getInt(1);
			}       
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeReq-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeReq-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
    	return rows;
    }
    
    public int doDeleteEmpReq(String workNo) throws DataAccessException{
    	int code = 0;
    	String sql = "delete from OM_SYN_EMPLOYEE_T where upper(work_no) = upper(?)";
    	Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, workNo);
			code = pstmt.executeUpdate();	
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doDeleteEmpReq-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doDeleteEmpReq-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
    	return code;
    }
    
    public Vector getEmpReqVector() throws DataAccessException{
    	
    	Vector vector = new Vector();
    	TreeData treeData = new TreeData("root",null,"同步职员信息","同步职员信息",false);
    	vector.add(treeData);
 		StringBuffer buf = new StringBuffer();
 		buf.append("select * FROM OM_SYN_EMPLOYEE_T where method = 1 ");        
		String sql = buf.toString();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();				
			while(rest.next()){
				String workNo = rest.getString("work_no");
				String pwd = rest.getString("pwd");
				String newPwd = PassWord.decode(pwd);
				treeData = new TreeData(workNo,"root",workNo,newPwd,true);
				vector.add(treeData);
			}       
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmpReqVector-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmpReqVector-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vector;
    }
    
    /**
     * 取消职员分配的任务，调用crm提供的接口
     */
    public int doCancelWork(String employeeId) throws DataAccessException{
    	int flag = 0;
 		Connection conn = null;
 		CallableStatement cstmt = null;
 		StringBuffer sqlBuf = new StringBuffer(200);
 		sqlBuf.append(" call CM_RETAIN_CHANNEL_DEL_P(?,?,?) ");
 		try {
 			conn = getConnection();
 			cstmt = conn.prepareCall(sqlBuf.toString());
 			
 			cstmt.setString(1, employeeId);
 			cstmt.registerOutParameter(2, Types.NUMERIC);
 			cstmt.registerOutParameter(3, Types.VARCHAR);
 			cstmt.execute();
 			flag = cstmt.getInt(2);
 		} catch (SQLException e) {
 			SysLog.writeLogs("EmployeeDAOImpl", GlobalParameters.ERROR,
 					"EmployeeDAOImpl-doCancelWork:" + e.getMessage());
 			throw new DataAccessException(e.getMessage());
 		} catch (Exception e) {
 			SysLog.writeLogs("EmployeeDAOImpl", GlobalParameters.ERROR,
 					"EmployeeDAOImpl-doCancelWork:" + e.getMessage());
 			throw new DataAccessException(e.getMessage());
 		} finally {
 			close(cstmt, conn);
 		}
 		return flag;
    }
    
    public Map getAllEmpRole(){
    	Map empRole = new HashMap();
 		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		StringBuffer sqlBuf = new StringBuffer(200);
 		sqlBuf.append(" select a.f_employee_id, c.f_role_name ");
 		sqlBuf.append(" from om_employee_t a, om_employee_role_relation_t b, om_role_t c ");
 		sqlBuf.append(" where a.f_employee_id = b.f_employee_id and b.f_role_id = c.f_role_id ");
 		sqlBuf.append(" order by f_employee_id");
 		try {
 			conn = getConnection();
 			pstmt = conn.prepareStatement(sqlBuf.toString());
			rest = pstmt.executeQuery();
			//long begintime = Calendar.getInstance().getTimeInMillis();
			while(rest.next()){
				String employeeId = rest.getString("f_employee_id");
				String roleName = rest.getString("f_role_name");
				if(empRole.containsKey(employeeId)){
					String value = (String)empRole.get(employeeId)+","+roleName;
					empRole.put(employeeId, value);
				}else{
					empRole.put(employeeId, roleName);
				}			
			}
			//long endTime = Calendar.getInstance().getTimeInMillis();
			//System.out.println("--------- role loop need: "+String.valueOf(endTime-begintime));
 		} catch (SQLException e) {
 			SysLog.writeLogs("EmployeeDAOImpl", GlobalParameters.ERROR,
 					"EmployeeDAOImpl-getAllEmpRole:" + e.getMessage());
 			throw new DataAccessException(e.getMessage());
 		} catch (Exception e) {
 			SysLog.writeLogs("EmployeeDAOImpl", GlobalParameters.ERROR,
 					"EmployeeDAOImpl-getAllEmpRole:" + e.getMessage());
 			throw new DataAccessException(e.getMessage());
 		} finally {
 			close(rest,pstmt,conn);
 		}
    	return empRole;
    }
    public int doDeleteTempInfo() throws DataAccessException{
		int code = 1;
		String sql ="delete from om_temp_emp_t ";
		Connection conn = null;
		PreparedStatement  pstmt = null;	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doDeleteTempInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doDeleteTempInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
    }
    public int[] doSaveTempInfo(EmployeeColl coll) throws DataAccessException{
		int[] code = null;//成功
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_temp_emp_t ");
		buf.append(" (F_EMPLOYEE_ID,F_AREA_ID,f_area_name,F_CITY_CODE,f_city_name,F_ORGAN_ID,f_organ_name,F_WORK_NO,F_employee_name) ");
		buf.append(" values(?,?,?,?,?,?,?,?,?)");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();			
			pstmt = conn.prepareStatement(buf.toString());
			if(conn !=null){
				for(int i=0;i<coll.getRowCount();i++){
					EmployeeVO employeeVO = coll.getEmployee(i);
					String emploeeId = employeeVO.getEmployeeId();
					String areaId = employeeVO.getAreaId();
					String areaName = employeeVO.getAreaName();
					String cityCode = employeeVO.getCityCode();
					String organId = employeeVO.getOrganId();
					String organName = employeeVO.getOrganName();
					String workNo = employeeVO.getWorkNo();
					String employeeName = employeeVO.getEmployeeName();
					String cityName = employeeVO.getCityName();
					pstmt.setString(1,emploeeId);
					pstmt.setString(2,areaId);
					pstmt.setString(3,areaName);
					pstmt.setString(4,cityCode);
					pstmt.setString(5,cityName);
					pstmt.setString(6,organId);
					pstmt.setString(7,organName);
					pstmt.setString(8,workNo);
					pstmt.setString(9,employeeName);
					
                    pstmt.addBatch();
				}
				code = pstmt.executeBatch();
			}
	}catch(SQLException e){
		SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doSaveTempInfo-1:"+e.getMessage());
		throw new DataAccessException(e);
	}catch(Exception e){
		SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doSaveTempInfo-2:"+e.getMessage());
		throw new DataAccessException(e);
	}finally{
		close(pstmt,conn);
	}
	return code;
    }
    
    public boolean ifInGroup(String employeeId) throws DataAccessException{
    	boolean retFlag = false;
    	Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		String sql = "select f_group_id from om_group_emp_t where f_employee_id = ?";
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, employeeId);
			rest = pstmt.executeQuery();
			if(rest.next()){
				retFlag = true;
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--ifInGroup-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--ifInGroup-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
    	return retFlag;
    }
    /**
     * 得到自动生成的工号
     * @return
     * @throws DataAccessException
     */
    public String getAutoWorkNo() throws DataAccessException{
    	String autoWorkNo = "EMP_";
    	Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		String sql = " select om_auto_work_no.nextval from dual ";
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			if(rest.next()){
				autoWorkNo = autoWorkNo+rest.getString(1);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getAutoWorkNo() -1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getAutoWorkNo() -2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return autoWorkNo;
    }
    public String getCityShortName(String cityCode )throws DataAccessException{
    	String shortName = "";
    	Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		String sql = " select short_name  from om_city_short_name_t where city_code = ?";
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, cityCode);
			rest = pstmt.executeQuery();
			if(rest.next()){
				shortName = rest.getString(1);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getCityShortName() -1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getCityShortName() -2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return shortName;
    }
    public void doUpdatePartyId(String employeeId, String partyId) throws DataAccessException{
    	Connection conn = null;
		PreparedStatement pstmt = null;
		String sql = " update om_employee_t set f_party_id = ? where f_employee_id = ? ";
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, partyId);
			pstmt.setString(2, employeeId);
			pstmt.executeUpdate();
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doUpdatePartyId() -1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doUpdatePartyId() -2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
    }

    /**
     * 得到指定部门的所有兼职工号
     * @param level1
     * @param level2
     * @return
     * @throws DataAccessException
     */
    public EmployeeColl getPtEmployee(OrganColl organColl) throws DataAccessException{
    	EmployeeColl employeeColl = new EmployeeColl();
    	Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer sql = new StringBuffer();
		sql.append(" select a.f_employee_id, a.f_employee_name, a.f_work_no, b.f_organ_id from om_employee_t a, om_employee_duty_relation_t b ");
		sql.append(" where a.f_employee_id = b.f_employee_id ");
		sql.append(" and b.f_organ_id = ? and a.f_status = 0 ");	
			try{
				conn = getConnection();
				pstmt = conn.prepareStatement(sql.toString());
				if(organColl != null && organColl.getRowCount() > 0){
					for(int i=0; i < organColl.getRowCount(); i++){
						OrganVO organVO = organColl.getOrgan(i);
						pstmt.setString(1, organVO.getOrganId());
						rest = pstmt.executeQuery();
						while(rest.next()){
							EmployeeVO empVO = new EmployeeVO();
							empVO.setEmployeeId(rest.getString("f_employee_id"));
							empVO.setEmployeeName(rest.getString("f_employee_name"));
							empVO.setOrganId(rest.getString("f_organ_id"));;
							empVO.setWorkNo(rest.getString("f_organ_id"));
							employeeColl.addEmployee(empVO);
						}
					}
				}			
				
			}catch(SQLException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getAutoWorkNo() -1:"+e.getMessage());
				throw new DataAccessException(e);
			}catch(Exception e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getAutoWorkNo() -2:"+e.getMessage());
				throw new DataAccessException(e);
			}finally{
				close(rest,pstmt,conn);
			}
			return employeeColl;
		}
    
}                                                                                                                      