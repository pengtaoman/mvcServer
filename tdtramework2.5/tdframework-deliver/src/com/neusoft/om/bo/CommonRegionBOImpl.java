package com.neusoft.om.bo;

import com.neusoft.om.dao.region.AreaCodeColl;
import com.neusoft.om.dao.region.AreaCodeDAO;
import com.neusoft.om.dao.region.AreaCodeVO;
import com.neusoft.om.dao.region.CommonRegionColl;
import com.neusoft.om.dao.region.CommonRegionDAO;
import com.neusoft.om.dao.region.CommonRegionData;
import com.neusoft.om.dao.region.CommonRegionVO;
import com.neusoft.om.dao.region.PoliticalLocationColl;
import com.neusoft.om.dao.region.PoliticalLocationDAO;
import com.neusoft.om.dao.region.PoliticalLocationVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.taglib.commontree.tree.impl.Tree;
import com.neusoft.unieap.taglib.commontree.tree.impl.TreeNode;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;

public class CommonRegionBOImpl implements CommonRegionBO{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7534203947677294529L;
	
	private CommonRegionDAO commonRegionDAO;
	
	private AreaCodeDAO areaCodeDAO;
	
	private PoliticalLocationDAO politicalLocationDAO;
	
	public void setPoliticalLocationDAO(PoliticalLocationDAO politicalLocationDAO) {
		this.politicalLocationDAO = politicalLocationDAO;
	}
	
	public void setCommonRegionDAO(CommonRegionDAO commonRegionDAO) {
		this.commonRegionDAO = commonRegionDAO;
	}
	
	public void setAreaCodeDAO(AreaCodeDAO areaCodeDAO) {
		this.areaCodeDAO = areaCodeDAO;
	}

	/**
	 * �����ṩ�Ĺ������������ʶ��Ϊ��㣬��֯��������������
	 * @param commonRegionId
	 * @return
	 */
	public CommonRegionColl getCommonRegionColl(long commonRegionId, String commonRegionName) throws ServiceException {
		CommonRegionColl coll=null;
		long rootRegionId=0;
		String rootRegionName="���ù�������";
		try{
			
			if (commonRegionName == null || commonRegionName.intern() == "".intern()) {
				coll=commonRegionDAO.getCommonRegionColl(commonRegionId);
				for(int i=0; i < coll.getRowCount(); i++){
					CommonRegionVO commonRegionVO = coll.getCommonRegionVO(i);
					if(commonRegionVO.getCommonRegionId()==commonRegionId){
						rootRegionId=commonRegionVO.getUpRegionId();
					}
				}
				CommonRegionVO vo = new CommonRegionVO();
				vo.setCommonRegionId(rootRegionId);
				vo.setUpRegionId(-1);
				vo.setRegionName(rootRegionName);
				coll.addCommonRegionVO(0,vo);
			} else {
				coll=commonRegionDAO.getCommonRegionCollByName(commonRegionId, commonRegionName);	
				rootRegionId = 0;
				if(coll != null){
					for(int i = 0; i < coll.getRowCount(); i++){
						CommonRegionVO regionVO = coll.getCommonRegionVO(i);
						long upRegionId = regionVO.getUpRegionId();
						if(!coll.existRegion(upRegionId)){
							regionVO.setUpRegionId(0);
						}						
					}
				}
			}		

		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionBOImpl--getCommonRegionList:"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}

	/**
	 * �����ṩ�Ĺ������������ʶ,��ȡ����ϸ��Ϣ
	 * @param commonRegionId
	 * @return
	 */
	public CommonRegionVO getCommonRegionVO(long commonRegionId) throws ServiceException {
		CommonRegionVO commonRegionVO=null;
		AreaCodeColl areaCodeColl=null;
		PoliticalLocationColl politicalLocationColl=null;
		try{
			commonRegionVO=commonRegionDAO.getCommonRegionVO(commonRegionId);
			boolean addButtonViewFlag = commonRegionDAO.getIfViewButton(commonRegionVO.getRegionType());
			commonRegionVO.setAddButtonViewFlag(addButtonViewFlag);
			//���������Ϣ
			areaCodeColl=areaCodeDAO.getAreaCodeColl(commonRegionVO.getCommonRegionId());
			commonRegionVO.setAreaCodeColl(areaCodeColl);
			//����������Ϣ
			politicalLocationColl=politicalLocationDAO.getPoliticalLocationColl(commonRegionId);
			commonRegionVO.setPoliticalLocationColl(politicalLocationColl);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionBOImpl--getCommonRegionVO:"+e.getMessage());
			throw new ServiceException(e);
		}
		return commonRegionVO;
	}
	
	/**
	 * ���ݹ������������ʶ��ɾ�����ù��������Լ������Ϣ
	 * @param commonRegionId
	 * @return
	 */
	public String deleteCommonRegion(long commonRegionId) throws ServiceException {
		String message="ɾ���ɹ�";
		//ɾ��common_region
		try{
			if(commonRegionDAO.ifCanBeDelete(commonRegionId)){
				commonRegionDAO.deleteCommonRegion(commonRegionId);
			}else{
				throw new ServiceException("ɾ��ʧ�ܣ��ù��ù��������»����ӽڵ㣬����ɾ��");
			}
			
		}catch (DataAccessException e) {
			message="ɾ�����ù�������ʧ�ܡ�ɾ���������ˡ�//nʧ��ԭ��"+e.getMessage();
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionBOImpl--deleteCommonRegion_1:"+e.getMessage());
			throw new ServiceException(e);
		}
		//ɾ��������Ϣ
		try{
			areaCodeDAO.deleteAreaCode(commonRegionId);
		}catch (DataAccessException e) {
			message="ɾ��������Ϣʧ�ܡ�ɾ���������ˡ�//nʧ��ԭ��"+e.getMessage();
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionBOImpl--deleteCommonRegion_2:"+e.getMessage());
			throw new ServiceException(e);
		}
		//ɾ�����ù�����������������Ĺ�����ϵ
		try{
			politicalLocationDAO.deletePoliticalLocation(commonRegionId);
		}catch (DataAccessException e) {
			message="ɾ�����ù�����������������Ĺ�����ϵ��ɾ���������ˡ�//nʧ��ԭ��"+e.getMessage();
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionBOImpl--deleteCommonRegion_3:"+e.getMessage());
			throw new ServiceException(e);
		}
		return message;
	}

	/**
	 * �����ϼ�regionType��ȡ������
	 * @param commonRegionId
	 * @return
	 */
	public ParamObjectCollection getRegionTypeColl(long commonRegionId) throws ServiceException {
		ParamObjectCollection regionTypeColl = null;
		try{
			regionTypeColl = commonRegionDAO.getRegionTypeColl(commonRegionId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("report",GlobalParameters.ERROR,"CommonRegionBOImpl--getRegionTypeColl()-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return regionTypeColl;
	}
	
	/**
	 * ����regionType��ȡ������
	 * @param commonRegionId
	 * @return
	 */
	public ParamObjectCollection getCurrentRegionTypeByColl(long commonRegionId) throws ServiceException{
		ParamObjectCollection regionTypeColl = null;
		try{
			regionTypeColl = commonRegionDAO.getRegionTypeColl(commonRegionId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("report",GlobalParameters.ERROR,"CommonRegionBOImpl--getCurrentRegionTypeByColl()-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return regionTypeColl;
	}

	public CommonRegionVO getSimCommonRegionVO(long commonRegionId) throws ServiceException {
		CommonRegionVO commonRegionVO=null;
		try{
			commonRegionVO=commonRegionDAO.getCommonRegionVO(commonRegionId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionBOImpl--getSimCommonRegionVO:"+e.getMessage());
			throw new ServiceException(e);
		}
		return commonRegionVO;
	}

	/**
	 * �������ù�������
	 */
	public long addCommonRegion(CommonRegionVO commonRegionVO) throws ServiceException {
		String cityCode=null;
		long regionCode=0;
		int regionLevel=0;
		long commonRegionId=0;
		CommonRegionVO upCommonRegionVO=null;
		try{
			upCommonRegionVO=commonRegionDAO.getCommonRegionVO(commonRegionVO.getUpRegionId());
			
			//��ȡregionCode
			regionCode=commonRegionDAO.getRegionCode(commonRegionVO.getUpRegionId());
			if(regionCode<=0){
				regionCode=Long.parseLong(upCommonRegionVO.getRegionCode()+"01");
			}else{
				regionCode++;
			}
			
			//��ȡcommonRegionId
			commonRegionId=regionCode;
			
			//��ȡcityCode
			if(commonRegionVO.getRegionType().equals(CommonRegionData.REGION_TYPE_1)||commonRegionVO.getRegionType().equals(CommonRegionData.REGION_TYPE_2)){//ʡ�ݡ�����
				cityCode=String.valueOf(regionCode);
			}else{//����
				cityCode=upCommonRegionVO.getCityCode();
			}
			
			//��ȡregionLevel
			regionLevel=commonRegionDAO.getRegionLevel(commonRegionVO.getRegionType());

			//����commonRegionVO
			commonRegionVO.setCommonRegionId(regionCode);
			commonRegionVO.setRegionCode(String.valueOf(regionCode));
			commonRegionVO.setCityCode(cityCode);
			commonRegionVO.setRegionLevel(regionLevel);
			
			//1.common_region��������
			commonRegionDAO.insertCommonRegion(commonRegionVO);
			
			//2.���������Ϣ
			AreaCodeColl areaCodeColl=commonRegionVO.getAreaCodeColl();
			if (commonRegionVO.getRegionType().equals(CommonRegionData.REGION_TYPE_2)) {
				areaCodeDAO.deleteAreaCode(commonRegionId);
				for (int i = 0; i < areaCodeColl.getRowCount(); i++) {
					AreaCodeVO areaCodeVO = areaCodeColl.getAreaCodeVO(i);
					areaCodeVO.setRegionId(commonRegionId);
					areaCodeDAO.insertAreaCode(areaCodeVO);
				}
			}
			
			//3.������������ϵ
			PoliticalLocationColl politicalLocationColl=commonRegionVO.getPoliticalLocationColl();
			politicalLocationDAO.deletePoliticalLocation(commonRegionId);
			for (int i = 0; i < politicalLocationColl.getRowCount(); i++) {
				PoliticalLocationVO politicalLocationVO = politicalLocationColl.getPoliticalLocationVO(i);
				politicalLocationVO.setCommonRegionId(commonRegionId);
				politicalLocationDAO.insertPoliticalLocation(politicalLocationVO);
			}
		}catch(DataAccessException e) {
			SysLog.writeLogs("report",GlobalParameters.ERROR,"CommonRegionBOImpl--addCommonRegion()-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return commonRegionId;
	}
	
	/**
	 * �޸Ĺ�������������Ϣ
	 * @param commonRegionVO
	 * @return
	 * @throws ServiceException
	 */
	public long modifyCommonRegion(CommonRegionVO commonRegionVO) throws ServiceException {
		try{
			commonRegionDAO.updateCommonRegion(commonRegionVO);
			
			//���������Ϣ
			AreaCodeColl areaCodeColl=commonRegionVO.getAreaCodeColl();
			if (commonRegionVO.getRegionType().equals(CommonRegionData.REGION_TYPE_2)) {
				areaCodeDAO.deleteAreaCode(commonRegionVO.getCommonRegionId());
				for (int i = 0; i < areaCodeColl.getRowCount(); i++) {
					AreaCodeVO areaCodeVO = areaCodeColl.getAreaCodeVO(i);
					areaCodeVO.setRegionId(commonRegionVO.getCommonRegionId());
					areaCodeDAO.insertAreaCode(areaCodeVO);
				}
			}
			
			//������������ϵ
			PoliticalLocationColl politicalLocationColl=commonRegionVO.getPoliticalLocationColl();
			politicalLocationDAO.deletePoliticalLocation(commonRegionVO.getCommonRegionId());
			for (int i = 0; i < politicalLocationColl.getRowCount(); i++) {
				PoliticalLocationVO politicalLocationVO = politicalLocationColl.getPoliticalLocationVO(i);
				politicalLocationVO.setCommonRegionId(commonRegionVO.getCommonRegionId());
				politicalLocationDAO.insertPoliticalLocation(politicalLocationVO);
			}
		}catch(DataAccessException e) {
			SysLog.writeLogs("report",GlobalParameters.ERROR,"CommonRegionBOImpl--modifyCommonRegion()-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return commonRegionVO.getCommonRegionId();
	}
	/**
	 * ��������������μ���
	 * @param politicalLocationRoot
	 * @return
	 */
	 public ITree initPoliticalLocationTree(long upCommonRegionId){
		 	//1.��ȡ�ϼ����ù���������������������Ϣ
		 	PoliticalLocationColl upPoliticalLocationColl=politicalLocationDAO.getPoliticalLocationColl(upCommonRegionId);
		 	PoliticalLocationColl coll=politicalLocationDAO.getPoliticalLocationTreeColl(upPoliticalLocationColl);
		 	//2.��ȡ��������ͬʱ������
	        ITree politicalLocationTree = new Tree();        
	        ITreeNode root = new TreeNode("politicalLocation", "���ܲ˵�", "om");//���ڵ�
	        politicalLocationTree.expand("politicalLocationTree");
	        politicalLocationTree.setRoot(root);
	    	for(int i=0; i <coll.getRowCount(); i++){
	    		PoliticalLocationVO privilegeVO = coll.getPoliticalLocationVO(i);
	    		ITreeNode node = new TreeNode(String.valueOf(privilegeVO.getLocationId()), privilegeVO.getLocationName(), String.valueOf(privilegeVO.getLocationId()));
	    		ITreeNode[] parentNodes = politicalLocationTree.getNodePath(String.valueOf(privilegeVO.getUpLocationId()));
	    		if(parentNodes.length == 0){
	    			root.addChild(node);
	    		}else {
	    			for(int j=0; j< parentNodes.length ; j++){
	    				String parentMenuId = String.valueOf(privilegeVO.getUpLocationId());
	    				if(parentMenuId != null && parentNodes[j].getId().equals(parentMenuId)){
	    					parentNodes[j].addChild(node);
	    				}
	    			}
	    		} 	
	    	}
	    	return politicalLocationTree;
	}
	 
	 /**
		 * ��������������μ���
		 * @param politicalLocationRoot
		 * @return
		 */
	 public ITree initPoliticalLocationTree(long upCommonRegionId,long commonRegionId){
		 	//1.��ȡ���ù���������������������Ϣ
		 	PoliticalLocationColl upPoliticalLocationColl=politicalLocationDAO.getPoliticalLocationColl(upCommonRegionId);
		 	PoliticalLocationColl politicalLocationColl=politicalLocationDAO.getPoliticalLocationColl(commonRegionId);
		 	PoliticalLocationColl coll=politicalLocationDAO.getPoliticalLocationTreeColl(upPoliticalLocationColl);
		 	//2.��ȡ��������ͬʱ������
	        ITree politicalLocationTree = new Tree();        
	        ITreeNode root = new TreeNode("politicalLocation", "���ܲ˵�", "om");//���ڵ�
	        politicalLocationTree.expand("politicalLocationTree");
	        politicalLocationTree.setRoot(root);
	    	for(int i=0; i <coll.getRowCount(); i++){
	    		PoliticalLocationVO privilegeVO = coll.getPoliticalLocationVO(i);
	    		ITreeNode node = new TreeNode(String.valueOf(privilegeVO.getLocationId()), privilegeVO.getLocationName(), String.valueOf(privilegeVO.getLocationId()));
	    		ITreeNode[] parentNodes = politicalLocationTree.getNodePath(String.valueOf(privilegeVO.getUpLocationId()));
	    		if(parentNodes.length == 0){
	    			root.addChild(node);
	    		}else {
	    			for(int j=0; j< parentNodes.length ; j++){
	    				String parentMenuId = String.valueOf(privilegeVO.getUpLocationId());
	    				if(parentMenuId != null && parentNodes[j].getId().equals(parentMenuId)){
	    					parentNodes[j].addChild(node);
	    				}
	    			}
	    		} 	
	    	}
	    	//3.���ѱ������������ѡ��
	    	for(int i=0; i < politicalLocationColl.getRowCount(); i++){
	    		PoliticalLocationVO politicalLocationVO = politicalLocationColl.getPoliticalLocationVO(i);
	        	String locationId = String.valueOf(politicalLocationVO.getLocationId());
	        	ITreeNode node = politicalLocationTree.findNode(locationId);
	        	if(node != null){
	        		politicalLocationTree.select(locationId);
	        	}
	        }
	    	
	    	return politicalLocationTree;
	}
}
