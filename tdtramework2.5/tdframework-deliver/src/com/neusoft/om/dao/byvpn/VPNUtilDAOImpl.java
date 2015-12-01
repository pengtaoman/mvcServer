package com.neusoft.om.dao.byvpn;

import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class VPNUtilDAOImpl extends BaseDaoImpl
  implements VPNUtilDAO
{
  public boolean isByVPN(String ipaddress)
  {
	  /*
    String ipSegment = "";
    if (ipaddress != null) {
      String[] ipAddressArry = ipaddress.split("\\.");
      if (ipAddressArry.length > 3) {
        ipSegment = ipAddressArry[0] + "." + ipAddressArry[1] + "." + ipAddressArry[2] + ".*";
      }
    }
    String sql = "select count(1) from om_ips_invpn_t where ? = ip_segment_address ";

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    int ret = 0;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, ipSegment);
      rest = pstmt.executeQuery();

      if (rest.next())
        ret = rest.getInt(1);
    }
    catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "VPNUtilDAOImpl--isByVPN-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "VPNUtilDAOImpl--isByVPN-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }

    return ret == 1;
    */
	  return true;
  }
  public boolean isMacLegal(String macaddress) {
    String sql = "select count(1) from om_macs_permitted_t where ? = mac_address ";

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    int ret = 0;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, macaddress);
      rest = pstmt.executeQuery();

      if (rest.next())
        ret = rest.getInt(1);
    }
    catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "VPNUtilDAOImpl--isMacLegal-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "VPNUtilDAOImpl--isMacLegal-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }

    return ret == 1;
  }
}