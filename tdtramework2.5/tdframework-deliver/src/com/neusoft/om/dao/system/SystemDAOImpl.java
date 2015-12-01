package com.neusoft.om.dao.system;

import com.neusoft.om.interfase.authorize.OMSystemColl;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class SystemDAOImpl extends BaseDaoImpl
  implements SystemDAO
{
  public SystemVO getSystemInfoById(String systemId)
    throws DataAccessException
  {
    SystemVO vo = null;
    String sql = "SELECT * FROM om_system_t WHERE f_system_id = ?";
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, systemId);
      rest = pstmt.executeQuery();

      while (rest.next()) {
        vo = new SystemVO();
        vo.setAttribute(rest);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoById-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoById-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return vo;
  }

  public SystemColl getAllSystemInfo() throws DataAccessException {
    SystemColl coll = new SystemColl();
    String sql = "SELECT * FROM om_system_t";
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      rest = pstmt.executeQuery();

      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        coll.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getAllSystemInfo-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getAllSystemInfo-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return coll;
  }

  public SystemColl getSystemInfoByEmployeeId(String employeeId) throws DataAccessException {
    SystemColl coll = new SystemColl();

    StringBuffer buf = new StringBuffer("");
    buf.append(" SELECT DISTINCT (n.f_system_id),m.f_system_name,m.f_system_type,m.f_detail_desc,m.f_parent_system_id");
    buf.append(" FROM( ");
    buf.append(" SELECT f_menu_id");
    buf.append(" FROM om_func_role_t a,om_employee_role_relation_t b");
    buf.append(" WHERE b.f_employee_id = ?");
    buf.append(" AND a.f_role_id = b.f_role_id");
    buf.append(" AND b.f_usable_flag = 1");
    buf.append(" GROUP BY f_menu_id) e,om_menu_t n,om_system_t m");
    buf.append(" WHERE e.f_menu_id = n.f_menu_id");
    buf.append(" AND n.f_system_id = m.f_system_id");
    buf.append(" AND n.f_if_my_work = 0");
    buf.append(" AND n.F_INUSE = 1");
    buf.append(" AND n.f_menu_type <> 0");
    buf.append(" union ");
    buf.append(" select b.f_system_id ,b.f_system_name,b.f_system_type,b.f_detail_desc,b.f_parent_system_id from ( ");
    buf.append(" SELECT DISTINCT (n.f_system_id),m.f_system_name,m.f_system_type,m.f_detail_desc,m.f_parent_system_id");
    buf.append(" FROM( ");
    buf.append(" SELECT f_menu_id");
    buf.append(" FROM om_func_role_t a,om_employee_role_relation_t b");
    buf.append(" WHERE b.f_employee_id = ?");
    buf.append(" AND a.f_role_id = b.f_role_id");
    buf.append(" AND b.f_usable_flag = 1");
    buf.append(" GROUP BY f_menu_id) e,om_menu_t n,om_system_t m");
    buf.append(" WHERE e.f_menu_id = n.f_menu_id");
    buf.append(" AND n.f_system_id = m.f_system_id");
    buf.append(" AND n.f_if_my_work = 0");
    buf.append(" AND n.F_INUSE = 1");
    buf.append(" AND n.f_menu_type <> 0");
    buf.append(" ) a,om_system_t b ");
    buf.append(" where a.f_parent_system_id = b.f_system_id ");

    buf.append(" union ");
    buf.append(" select f_system_id ,f_system_name,f_system_type,f_detail_desc,f_parent_system_id");
    buf.append(" from om_system_t where f_system_id in(");
    buf.append(" SELECT p.f_system_id FROM om_menu_t p, om_power_adjust_t q ");
    buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ? ");
    buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");
    buf.append(" )");
    buf.append(" union ");
    buf.append(" select z.f_system_id ,z.f_system_name,z.f_system_type,z.f_detail_desc,z.f_parent_system_id");
    buf.append(" from om_system_t z, om_system_t y where y.f_system_id in(");
    buf.append(" SELECT p.f_system_id FROM om_menu_t p, om_power_adjust_t q ");
    buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ?");
    buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");
    buf.append(" ) AND y.f_parent_system_id = z.f_system_id");
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setString(1, employeeId);
      pstmt.setString(2, employeeId);
      pstmt.setString(3, employeeId);
      pstmt.setString(4, employeeId);
      rest = pstmt.executeQuery();
      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        coll.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoByEmployeeId-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoByEmployeeId-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }

    return coll;
  }
  public SystemColl getAdminSystemInfoByEmployeeId(String employeeId) throws DataAccessException {
    SystemColl coll = new SystemColl();

    StringBuffer buf = new StringBuffer("");
    buf.append(" SELECT DISTINCT (n.f_system_id),m.f_system_name,m.f_system_type,m.f_detail_desc,m.f_parent_system_id");
    buf.append(" FROM( ");
    buf.append(" SELECT f_menu_id");
    buf.append(" FROM om_func_role_t a,om_employee_role_relation_t b");
    buf.append(" WHERE b.f_employee_id = ?");
    buf.append(" AND a.f_role_id = b.f_role_id");
    buf.append(" AND b.f_admin_flag = 1");
    buf.append(" GROUP BY f_menu_id) e,om_menu_t n,om_system_t m");
    buf.append(" WHERE e.f_menu_id = n.f_menu_id");
    buf.append(" AND n.f_system_id = m.f_system_id");
    buf.append(" AND n.f_if_my_work = 0");
    buf.append(" AND n.F_INUSE = 1");
    buf.append(" AND n.f_menu_type <> 0");
    buf.append(" union ");
    buf.append(" select b.f_system_id ,b.f_system_name,b.f_system_type,b.f_detail_desc,b.f_parent_system_id from ( ");
    buf.append(" SELECT DISTINCT (n.f_system_id),m.f_system_name,m.f_system_type,m.f_detail_desc,m.f_parent_system_id");
    buf.append(" FROM( ");
    buf.append(" SELECT f_menu_id");
    buf.append(" FROM om_func_role_t a,om_employee_role_relation_t b");
    buf.append(" WHERE b.f_employee_id = ?");
    buf.append(" AND a.f_role_id = b.f_role_id");
    buf.append(" AND b.f_admin_flag = 1");
    buf.append(" GROUP BY f_menu_id) e,om_menu_t n,om_system_t m");
    buf.append(" WHERE e.f_menu_id = n.f_menu_id");
    buf.append(" AND n.f_system_id = m.f_system_id");
    buf.append(" AND n.f_if_my_work = 0");
    buf.append(" AND n.F_INUSE = 1");
    buf.append(" AND n.f_menu_type <> 0");
    buf.append(" ) a,om_system_t b ");
    buf.append(" where a.f_parent_system_id = b.f_system_id ");
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setString(1, employeeId);
      pstmt.setString(2, employeeId);
      rest = pstmt.executeQuery();
      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        coll.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoByEmployeeId-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoByEmployeeId-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return coll;
  }
  public SystemColl getSystemInfoWeb() throws DataAccessException {
    SystemColl coll = new SystemColl();
    String sql = "SELECT * FROM om_system_t where f_system_type = 1";
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      rest = pstmt.executeQuery();

      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        coll.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoWeb-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoWeb-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return coll;
  }

  public int doAddSystemInfo(SystemVO vo) throws DataAccessException {
    int code = 1;
    String sql = "insert into om_system_t (f_system_id,f_system_name,f_system_type,f_detail_desc,f_parent_system_id,f_order,f_disabled_date,f_operator, f_operate_date ) values(?,?,?,?,?,?,TO_DATE(?,'yyyy-mm-dd'),?,sysdate)";

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, vo.getSystemId());
      pstmt.setString(2, vo.getSystemName());
      pstmt.setString(3, vo.getSystemType());
      pstmt.setString(4, vo.getDetailDesc());
      pstmt.setString(5, vo.getParentSystemId());
      pstmt.setInt(6, vo.getOrder());
      pstmt.setString(7, vo.getDisabledDate());
      pstmt.setString(8, vo.getOperator());
      code = pstmt.executeUpdate();
    } catch (SQLException e) {
      code = 0;
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--doAddSystemInfo-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      code = 0;
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--doAddSystemInfo-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return code;
  }

  public int doModifySystemInfo(SystemVO vo) throws DataAccessException {
    int code = 1;
    String sql = "update om_system_t  set f_system_name = ?,f_system_type = ?,f_detail_desc = ? , f_parent_system_id = ?, f_order = ? , f_disabled_date = TO_DATE(?,'yyyy-mm-dd'), f_operator=? , f_operate_date = sysdate where f_system_id = ?";

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, vo.getSystemName());
      pstmt.setString(2, vo.getSystemType());
      pstmt.setString(3, vo.getDetailDesc());
      pstmt.setString(4, vo.getParentSystemId());
      pstmt.setInt(5, vo.getOrder());
      pstmt.setString(6, vo.getDisabledDate());
      pstmt.setString(7, vo.getOperator());
      pstmt.setString(8, vo.getSystemId());
      code = pstmt.executeUpdate();
    } catch (SQLException e) {
      code = 0;
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--doModifySystemInfo-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      code = 0;
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--doModifySystemInfo-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return code;
  }

  public int doDeleteSystemInfo(String systemId) throws DataAccessException {
    int code = 1;
    String sql = "delete from om_system_t where f_system_id = ? ";
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      pstmt.setString(1, systemId);
      code = pstmt.executeUpdate();
    } catch (SQLException e) {
      code = 0;
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--doDeleteSystemInfo-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      code = 0;
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--doDeleteSystemInfo-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return code;
  }

  private SystemColl assembleSysColl(String employeeId, SystemColl pSystemColl)
  {
    SystemColl systemColl = new SystemColl();
    SystemColl secondLevelColl = new SystemColl();
    int rowCount = pSystemColl.getRowCount();
    for (int i = 0; i < rowCount; i++) {
      SystemVO systemVO = pSystemColl.getSystem(i);
      String parentSystemId = systemVO.getParentSystemId();
      if ((parentSystemId == null) || (parentSystemId.trim().equals("")))
        systemColl.addSystem(systemVO);
      else {
        secondLevelColl.addSystem(systemVO);
      }
    }

    HashMap subSystemMap = new HashMap();
    for (int i = 0; i < secondLevelColl.getRowCount(); i++) {
      SystemVO systemVO = secondLevelColl.getSystem(i);
      String parentId = systemVO.getParentSystemId();
      if (subSystemMap.containsKey(parentId)) {
        SystemColl itemColl = (SystemColl)subSystemMap.get(parentId);
        itemColl.addSystem(systemVO);
        subSystemMap.put(parentId, itemColl);
      } else {
        SystemColl itemColl = new SystemColl();
        itemColl.addSystem(systemVO);
        subSystemMap.put(parentId, itemColl);
      }
    }

    Set parenSystemIdSet = subSystemMap.keySet();
    Iterator it = parenSystemIdSet.iterator();
    while (it.hasNext()) {
      String parenSysId = (String)it.next();
      SystemVO parentSystemVO = getSystemInfoById(parenSysId);
      SystemColl subColl = (SystemColl)subSystemMap.get(parenSysId);

      OMSystemColl oMSystemColl = new OMSystemColl();
      oMSystemColl.setSystemColl(subColl);
      parentSystemVO.setSubSystemColl(oMSystemColl);
      systemColl.addSystem(parentSystemVO);
    }
    return systemColl;
  }

  public SystemColl getSystemInfoByEmpId(String employeeId) throws DataAccessException
  {
    SystemColl coll = new SystemColl();

    StringBuffer buf = new StringBuffer("");
    buf.append(" SELECT distinct * from (");
    buf.append(" SELECT DISTINCT (n.f_system_id),m.f_system_name,m.f_system_type,m.f_detail_desc,m.f_parent_system_id,m.f_order,m.f_if_show_favorite");
    buf.append(" FROM( ");
    buf.append(" SELECT f_menu_id");
    buf.append(" FROM om_func_role_t a,om_employee_role_relation_t b");
    buf.append(" WHERE b.f_employee_id = ?");
    buf.append(" AND a.f_role_id = b.f_role_id");
    buf.append(" AND b.f_usable_flag = 1");
    buf.append(" GROUP BY f_menu_id) e,om_menu_t n,om_system_t m");
    buf.append(" WHERE e.f_menu_id = n.f_menu_id");
    buf.append(" AND n.f_system_id = m.f_system_id");
    buf.append(" AND n.f_if_my_work = 0");
    buf.append(" AND n.F_INUSE = 1");
    buf.append(" AND n.f_menu_type <> 0");
    buf.append(" AND m.f_system_type <> 0");
    buf.append(" union ");
    buf.append(" select f_system_id ,f_system_name,f_system_type,f_detail_desc,f_parent_system_id,f_order,f_if_show_favorite");
    buf.append(" from om_system_t where f_system_type <>0 AND f_system_id in(");
    buf.append(" SELECT p.f_system_id FROM om_menu_t p, om_power_adjust_t q ");
    buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ?");
    buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");
    buf.append(" )");
    buf.append(" union ");
    buf.append(" select z.f_system_id ,z.f_system_name,z.f_system_type,z.f_detail_desc,z.f_parent_system_id,z.f_order,z.f_if_show_favorite");
    buf.append(" from om_system_t z, om_system_t y where y.f_system_id in(");
    buf.append(" SELECT p.f_system_id FROM om_menu_t p, om_power_adjust_t q ");
    buf.append(" WHERE p.f_menu_id = q.f_menu_id AND q.f_employee_id = ?");
    buf.append(" AND q.f_admin_adjust=1 AND q.f_exec_adjust=1 ");
    buf.append(" ) AND y.f_parent_system_id = z.f_system_id AND y.f_system_type <>0 AND z.f_system_type <>0");

    buf.append(" )");

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setString(1, employeeId);
      pstmt.setString(2, employeeId);
      pstmt.setString(3, employeeId);
      rest = pstmt.executeQuery();

      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        coll.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoByEmployeeId-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoByEmployeeId-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return coll;
  }

  public SystemColl getSystemCollByRole(int roleId)
    throws DataAccessException
  {
    SystemColl sysColl = new SystemColl();

    StringBuffer buf = new StringBuffer("");
    buf.append(" SELECT DISTINCT (n.f_system_id),m.f_system_name,m.f_system_type,m.f_detail_desc,m.f_parent_system_id");
    buf.append(" FROM( ");
    buf.append(" SELECT f_menu_id");
    buf.append(" FROM om_func_role_t WHERE f_role_id=?) e,om_menu_t n,om_system_t m");
    buf.append(" WHERE e.f_menu_id = n.f_menu_id");
    buf.append(" AND n.f_system_id = m.f_system_id");
    buf.append(" AND n.f_if_my_work = 0");
    buf.append(" AND n.F_INUSE = 1");
    buf.append(" AND n.f_menu_type <> 0");

    buf.append(" union ");
    buf.append(" select b.f_system_id ,b.f_system_name,b.f_system_type,b.f_detail_desc,b.f_parent_system_id from ( ");
    buf.append(" SELECT DISTINCT (n.f_system_id),m.f_system_name,m.f_system_type,m.f_detail_desc,m.f_parent_system_id");
    buf.append(" FROM( ");
    buf.append(" SELECT f_menu_id");
    buf.append(" FROM om_func_role_t ");
    buf.append(" WHERE f_role_id = ?) e,om_menu_t n,om_system_t m");
    buf.append(" WHERE e.f_menu_id = n.f_menu_id");
    buf.append(" AND n.f_system_id = m.f_system_id");
    buf.append(" AND n.f_if_my_work = 0");
    buf.append(" AND n.F_INUSE = 1");
    buf.append(" AND n.f_menu_type <> 0");

    buf.append(" ) a,om_system_t b ");
    buf.append(" where a.f_parent_system_id = b.f_system_id ");
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setInt(1, roleId);
      pstmt.setInt(2, roleId);
      rest = pstmt.executeQuery();

      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        sysColl.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoByEmployeeId-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoByEmployeeId-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return sysColl;
  }

  public SystemColl getSystemCollInfo(String systemId) throws DataAccessException
  {
    SystemColl systemColl = null;
    StringBuffer buf = new StringBuffer("");
    buf.append(" SELECT * ");
    buf.append(" from om_system_t d ");
    buf.append(" where d.f_system_id = ? or d.f_system_id = ");
    buf.append(" (select f_parent_system_id from om_system_t where f_system_id = ?)");
    buf.append(" or d.f_parent_system_id = ?");

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setString(1, systemId);
      pstmt.setString(2, systemId);
      pstmt.setString(3, systemId);

      rest = pstmt.executeQuery();
      systemColl = new SystemColl();

      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        systemColl.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", 
        "SystemDAOImpl--getAssignableSystemCollByEmpId-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", 
        "SystemDAOImpl--getAssignableSystemCollByEmpId-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return systemColl;
  }

  public SystemColl getSystemCollByMenu(String menuId) throws DataAccessException {
    SystemColl systemColl = null;
    StringBuffer buf = new StringBuffer("");
    buf.append(" SELECT * from om_system_t d ");
    buf.append(" where d.f_system_id = ");
    buf.append(" (select f_system_id from om_menu_t where f_menu_id = ?)");
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setString(1, menuId);

      rest = pstmt.executeQuery();
      systemColl = new SystemColl();

      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        systemColl.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", 
        "SystemDAOImpl--getAssignableSystemCollByEmpId-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", 
        "SystemDAOImpl--getAssignableSystemCollByEmpId-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return systemColl;
  }

  public SystemColl getParentSystem()
    throws DataAccessException
  {
    SystemColl systemColl = null;
    StringBuffer buf = new StringBuffer("");
    buf.append(" SELECT * from om_system_t where f_parent_system_id is null");
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      rest = pstmt.executeQuery();
      systemColl = new SystemColl();
      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        systemColl.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", 
        "SystemDAOImpl--getParentSystem-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", 
        "SystemDAOImpl--getAssignableSystemCollByEmpId-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return systemColl;
  }

  public SystemColl getFirstLevelSysCollByRole(int roleId)
    throws DataAccessException
  {
    SystemColl sysColl = new SystemColl();

    StringBuffer buf = new StringBuffer("");
    buf.append(" SELECT DISTINCT (n.f_system_id),m.f_system_name,m.f_system_type,m.f_detail_desc,m.f_parent_system_id");
    buf.append(" FROM( ");
    buf.append(" SELECT f_menu_id");
    buf.append(" FROM om_func_role_t WHERE f_role_id=?) e,om_menu_t n,om_system_t m");
    buf.append(" WHERE e.f_menu_id = n.f_menu_id");
    buf.append(" AND n.f_system_id = m.f_system_id");
    buf.append(" AND n.f_if_my_work = 0");
    buf.append(" AND n.F_INUSE = 1");
    buf.append(" AND m.F_parent_system_id is null ");
    buf.append(" AND n.f_menu_type <> 0");

    buf.append(" union ");
    buf.append(" select b.f_system_id ,b.f_system_name,b.f_system_type,b.f_detail_desc,b.f_parent_system_id from ( ");
    buf.append(" SELECT DISTINCT (n.f_system_id),m.f_system_name,m.f_system_type,m.f_detail_desc,m.f_parent_system_id");
    buf.append(" FROM( ");
    buf.append(" SELECT f_menu_id");
    buf.append(" FROM om_func_role_t ");
    buf.append(" WHERE f_role_id = ?) e,om_menu_t n,om_system_t m");
    buf.append(" WHERE e.f_menu_id = n.f_menu_id");
    buf.append(" AND n.f_system_id = m.f_system_id");
    buf.append(" AND n.f_if_my_work = 0");
    buf.append(" AND n.F_INUSE = 1");
    buf.append(" AND n.f_menu_type <> 0");

    buf.append(" ) a,om_system_t b ");
    buf.append(" where a.f_parent_system_id = b.f_system_id and b.f_parent_system_id is null");
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try
    {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setInt(1, roleId);
      pstmt.setInt(2, roleId);
      rest = pstmt.executeQuery();

      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        sysColl.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoByEmployeeId-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemInfoByEmployeeId-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return sysColl;
  }
  public SystemColl getChildSystemCollInfo(String systemId) throws DataAccessException {
    SystemColl systemColl = null;
    StringBuffer buf = new StringBuffer("");
    buf.append(" SELECT * ");
    buf.append(" from om_system_t d ");
    buf.append(" where d.f_system_id = ? or d.f_system_id = ");
    buf.append(" (select f_parent_system_id from om_system_t where f_system_id = ?)");
    buf.append(" union select * from om_system_t where f_parent_system_id = ?");
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setString(1, systemId);
      pstmt.setString(2, systemId);
      pstmt.setString(3, systemId);

      rest = pstmt.executeQuery();
      systemColl = new SystemColl();

      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        systemColl.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", 
        "SystemDAOImpl--getAssignableSystemCollByEmpId-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", 
        "SystemDAOImpl--getAssignableSystemCollByEmpId-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return systemColl;
  }

  public SystemColl getFirstLevelSystemCollByEmpId(String employeeId)
    throws DataAccessException
  {
    SystemColl systemColl = null;
    StringBuffer buf = new StringBuffer("");
    buf.append(" SELECT distinct d.* ");
    buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c, om_system_t d ");
    buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
    buf.append(" and a.f_admin_flag = 1 and c.f_system_id = d.f_system_id and d.f_parent_system_id is null");

    buf.append(" UNION SELECT distinct e.* ");
    buf.append(" from om_employee_role_relation_t a,om_func_role_t b ,om_menu_t c, om_system_t d, om_system_t e ");
    buf.append(" where a.f_employee_id = ? and a.f_role_id = b.f_role_id and b.f_menu_id = c.F_MENU_ID ");
    buf.append(" and a.f_admin_flag = 1 and c.f_system_id = d.f_system_id ");
    buf.append(" and d.f_parent_system_id = e.f_system_id ");

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(buf.toString());
      pstmt.setString(1, employeeId);
      pstmt.setString(2, employeeId);
      rest = pstmt.executeQuery();
      systemColl = new SystemColl();

      while (rest.next()) {
        SystemVO vo = new SystemVO();
        vo.setAttribute(rest);
        systemColl.addSystem(vo);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", 
        "SystemDAOImpl--getAssignableSystemCollByEmpId-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", 
        "SystemDAOImpl--getAssignableSystemCollByEmpId-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return systemColl;
  }

  public List getSystemIdListByMenuList(List menuIdList)
    throws DataAccessException
  {
    List list = new ArrayList();
    StringBuffer buf = new StringBuffer();
    buf.append(" select f_system_id from om_menu_t where f_menu_type <> 0 and f_inuse = 1 and f_menu_id = ? ");
    String sql = buf.toString();
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      String systemId = "";
      String menuId = "";
      if ((menuIdList != null) && (menuIdList.size() != 0))
        for (int i = 0; i < menuIdList.size(); i++) {
          menuId = (String)menuIdList.get(i);
          pstmt.setString(1, menuId);
          rest = pstmt.executeQuery();
          while (rest.next()) {
            systemId = rest.getString("f_system_id");
            if (!list.contains(systemId))
              list.add(systemId);
          }
        }
    }
    catch (SQLException e)
    {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--SystemIdListByMenuList(List menuIdList)-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--SystemIdListByMenuList(List menuIdList)-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return list;
  }

  public List getParentSystemIdList(List systemIdList)
    throws DataAccessException
  {
    List parentIdList = new ArrayList();
    StringBuffer buf = new StringBuffer();
    buf.append(" select f_system_id from om_menu_t where f_menu_type <> 0 and f_inuse = 1 and f_menu_id = ? ");
    String sql = buf.toString();
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      String systemId = "";
      String parentSystemId = "";
      if ((systemIdList != null) && (systemIdList.size() != 0))
        for (int i = 0; i < systemIdList.size(); i++) {
          systemId = (String)systemIdList.get(i);
          pstmt.setString(1, systemId);
          rest = pstmt.executeQuery();
          while (rest.next()) {
            parentSystemId = rest.getString("f_parent_system_id");
            if (!parentIdList.contains(parentSystemId))
              parentIdList.add(parentSystemId);
          }
        }
    }
    catch (SQLException e)
    {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--SystemIdListByMenuList(List menuIdList)-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--SystemIdListByMenuList(List menuIdList)-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return parentIdList;
  }

  public SystemColl getSystemCollBySystemIdList(List systemIdList)
    throws DataAccessException
  {
    SystemColl sysColl = new SystemColl();
    StringBuffer buf = new StringBuffer();
    buf.append(" select * from om_system_t where f_system_id = ? ");
    String sql = buf.toString();
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      String systemId = "";
      if ((systemIdList != null) && (systemIdList.size() != 0))
        for (int i = 0; i < systemIdList.size(); i++) {
          systemId = (String)systemIdList.get(i);
          pstmt.setString(1, systemId);
          rest = pstmt.executeQuery();
          while (rest.next()) {
            SystemVO vo = new SystemVO();
            vo.setAttribute(rest);
            sysColl.addSystem(vo);
          }
        }
    }
    catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemCollBySystemIdList(List menuIdList)-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemCollBySystemIdList(List menuIdList)-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return sysColl;
  }

  public List queryAllBillSystem()
    throws DataAccessException
  {
    List billSysList = new ArrayList();
    StringBuffer buf = new StringBuffer();
    buf.append(" select f_system_id from om_system_t");
    String sql = buf.toString();
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rest = null;
    String systemId = "";
    try {
      conn = getConnection();
      pstmt = conn.prepareStatement(sql);
      rest = pstmt.executeQuery();
      while (rest.next()) {
        systemId = rest.getString("f_system_id");
        billSysList.add(systemId);
      }
    } catch (SQLException e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemCollBySystemIdList(List menuIdList)-1:" + e.getMessage());
      throw new DataAccessException(e);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "SystemDAOImpl--getSystemCollBySystemIdList(List menuIdList)-2:" + e.getMessage());
      throw new DataAccessException(e);
    } finally {
      close(rest, pstmt, conn);
    }
    return billSysList;
  }
}