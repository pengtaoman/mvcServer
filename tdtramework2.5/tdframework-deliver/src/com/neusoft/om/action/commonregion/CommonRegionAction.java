package com.neusoft.om.action.commonregion;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.CommonRegionBO;
import com.neusoft.om.dao.region.AreaCodeColl;
import com.neusoft.om.dao.region.AreaCodeVO;
import com.neusoft.om.dao.region.CommonRegionColl;
import com.neusoft.om.dao.region.CommonRegionData;
import com.neusoft.om.dao.region.CommonRegionVO;
import com.neusoft.om.dao.region.PoliticalLocationColl;
import com.neusoft.om.dao.region.PoliticalLocationVO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.DBLogger;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.taglib.commontree.tree.impl.Tree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITree;
import com.neusoft.unieap.taglib.commontree.tree.itf.ITreeNode;

public class CommonRegionAction extends TDDispatchAction{
	
	/**
	 * 初始化 电信公用管理区域树
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward initCommonRegionTree(ActionMapping mapping, ActionForm actionForm, 
			HttpServletRequest request, HttpServletResponse response) {
		//从session中得到操作员区域信息
		AuthorizeVO authvo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
		String areaId = String.valueOf(authvo.getAreaId());
		
		String commonRegionName = "";
		
		String message=null;
		CommonRegionColl commonRegionColl = new CommonRegionColl();	
		CommonRegionBO commonRegionBO =(CommonRegionBO)getServiceFacade(CommonRegionBO.BEAN);
		try{
			commonRegionColl = commonRegionBO.getCommonRegionColl(Integer.parseInt(areaId), commonRegionName);
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--initCommonTree--1:"+e.getMessage());
			message = e.getMessage();		
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--initCommonTree--2:"+e.getMessage());
			message = e.getMessage();		
		}
		
		request.setAttribute("commonRegionColl", commonRegionColl);
		request.setAttribute("message", message==null?"":message);
		return mapping.findForward("commonTreeView");
	}
	
	/**
	 * 查询电信公用管理区域结果
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward queryResultPage(ActionMapping mapping, ActionForm actionForm, 
			HttpServletRequest request, HttpServletResponse response) {
		//从session中得到操作员区域信息
		AuthorizeVO authvo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
		String areaId = String.valueOf(authvo.getAreaId());
		
		String commonRegionName = request.getParameter("commonRegionName");
		
		String message=null;
		CommonRegionColl commonRegionColl = new CommonRegionColl();	
		CommonRegionBO commonRegionBO =(CommonRegionBO)getServiceFacade(CommonRegionBO.BEAN);
		try{
			commonRegionColl = commonRegionBO.getCommonRegionColl(Integer.parseInt(areaId), commonRegionName);
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--queryResultPage--1:"+e.getMessage());
			message = e.getMessage();		
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--queryResultPage--2:"+e.getMessage());
			message = e.getMessage();		
		}
		
		request.setAttribute("commonRegionColl", commonRegionColl);
		request.setAttribute("message", message==null?"":message);
		return mapping.findForward("queryResultPage");
	}
	
	/**
	 * 初始化公用管理区域的展示列表
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward initCommonRegionPage(ActionMapping mapping, ActionForm actionForm, 
			HttpServletRequest request, HttpServletResponse response) {
		
		long commonRegionId=Long.parseLong(request.getParameter("commonRegionId"));
		
		String message=request.getAttribute("message")==null?"":(String)request.getAttribute("message");
		CommonRegionVO commonRegionVO = new CommonRegionVO();	
		CommonRegionBO commonRegionBO =(CommonRegionBO)getServiceFacade(CommonRegionBO.BEAN);
		
		try{
			commonRegionVO = commonRegionBO.getCommonRegionVO(commonRegionId);
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--initCommonRegionPage--1:"+e.getMessage());
			message += e.getMessage();		
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--initCommonRegionPage--2:"+e.getMessage());
			message += e.getMessage();		
		}
		
		request.setAttribute("commonRegionVO", commonRegionVO);
		request.setAttribute("commonRegionId", String.valueOf(commonRegionId));
		request.setAttribute("message", message==null?"":message);
		return mapping.findForward("commonRegionPage");
	}
	
	/**
	 * 初始化新增公用管理区域的展示列表
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward initAddNewPage(ActionMapping mapping, ActionForm actionForm, 
			HttpServletRequest request, HttpServletResponse response) {
		
		long upCommonRegionId=Long.parseLong(request.getParameter("commonRegionId"));
		
		String message=null;
		CommonRegionVO upCommonRegionVO = new CommonRegionVO();	
		CommonRegionVO commonRegionVO = new CommonRegionVO();	
		CommonRegionBO commonRegionBO =(CommonRegionBO)getServiceFacade(CommonRegionBO.BEAN);
		ParamObjectCollection regionTypeColl=null;
		ITree politicalLocationTree = new Tree();     
		
		try{
			upCommonRegionVO = commonRegionBO.getSimCommonRegionVO(upCommonRegionId);
			commonRegionVO.setUpRegionId(upCommonRegionVO.getCommonRegionId());
			commonRegionVO.setUpRegionName(upCommonRegionVO.getRegionName());
			regionTypeColl=commonRegionBO.getRegionTypeColl(upCommonRegionId);

			politicalLocationTree=commonRegionBO.initPoliticalLocationTree(upCommonRegionId);
			politicalLocationTree.expandAll();
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--initAddNewPage--1:"+e.getMessage());
			message = e.getMessage();		
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--initAddNewPage--2:"+e.getMessage());
			message = e.getMessage();		
		}
		
		request.setAttribute("operFlag", "ADDNEW");
		request.setAttribute("politicalLocationTree", politicalLocationTree);
		request.setAttribute("upCommonRegionVO", upCommonRegionVO);
		request.setAttribute("regionTypeColl", regionTypeColl);
		request.setAttribute("commonRegionId", String.valueOf(upCommonRegionId));
		request.setAttribute("commonRegionVO", commonRegionVO);
		request.setAttribute("message", message==null?"":message);
		return mapping.findForward("commonRegionDetailPage");
	}
	
	/**
	 * 初始化修改公用管理区域的展示列表
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward initModifyPage(ActionMapping mapping, ActionForm actionForm, 
			HttpServletRequest request, HttpServletResponse response) {
		
		long commonRegionId=Long.parseLong(request.getParameter("commonRegionId"));
		
		String message=null;
		CommonRegionVO commonRegionVO = new CommonRegionVO();	
		CommonRegionBO commonRegionBO =(CommonRegionBO)getServiceFacade(CommonRegionBO.BEAN);
		ITree politicalLocationTree = new Tree();  
		ParamObjectCollection regionTypeColl=null;
		try{
			
			commonRegionVO = commonRegionBO.getCommonRegionVO(commonRegionId);
			
			politicalLocationTree=commonRegionBO.initPoliticalLocationTree(commonRegionVO.getUpRegionId(),commonRegionId);
			politicalLocationTree.expandAll();
			
			regionTypeColl=commonRegionBO.getRegionTypeColl(commonRegionVO.getUpRegionId());
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--initModifyPage--1:"+e.getMessage());
			message = e.getMessage();		
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--initModifyPage--2:"+e.getMessage());
			message = e.getMessage();		
		}
		request.setAttribute("operFlag", "MODIFY");
		request.setAttribute("politicalLocationTree", politicalLocationTree);
		request.setAttribute("operFlag", "MODIFY");
		request.setAttribute("regionTypeColl", regionTypeColl);
		request.setAttribute("commonRegionVO", commonRegionVO);
		request.setAttribute("commonRegionId", String.valueOf(commonRegionId));
		request.setAttribute("message", message==null?"":message);
		return mapping.findForward("commonRegionDetailPage");
	}
	
	/**
	 * 删除公用管理区域
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward doDeleteCommonRegion(ActionMapping mapping, ActionForm actionForm, 
			HttpServletRequest request, HttpServletResponse response) {
		
		long commonRegionId=Long.parseLong(request.getParameter("commonRegionId"));
		AuthorizeVO authvo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
		
		String message=null;
		CommonRegionBO commonRegionBO =(CommonRegionBO)getServiceFacade(CommonRegionBO.BEAN);
		DBLogger logger =(DBLogger)getServiceFacade(DBLogger.BEAN);
		String operFlag="AFTER_STORE";
		
		try{
			message = commonRegionBO.deleteCommonRegion(commonRegionId);
			
			HashMap<String,String> logMap=new HashMap<String,String>();
			logMap.put("workNo",authvo.getWorkNo());
			logMap.put("systemId","41");
			logMap.put("buttonId","041AEC");
			logMap.put("loginHost",request.getRemoteAddr());
			logMap.put("partCity",authvo.getPartCity());
			logMap.put("areaId",String.valueOf(authvo.getAreaId()));
			logMap.put("loginHost",request.getRemoteAddr());
			logMap.put("operDesc","删除公用管理区域信息：commonRegionId="+commonRegionId+"操作者登陆账号:"+authvo.getWorkNo());
			logger.doAddLogInfoByProc(logMap);
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--doDeleteCommonRegion--1:"+e.getMessage());
			message = e.getMessage();	
			request.setAttribute("message", message==null?"":message);
			return initCommonRegionPage(mapping, actionForm,  request, response);
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--doDeleteCommonRegion--2:"+e.getMessage());
			message = e.getMessage();
			request.setAttribute("message", message==null?"":message);
			return initCommonRegionPage(mapping, actionForm,  request, response);
		}
		request.setAttribute("commonRegionId", String.valueOf(commonRegionId));
		request.setAttribute("message", message==null?"":message);
		request.setAttribute("operFlag", operFlag);
		return mapping.findForward("commonRegionPage");
	}
	
	/**
	 * 修改公用管理区域
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward doModifyCommonRegion(ActionMapping mapping, ActionForm actionForm, 
			HttpServletRequest request, HttpServletResponse response) {
		
		String areaCodeStr=request.getParameter("areaCodeStr");
		String regionName=request.getParameter("s_region_name");
		String regionDesc=request.getParameter("s_region_desc");
		String regionType=request.getParameter("s_region_type");
		long commonRegionId=Long.parseLong(request.getParameter("commonRegionId"));
		String[] treeNodes = request.getParameterValues(ITreeNode.checknode+"politicalLocationTree");
		
		AuthorizeVO authvo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
		
		CommonRegionVO commonRegionVO = new CommonRegionVO();	
		AreaCodeColl areaCodeColl=new AreaCodeColl();
		PoliticalLocationColl politicalLocationColl=new PoliticalLocationColl();
		String message="保存成功";
		
		CommonRegionBO commonRegionBO =(CommonRegionBO)getServiceFacade(CommonRegionBO.BEAN);
		DBLogger logger =(DBLogger)getServiceFacade(DBLogger.BEAN);
		try{
			//处理提交的区号信息
			String[] areaCodeArr=areaCodeStr.replaceAll("\\[", "").split("]");
			commonRegionVO.setRegionName(regionName);
			commonRegionVO.setRegionDesc(regionDesc);
			commonRegionVO.setRegionType(regionType);
			commonRegionVO.setCommonRegionId(commonRegionId);
			
			if(commonRegionVO.getRegionType().equals(CommonRegionData.REGION_TYPE_2)){
				for(String areaCodeInfo:areaCodeArr){
					AreaCodeVO vo=new AreaCodeVO();
					String []areaCodeInfoArr=areaCodeInfo.split(",");
					vo.setAreaCode(areaCodeInfoArr[0]);
					vo.setAreaNbr(areaCodeInfoArr[1]);
					areaCodeColl.addAreaCodeVO(vo);
				}
			}
			
			commonRegionVO.setAreaCodeColl(areaCodeColl);
			
			//处理提交的行政区域信息
			for(int i=0;i<treeNodes.length;i++){
				PoliticalLocationVO vo=new PoliticalLocationVO();
				vo.setLocationId(Long.parseLong(treeNodes[i]));
				politicalLocationColl.addPoliticalLocationVO(vo);
			}
			commonRegionVO.setPoliticalLocationColl(politicalLocationColl);
			
			//增加公用管理区域
			commonRegionBO.modifyCommonRegion(commonRegionVO);
			
			HashMap<String,String> logMap=new HashMap<String,String>();
			logMap.put("workNo",authvo.getWorkNo());
			logMap.put("systemId","41");
			logMap.put("buttonId","041AEB");
			logMap.put("loginHost",request.getRemoteAddr());
			logMap.put("partCity",authvo.getPartCity());
			logMap.put("areaId",String.valueOf(authvo.getAreaId()));
			logMap.put("loginHost",request.getRemoteAddr());
			logMap.put("operDesc","修改公用管理区域信息：commonRegionId="+commonRegionId+"|regionName="+regionName+"操作者登陆账号:"+authvo.getWorkNo());
			logger.doAddLogInfoByProc(logMap);
			
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--doModifyCommonRegion--1:"+e.getMessage());
			message +=  "保存失败："+e.getMessage();	
			
			request.setAttribute("message", message);
			return initAddNewPage( mapping,  actionForm, request,  response);
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--doModifyCommonRegion--2:"+e.getMessage());
			message +=  "保存失败："+e.getMessage();	
			
			request.setAttribute("message",message);
			return initAddNewPage( mapping,  actionForm, request,  response);
		}
		
		try{
			commonRegionVO = commonRegionBO.getCommonRegionVO(commonRegionId);
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--doModifyCommonRegion--3:"+e.getMessage());
			message = e.getMessage();		
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--doModifyCommonRegion--4:"+e.getMessage());
			message = e.getMessage();		
		}
		
		request.setAttribute("commonRegionVO", commonRegionVO);
		request.setAttribute("commonRegionId", String.valueOf(commonRegionId));
		request.setAttribute("message", message);
		request.setAttribute("operFlag", "AFTER_STORE");
		
		return mapping.findForward("commonRegionPage");
	}
	/**
	 * 添加公用管理区域
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 */
	public ActionForward doAddCommonRegion(ActionMapping mapping, ActionForm actionForm, 
			HttpServletRequest request, HttpServletResponse response) {
		
		String regionType=request.getParameter("s_region_type");
		long upRegionId=Long.parseLong(request.getParameter("s_up_region_id"));
		String areaCodeStr=request.getParameter("areaCodeStr");
		String regionName=request.getParameter("s_region_name");
		String regionDesc=request.getParameter("s_region_desc");
		String[] treeNodes = request.getParameterValues(ITreeNode.checknode+"politicalLocationTree");
		
		AuthorizeVO authvo = (AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO);
		
		PoliticalLocationColl politicalLocationColl=new PoliticalLocationColl();
		AreaCodeColl areaCodeColl=new AreaCodeColl();
		CommonRegionVO commonRegionVO = new CommonRegionVO();	
		CommonRegionVO newCommonRegionVO = new CommonRegionVO();	
		String message="保存成功";
		
		CommonRegionBO commonRegionBO =(CommonRegionBO)getServiceFacade(CommonRegionBO.BEAN);
		DBLogger logger =(DBLogger)getServiceFacade(DBLogger.BEAN);

		long commonRegionId=0;
		try{
			//处理提交的区号信息
			String[] areaCodeArr=areaCodeStr.replaceAll("\\[", "").split("]");
			commonRegionVO.setUpRegionId(upRegionId);
			commonRegionVO.setRegionType(regionType);
			commonRegionVO.setRegionName(regionName);
			commonRegionVO.setRegionDesc(regionDesc);
			
			if(commonRegionVO.getRegionType().equals(CommonRegionData.REGION_TYPE_2)){
				for(String areaCodeInfo:areaCodeArr){
					AreaCodeVO vo=new AreaCodeVO();
					String []areaCodeInfoArr=areaCodeInfo.split(",");
					vo.setAreaCode(areaCodeInfoArr[0]);
					vo.setAreaNbr(areaCodeInfoArr[1]);
					areaCodeColl.addAreaCodeVO(vo);
				}
			}
			
			commonRegionVO.setAreaCodeColl(areaCodeColl);
			
			//处理提交的行政区域信息
			for(int i=0;i<treeNodes.length;i++){
				PoliticalLocationVO vo=new PoliticalLocationVO();
				vo.setLocationId(Long.parseLong(treeNodes[i]));
				politicalLocationColl.addPoliticalLocationVO(vo);
			}
			commonRegionVO.setPoliticalLocationColl(politicalLocationColl);
			
			//增加公用管理区域
			commonRegionId=commonRegionBO.addCommonRegion(commonRegionVO);
			
			HashMap<String,String> logMap=new HashMap<String,String>();
			logMap.put("workNo",authvo.getWorkNo());
			logMap.put("systemId","41");
			logMap.put("buttonId","041AEA");
			logMap.put("loginHost",request.getRemoteAddr());
			logMap.put("partCity",authvo.getPartCity());
			logMap.put("areaId",String.valueOf(authvo.getAreaId()));
			logMap.put("loginHost",request.getRemoteAddr());
			logMap.put("operDesc","新增公用管理区域信息：commonRegionId="+commonRegionId+"|regionName="+regionName+"操作者登陆账号:"+authvo.getWorkNo());

			logger.doAddLogInfoByProc(logMap);
			
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--addCommonRegion--1:"+e.getMessage());
			message +=  "保存失败："+e.getMessage();	
			
			request.setAttribute("message", message);
			return initAddNewPage( mapping,  actionForm, request,  response);
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--addCommonRegion--2:"+e.getMessage());
			message +=  "保存失败："+e.getMessage();	
			
			request.setAttribute("message",message);
			return initAddNewPage( mapping,  actionForm, request,  response);
		}
		
		//查询新增后的公用管理区域
		try{
			newCommonRegionVO = commonRegionBO.getCommonRegionVO(commonRegionId);
		}catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--initCommonRegionPage--1:"+e.getMessage());
			message += e.getMessage();		
		}catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"CommonRegionAction--initCommonRegionPage--2:"+e.getMessage());
			message +=  e.getMessage();		
		}
		
		request.setAttribute("commonRegionVO", newCommonRegionVO);
		request.setAttribute("commonRegionId", String.valueOf(commonRegionId));
		request.setAttribute("operFlag", "AFTER_STORE");
		request.setAttribute("message", message==null?"":message);
		
		return mapping.findForward("commonRegionPage");
	}
	
	/**
     * 记录日志所需信息
     * @param request
     * @param buttonId
     * @param desc
     * @return
     */
    private HashMap getLogMap(HttpServletRequest request,String buttonId,String desc){
    	HashMap logMap = new HashMap();
    	AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
    	String loginHost = request.getRemoteHost();
    	String workNo =  authvo.getWorkNo();
    	String employeeId = authvo.getEmployeeId();
    	String partyCity = authvo.getPartCity();
    	String areaId = authvo.getAreaId();
    	logMap.put("systemId", "41");
    	logMap.put("buttonId", buttonId);
    	logMap.put("employeeId", employeeId);
    	logMap.put("workNo", workNo);
    	logMap.put("loginHost", loginHost);
    	logMap.put("operDesc", desc);    	
    	logMap.put("partCity",partyCity);
    	logMap.put("areaId",areaId);
    	return logMap;
    }
}
