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
import java.util.Vector;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.taglib.innertree.TreeData;

/**
 * @author zhangjn
 * 
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
public class DrivenTreeDaoImpl extends BaseDaoImpl implements DrivenTreeDao {
	
	public Vector getOrgsByAreaId(String areaId) {
		
		Vector coll = new Vector();
		TreeData treeData = null;
		
		String sql = "select f_organ_id,f_parent_organ_id,f_organ_name "
				+ "from td_demo_organ_t "
				+ "start with f_parent_organ_id is null "
				+ "connect by prior f_organ_id = f_parent_organ_id and f_area_id = '"
				+ areaId + "'";

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			
			String rootNodeId = "";
			
			while (rest.next()) {
				if (rest.getString("f_parent_organ_id") != null) {
					if (rest.getString("f_parent_organ_id").equalsIgnoreCase(rootNodeId))
						treeData = new TreeData(rest.getString("f_organ_id"),"root", 
								                rest.getString("f_organ_name"), 
								                rest.getString("f_organ_id"), false);
					else
						treeData = new TreeData(rest.getString("f_organ_id"),
								                rest.getString("f_parent_organ_id"), 
								                rest.getString("f_organ_name"), 
								                rest.getString("f_organ_id"), false);
				} else {
					treeData = new TreeData("root", rest.getString("f_parent_organ_id"), 
							                        rest.getString("f_organ_name"), 
							                        rest.getString("f_organ_id"), false);
					rootNodeId = rest.getString("f_organ_id");
				}
				coll.add(treeData);
			}
		} catch (SQLException e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"AreaDAOImpl--getAreaAllInfo-1:" + e.getMessage());
			// throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"AreaDAOImpl--getAreaAllInfo-2:" + e.getMessage());
			// throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return coll;
	}
}
