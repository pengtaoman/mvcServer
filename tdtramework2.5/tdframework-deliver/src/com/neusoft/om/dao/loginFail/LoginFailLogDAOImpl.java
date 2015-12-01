package com.neusoft.om.dao.loginFail;

import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LoginFailLogDAOImpl extends BaseDaoImpl
  implements LoginFailLogDAO
{
  public int getLogRowCount(LoginFailLogQueryVO vo)
    throws DataAccessException
  {
    int allRows = 0;
    String loginId = vo.getLoginId().toLowerCase();
    String startTime = vo.getStartTime();
    String endTime = vo.getEndTime();
    String partMm = vo.getPartMm();
    StringBuffer buf = new StringBuffer();
    buf.append("select count('X') from OM_LOGIN_FAIL_LOG_T ")
      .append(" where ")
      .append(" f_login_date >= ?")
      .append(" and f_login_date <= ?")
      .append(" and F_PART_MM = ?");
    if ((loginId != null) && (!"".equals(loginId))) {
      buf.append(" and lower(F_LOGIN_ID) like ?");
    }
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setString(1, startTime);
      pstmt.setString(2, endTime);
      pstmt.setString(3, partMm);
      if ((loginId != null) && (!"".equals(loginId))) {
        pstmt.setString(4, "%" + loginId + "%");
      }
      rest = pstmt.executeQuery();
      if (rest.next())
        allRows = rest.getInt(1);
    }
    catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "LoginFailLogDAOImpl--getLogRowCount-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "LoginFailLogDAOImpl--getLogRowCount-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return allRows;
  }

  public List<LoginFailLogQueryVO> getLogList(LoginFailLogQueryVO vo, int startRow, int endRow)
    throws DataAccessException
  {
    int i = 0;
    String loginId = vo.getLoginId().toLowerCase();
    String startTime = vo.getStartTime();
    String endTime = vo.getEndTime();
    String partMm = vo.getPartMm();
    StringBuffer buf = new StringBuffer();
    List list = new ArrayList();
    buf.append("select * from (select t.*,rownum rowcount from (select F_LOGIN_ID,F_IP_ADDR,F_LOGIN_DATE,F_DEL_FLAG from OM_LOGIN_FAIL_LOG_T ")
      .append(" where ")
      .append(" f_login_date >= ? and f_login_date <= ? and F_PART_MM = ?");
    if ((loginId != null) && (!"".equals(loginId))) {
      buf.append(" and lower(F_LOGIN_ID) like ?");
    }
    buf.append(")t)");
    buf.append(" where rowcount < ? and rowcount >= ?");
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setString(++i, startTime);
      pstmt.setString(++i, endTime);
      pstmt.setString(++i, partMm);
      if ((loginId != null) && (!"".equals(loginId))) {
        pstmt.setString(++i, "%" + loginId + "%");
      }
      pstmt.setInt(++i, endRow);
      pstmt.setInt(++i, startRow);

      rest = pstmt.executeQuery();
      while (rest.next()) {
        LoginFailLogQueryVO loginFailLogVO = new LoginFailLogQueryVO();
        loginFailLogVO.setLoginId(nvl(rest.getString("F_LOGIN_ID")));
        loginFailLogVO.setIpAddr(nvl(rest.getString("F_IP_ADDR")));
        loginFailLogVO.setLoginDate(nvl(rest.getString("F_LOGIN_DATE")));
        String tempstr = nvl(rest.getString("F_DEL_FLAG"));
        if (("0".equals(tempstr)) || ("".equals(tempstr))) {
          loginFailLogVO.setDelFlag("锁定");
        }
        else if ("1".equals(tempstr)) {
          loginFailLogVO.setDelFlag("已解锁");
        }
        list.add(loginFailLogVO);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "LogDAOImpl--getLogList-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "LogDAOImpl--getLogList-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return list;
  }

  private String nvl(String s) {
    return s == null ? "" : s;
  }
}