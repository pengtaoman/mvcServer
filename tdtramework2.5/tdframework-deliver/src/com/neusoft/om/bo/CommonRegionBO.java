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
	 * �����ṩ�Ĺ������������ʶ��Ϊ��㣬��֯��������������
	 * @param commonRegionId
	 * @return
	 */
	CommonRegionColl getCommonRegionColl(long commonRegionId, String commonRegionName) throws ServiceException;
	
	/**
	 * �����ṩ�Ĺ������������ʶ,��ȡ����ϸ��Ϣ
	 * @param commonRegionId
	 * @return
	 */
	CommonRegionVO getCommonRegionVO(long commonRegionId) throws ServiceException;
	
	/**
	 * ���ݹ������������ʶ��ɾ�����ù��������Լ������Ϣ
	 * @param commonRegionId
	 * @return
	 */
	String deleteCommonRegion(long commonRegionId) throws ServiceException;
	
	/**
	 * �����ϼ�regionType��ȡ������
	 * @param commonRegionId
	 * @return
	 */
	ParamObjectCollection getRegionTypeColl(long commonRegionId) throws ServiceException;
	
	/**
	 * ����regionType��ȡ������
	 * @param commonRegionId
	 * @return
	 */
	ParamObjectCollection getCurrentRegionTypeByColl(long commonRegionId) throws ServiceException;
	
	/**
	 * �����ṩ�Ĺ������������ʶ,��ȡ�����Ϣ
	 * @param commonRegionId
	 * @return
	 */
	CommonRegionVO getSimCommonRegionVO(long commonRegionId) throws ServiceException;
	
	/**
	 * ���ӹ��ù�������
	 * @param commonRegionId
	 * @return
	 */
	long addCommonRegion(CommonRegionVO commonRegionVO) throws ServiceException;
	
	/**
	 * �޸Ĺ�������������Ϣ
	 * @param commonRegionVO
	 * @return
	 * @throws ServiceException
	 */
	long modifyCommonRegion(CommonRegionVO commonRegionVO) throws ServiceException;
	
	/**
	 * ��ȡ��������������
	 * @param commonRegionId
	 * @return
	 */
	ITree initPoliticalLocationTree(long upCommonRegionId);
	
	/**
	 * ��������������μ���
	 * @param politicalLocationRoot
	 * @return
	 */
	ITree initPoliticalLocationTree(long upCommonRegionId,long commonRegionId);
}
