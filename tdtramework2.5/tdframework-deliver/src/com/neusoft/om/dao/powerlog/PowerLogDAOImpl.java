package com.neusoft.om.dao.powerlog;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.Map;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class PowerLogDAOImpl extends BaseDaoImpl implements PowerLogDAO{

	public void doAddPowerLog(PowerLogColl powerLogColl) throws DataAccessException {

		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_power_log_t(f_log_id,f_part_city, f_part_mm,f_area_id,f_employee_id,");
		buf.append(" f_oper_type,f_oper_obj,f_power_id,f_operate_time,f_note) ");
		buf.append(" values (OM_POWER_LOG_S.nextval,?,?,?,?,?,?,?,sysdate,?)");
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());		
			for(int j=0; j < powerLogColl.getRowCount(); j++){
				int i=1;
				PowerLogVO powerLogVO = powerLogColl.getPowerLogVO(j);
				String areaId = powerLogVO.getAreaId();
				String employeeId = powerLogVO.getEmployeeId();
				int operType = powerLogVO.getOperType();
				String operObj = powerLogVO.getOperObj();
				String powerId = powerLogVO.getPowerId();
				String note = powerLogVO.getNote();
				pstmt.setString(i++, getPartCity(areaId));
				pstmt.setInt(i++, getPartMm());
				pstmt.setString(i++, areaId);
				pstmt.setString(i++, employeeId);
				pstmt.setInt(i++, operType);
				pstmt.setString(i++, operObj);
				pstmt.setString(i++, powerId);
				pstmt.setString(i++, note);
				pstmt.addBatch();
			}
			pstmt.executeBatch();
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogDAOImpl--doAddPowerLog-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogDAOImpl--doAddPowerLog-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		
	}

	public int getMenuCount(Map map) throws DataAccessException {
		int count = 0;
		String partCity = (String)map.get("partCity");
        String workNo = (String)map.get("workNo");
        String startTime = (String)map.get("startTime");
        String endTime = (String)map.get("endTime");
        String operType = (String)map.get("operType");
        String operObj = (String)map.get("operObj");
        String partMm = startTime.substring(5,7);
        StringBuffer buf = new StringBuffer();
        buf.append("select count(*) from (");
        buf.append("select a.*,b.f_area_name,c.f_employee_name, e.f_employee_name f_obj_name");
        if(operType!= null && operType.trim().equals("0")){//赋权，则关联角色表
        	buf.append(", d.f_role_name f_power_name ");
        }else if(operType!= null && operType.trim().equals("1")){//微调，则关联菜单表
        	buf.append(", d.f_menu_name f_power_name ");
        }
        buf.append(" from om_power_log_t a, om_area_t b, om_employee_t c, om_employee_t e");
        if(operType!= null && operType.trim().equals("0")){//赋权，则关联角色表
        	buf.append(", om_role_t d ");
        }else if(operType!= null && operType.trim().equals("1")){//微调，则关联菜单表
        	buf.append(", om_menu_t d ");
        }
        buf.append(" where a.f_area_id = b.f_area_id and a.f_employee_id = c.f_employee_id ");
        buf.append(" and a.f_oper_obj = e.f_employee_id ");
        if(operType!= null && operType.trim().equals("0")){//赋权，则关联角色表
        	buf.append(" and a.f_power_id =  d.f_role_id ");
        }else if(operType!= null && operType.trim().equals("1")){//微调，则关联菜单表
        	buf.append(" and a.f_power_id =  d.f_menu_id ");
        }
        buf.append(" and a.F_OPERATE_TIME >= to_date(?,'yyyy-MM-dd')  and a.F_OPERATE_TIME <= to_date(?,'yyyy-MM-dd')+1");
        buf.append(" and a.f_oper_type = ? and a.f_part_city = ? and a.f_part_mm = ?");

        if(workNo != null && !workNo.equals("")){
        	buf.append(" and upper(c.f_work_no) = upper(?)");
        }
        if(operObj != null && !operObj.equals("")){
        	buf.append(" and upper(e.f_work_no) = upper(?)");
        }
        buf.append(")");
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i=1;
			pstmt.setString(i++, startTime);
			pstmt.setString(i++, endTime);
			pstmt.setString(i++, operType);
	        pstmt.setString(i++, partCity);
	        pstmt.setString(i++, partMm);
	        if(workNo != null && !workNo.equals("")){
	        	pstmt.setString(i++, workNo);
	        }
	        if(operObj != null && !operObj.equals("")){
	        	pstmt.setString(i++, operObj);
	        }
	        rest = pstmt.executeQuery();
	        if(rest.next()){
	        	count = rest.getInt(1);
	        }
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogDAOImpl--getCount-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogDAOImpl--getCount-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}		

		return count;
	}

	public PowerLogColl getMenuPowerLogColl(Map map, int startLine, int endLine) throws DataAccessException {
		PowerLogColl logColl = new PowerLogColl();
		String partCity = (String)map.get("partCity");
        String workNo = (String)map.get("workNo");
        String startTime = (String)map.get("startTime");
        String endTime = (String)map.get("endTime");
        String operType = (String)map.get("operType");
        String operObj = (String)map.get("operObj");
        StringBuffer buf = new StringBuffer();
        buf.append(" select * from (");
        buf.append("select a.*,b.f_area_name, c.f_employee_name, e.f_employee_name f_obj_name ");
        if(operType!= null && operType.trim().equals("0")){//赋权，则关联角色表
        	buf.append(", d.f_role_name f_power_name ");
        }else if(operType!= null && operType.trim().equals("1")){//微调，则关联菜单表
        	buf.append(", d.f_menu_name f_power_name ");
        }
        buf.append(" , rownum rowcount");
        buf.append(" from om_power_log_t a, om_area_t b, om_employee_t c, om_employee_t e ");
        if(operType!= null && operType.trim().equals("0")){//赋权，则关联角色表
        	buf.append(", om_role_t d ");
        }else if(operType!= null && operType.trim().equals("1")){//微调，则关联菜单表
        	buf.append(", om_menu_t d ");
        }

        buf.append(" where a.f_area_id = b.f_area_id and a.f_employee_id = c.f_employee_id ");
        buf.append(" and a.f_oper_obj = e.f_employee_id ");
        if(operType!= null && operType.trim().equals("0")){//赋权，则关联角色表
        	buf.append(" and a.f_power_id =  d.f_role_id ");
        }else if(operType!= null && operType.trim().equals("1")){//微调，则关联菜单表
        	buf.append(" and a.f_power_id =  d.f_menu_id ");
        }
        buf.append(" and a.F_OPERATE_TIME >= to_date(?,'yyyy-MM-dd')  and a.F_OPERATE_TIME <= to_date(?,'yyyy-MM-dd')+1");
        buf.append(" and a.f_oper_type = ? and a.f_part_city = ? and a.f_part_mm = ?");
        
        if(workNo != null && !workNo.equals("")){
        	buf.append(" and upper(c.f_work_no) = upper(?)");
        }
        if(operObj != null && !operObj.equals("")){
        	buf.append(" and e.f_work_no = upper(?)");
        }
        buf.append(" and rownum < ? ) where rowcount >= ?");
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			int i=1;
			pstmt.setString(i++, startTime);
			pstmt.setString(i++, endTime);
			pstmt.setString(i++, operType);
			pstmt.setString(i++, partCity);
		    pstmt.setString(i++, startTime.substring(5,7));
	        if(workNo != null && !workNo.equals("")){
	        	pstmt.setString(i++, workNo);
	        }
	        if(operObj != null && !operObj.equals("")){
	        	pstmt.setString(i++, operObj);
	        }
	        pstmt.setInt(i++, endLine);
	        pstmt.setInt(i++, startLine);
	        rest = pstmt.executeQuery();
	        while(rest.next()){
	        	PowerLogVO vo = new PowerLogVO();
	        	vo.setAttribute(rest);
	        	logColl.addPowerLog(vo);
	        }
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogDAOImpl--getPowerLogColl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogDAOImpl--getPowerLogColl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}		
		return logColl;
	}

	public int getRoleCount(Map queryMap) throws DataAccessException {
		// TODO Auto-generated method stub
		return 0;
	}

	public PowerLogColl getRolePowerLogColl(Map queryMap, int startLine, int endLine) throws DataAccessException {
		// TODO Auto-generated method stub
		return null;
	}
	public PowerLogColl getAdminRoleColl(String authId, String areaId, String operEmpId) throws DataAccessException{
		PowerLogColl coll = new PowerLogColl();
		StringBuffer buf = new StringBuffer();
		buf.append("select f_role_id from om_role_t where f_creater = ?");
		buf.append("union select f_role_id from om_employee_role_relation_t where f_admin_flag = 1 and f_employee_id = ?");
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, authId);
			pstmt.setString(2, authId);
	        rest = pstmt.executeQuery();
	        while(rest.next()){
	        	PowerLogVO vo = new PowerLogVO();
	        	vo.setEmployeeId(authId);
	        	vo.setAreaId(areaId);
	        	vo.setOperObj(operEmpId);
	        	vo.setPowerId(rest.getString("f_role_id"));
	        	vo.setNote("取消权限");
	        	vo.setOperType(0);
	        	coll.addPowerLog(vo);
	        }
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogDAOImpl--getPowerLogColl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogDAOImpl--getPowerLogColl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}		
		return coll;
	}
	
	private String getPartCity(String areaId){
		String city = "";
		String sql = "select f_area_level from om_area_t where f_area_id = ?";
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			int i=1;
			pstmt.setString(i++, areaId);
	        rest = pstmt.executeQuery();
	        if(rest.next()){
	        	int areaLevel  = rest.getInt(1);
	        	if(areaLevel < 3){
	        		city = areaId;
	        	}else{
	        		city = areaId.substring(3, 6);
	        	}
	        }
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogDAOImpl--getPartCity-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogDAOImpl--getPartCity-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}		
		return city;
	}

	private int getPartMm(){
		Date date = new Date();
		return date.getMonth()+1;
	}
}
