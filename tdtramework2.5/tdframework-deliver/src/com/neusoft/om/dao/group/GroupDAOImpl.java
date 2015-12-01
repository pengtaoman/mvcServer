package com.neusoft.om.dao.group;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class GroupDAOImpl extends BaseDaoImpl implements GroupDAO{

	public EmployeeColl getEmpColl(String workNo, String name, int startLine, int endLine) throws DataAccessException {
		EmployeeColl coll = new EmployeeColl();
		StringBuffer buf = new StringBuffer();
		buf.append("select * from ( ");
		buf.append(" select f_employee_id,f_work_no ,f_employee_name,f_area_id,f_area_name,rownum rowcount");
		buf.append("  from (  select a.f_employee_id, a.f_work_no , a.f_employee_name,a.f_area_id, b.f_area_name");
		buf.append(" from om_employee_t a, om_area_t b");
		buf.append(" where a.f_area_id = b.f_area_id " );
		buf.append(" and upper(a.f_work_no) like upper(?) and a.f_employee_name like ?");
		buf.append(" order by a.f_work_no");
		buf.append(" ) where rownum < ? ");
		buf.append(" ) where rowcount >= ? " );
 		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			pstmt.setString(1,"%"+workNo+"%");
 			pstmt.setString(2,"%"+name+"%");
 			pstmt.setInt(3, endLine);
 			pstmt.setInt(4, startLine);
 			rest = pstmt.executeQuery();
 			while(rest.next()){
 				EmployeeVO vo = new EmployeeVO();
 				vo.setAttribute(rest);
 				coll.addEmployee(vo);
 			}
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getEmpColl-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getEmpColl-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
		return coll;
	}
	public EmployeeColl getEmpColl(String workNo, String name) throws DataAccessException{
		EmployeeColl coll = new EmployeeColl();
		StringBuffer buf = new StringBuffer();
		buf.append(" select * from ( " );
		buf.append(" select a.f_employee_id, a.f_work_no, a.f_employee_name,a.f_area_id, b.f_area_name");
		buf.append(" from om_employee_t a, om_area_t b");
		buf.append(" where a.f_area_id = b.f_area_id " );
		buf.append(" and upper(a.f_work_no) like upper(?) and a.f_employee_name like ?");
		buf.append(") ");
 		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			pstmt.setString(1,"%"+workNo+"%");
 			pstmt.setString(2,"%"+name+"%");
 			rest = pstmt.executeQuery();
 			while(rest.next()){
 				EmployeeVO vo = new EmployeeVO();
 				vo.setAttribute(rest);
 				coll.addEmployee(vo);
 			}
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getEmpColl-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getEmpColl-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
		return coll;
	}
	public int getEmpCount(String workNo, String name) throws DataAccessException {
		int count = 0;
		StringBuffer buf = new StringBuffer();
		buf.append(" select count(*) from ( " );
		buf.append(" select a.f_employee_id, a.f_employee_name,a.f_area_id, b.f_area_name,rownum rowcount");
		buf.append(" from om_employee_t a, om_area_t b " );
		buf.append(" where a.f_area_id = b.f_area_id ");
		buf.append(" and upper(a.f_work_no)  like upper(?)" );
		buf.append(" and a.f_employee_name like ?");
		buf.append(" ) ");
 		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			pstmt.setString(1,"%"+workNo+"%");
 			pstmt.setString(2,"%"+name+"%");
 			rest = pstmt.executeQuery();
 			if(rest.next()){
 				count = rest.getInt(1);
 			}
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getEmpCount-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getEmpCount-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
 		return count;
	}

	public GroupColl getGroupColl(String groupName, int startLine, int endLine) throws DataAccessException {
		GroupColl coll = new GroupColl();
		StringBuffer buf = new StringBuffer();
		buf.append(" select * from ( " );
		buf.append(" select f_group_id, f_group_name,f_group_desc,rownum rowcount from");
		buf.append(" (select f_group_id, f_group_name,f_group_desc");
		buf.append(" from om_group_t where f_group_name like ? order by f_group_id ) where rownum < ? ) ");
		buf.append(" where rowcount >= ? ");
 		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			pstmt.setString(1,"%"+groupName+"%");
 			pstmt.setInt(2, endLine);
 			pstmt.setInt(3, startLine);
 			rest = pstmt.executeQuery();
 			while(rest.next()){
 				GroupVO vo = new GroupVO();
 				vo.setAttribute(rest);
 				coll.addGroup(vo);
 			}
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getGroupColl-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getGroupColl-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
 		return coll;
	}

	public int getGroupCount(String groupName) throws DataAccessException {
		int count = 0;
		StringBuffer buf = new StringBuffer();
		buf.append(" select count(*) from om_group_t where f_group_name like ?");
 		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			pstmt.setString(1,"%"+groupName+"%");
 			rest = pstmt.executeQuery();
 			if(rest.next()){
 				count = rest.getInt(1);
 			}
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getGroupCount-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getGroupCount-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
 		return count;
	}
	public int doAddGroup(GroupVO vo) throws DataAccessException{
		int code = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		String sql = "insert into om_group_t (f_group_id, f_group_name, f_group_desc) values(om_group_s.nextval,?,?)";
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, vo.getGroupName());
			pstmt.setString(2, vo.getGroupDesc());
			code = pstmt.executeUpdate();
		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doAddGroup-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doAddGroup-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(pstmt,conn);
		} 
		return code;
	}
	public int doModifyGroup(GroupVO vo) throws DataAccessException{
		int code = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		String sql = "update om_group_t set f_group_name = ? , f_group_desc = ? where f_group_id = ?";
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, vo.getGroupName());
			pstmt.setString(2, vo.getGroupDesc());
			pstmt.setString(3, vo.getGroupId());
			code = pstmt.executeUpdate();
		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doModifyGroup-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doModifyGroup-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(pstmt,conn);
		} 
		return code;
	}
	public int doDeleteGroup(String groupId) throws DataAccessException{
		int code = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		String sql = "delete from om_group_t where f_group_id = ?";
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,  groupId);
			code = pstmt.executeUpdate();
		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doDeleteGroup-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doDeleteGroup-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(pstmt,conn);
		} 
		return code;
	}
	
	public boolean haveEmp(String groupId) throws DataAccessException{
		boolean haveEmp = false;
		int count = 0;
		StringBuffer buf = new StringBuffer();
		buf.append(" select * from om_group_emp_t where f_group_id = ?");
 		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			pstmt.setString(1, groupId);
 			rest = pstmt.executeQuery();
 			if(rest.next()){
 				count = rest.getInt(1);
 			}
 			if(count > 0){
 				haveEmp = true;
 			}
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--haveEmp-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--haveEmp-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
		return haveEmp;
	}
	
	public EmployeeColl getGroupEmpColl(String groupId) throws DataAccessException{
		EmployeeColl coll = new EmployeeColl();
		StringBuffer buf = new StringBuffer();		
		buf.append(" select a.f_employee_id, a.f_work_no,a.f_employee_name,a.f_area_id, b.f_area_name");
		buf.append(" from om_employee_t a, om_area_t b, om_group_emp_t c");
		buf.append(" where a.f_area_id = b.f_area_id and a.f_employee_id =c.f_employee_id " );
		buf.append(" and c.f_group_id = ? order by f_work_no");
 		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			pstmt.setString(1, groupId);
 			rest = pstmt.executeQuery();
 			while(rest.next()){
 				EmployeeVO vo = new EmployeeVO();
 				vo.setAttribute(rest);
 				coll.addEmployee(vo);
 			}
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getGroupEmpColl-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getGroupEmpColl-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
		return coll;
	}
	public GroupVO getGroupVO(String groupId) throws DataAccessException{
		StringBuffer buf = new StringBuffer();
		buf.append("select * from om_group_t where f_group_id = ?");
		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		GroupVO vo = new GroupVO();
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			pstmt.setString(1, groupId);
 			rest = pstmt.executeQuery();
 			while(rest.next()){ 				
 				vo.setAttribute(rest);
 			}
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getGroupVO-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getEmpColl-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
 		return vo;
	}
	public void doAddGroupEmp(String groupId, EmployeeColl empColl) throws DataAccessException{
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_group_emp_t(f_group_id, f_employee_id) values (?,?)");
		Connection conn = null;
 		PreparedStatement pstmt = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			for(int i=0;i<empColl.getRowCount(); i++){
 				pstmt.setString(1, groupId);
 				pstmt.setString(2, empColl.getEmployee(i).getEmployeeId());
 	 			pstmt.addBatch();
 			}
 			pstmt.executeBatch();
 			
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doAddGroupEmp-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doAddGroupEmp-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
 			close(pstmt,conn);
 		}
	}
	public void doDeleteGroupEmp(String groupId, EmployeeColl empColl) throws DataAccessException{
		StringBuffer buf = new StringBuffer();
		buf.append("delete from om_group_emp_t where f_group_id = ? and f_employee_id =?");
		Connection conn = null;
 		PreparedStatement pstmt = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			for(int i=0;i<empColl.getRowCount(); i++){
 				pstmt.setString(1, groupId);
 				pstmt.setString(2, empColl.getEmployee(i).getEmployeeId());
 	 			pstmt.addBatch();
 			}
 			pstmt.executeBatch();
 			
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doDeleteGroupEmp-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doDeleteGroupEmp-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
 			close(pstmt,conn);
 		}
	}
	public void doDeleteGroupEmp(String groupId) throws DataAccessException{
		StringBuffer buf = new StringBuffer();
		buf.append("delete from om_group_emp_t where f_group_id = ? ");
		Connection conn = null;
 		PreparedStatement pstmt = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			pstmt.setString(1, groupId);
 			pstmt.executeUpdate();
 	
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doDeleteGroupEmp-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--doDeleteGroupEmp-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
 			close(pstmt,conn);
 		}
	}
	
	public boolean haveEmpInSameCity(EmployeeColl grantColl) throws  DataAccessException{
		boolean haveSameCity = false;
		StringBuffer buf = new StringBuffer();
		buf.append("select c.f_area_name,c.f_area_id from om_area_t a, om_employee_t b, om_area_t c  ");
		buf.append(" where a.f_area_id = c.f_area_id and  a.f_area_id = b.f_area_id and b.f_employee_id = ?");
		Map map = new HashMap();
		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		GroupVO vo = new GroupVO();
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			for(int i=0; i<grantColl.getRowCount();i++){
 				pstmt.setString(1, grantColl.getEmployee(i).getEmployeeId());
 				rest = pstmt.executeQuery();
 				while(rest.next()){ 				
 	 				String areaName = rest.getString("f_area_name");
 	 				String areaId = rest.getString("f_area_id");
 	 				if(map.containsKey(areaId)){
 	 					map.put(areaId, areaName); 	 					
 	 				}else{
 	 					map.put(areaId, "0");
 	 				}
 	 			}
 			}
 			if(grantColl.getRowCount() > map.size()){
 				haveSameCity = true;
 			}
 			
 			
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getGroupVO-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--getEmpColl-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
		return haveSameCity;
	}
	
	public String haveEmpInSameCity(String groupId, EmployeeColl empColl) throws  DataAccessException{
		String sameCity = "";
		StringBuffer buf = new StringBuffer();		
		buf.append("select distinct(d.f_area_name),b.f_employee_id ");
		buf.append(" from om_area_t a, om_area_t d, om_employee_t b, om_group_emp_t c ");	
		buf.append(" where a.f_area_id = b.f_area_id and b.f_employee_id = c.f_employee_id ");
		buf.append(" and substr(a.f_area_id,1,6) = d.f_area_id and c.f_group_id = ?");
		StringBuffer buf2 = new StringBuffer();
		buf2.append("select c.f_area_name, b.f_employee_id from om_area_t a, om_employee_t b, om_area_t c");
		buf2.append(" where a.f_area_id = b.f_area_id and substr(a.f_area_id,1,6)=c.f_area_id and b.f_employee_id = ?");
		Map map = new HashMap();
		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			pstmt.setString(1, groupId);
 			rest = pstmt.executeQuery();
 			while(rest.next()){
 				String areaName = rest.getString("f_area_name");
 				String empId = rest.getString("f_employee_id");
 				map.put(areaName, empId);
 			} 			
 			pstmt = conn.prepareStatement(buf2.toString());
 			for(int i=0; i<empColl.getRowCount();i++){
 				String grantEmpId = empColl.getEmployee(i).getEmployeeId();
 				pstmt.setString(1, grantEmpId);
 				rest = pstmt.executeQuery();
 				while(rest.next()){ 				
 	 				String areaName = rest.getString("f_area_name");
 	 				if(map.containsKey(areaName)){
 	 					String mapEmpId = (String)map.get(areaName);
 	 					if(!grantEmpId.equals(mapEmpId)){
 	 	 					if(sameCity.equals("")){
 	 	 						sameCity = areaName;
 	 	 					}else{
 	 	 						sameCity = sameCity + "," + areaName;
 	 	 					}
 	 	 				}
 	 				}	 				
 	 				
 	 			}
 			}
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--haveEmpInSameCity-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--haveEmpInSameCity-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
		return sameCity;
	}
	public String haveInOtherGroup(String groupId,EmployeeColl empColl) throws  DataAccessException{
		String message = "";
		StringBuffer buf = new StringBuffer();
		buf.append("select a.f_group_id, b.f_group_name,c.f_employee_name ");
		buf.append(" from om_group_emp_t a, om_group_t b , om_employee_t c ");
		buf.append(" where a.f_group_id = b.f_group_id and a.f_employee_id = c.f_employee_id and a.f_employee_id = ?");
		Connection conn = null;
 		PreparedStatement pstmt = null;
 		ResultSet rest = null;
 		Map map = new HashMap();
 		try{
 			conn = getConnection();
 			pstmt = conn.prepareStatement(buf.toString());
 			for(int i=0; i <empColl.getRowCount(); i++){
 				EmployeeVO vo = empColl.getEmployee(i);
 				pstmt.setString(1, vo.getEmployeeId());
 				rest = pstmt.executeQuery();
 				while(rest.next()){
 	 				String grpId = rest.getString("f_group_id");
 	 				if(grpId!= null && !grpId.equals(groupId)){ 	 					
 	 					String groupName = rest.getString("f_group_name");
 	 					String employeeName = rest.getString("f_employee_name");
 	 					if(message.equals("")){
 	 						message = "职员"+employeeName+"已经存在于组"+groupName+"中。";
 	 					}else{
 	 						message = message + "职员"+employeeName+"已经存在于组"+groupName+"中。";
 	 					}	 						
 	 					
 	 				}
 	 			} 				
 			}  	
 		}catch(DataAccessException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--haveEmpInSameCity-1:"+e.getMessage());
 			throw new DataAccessException(e);
 		}catch(SQLException e){
 			SysLog.writeLogs("om",GlobalParameters.ERROR,"GroupDAOImpl--haveEmpInSameCity-2:"+e.getMessage());
 			throw new DataAccessException(e);
 		}finally{
			close(rest,pstmt,conn);
		} 
		return message;
	}
}
