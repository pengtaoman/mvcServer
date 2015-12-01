package com.neusoft.om.dao.invpn;

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

public class IpsInvpnDAOImpl extends BaseDaoImpl implements IpsInvpnDAO{

	public IpsInvpnColl getIpsInvpn(String address, String description) {
		
		IpsInvpnColl coll = new IpsInvpnColl();
		IpsInvpnVO vo = null;
		String sql = "select * from om_ips_invpn_t where ip_segment_address like ? and ip_segment_desc like ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,"%"+address+"%");
			pstmt.setString(2,"%"+description+"%");
			rest = pstmt.executeQuery();
	
			while(rest.next()){
				vo = new IpsInvpnVO();
				vo.setAttribute(rest);
				coll.addIpsInvpn(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpsInvpnDAOImpl--getIpsInvpn-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpsInvpnDAOImpl--getIpsInvpn-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return coll;	
	}

	public IpsInvpnVO getIpsInvpnVO(String address) {		
		IpsInvpnVO vo = null;
		String sql = "select * from om_ips_invpn_t where ip_segment_address = '"+address +"'";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();			
			if(rest.next()){
				vo = new IpsInvpnVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpsInvpnDAOImpl--getIpsInvpnVO-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpsInvpnDAOImpl--getIpsInvpnVO-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}
	public int doAddIpsInvpn(IpsInvpnVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_ips_invpn_t (ip_segment_id,ip_segment_address,ip_segment_desc ) values(?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getIpSegmentId());
			pstmt.setString(2,vo.getIpSegmentAddress());
			pstmt.setString(3,vo.getIpSegmentDesc());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpsInvpnDAOImpl--doAddIpsInvpn-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpsInvpnDAOImpl--doAddIpsInvpn-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	public int doModifyIpsInvpn(IpsInvpnVO vo, String priAddress) throws DataAccessException {
		int code = 1;
		String sql ="update om_ips_invpn_t set ip_segment_id = ?,ip_segment_desc = ? ,ip_segment_address=? where ip_segment_address = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getIpSegmentId());
			pstmt.setString(2,vo.getIpSegmentDesc());
			pstmt.setString(3,vo.getIpSegmentAddress());
			pstmt.setString(4,priAddress);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpsInvpnDAOImpl--doModifyIpsInvpn-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpsInvpnDAOImpl--doModifyIpsInvpn-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	public int doDeleteIpsInvpn(String address) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_ips_invpn_t where ip_segment_address = ? ";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,address);
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpsInvpnDAOImpl--doDeleteIpsInvpn-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"IpsInvpnDAOImpl--doDeleteIpsInvpn-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
    // 获取 om_ips_invpn_t 的结果集
    public List getIpsInvpnList(String address, String desc, int beginNum, int endNum) throws DataAccessException {
        IpsInvpnVO vo = null;
        List list = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        
        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append("select * from (");
        sqlBuf.append(" select rownum rowcound,ip_segment_id,ip_segment_address,ip_segment_desc");
        sqlBuf.append(" from om_ips_invpn_t where 1=1 ");
        if (address!= null && !address.equals("")) {
            sqlBuf.append(" and ip_segment_address like ?");
        }
        if (desc!= null && !desc.equals("")) {
            sqlBuf.append(" and ip_segment_desc like ? ");
        }

        sqlBuf.append("and rownum < ").append(endNum);
        sqlBuf.append(" ) ");
        sqlBuf.append("where rowcound >= ").append(beginNum);
        try {
            conn = getConnection();
            int exe=1;
            pstmt = conn.prepareStatement(sqlBuf.toString());
            if (address!= null && !address.equals("")) {
                pstmt.setString(exe,"%"+address+"%");
                exe++;
            }
            if (desc!= null && !desc.equals("")) {
                pstmt.setString(exe,"%"+desc+"%");
            }
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new IpsInvpnVO();
                vo.setAttribute(rest);
                list.add(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "IpsInvpnDAOImpl--getIpsInvpnList()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "IpsInvpnDAOImpl--getIpsInvpnList()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return list;
    }
    // 查询om_ips_invpn_t 总记录数
    public int getRowCount(String address, String desc) throws DataAccessException {
        int allRows = 0;
        int exe=1;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;

        StringBuffer sqlBuf = new StringBuffer();
        sqlBuf.append(" select count(*) ");
        sqlBuf.append(" from om_ips_invpn_t where 1=1");
        if (address!=null && !address.equals("")) {
            sqlBuf.append(" and ip_segment_address like ? ");
        }
        if (desc!=null && !desc.equals("")) {
            sqlBuf.append(" and ip_segment_desc like ? ");
        }
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sqlBuf.toString());
            if (address!=null &&!address.equals("")) {
                pstmt.setString(exe,"%"+address+"%");
                exe++;
            }
            if (desc!=null && !desc.equals("")) {
                pstmt.setString(exe,"%"+desc+"%");
            }
            rest = pstmt.executeQuery();
            if (rest.next()) {
                allRows = rest.getInt(1);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "IpsInvpnDAOImpl--getRowCount()-1:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "IpsInvpnDAOImpl--getRowCount()-2:"
                    + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return allRows;
    }
}
