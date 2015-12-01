/*
 * Created by chenzt
 *
 * �ղؼй��ܴ���ҵ���߼���
 */
package com.neusoft.tdframework.support.favorite.bo;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;
import com.neusoft.tdframework.support.favorite.dao.FavoriteVO;

/**
 * @author chenzt
 *
 * ʵ���ղؼй��ܵ�BO�ӿ�
 */
public interface FavoriteMenuBO extends BaseBO {
	public static final String BEAN = "omFavoriteMenuBO";
	
	/**
	 * ��ȡ�ղؼй�����Ϣ
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FavoriteColl getFavoriteInfoByEmployeeIdSystemId(String employeeId,String systemId) throws ServiceException ;
	
	/**
	 * �����ղؼ���Ϣ
	 * @param vo
	 * @return
	 * @throws ServiceException
	 */
	public int doAddFavorite (FavoriteVO vo) throws ServiceException;
	
	/**
	 * ɾ���ղؼ���Ϣ
	 * @param employeeId
	 * @param menuId
	 * @return
	 * @throws ServiceException
	 */
	public int doDeleteFavoriteByKey (String employeeId,String menuId) throws ServiceException;
	
	/**
	 * �޸��ղؼй���
	 * @param employeeId
	 * @param menuId
	 * @param favoriteName
	 * @param favoriteOrder
	 * @return
	 * @throws ServiceException
	 */
	public int doModifyFavoriteMenu(String employeeId, String menuId, String favoriteName, String favoriteOrder) throws ServiceException;
}
