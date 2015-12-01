/*
 * Created on 2005-2-24
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.bo;

import java.util.List;

import com.neusoft.om.OMLogger;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.support.favorite.bo.FavoriteMenuBO;
import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;
import com.neusoft.tdframework.support.favorite.dao.FavoriteDAO;
import com.neusoft.tdframework.support.favorite.dao.FavoriteVO;

/**
 * @author chenzt
 *
 * 实现收藏夹功能的BO接口
 */
public class FavoriteMenuBOImpl implements FavoriteMenuBO{
	
	FavoriteDAO favoriteDAO = null;
	FavoriteDAO favoriteBillDAO = null;
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.support.favorite.bo.FavoriteMenuBO#getFavoriteInfoByEmployeeIdSystemId(java.lang.String, java.lang.String)
	 */
	public FavoriteColl getFavoriteInfoByEmployeeIdSystemId(String employeeId, String systemId) throws ServiceException {
		try {
			FavoriteColl favoriteColl = favoriteDAO.getFavoriteInfo(employeeId);
			List<String> crmMenus= favoriteDAO.getRoleMenu(employeeId);
			List<String> billMenus= favoriteBillDAO.getRoleMenu(employeeId);
			List<FavoriteVO> flst = (List<FavoriteVO>)favoriteColl.getList();
			
			FavoriteColl resultColl = new FavoriteColl();
			for (FavoriteVO fvo : flst) {
				String menuId = fvo.getMenuId();
				if (crmMenus.contains(menuId) || billMenus.contains(menuId)) {
					resultColl.addFavoriteVO(fvo);
				}
			}
			
			return resultColl;
		} catch (DataAccessException e) {
			OMLogger.error(e.getMessage(),e);
			throw new ServiceException(e.getMessage());
		}
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.support.favorite.bo.FavoriteMenuBO#doAddFavorite(com.neusoft.tdframework.support.favorite.dao.FavoriteVO)
	 */
	public int doAddFavorite(FavoriteVO vo) throws ServiceException {
		try {
			return favoriteDAO.doAddFavorite(vo);
		} catch (DataAccessException e) {
			OMLogger.error(e.getMessage(),e);
			throw new ServiceException(e.getMessage());
		}		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.support.favorite.bo.FavoriteMenuBO#doDeleteFavoriteByKey(java.lang.String, java.lang.String)
	 */
	public int doDeleteFavoriteByKey(String employeeId, String menuId) throws ServiceException {
		try {
			return favoriteDAO.doDeleteFavoriteByKey(employeeId,menuId);
		} catch (DataAccessException e) {
			OMLogger.error(e.getMessage(),e);
			throw new ServiceException(e.getMessage());
		}	
	}
	
	/**
	 * @param favoriteDAO
	 */
	public void setFavoriteDAO(FavoriteDAO favoriteDAO) {
		this.favoriteDAO = favoriteDAO;
	}
	
	public void setFavoriteBillDAO(FavoriteDAO favoriteBillDAO) {
		this.favoriteBillDAO = favoriteBillDAO;
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.support.favorite.bo.FavoriteMenuBO#doModifyFavoriteMenu(java.lang.String, java.lang.String, java.lang.String, int)
	 */
	public int doModifyFavoriteMenu(String employeeId, String menuId, String favoriteName, String favoriteOrder) throws ServiceException {
		try {
			return favoriteDAO.doModifyFavoriteMenu(employeeId,menuId,favoriteName,favoriteOrder);
		} catch (DataAccessException e) {
			OMLogger.error("修改收藏夹信息失败: " + e.getMessage(),e);
			throw new ServiceException("修改收藏夹信息失败: " + e.getMessage());
		}	
	}

}
