/*
 * Created on 2006-3-6
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
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class InnerTreeDaoImpl extends BaseDaoImpl implements InnerTreeDao {

	public Vector getAreaData()  
	{
		Vector coll = new Vector();
		TreeData treeData = null;
		String sql = "select f_area_id,f_parent_area_id,f_area_name,f_area_level,f_postal_code,f_area_code " +
			"from td_demo_area_t " +
			"start with f_parent_area_id is null " +
			"connect by prior f_area_id = f_parent_area_id";
		
		Connection conn = null;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			String rootNodeId = "";
			while(rest.next()) {
				if(rest.getString("f_parent_area_id")!=null)
				{
					if(rest.getString("f_parent_area_id").equalsIgnoreCase(rootNodeId))
						treeData = new TreeData(rest.getString("f_area_id"),"root",rest.getString("f_area_name"),rest.getString("f_area_id"),rest.getInt("f_area_level")>=4);
					else	
						treeData = new TreeData(rest.getString("f_area_id"),rest.getString("f_parent_area_id"),rest.getString("f_area_name"),rest.getString("f_area_id"),rest.getInt("f_area_level")>=4);
				}
				else
				{
					treeData = new TreeData("root",rest.getString("f_parent_area_id"),rest.getString("f_area_name"),rest.getString("f_area_id"),rest.getInt("f_area_level")>=4);
					rootNodeId = rest.getString("f_area_id");
				}
				coll.add(treeData);
			}
		}catch(SQLException e){
			SysLog.writeLogs("demo",GlobalParameters.ERROR,"InnerTreeDaoImpl--getAreaData-1:"+e.getMessage());
			//throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("demo",GlobalParameters.ERROR,"InnerTreeDaoImpl--getAreaData-2:"+e.getMessage());
			//throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
	
}
