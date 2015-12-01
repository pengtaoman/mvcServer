package com.neusoft.om.bo;

import com.neusoft.om.dao.region.CommonRegionColl;
import com.neusoft.om.dao.region.CommonRegionVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;

public interface CommonRegionBO  extends BaseBO{
	public static final String BEAN = "commonRegionBO";
	/**
	 * 根据提供的公共管理区域标识作为起点，组织公共管理区域树
	 * @param commonRegionId
	 * @return
	 */
	CommonRegionColl getCommonRegionColl(long commonRegionId, String commonRegionName) throws ServiceException;
	
	/**
	 * 根据提供的公共管理区域标识,获取其详细信息
	 * @param commonRegionId
	 * @return
	 */
	CommonRegionVO getCommonRegionVO(long commonRegionId) throws ServiceException;
	
	/**
	 * 根据公共管理区域标识，删除公用管理区域以及相关信息
	 * @param commonRegionId
	 * @return
	 */
	String deleteCommonRegion(long commonRegionId) throws ServiceException;
	
	/**
	 * 根据上级regionType获取下拉框
	 * @param commonRegionId
	 * @return
	 */
	ParamObjectCollection getRegionTypeColl(long commonRegionId) throws ServiceException;
	
	/**
	 * 根据regionType获取下拉框
	 * @param commonRegionId
	 * @return
	 */
	ParamObjectCollection getCurrentRegionTypeByColl(long commonRegionId) throws ServiceException;
	
	/**
	 * 根据提供的公共管理区域标识,获取其简单信息
	 * @param commonRegionId
	 * @return
	 */
	CommonRegionVO getSimCommonRegionVO(long commonRegionId) throws ServiceException;
	
	/**
	 * 增加公用管理区域
	 * @param commonRegionId
	 * @return
	 */
	long addCommonRegion(CommonRegionVO commonRegionVO) throws ServiceException;
	
	/**
	 * 修改公共管理区域信息
	 * @param commonRegionVO
	 * @return
	 * @throws ServiceException
	 */
	long modifyCommonRegion(CommonRegionVO commonRegionVO) throws ServiceException;
	
	/**
	 * 获取行政管理区域树
	 * @param commonRegionId
	 * @return
	 */
	ITree initPoliticalLocationTree(long upCommonRegionId);
	
	/**
	 * 获得行政区域树形集合
	 * @param politicalLocationRoot
	 * @return
	 */
	ITree initPoliticalLocationTree(long upCommonRegionId,long commonRegionId);
}
