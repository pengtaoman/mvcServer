package com.neusoft.om.dao.mac;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class MacsPermittedDAOImpl extends BaseDaoImpl implements MacsPermittedDAO{

	public MacsPermittedColl getMacsPermitted(Map map) {
		String contactName = (String) map.get("contactName");
		String macAddress = (String) map.get("address");
		String hallId = (String)map.get("hallId");
		String city = (String)map.get("city");
		MacsPermittedColl coll = new MacsPermittedColl();
		MacsPermittedVO vo = null;
		String sql = "select * from om_macs_permitted_t where contact_name like ? " +
				     " and mac_address like ? and hall_id = ? and city = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,"%"+contactName+"%");
			pstmt.setString(2,"%"+macAddress+"%");
			pstmt.setString(3, hallId);
			pstmt.setString(4, city);
			rest = pstmt.executeQuery();
	
			while(rest.next()){
				vo = new MacsPermittedVO();
				vo.setAttribute(rest);
				coll.addMacsPermitted(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedDAOImpl--getMacsPermitted-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedDAOImpl--getMacsPermitted-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;	
	}

	public MacsPermittedVO getMacsPermittedVO(String address) {		
		MacsPermittedVO vo = null;
		String sql = "select * from om_macs_permitted_t where mac_address = '"+address +"'";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();			
			if(rest.next()){
				vo = new MacsPermittedVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedDAOImpl--getMacsPermittedVO-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedDAOImpl--getMacsPermittedVO-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	public int doAddMacsPermitted(MacsPermittedVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_macs_permitted_t (contact_name,mac_address,hall_id,city,town,phone_number )" +
				    " values(?,?,?,?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getContactName());
			pstmt.setString(2,vo.getMacAddress());
			pstmt.setString(3,vo.getHallId());
			pstmt.setString(4, vo.getCity());
			pstmt.setString(5, vo.getTown());
			pstmt.setString(6, vo.getPhoneNumber());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedDAOImpl--doAddIpsInvpn-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedDAOImpl--doAddIpsInvpn-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	public int doModifyMacsPermitted(MacsPermittedVO vo, String priAddress) throws DataAccessException {
		int code = 1;
		String sql ="update om_macs_permitted_t " +
					" set contact_name = ?, mac_address=?,hall_id=?, city=?,town=?,phone_number = ? " +
					" where mac_address = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getContactName());
			pstmt.setString(2,vo.getMacAddress());
			pstmt.setString(3,vo.getHallId());
			pstmt.setString(4,vo.getCity());
			pstmt.setString(5,vo.getTown());
			pstmt.setString(6,vo.getPhoneNumber());
			pstmt.setString(7,priAddress);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedDAOImpl--doModifyMacsPermitted-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedDAOImpl--doModifyMacsPermitted-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteMacsPermitted(String address) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_macs_permitted_t where mac_address = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,address);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedDAOImpl--doDeleteMacsPermitted-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"MacsPermittedDAOImpl--doDeleteMacsPermitted-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
    // 获取 om_macs_permitted_t 的结果集
    public List getMacsPermittedList(Map map, int beginNum, int endNum) throws DataAccessException {
    	
		String contactName = (String) map.get("contactName");
		String macAddress = (String) map.get("address");
		String hallId = (String)map.get("hallId");
		String city = (String)map.get("city");
		MacsPermittedVO vo = null;
        List list = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from (");
        sqlBuf.append(" select rownum rowcound,contact_name, city, town, hall_id, mac_address,phone_number");
        sqlBuf.append(" from om_macs_permitted_t where 1=1 ");
        if (contactName!= null && !contactName.equals("")) {
            sqlBuf.append(" and contact_name like ?");
        }
        if (macAddress!= null && !macAddress.equals("")) {
            sqlBuf.append(" and mac_address like ? ");
        }
        if (hallId!= null && !hallId.equals("")) {
            sqlBuf.append(" and hall_id = ? ");
        }
        if (city!= null && !city.equals("")) {
            sqlBuf.append(" and city = ? ");
        }
        sqlBuf.append("and rownum < ").append(endNum);
        sqlBuf.append(" ) ");
        sqlBuf.append("where rowcound >= ").append(beginNum);
        try {
            conn = getConnection();
            int exe=1;
            pstmt = conn.prepareStatement(sqlBuf.toString());
            if (contactName!= null && !contactName.equals("")) {
                pstmt.setString(exe,"%"+contactName+"%");
                exe++;
            }
            if (macAddress!= null && !macAddress.equals("")) {
            	pstmt.setString(exe,"%"+macAddress+"%");
                exe++;
            }
            if (hallId!= null && !hallId.equals("")) {
            	pstmt.setString(exe,hallId);
                exe++;
            }
            if (city!= null && !city.equals("")) {
            	pstmt.setString(exe,city);
            }
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new MacsPermittedVO();
                vo.setAttribute(rest);
                list.add(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "MacsPermittedDAOImpl--getMacsPermittedList()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "MacsPermittedDAOImpl--getMacsPermittedList()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return list;
    }
    // 查询om_macs_permitted_t 总记录数
    public int getRowCount(Map map) throws DataAccessException {
		String contactName = (String) map.get("contactName");
		String macAddress = (String) map.get("address");
		String hallId = (String)map.get("hallId");
		String city = (String)map.get("city");
        int allRows = 0;
        int exe=1;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from om_macs_permitted_t where 1=1");
        if (contactName!=null && !contactName.equals("")) {
            sqlBuf.append(" and contact_name like ? ");
        }
        if (macAddress!=null && !macAddress.equals("")) {
            sqlBuf.append(" and mac_address like ? ");
        }
        if (hallId!= null && !hallId.equals("")) {
            sqlBuf.append(" and hall_id = ? ");
        }
        if (city!= null && !city.equals("")) {
            sqlBuf.append(" and city = ? ");
        }
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            if (contactName!= null && !contactName.equals("")) {
                pstmt.setString(exe,"%"+contactName+"%");
                exe++;
            }
            if (macAddress!= null && !macAddress.equals("")) {
            	pstmt.setString(exe,"%"+macAddress+"%");
                exe++;
            }
            if (hallId!= null && !hallId.equals("")) {
            	pstmt.setString(exe,hallId);
                exe++;
            }
            if (city!= null && !city.equals("")) {
            	pstmt.setString(exe,city);
            	exe++;
            }
            rest = pstmt.executeQuery();
            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "MacsPermittedDAOImpl--getRowCount()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "MacsPermittedDAOImpl--getRowCount()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return allRows;
    }
}
