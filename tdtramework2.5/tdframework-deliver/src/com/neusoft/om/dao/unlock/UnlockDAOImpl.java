package com.neusoft.om.dao.unlock;

import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UnlockDAOImpl extends BaseDaoImpl
  implements UnlockDAO
{
  public String getAreaIdLock(String workno)
    throws DataAccessException
  {
    String sql = "select f_area_id from om_employee_t where f_work_no = ?";
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    String areaid = "";
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, workno);
      rest = pstmt.executeQuery();
      if (rest.next())
        areaid = rest.getString(1);
    }
    catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "UnlockDAOImpl--getAreaIdLock-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "UnlockDAOImpl--getAreaIdLock-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return areaid;
  }

  public boolean getExistNo(String workNo) throws DataAccessException {
    String sql = "select count('X') as cnt from om_employee_t where f_work_no = ?";
    boolean b = false;
    int count = 0;
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, workNo);
      rest = pstmt.executeQuery();
      if (rest.next()) {
        count = rest.getInt(1);
        if (count > 0)
          b = true;
      }
    }
    catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "UnlockDAOImpl--getExistNo-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "UnlockDAOImpl--getExistNo-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return b;
  }
}