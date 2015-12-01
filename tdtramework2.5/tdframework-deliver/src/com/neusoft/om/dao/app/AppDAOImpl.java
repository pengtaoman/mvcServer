package com.neusoft.om.dao.app;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class AppDAOImpl extends BaseDaoImpl implements AppDAO{

	/**
	 * 通过id得到应用信息
	 * @param appId
	 * @return
	 * @throws DataAccessException
	 */
	public AppVO getAppById(int appId) throws DataAccessException {
		AppVO appVO = null;
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT * ");
		buf.append(" FROM om_app_t WHERE f_app_id = ?");		
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,appId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				appVO = new AppVO();
				appVO.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AppDAOImpl--getAppById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AppDAOImpl--getAppById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return appVO;
	}

	/**
	 * 得到所有的应用信息集合
	 * @return
	 * @throws DataAccessException
	 */
	public AppColl getAllApp() throws DataAccessException {
		AppColl appColl = new AppColl();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT * FROM om_app_t ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();
			while(rest.next()){
				AppVO appVO = new AppVO();
				appVO.setAttribute(rest);
				appColl.addAppVO(appVO);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AppDAOImpl--getAllApp-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AppDAOImpl--getAllApp-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return appColl;
	}

	/**
	 * 根据角色编码的到其对应的应用信息集合
	 * @param roleId
	 * @return
	 * @throws DataAccessException
	 */
	public AppRoleRelColl getAppRoleRelCollByRoleId(int roleId) throws DataAccessException {
		AppRoleRelColl appRoleRelColl = new AppRoleRelColl();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT * FROM om_app_role_rel_t ");
        buf.append(" where f_role_id = ? ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, roleId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				AppRoleRelVO appRoleRelVO = new AppRoleRelVO();
				appRoleRelVO.setAttribute(rest);
				appRoleRelColl.addAppRoleRelVO(appRoleRelVO);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AppDAOImpl--getAppRoleRelCollByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AppDAOImpl--getAppRoleRelCollByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return appRoleRelColl;
	}

	/**
	 * 得到对某应用具有访问权限的角色集合
	 * @param appId
	 * @return
	 * @throws DataAccessException
	 */
	public AppRoleRelColl getAppRoleRelCollByAppId(int appId) throws DataAccessException {
		AppRoleRelColl appRoleRelColl = new AppRoleRelColl();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT * FROM om_app_role_rel_t ");
        buf.append(" where f_app_id = ? ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, appId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				AppRoleRelVO appRoleRelVO = new AppRoleRelVO();
				appRoleRelVO.setAttribute(rest);
				appRoleRelColl.addAppRoleRelVO(appRoleRelVO);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AppDAOImpl--getAppRoleRelCollByRoleId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AppDAOImpl--getAppRoleRelCollByRoleId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return appRoleRelColl;
	}
	
	/**
	 * 保存制定的角色－应用关系信息
	 * @param coll
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyAppRoleRel(AppRoleRelColl coll, String roleId) throws DataAccessException{
		int flag = 1; //成功
		int flagDel = 1;
		String deleteAllSQL = "DELETE FROM OM_APP_ROLE_REL_T WHERE f_role_id = ? ";
		StringBuffer buf = new StringBuffer();
		buf.append("insert into om_app_role_rel_t ");
		buf.append(" (f_app_id, f_role_id ) ");
		buf.append(" values(?,?)");
		Connection conn = null;
		PreparedStatement pstmt = null;
		try{
			conn = getConnection();			
			if(conn !=null){
				pstmt = conn.prepareStatement(deleteAllSQL);
				pstmt.setString(1,roleId);
				flagDel = pstmt.executeUpdate(); //首先删除某角色的全部关系数据
				
				pstmt = conn.prepareStatement(buf.toString());
				for(int i=0;i<coll.getRowCount();i++){
					pstmt.setInt(1,coll.getAppRoleRel(i).getAppId());
					pstmt.setInt(2,coll.getAppRoleRel(i).getRoleId());
					pstmt.addBatch();
				}
				pstmt.executeBatch();//将选中的关系信息进行保存
			}
		}catch(SQLException e){
			flag = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AppDAOImpl--doModifyAppRoleRel-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			flag = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AppDAOImpl--doModifyAppRoleRel-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		flag = flag * flagDel;
		return flag;
	}

}
