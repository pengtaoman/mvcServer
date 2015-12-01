package com.neusoft.om.dao.favorite;

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
import com.neusoft.tdframework.support.favorite.dao.*;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class FavoriteDAOImpl extends BaseDaoImpl implements FavoriteDAO {

	/**
	 * 获得操作员收藏夹信息
	 * 20050527 modify by renh
	 * 收藏夹不区分系统,收藏夹的优先级小于权限,如果该菜单权限被收回,则不显示该记录
	 */
	public FavoriteColl getFavoriteInfoByEmployeeIdSystemId(String employeeId, String systemId) throws DataAccessException {
		FavoriteColl coll = new FavoriteColl();
		/*String sql = "SELECT * FROM om_favorite_t WHERE f_employee_id = ? and f_system_id = ?" +
					" ORDER BY f_favorite_order ";*/
		StringBuffer buf = new StringBuffer("");
		
		buf.append(" select * from om_favorite_t where f_employee_id = ? ");
		buf.append(" and f_menu_id in ( ");
		buf.append(" SELECT n.f_menu_id ");
		buf.append(" FROM( ");
		buf.append(" 	SELECT f_menu_id ");
		buf.append(" 	FROM om_func_role_t a,om_employee_role_relation_t b ");
		buf.append(" 	WHERE b.f_employee_id = ? ");
		buf.append(" 	AND a.f_role_id = b.f_role_id ");
		buf.append(" 	GROUP BY f_menu_id");
		//added by pengtao 2011-0506 BEGIN
		buf.append(" 	union all");
		buf.append(" 	select f_menu_id from om_power_adjust_t");
		buf.append(" 	where f_employee_id=?");
		//added by pengtao 2011-0506 END
		buf.append(") e,om_menu_t n ");
		buf.append(" WHERE e.f_menu_id = n.f_menu_id ");
		buf.append(" AND n.f_if_my_work = 0 ");
		buf.append(" AND n.F_INUSE = 1 ");
		buf.append(" AND n.f_menu_type <> 0) order by f_favorite_order  ");
		
		FavoriteVO vo = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			pstmt.setString(2,employeeId);
			pstmt.setString(3,employeeId);
			//pstmt.setString(2,systemId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new FavoriteVO();
				vo.setAttribute(rest);	
				coll.addFavoriteVO(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeMenuInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--getEmployeeMenuInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}

	public int doAddFavorite(FavoriteVO vo) throws DataAccessException {
		int code = 1;
		String sql ="insert into om_favorite_t (f_menu_id,f_employee_id,f_system_id,f_favorite_name,f_favorite_order,f_page_link ) values(?,?,?,?,?,?)";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,vo.getMenuId());
			pstmt.setString(2,vo.getEmployeeId());
			pstmt.setString(3,vo.getSystemId());
			pstmt.setString(4,vo.getFavoriteName());
			pstmt.setInt(5,vo.getFavoriteOrder());
			pstmt.setString(6,vo.getPageLink());
			code = pstmt.executeUpdate();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doAddFavorite-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doAddFavorite-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public int doDeleteFavoriteByKey(String employeeId, String menuId) throws DataAccessException {
		int code = 1;
		String sql ="delete from om_favorite_t where f_employee_id = ? and f_menu_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			String [] menuIdArray = menuId.split(",");
			
			conn = getConnection();
			conn.setAutoCommit(false);
			pstmt = conn.prepareStatement(sql);
			
			for(int i=0;i<menuIdArray.length;i++){	
				pstmt.setString(1,employeeId);
				pstmt.setString(2,menuIdArray[i]);
				code += pstmt.executeUpdate();
			}
			pstmt.close();
			conn.commit();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doDeleteFavoriteByKey-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doDeleteFavoriteByKey-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.support.favorite.dao.FavoriteDAO#doModifyFavoriteMenu(java.lang.String, java.lang.String, java.lang.String, int)
	 */
	public int doModifyFavoriteMenu(String employeeId, String menuId, String favoriteName, String favoriteOrder) throws DataAccessException {
		int code = 1;
		String sql ="update om_favorite_t set f_favorite_name = ?,f_favorite_order = ? where f_employee_id = ? and f_menu_id = ?";
		Connection conn = null;
		PreparedStatement  pstmt = null;
	
		try{
			
			String [] menuIdArray = menuId.split(",");
			String [] favoriteNameArray = favoriteName.split(",");
			String [] favoriteOrderArray = favoriteOrder.split(",");
			
			conn = getConnection();
			conn.setAutoCommit(false);
			pstmt = conn.prepareStatement(sql);
			
			for(int i=0;i<menuIdArray.length;i++){
				pstmt.setString(1,favoriteNameArray[i]);
				pstmt.setInt(2,Integer.parseInt(favoriteOrderArray[i]));
				pstmt.setString(3,employeeId);
				pstmt.setString(4,menuIdArray[i]);
				code += pstmt.executeUpdate();
			}
			pstmt.close();
			conn.commit();
		}catch(SQLException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doModifyFavoriteByKey-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeDAOImpl--doModifyFavoriteByKey-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(pstmt,conn);
		}
		return code;
	}
	
	public List<String> getRoleMenu(String employeeId) throws DataAccessException {
		
	    StringBuffer buf = new StringBuffer("");
		
		buf.append(" SELECT  f_menu_id FROM om_func_role_t a, om_employee_role_relation_t b WHERE b.f_employee_id = ?");
		buf.append("  AND a.f_role_id = b.f_role_id  GROUP BY  f_menu_id union SELECT  f_menu_id FROM  om_power_adjust_t WHERE f_employee_id=?");

		
		FavoriteVO vo = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		List<String> resultLst = new ArrayList<String>();
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			pstmt.setString(2,employeeId);
			//pstmt.setString(2,systemId);
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				rest.getString("f_menu_id");
				resultLst.add(rest.getString("f_menu_id"));
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FavoriteDAOImpl--getRoleMenu-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FavoriteDAOImpl--getRoleMenu-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return resultLst;
	}
	
	public FavoriteColl getFavoriteInfo(String employeeId) throws DataAccessException {
		FavoriteColl coll = new FavoriteColl();
		/*String sql = "SELECT * FROM om_favorite_t WHERE f_employee_id = ? and f_system_id = ?" +
					" ORDER BY f_favorite_order ";*/
		StringBuffer buf = new StringBuffer("");
		
		buf.append(" select * from om_favorite_t where f_employee_id = ? ");
		buf.append(" order by f_favorite_order  ");
		
		FavoriteVO vo = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;

		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(buf.toString());
			pstmt.setString(1,employeeId);
			//pstmt.setString(2,systemId);
			rest = pstmt.executeQuery();
			while(rest.next()){
				vo = new FavoriteVO();
				vo.setAttribute(rest);	
				coll.addFavoriteVO(vo);
			}
		}catch(SQLException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FavoriteDAOImpl--getFavoriteInfo-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FavoriteDAOImpl--getFavoriteInfo-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return coll;
	}
}
