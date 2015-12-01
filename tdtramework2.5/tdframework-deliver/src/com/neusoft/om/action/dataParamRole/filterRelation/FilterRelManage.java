package com.neusoft.om.action.dataParamRole.filterRelation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.dataParamRole.dataParamManage.DataParamManageBO;
import com.neusoft.om.bo.dataParamRole.dataSourceInfo.DataSourceInfoBO;
import com.neusoft.om.bo.dataParamRole.filterRelation.FilterRelationBO;
import com.neusoft.om.dao.dataParamRole.DataSourceInfoVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.util.RequestUtil;

/*******************************************************************************
 * 程序名 : FilterRelManagejava 
 * 日期 : 2007-8-11 
 * 作者 : yanglm@neusoft.com 
 * 模块 : 权限管理
 * 描述 : 数据源表过滤器关系维护 
 * 备注 : OM_PARAM_FILTER_REL_T
 * ------------------------------------------------------------
 * 修改历史 序号 日期 修改人 修改原因 1 2
 * 
 ******************************************************************************/

public class FilterRelManage extends TDDispatchAction {
    private static int DEFAULT_PAGE_SIZE = 10;
    /**
	 * 查询页面初始化
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
    public ActionForward init(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        ParamObjectCollection tableColl=null;
        FilterRelationBO bo = (FilterRelationBO) getServiceFacade("filterRelationBO", actionMapping);
        
        try {
        	//获取所有配置了关联过滤器的数据源表信息
            tableColl=bo.getFilterTables();
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"FilterRelManage--init()--1:", se);
            throw new ActionException(se);
        }
        
        request.setAttribute("tableColl", tableColl);
        
        return actionMapping.findForward("init");
    }
    /**
	 * 新增页面初始化
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
    public ActionForward initAddPage(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        ParamObjectCollection tableColl=null;
        String tableId = request.getParameter("tableId");
        FilterRelationBO bo = (FilterRelationBO) getServiceFacade("filterRelationBO", actionMapping);
        
        try {
        	//获取所有配置了关联过滤器的数据源表信息
            tableColl=bo.getFilterTables();
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"FilterRelManage--initAddPage()--1:", se);
            throw new ActionException(se);
        }
        
        request.setAttribute("operType", "add");
        request.setAttribute("tableId", tableId);
        request.setAttribute("tableColl", tableColl);
        
        return actionMapping.findForward("initAddPage");
    }
    /**
	 * 修改页面初始化
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
    public ActionForward initModifyPage(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        ParamObjectCollection tableColl = null;
        String tableId = request.getParameter("tableId");
        String mainColumn = request.getParameter("mainColumn");
        FilterRelationBO bo = (FilterRelationBO) getServiceFacade("filterRelationBO", actionMapping);
        
        try {
        	//获取所有配置了关联过滤器的数据源表信息
            tableColl=bo.getFilterTables();
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"FilterRelManage--initAddPage()--1:", se);
            throw new ActionException(se);
        }
        
        request.setAttribute("operType", "modify");
        request.setAttribute("tableId", tableId);
        request.setAttribute("mainColumn", mainColumn);
        request.setAttribute("tableColl", tableColl);
        
        return actionMapping.findForward("initAddPage");
    }
    /**
	 * 查询数据源表的描述信息
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
    public ActionForward getTableDesc(ActionMapping actionMapping,ActionForm actionForm,HttpServletRequest request,
    		HttpServletResponse response) throws IOException{
    	RequestUtil requestUtil=new RequestUtil(request);
    	response.setContentType("text/xml;charset=GBK");
    	
        String tableDesc = "";
        String tableId = requestUtil.getParameter("tableId");
    	
        FilterRelationBO bo = (FilterRelationBO) getServiceFacade("filterRelationBO", actionMapping);
    	
        try {
        	//获取数据源表描述信息
        	if(tableId != null){
        		tableDesc = bo.getTableDescById(tableId);
        	}
        } catch(Exception e) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"FilterRelManage--getTableDesc()--1:", e);
        }
   	
    	response.getWriter().write(tableDesc);
    	return null; 
    }
    /**
	 * 查询数据源表的关联过滤器信息
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
    public ActionForward getFilterColl(ActionMapping actionMapping,ActionForm actionForm,HttpServletRequest request,
    		HttpServletResponse response) throws IOException{
    	RequestUtil requestUtil=new RequestUtil(request);
    	response.setContentType("text/xml;charset=GBK");
    	
        ParamObjectCollection filterColl = null;
    	String tableId = requestUtil.getParameter("tableId");
    	
    	FilterRelationBO bo = (FilterRelationBO) getServiceFacade("filterRelationBO", actionMapping);
    	StringBuffer result = new StringBuffer("<option value=''>请选择</option>\n");
    
    	try {
    		if(tableId != null){
    			//获取过滤器信息
        		filterColl = bo.getFilterCollById(tableId);
        		
            	for(int i=0; i<filterColl.getRowCount(); i++){   
                    ParamObject vo =(ParamObject)filterColl.getElement(i);
                    result.append("\t<option value='"+vo.getId()+"'>"+vo.getName()+":"+vo.getId()+"</option>\n");
                }
        	}
        } catch(Exception e) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"FilterRelManage--getFilterColl()--1:", e);
        }
    	
    	response.getWriter().write(result.toString());
    	return null; 
    }
    /**
	 * 查询过滤器列表方法
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
    public ActionForward getPassiveSelect(ActionMapping actionMapping,ActionForm actionForm,HttpServletRequest request,
    		HttpServletResponse response) throws IOException{ 
    	HttpSession session = request.getSession(true);
    	RequestUtil requestUtil=new RequestUtil(request);
    	response.setContentType("text/xml;charset=GBK");

    	String tableId = requestUtil.getParameter("tableId");
    	String mainParamNames = requestUtil.getParameter("mainParamNames");
    	String passiveParamName = requestUtil.getParameter("passiveParamName");
    	
    	ParamObjectCollection filterColl = null;
    	//String sqlValue = "";
    	StringBuffer result = new StringBuffer("<option value=''>不区分</option>\n");
    	
    	String[] tagNames = null;
    	if(mainParamNames!=null){
    		tagNames = mainParamNames.split("~");
    	}
    	
    	HashMap dataMap = new HashMap();
    	dataMap.put("mainParamNames",mainParamNames);
    	dataMap.put("passiveParamName",passiveParamName);
    	for(int i=0;i<tagNames.length;i++){
    		String paramValue = requestUtil.getParameter(tagNames[i])==null?"":requestUtil.getParameter(tagNames[i]);
    		dataMap.put(tagNames[i],paramValue);
    	}

    	FilterRelationBO bo = (FilterRelationBO) getServiceFacade("filterRelationBO", actionMapping);
    	
    	try{
    		filterColl = bo.getPassiveSelect(tableId,dataMap,session);
    		
    		//sqlValue = filterColl.getSalValue();
    		for(int i=0; i<filterColl.getRowCount(); i++){   
                ParamObject vo =(ParamObject)filterColl.getElement(i);
                result.append("\t<option value='"+vo.getId()+"'>"+vo.getName()+"</option>\n");
            }
    	}catch(ServiceException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"FilterRelManage--getPassiveSelect()-1 :"+e.getMessage());
		}
    	
    	response.getWriter().write(result.toString());
    	return null; 
    }
    /**
	 * 查询过滤器关系列表方法
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
    public ActionForward queryFilterRel(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	List filterRelList = null;
    	FilterRelationBO bo = (FilterRelationBO) getServiceFacade("filterRelationBO", actionMapping);
        int totalRows = getTotalRowsFromRequest(request);
        
        String tableId = request.getParameter("tableId");
       
        try {
        	filterRelList = bo.getFilterRelList(tableId);
        	
            if (totalRows < 0) {
            	if(filterRelList!=null && filterRelList.size()>0)
            		totalRows = filterRelList.size();
            	else
            		totalRows = 0;
            }
            
            getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
        }catch (Exception se) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"FilterRelManage--queryFilterRel()--1:", se);
            throw new ActionException(se);
        }
        
        request.setAttribute("result", filterRelList);
        
        return actionMapping.findForward("relList");
    }
    /**
	 * 查询过滤器关系列表方法
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
    public ActionForward queryPassiveFilter(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	List filterList = new ArrayList();
    	FilterRelationBO bo = (FilterRelationBO) getServiceFacade("filterRelationBO", actionMapping);
        int totalRows = getTotalRowsFromRequest(request);
        
        String tableId = request.getParameter("tableId");
        String mainColumn = request.getParameter("filterName");
        String operType = request.getParameter("operType");
       
        try {
        	if(operType==null || operType.trim().equals("")){
        		operType = "add";
        	}
        	
        	filterList = bo.getPassiveFilter(tableId,mainColumn,operType);
        	
            if (totalRows < 0) {
            	if(filterList!=null && filterList.size()>0)
            		totalRows = filterList.size();
            	else
            		totalRows = 0;		
            }
            
            getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
        }catch (Exception se) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"FilterRelManage--queryPassiveFilter()--1:", se);
            throw new ActionException(se);
        }
        
        request.setAttribute("tableId", tableId);
        request.setAttribute("mainColumn", mainColumn);
        request.setAttribute("operType", operType);
        request.setAttribute("result", filterList);
        
        return actionMapping.findForward("addList");
    }
    /**
	 * 删除过滤器关系配置方法
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
    public ActionForward deleteFilterRel(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	FilterRelationBO bo = (FilterRelationBO) getServiceFacade("filterRelationBO", actionMapping);
        //获取所有需要被删除的过滤器关系信息
    	String[] values = request.getParameterValues("checkboxs");
        String message = "";
        
        try{
            if(values.length>0){
                message = bo.deleteFilterRel(values);
                
                if(message.equals("true")){
                	message = "删除过滤器关系配置信息成功";
                }
            }else{
            	message = "未获取到删除过滤器关系配置信息所需的主键信息，无法进行删除操作";
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"FilterRelManage--deleteFilterRel()--1:", se);
            throw new ActionException(se);
        }
        
        request.setAttribute("message",message);
        request.setAttribute("operType","delete");
        
        return actionMapping.findForward("hiddenPage");
    }
    /**
	 * 新增过滤器关系配置方法
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
    public ActionForward addFilterRel(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	FilterRelationBO bo = (FilterRelationBO) getServiceFacade("filterRelationBO", actionMapping);
        //获取新增过滤器关系信息
    	String operType = request.getParameter("operType");
    	String tableId = request.getParameter("tableId");
    	String mainColumn = request.getParameter("filterName");
    	String params = request.getParameter("checkboxValues");
    	String[] values = null;
        String message = "";
        
        try{
        	if(params!=null && !params.trim().equals("")){
        		values = params.split(":");
        	}
        	
        	if(operType==null || operType.trim().equals("")){
        		operType = "add";
        	}
        	
            message = bo.addFilterRel(values,tableId,mainColumn,operType);
            
            if(message.equals("true")){
            	if(operType.equals("modify"))
    				message = "修改过滤器关系配置信息成功";
    			else
    				message = "新增过滤器关系配置信息成功";
            	
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"FilterRelManage--addFilterRel()--1:", se);
            throw new ActionException(se);
        }
        
        request.setAttribute("message",message);
        request.setAttribute("operType",operType);
        
        return actionMapping.findForward("hiddenPage");
    }

}

