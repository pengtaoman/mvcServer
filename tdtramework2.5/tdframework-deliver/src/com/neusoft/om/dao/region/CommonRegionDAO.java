package com.neusoft.om.dao.region;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

public interface CommonRegionDAO  extends BaseDao {
	public static final String BEAN_ID="commonRegionDAO";
	/**
	 * 获取电信公共管理区域结果集
	 * @param commonRegionId
	 * @return
	 */
	CommonRegionColl getCommonRegionColl(long commonRegionId) throws DataAccessException;
	
	/**
	 * 根据名称获取电信公共管理区域结果集
	 * @param commonRegionId
	 * @return
	 */
	public CommonRegionColl getCommonRegionCollByName(long commonRegionId, String commonRegionName)  throws DataAccessException;
	
	/**
	 * 按照公共管理区域标识，来获取公共管理区域标识
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	CommonRegionVO getCommonRegionVO(long commonRegionId) throws DataAccessException;
	
	
	/**
	 * 判断是否为最低级区域类型
	 * @param regionType
	 * @return
	 * @throws DataAccessException
	 */
	boolean getIfViewButton(String regionType) throws DataAccessException;
	
	/**
	 * 根据公用管理区域标识，删除公用管理区域的信息
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	int deleteCommonRegion(long commonRegionId) throws DataAccessException;
	
	/**
	 * 获取公用管理区域类型列表
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	ParamObjectCollection getRegionTypeColl(long commonRegionId) throws DataAccessException;
	
	/**
	 * 获取当前公用管理区域的区域类型
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	ParamObjectCollection getCurrentRegionTypeColl(long commonRegionId) throws DataAccessException;
	/**
	 * 获取新的公用管理区域编号
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	long getRegionCode(long upCommonRegionId) throws DataAccessException;
	/**
	 * 获取区域级别
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	int getRegionLevel(String regionType) throws DataAccessException;
	/**
	 * 新增公用管理区域
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	int insertCommonRegion(CommonRegionVO vo) throws DataAccessException;
	
	/**
	 * 新增公用管理区域
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	int updateCommonRegion(CommonRegionVO vo) throws DataAccessException;
	
	/**
	 * 公共管理区域是否可以被删除
	 * @param commonRegionId
	 * @return
	 * @throws DataAccessException
	 */
	boolean ifCanBeDelete(long commonRegionId) throws DataAccessException;
}
