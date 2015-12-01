/*
 * Created by chenzt
 *
 * 收藏夹功能处理业务逻辑类
 */
package com.neusoft.tdframework.support.favorite.bo;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;
import com.neusoft.tdframework.support.favorite.dao.FavoriteVO;

/**
 * @author chenzt
 *
 * 实现收藏夹功能的BO接口
 */
public interface FavoriteMenuBO extends BaseBO {
	public static final String BEAN = "omFavoriteMenuBO";
	
	/**
	 * 获取收藏夹功能信息
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FavoriteColl getFavoriteInfoByEmployeeIdSystemId(String employeeId,String systemId) throws ServiceException ;
	
	/**
	 * 增加收藏夹信息
	 * @param vo
	 * @return
	 * @throws ServiceException
	 */
	public int doAddFavorite (FavoriteVO vo) throws ServiceException;
	
	/**
	 * 删除收藏夹信息
	 * @param employeeId
	 * @param menuId
	 * @return
	 * @throws ServiceException
	 */
	public int doDeleteFavoriteByKey (String employeeId,String menuId) throws ServiceException;
	
	/**
	 * 修改收藏夹功能
	 * @param employeeId
	 * @param menuId
	 * @param favoriteName
	 * @param favoriteOrder
	 * @return
	 * @throws ServiceException
	 */
	public int doModifyFavoriteMenu(String employeeId, String menuId, String favoriteName, String favoriteOrder) throws ServiceException;
}
