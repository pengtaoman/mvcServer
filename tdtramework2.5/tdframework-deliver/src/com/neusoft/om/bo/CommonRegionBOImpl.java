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
	 * 根据提供的公共管理区域标识作为起点，组织公共管理区域树
	 * @param commonRegionId
	 * @return
	 */
	public CommonRegionColl getCommonRegionColl(long commonRegionId, String commonRegionName) throws ServiceException {
		CommonRegionColl coll=null;
		long rootRegionId=0;
		String rootRegionName="公用管理区域";
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
	 * 根据提供的公共管理区域标识,获取其详细信息
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
			//添加区号信息
			areaCodeColl=areaCodeDAO.getAreaCodeColl(commonRegionVO.getCommonRegionId());
			commonRegionVO.setAreaCodeColl(areaCodeColl);
			//行政区域信息
			politicalLocationColl=politicalLocationDAO.getPoliticalLocationColl(commonRegionId);
			commonRegionVO.setPoliticalLocationColl(politicalLocationColl);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionBOImpl--getCommonRegionVO:"+e.getMessage());
			throw new ServiceException(e);
		}
		return commonRegionVO;
	}
	
	/**
	 * 根据公共管理区域标识，删除公用管理区域以及相关信息
	 * @param commonRegionId
	 * @return
	 */
	public String deleteCommonRegion(long commonRegionId) throws ServiceException {
		String message="删除成功";
		//删除common_region
		try{
			if(commonRegionDAO.ifCanBeDelete(commonRegionId)){
				commonRegionDAO.deleteCommonRegion(commonRegionId);
			}else{
				throw new ServiceException("删除失败：该公用管理区域下还有子节点，不能删除");
			}
			
		}catch (DataAccessException e) {
			message="删除公用管理区域失败。删除操作回退。//n失败原因："+e.getMessage();
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionBOImpl--deleteCommonRegion_1:"+e.getMessage());
			throw new ServiceException(e);
		}
		//删除区号信息
		try{
			areaCodeDAO.deleteAreaCode(commonRegionId);
		}catch (DataAccessException e) {
			message="删除区号信息失败。删除操作回退。//n失败原因："+e.getMessage();
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionBOImpl--deleteCommonRegion_2:"+e.getMessage());
			throw new ServiceException(e);
		}
		//删除公用管理区域与行政区域的关联关系
		try{
			politicalLocationDAO.deletePoliticalLocation(commonRegionId);
		}catch (DataAccessException e) {
			message="删除公用管理区域与行政区域的关联关系。删除操作回退。//n失败原因："+e.getMessage();
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionBOImpl--deleteCommonRegion_3:"+e.getMessage());
			throw new ServiceException(e);
		}
		return message;
	}

	/**
	 * 根据上级regionType获取下拉框
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
	 * 根据regionType获取下拉框
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
	 * 新增公用管理区域
	 */
	public long addCommonRegion(CommonRegionVO commonRegionVO) throws ServiceException {
		String cityCode=null;
		long regionCode=0;
		int regionLevel=0;
		long commonRegionId=0;
		CommonRegionVO upCommonRegionVO=null;
		try{
			upCommonRegionVO=commonRegionDAO.getCommonRegionVO(commonRegionVO.getUpRegionId());
			
			//获取regionCode
			regionCode=commonRegionDAO.getRegionCode(commonRegionVO.getUpRegionId());
			if(regionCode<=0){
				regionCode=Long.parseLong(upCommonRegionVO.getRegionCode()+"01");
			}else{
				regionCode++;
			}
			
			//获取commonRegionId
			commonRegionId=regionCode;
			
			//获取cityCode
			if(commonRegionVO.getRegionType().equals(CommonRegionData.REGION_TYPE_1)||commonRegionVO.getRegionType().equals(CommonRegionData.REGION_TYPE_2)){//省份、地市
				cityCode=String.valueOf(regionCode);
			}else{//区县
				cityCode=upCommonRegionVO.getCityCode();
			}
			
			//获取regionLevel
			regionLevel=commonRegionDAO.getRegionLevel(commonRegionVO.getRegionType());

			//更新commonRegionVO
			commonRegionVO.setCommonRegionId(regionCode);
			commonRegionVO.setRegionCode(String.valueOf(regionCode));
			commonRegionVO.setCityCode(cityCode);
			commonRegionVO.setRegionLevel(regionLevel);
			
			//1.common_region新增数据
			commonRegionDAO.insertCommonRegion(commonRegionVO);
			
			//2.添加区号信息
			AreaCodeColl areaCodeColl=commonRegionVO.getAreaCodeColl();
			if (commonRegionVO.getRegionType().equals(CommonRegionData.REGION_TYPE_2)) {
				areaCodeDAO.deleteAreaCode(commonRegionId);
				for (int i = 0; i < areaCodeColl.getRowCount(); i++) {
					AreaCodeVO areaCodeVO = areaCodeColl.getAreaCodeVO(i);
					areaCodeVO.setRegionId(commonRegionId);
					areaCodeDAO.insertAreaCode(areaCodeVO);
				}
			}
			
			//3.添加行政区域关系
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
	 * 修改公共管理区域信息
	 * @param commonRegionVO
	 * @return
	 * @throws ServiceException
	 */
	public long modifyCommonRegion(CommonRegionVO commonRegionVO) throws ServiceException {
		try{
			commonRegionDAO.updateCommonRegion(commonRegionVO);
			
			//添加区号信息
			AreaCodeColl areaCodeColl=commonRegionVO.getAreaCodeColl();
			if (commonRegionVO.getRegionType().equals(CommonRegionData.REGION_TYPE_2)) {
				areaCodeDAO.deleteAreaCode(commonRegionVO.getCommonRegionId());
				for (int i = 0; i < areaCodeColl.getRowCount(); i++) {
					AreaCodeVO areaCodeVO = areaCodeColl.getAreaCodeVO(i);
					areaCodeVO.setRegionId(commonRegionVO.getCommonRegionId());
					areaCodeDAO.insertAreaCode(areaCodeVO);
				}
			}
			
			//添加行政区域关系
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
	 * 获得行政区域树形集合
	 * @param politicalLocationRoot
	 * @return
	 */
	 public ITree initPoliticalLocationTree(long upCommonRegionId){
		 	//1.获取上级公用管理区域所包含的区域信息
		 	PoliticalLocationColl upPoliticalLocationColl=politicalLocationDAO.getPoliticalLocationColl(upCommonRegionId);
		 	PoliticalLocationColl coll=politicalLocationDAO.getPoliticalLocationTreeColl(upPoliticalLocationColl);
		 	//2.获取行政区域，同时构造树
	        ITree politicalLocationTree = new Tree();        
	        ITreeNode root = new TreeNode("politicalLocation", "功能菜单", "om");//根节点
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
		 * 获得行政区域树形集合
		 * @param politicalLocationRoot
		 * @return
		 */
	 public ITree initPoliticalLocationTree(long upCommonRegionId,long commonRegionId){
		 	//1.获取公用管理区域所包含的区域信息
		 	PoliticalLocationColl upPoliticalLocationColl=politicalLocationDAO.getPoliticalLocationColl(upCommonRegionId);
		 	PoliticalLocationColl politicalLocationColl=politicalLocationDAO.getPoliticalLocationColl(commonRegionId);
		 	PoliticalLocationColl coll=politicalLocationDAO.getPoliticalLocationTreeColl(upPoliticalLocationColl);
		 	//2.获取行政区域，同时构造树
	        ITree politicalLocationTree = new Tree();        
	        ITreeNode root = new TreeNode("politicalLocation", "功能菜单", "om");//根节点
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
	    	//3.将已保存的行政区域选中
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
