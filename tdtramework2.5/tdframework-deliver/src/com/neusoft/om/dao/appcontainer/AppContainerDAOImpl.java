package com.neusoft.om.dao.appcontainer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class AppContainerDAOImpl extends BaseDaoImpl implements AppContainerDAO{

	public String getAppContainer(int containerFlag) throws DataAccessException {
		String container = "";
		StringBuffer buf = new StringBuffer("");
		buf.append(" SELECT f_container FROM om_container_t ");
		buf.append(" WHERE f_key = " + containerFlag);
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try {
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			while(rest.next()){
				container = rest.getString("f_container");
			}
		}catch (SQLException e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"AppContainerDAOImpl--getAppContainer-1:" + e.getMessage());
			throw new DataAccessException(e);
		} catch (Exception e) {
			SysLog.writeLogs("om", GlobalParameters.ERROR,
					"AppContainerDAOImpl--getAppContainer-2:" + e.getMessage());
			throw new DataAccessException(e);
		} finally {
			close(rest, pstmt, conn);
		}
		return container;
	}
	public List getHostNames(){
		StringBuffer buf = new StringBuffer();
		buf.append("select f_host from om_host_t "); 
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		List ret = new ArrayList();
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			while(rest.next()){
				String container = rest.getString("f_host");
				ret.add(container);
			}
			
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"AppContainerDAOImpl--getHostNames()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"AppContainerDAOImpl--getHostNames()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return ret;
	}

	public String getCacheObjectName(String appName, String cacheKey){
		StringBuffer buf = new StringBuffer();
		buf.append("select f_cache_name from om_cache_map_t where f_appName = ? and f_cacheKey = ? "); 
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		//List ret = new ArrayList();
		String cacheName = "";
		String ckey = cacheKey;
		if(ckey.indexOf('~')>-1){
			ckey = ckey.substring(0,ckey.indexOf('~'));
		}
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1, appName);
			pstmt.setString(2, ckey);
			
			rest = pstmt.executeQuery();
			if(rest.next()){
				cacheName = rest.getString("f_cache_name");
				//ret.add(container);
			}
			
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"AppContainerDAOImpl--getCacheObjectName()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"AppContainerDAOImpl--getCacheObjectName()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return cacheName;
		
	}
	public List getAppNames(){
		StringBuffer buf = new StringBuffer();
		buf.append(" SELECT f_container FROM om_container_t ");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		List ret = new ArrayList();
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			while(rest.next()){
				String container = rest.getString("f_container");
				//String fStr = container.replaceAll("/", "");
				if(container!= null && !container.equals(""))
					ret.add(container);
			}
			
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"AppContainerDAOImpl--getAppNames()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"AppContainerDAOImpl--getAppNames()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return ret;
	}
	
	public List getAppNamesForCompress(boolean isTDFrameworkCompress){
		StringBuffer buf = new StringBuffer();
		if (isTDFrameworkCompress) {
		    buf.append(" SELECT f_container FROM om_container_t where F_USE_COMPRESS = 1");
		} else {
			buf.append(" SELECT f_container FROM om_container_t where F_BUSI_USE_COMPRESS = 1");
		}
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		List ret = new ArrayList();
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			rest = pstmt.executeQuery();
			while(rest.next()){
				String container = rest.getString("f_container");
				//String fStr = container.replaceAll("/", "");
				if(container!= null && !container.equals(""))
					ret.add(container);
			}
			
		}catch(SQLException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"AppContainerDAOImpl--getAppNames()-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"AppContainerDAOImpl--getAppNames()-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return ret;
	}
	
}
