package com.neusoft.om.omutil;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;

/**brief description
 * <p>Date       : 2006-12-01</p>
 * <p>Module     : om</p>
 * <p>Description: 提供获得组织机构树的接口</p>
 * <p>Remark     : </p>
 * @author zhaof@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public interface OrganTreeBO extends BaseBO{
	/**
	 * 得到组织机构树
	 * @param minLevel
	 * @param MaxLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganTree(int minLevel, int MaxLevel) throws ServiceException;
	
	/**
	 * 得到区域树
	 * @param minLevel
	 * @param maxLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getAreaTree(int minLevel, int maxLevel) throws ServiceException;
	
    /**
     * 得到区域-组织机构树
     * @param minAreaLevel
     * @param maxAreaLevel
     * @return
     * @throws ServiceException
     */
	public ITree getAreaOrganTree(int minAreaLevel, int maxAreaLevel) throws ServiceException;

	/**
	 * 得到一棵区域-组织机构-人员树，由区域级别确定数据范围
	 * @param minAreaLevel
	 * @param maxAreaLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getAreaOrganEmpTree(int minAreaLevel, int maxAreaLevel) throws ServiceException;
	
	/**
	 * 得到组织机构-职员树，由区域级别确定数据范围
	 * @param minAreaLevel
	 * @param maxAreaLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree(int minAreaLevel, int maxAreaLevel) throws ServiceException;
	
	/**
	 * 根据当前登录的操作员，得到组织机构和职员集合的树
	 * 登陆用户是省分用户，显示省分的所有用户，如果登陆的用户是地市用户，显示当前地市所有用户和省分的所有用户。
	 * 如果区县的用户登录了，显示当前 区县的所有用户，区县所在地市所有用户和省分的所有用户
	 * @param authAreaId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree(String authAreaId) throws ServiceException;
	
	/**
	 * 得到当前登录人员所在组织机构和该组织机构所有人员信息的树
	 * @param authId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getCurrentOrganEmpTree(String authId) throws ServiceException;
	
	
	public ITree getChildOrganEmpTree(String organIds) throws ServiceException;
	
	/**
	 * 得到组织机构-职员树，由区域级别确定数据范围，专为PPM系统使用
	 * @param minAreaLevel
	 * @param maxAreaLevel
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree4PPM(int minAreaLevel, int maxAreaLevel) throws ServiceException;
	
	/**
	 * 根据当前登录的操作员，得到组织机构和职员集合的树，专为PPM系统使用
	 * 登陆用户是省分用户，显示省分的所有用户，如果登陆的用户是地市用户，显示当前地市所有用户和省分的所有用户。
	 * 如果区县的用户登录了，显示当前 区县的所有用户，区县所在地市所有用户和省分的所有用户
	 * @param authAreaId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganEmpTree4PPM(String authAreaId) throws ServiceException;
	
	/**
	 * 得到当前登录人员所在组织机构和该组织机构所有人员信息的树，专为PPM系统使用
	 * @param authId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getCurrentOrganEmpTree4PPM(String authId) throws ServiceException;
	
	/**
	 * organIds 以,分隔，罗列需要显示的部门编码，专为PPM系统使用
	 * @param organIds
	 * @return
	 * @throws ServiceException
	 */
	public ITree getChildOrganEmpTree4PPM(String organIds) throws ServiceException;
	
	/**
	 * 根据地市和organ_kin查询组织机构
	 * @param organKind
	 * @param areaId
	 * @return
	 * @throws ServiceException
	 */
	public ITree getOrganCollByKind4PPM(String organKind,String areaId) throws ServiceException;
}
