package com.neusoft.om.dao.menuoperate;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface MenuOperateDAO extends BaseDao{
	public static final String BEAN = "menuOperateDAO";

	public MenuOperateVO getMenuByMenuId(String menuId) throws DataAccessException;

	public MenuOperateColl getAllMenuInfo() throws DataAccessException;

	public int doAddMenuInfo(MenuOperateVO vo) throws DataAccessException;

	public int doModifyMenuInfo(MenuOperateVO vo,String oldMenuId) throws DataAccessException;

	public int doDeleteMenu(String menuId) throws DataAccessException;

	public MenuOperateVO getMenuByMenuName(String menuName) throws DataAccessException;

}