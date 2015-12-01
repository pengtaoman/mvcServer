/*
 * Created on 2006-3-14
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.dao.common;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.log.SysLog;

/**
 * @author zhangjn
 */
public class RoleListDaoImpl extends BaseDaoImpl implements RoleListDao {
	
	public List getRolesByAreaId(String areaId) {
		
		List coll = new ArrayList();

		String sql = "select f_role_id,f_role_name from td_demo_role_t where f_area_id = ? ";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		
		Map role;

		try {
			
			conn = getConnection();
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, areaId);
			
			rest = pstmt.executeQuery();
			
			while (rest.next()) {
				role = new HashMap();
				role.put("id", rest.getString("f_role_id"));
				role.put("name", rest.getString("f_role_name"));
				coll.add(role);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"RoleListDaoImpl--getRolesByAreaId-1:" + e.getMessage());
			// throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"RoleListDaoImpl--getRolesByAreaId-2:" + e.getMessage());
			// throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}
}
