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
import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;
import com.neusoft.tdframework.support.favorite.dao.FavoriteDAO;
import com.neusoft.tdframework.support.favorite.dao.FavoriteVO;

public class FavoriteDAOBillImpl  extends BaseDaoImpl implements FavoriteDAO{

	@Override
	public FavoriteColl getFavoriteInfoByEmployeeIdSystemId(String employeeId,
			String systemId) throws DataAccessException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int doAddFavorite(FavoriteVO vo) throws DataAccessException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int doDeleteFavoriteByKey(String employeeId, String menuId)
			throws DataAccessException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int doModifyFavoriteMenu(String employeeId, String menuId,
			String favoriteName, String favoriteOrder)
			throws DataAccessException {
		// TODO Auto-generated method stub
		return 0;
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FavoriteDAOBillImpl--getRoleMenu-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"FavoriteDAOBillImpl--getRoleMenu-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return resultLst;
	}
	
	public FavoriteColl getFavoriteInfo(String employeeId) throws DataAccessException {
		return null;
	}

}
