/*
 * <p>Title:       转换程序接口</p>
 * <p>Description: 实现通过id得到name或通过name得到id的方法</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.dao.common;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
public class SwitchDAOImpl extends BaseDaoImpl implements SwitchDAO
{

    public String getEmoployeeNameById(String employeeId) throws DataAccessException
    {
        String employeeName = "";
        String sql ="SELECT f_employee_name  FROM om_employee_t WHERE f_employee_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,employeeId);
            rest = pstmt.executeQuery();
            while(rest.next()){
                employeeName = rest.getString("f_employee_name");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getEmoployeeNameById()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getEmoployeeNameById()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }  
        return employeeName;
    }


    public String getDutyNameByDutyId(String dutyId) throws DataAccessException
    {
        String dutyName = "";        
        String sql ="SELECT f_duty_name  FROM om_duty_t WHERE f_duty_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,dutyId);
            rest = pstmt.executeQuery();
            while(rest.next()){
                dutyName = rest.getString("f_duty_name");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getDutyNameByDutyId()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getDutyNameByDutyId()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }  
        return dutyName;
    }

    public String getOrganNameByOrganId(String organId) throws DataAccessException
    {
        String organName = "";        
        String sql ="SELECT f_organ_name  FROM om_organ_t WHERE f_organ_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,organId);
            rest = pstmt.executeQuery();
            while(rest.next()){
                organName = rest.getString("f_organ_name");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getOrganNameByOrganId()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getOrganNameByOrganId()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }  
        return organName;
    }
    public String getRoleNameByRoleId(int roleId) throws DataAccessException{
        String roleName = "";
        String sql ="SELECT f_role_name  FROM om_role_t WHERE f_role_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1,roleId);
            rest = pstmt.executeQuery();
            while(rest.next()){
                roleName = rest.getString("f_role_name");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getRoleNameByRoleId()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getRoleNameByRoleId()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }  
        return roleName;
    }
    
    public int getRoleNumByEmoployeeId(String employeeId) throws DataAccessException{
        int roleNum = 0;
        String sql ="SELECT count(f_role_id)  FROM OM_EMPLOYEE_ROLE_RELATION_T WHERE f_employee_id = ? ";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,employeeId);
            rest = pstmt.executeQuery();
            while(rest.next()){
            	roleNum = rest.getInt(1);
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getRoleInfoByEmoployeeId()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getRoleInfoByEmoployeeId()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }  
        return roleNum;
    }
    
    public String getRoleInfoByEmoployeeId(String employeeId) throws DataAccessException{
    	StringBuffer buf = new StringBuffer();
        String sql ="SELECT b.f_role_name  FROM OM_EMPLOYEE_ROLE_RELATION_T a,om_role_t b WHERE f_employee_id = ? and f_usable_flag=1 and a.f_role_id = b.f_role_id";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,employeeId);
            rest = pstmt.executeQuery();
            
            String roleName = null;
            int i = 0;
            while(rest.next()){
            	roleName = rest.getString(1);
            	if(rest.getString(1).trim().equals("")){
            		roleName = "未定义角色名称";
            	}
            	if(i == 0){
            		buf.append(roleName);
            	}else{
            		buf.append("/");
            		buf.append(roleName);
            		
            	}
            	i++;
            }
            //System.out.println(buf.toString());
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getRoleInfoByEmoployeeId()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getRoleInfoByEmoployeeId()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }  
        return buf.toString();
    }
    
    public String getAreaNameByAreaId(String areaId) throws DataAccessException{
        String areaName = "";
        String sql ="SELECT f_area_name  FROM om_area_t WHERE f_area_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,areaId);
            rest = pstmt.executeQuery();
            while(rest.next()){
                areaName = rest.getString("f_area_name");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getAreaNameByAreaId()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getAreaNameByAreaId()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }  
        return areaName;
    }
    
    public String getSystemNameById(String systemId) throws DataAccessException{
        String systemName = "";
        String sql ="SELECT f_system_name  FROM om_system_t WHERE f_system_id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,systemId);
            rest = pstmt.executeQuery();
            while(rest.next()){
                systemName = rest.getString("f_system_name");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getSystemNameById()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getSystemNameById()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        }  
        return systemName;
    }
    
    public String getPersonLevelNameById(int levelCode) throws DataAccessException{
        String levelName = "";
        String sql ="SELECT f_level_name  FROM om_person_level_t WHERE f_level_code = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1,levelCode);
            rest = pstmt.executeQuery();
            while(rest.next()){
                levelName = rest.getString("f_level_name");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getSystemNameById()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getSystemNameById()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        } 
        return levelName;
    }
    
    public String getDealerNameById(String dealerId) throws DataAccessException{
        String name = "";
        String sql ="SELECT dealer_name  FROM bd_dealer_t WHERE dealer_id = ? ";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,dealerId);
            rest = pstmt.executeQuery();
            while(rest.next()){
                name = rest.getString("dealer_name");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getDealerNameById()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getDealerNameById()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        } 
        return name;
    }
    
    public String getAreaLevelById(String areaId) throws DataAccessException{
        String level = "";
        String sql ="SELECT f_area_level  FROM om_area_t WHERE f_area_id = ? ";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,areaId);
            rest = pstmt.executeQuery();
            while(rest.next()){
                level = rest.getString("f_area_level");
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getAreaLevelById()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--getAreaLevelById()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        } 
        return level;
    }
    
    public boolean includeArea(String areaId1, String areaId2) throws DataAccessException{
    	boolean include = false;
    	String sql = "SELECT count(*) FROM om_area_t WHERE f_area_id=? AND f_area_id IN" +
    			" (SELECT f_area_id FROM OM_AREA_T START WITH f_area_id = ? " +
    			" CONNECT BY PRIOR f_area_id = f_parent_area_id)";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        try{
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,areaId2);
            pstmt.setString(2,areaId1);
            rest = pstmt.executeQuery();
            while(rest.next()){
            	if(rest.getInt(1) != 0){
            		include = true;
            	}            	
            }
        }catch(SQLException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--includeArea()-1:"+e.getMessage());
            throw new DataAccessException(e);
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"SwitchDAOImpl--includeArea()-2:"+e.getMessage());
            throw new DataAccessException(e);
        }finally{
            close(rest,pstmt,conn);
        } 
    	return include;
    }
}
