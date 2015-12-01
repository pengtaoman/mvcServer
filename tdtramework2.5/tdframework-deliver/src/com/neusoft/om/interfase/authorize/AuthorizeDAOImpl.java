package com.neusoft.om.interfase.authorize;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.om.omutil.PassWord;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class AuthorizeDAOImpl extends BaseDaoImpl implements AuthorizeDAO{
	
	 private String nvl(String str) {
	        return str==null?"":str;
	}
	//陕西bss，切换session用
	public Map getNewUserInfo(String workNo, String newAreaId) throws DataAccessException{
		Map map = new HashMap();
		map.put("code", "");//初始化，避免map无值抛异常，性能不会太大影响
		map.put("newWorkNo", "");
		map.put("pwd", "");
		String code = "0";
		String newWorkNo = "";
		String pwd = ""; 
		StringBuffer buf = new StringBuffer();
		buf.append(" select a.* ");
		buf.append(" from om_employee_t a, om_group_emp_t b ");
		buf.append(" where a.f_employee_id = b.f_employee_id ");
		buf.append(" and b.f_group_id = (select c.f_group_id from om_group_emp_t c, om_employee_t d where c.f_employee_id = d.f_employee_id and d.f_work_no = upper(?)) ");
		buf.append(" and a.f_area_id like ? ");// areaId
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,workNo);
			pstmt.setString(2,"'%"+newAreaId+"%'");
			rest = pstmt.executeQuery();
			EmployeeVO vo  = new EmployeeVO();
			int count = 0;
			while(rest.next()){				
				//vo.setAllAttribute(rest);//这样写有问题
				vo.setWorkNo(nvl(rest.getString("f_work_no")));
				vo.setWorkPwd(nvl(rest.getString("f_work_pwd")));
				count++;
			}           
			if(count == 1 ){
				code = "1";
				newWorkNo = vo.getWorkNo();
				pwd = PassWord.decode(vo.getWorkPwd());
			}else if(count > 1){
				code = "2";
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeDAOImpl--getNewUserInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeDAOImpl--getNewUserInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		map.put("code", code);
		map.put("newWorkNo", newWorkNo);
		map.put("pwd", pwd);
		return map;
	}
	public Map changeUser(String workNo) throws DataAccessException{
		Map map = new HashMap();
		EmployeeVO employeeVO = new EmployeeVO();
		OrganVO organVO = new OrganVO();
		AreaVO areaVO = new AreaVO();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		StringBuffer bufEmp = new StringBuffer();
		bufEmp.append(" select * from om_employee_t where upper(f_work_no)=upper(?)");
		
		StringBuffer bufOrgan = new StringBuffer();
		bufOrgan.append("select a.* from om_organ_t a, om_employee_t b where a.f_organ_id = b.f_organ_id and upper(b.f_work_no) = upper(?)");
		
		StringBuffer bufArea = new StringBuffer();
		bufArea.append("select a.* from om_area_t a, om_employee_t b where a.f_area_id = b.f_area_id and upper(b.f_work_no) = upper(?)");
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(bufEmp.toString());
			pstmt.setString(1,workNo);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				employeeVO.setAllAttribute(rest);
			}   
			pstmt = conn.prepareStatement(bufOrgan.toString());
			pstmt.setString(1,workNo);
			while(rest.next()){
				organVO.setAttribute(rest);
			}
			pstmt = conn.prepareStatement(bufArea.toString());
			pstmt.setString(1,workNo);
			while(rest.next()){
				areaVO.setAttribute(rest);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeDAOImpl--changeUser-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeDAOImpl--changeUser-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  		
		map.put("employeeVO", employeeVO);
		map.put("organVO", organVO);
		map.put("areaVO", areaVO);
		return map;
	}
}
