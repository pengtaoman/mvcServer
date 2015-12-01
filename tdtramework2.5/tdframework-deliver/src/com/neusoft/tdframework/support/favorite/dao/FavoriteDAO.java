package com.neusoft.tdframework.support.favorite.dao;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public interface FavoriteDAO extends BaseDao{
	public static final String BEAN = "favoriteDAO";
	/**
	 * 通过职员编号,系统编号得到该职员的收藏夹结果集(未做权限校验)
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws DataAccessException
	 */
	public FavoriteColl getFavoriteInfoByEmployeeIdSystemId(String employeeId,String systemId) throws DataAccessException;
	/**
	 * 增加一个记录
	 * @param vo
	 * @return
	 * @throws DataAccessException
	 */
	public int doAddFavorite (FavoriteVO vo) throws DataAccessException;
	/**
	 * 根据主键删除一个收藏记录
	 * @param employeeId
	 * @param menuId
	 * @return
	 * @throws DataAccessException
	 */
	public int doDeleteFavoriteByKey (String employeeId,String menuId) throws DataAccessException;
	
	/**
	 * 修改收藏夹功能菜单
	 * @param employeeId
	 * @param menuId
	 * @param favoriteName
	 * @param favoriteOrder
	 * @return
	 * @throws DataAccessException
	 */
	public int doModifyFavoriteMenu(String employeeId,String menuId,String favoriteName,String favoriteOrder) throws DataAccessException; 
	
	public FavoriteColl getFavoriteInfo(String employeeId) throws DataAccessException;
	
	public List<String> getRoleMenu(String employeeId) throws DataAccessException;
}
