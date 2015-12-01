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
 * ������ : FilterRelManagejava 
 * ���� : 2007-8-11 
 * ���� : yanglm@neusoft.com 
 * ģ�� : Ȩ�޹���
 * ���� : ����Դ���������ϵά�� 
 * ��ע : OM_PARAM_FILTER_REL_T
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸��� �޸�ԭ�� 1 2
 * 
 ******************************************************************************/

public class FilterRelManage extends TDDispatchAction {
    private static int DEFAULT_PAGE_SIZE = 10;
    /**
	 * ��ѯҳ���ʼ��
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
        	//��ȡ���������˹���������������Դ����Ϣ
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
	 * ����ҳ���ʼ��
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
        	//��ȡ���������˹���������������Դ����Ϣ
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
	 * �޸�ҳ���ʼ��
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
        	//��ȡ���������˹���������������Դ����Ϣ
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
	 * ��ѯ����Դ���������Ϣ
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
        	//��ȡ����Դ��������Ϣ
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
	 * ��ѯ����Դ��Ĺ�����������Ϣ
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
    	StringBuffer result = new StringBuffer("<option value=''>��ѡ��</option>\n");
    
    	try {
    		if(tableId != null){
    			//��ȡ��������Ϣ
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
	 * ��ѯ�������б���
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
    	StringBuffer result = new StringBuffer("<option value=''>������</option>\n");
    	
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
	 * ��ѯ��������ϵ�б���
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
	 * ��ѯ��������ϵ�б���
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
	 * ɾ����������ϵ���÷���
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
        //��ȡ������Ҫ��ɾ���Ĺ�������ϵ��Ϣ
    	String[] values = request.getParameterValues("checkboxs");
        String message = "";
        
        try{
            if(values.length>0){
                message = bo.deleteFilterRel(values);
                
                if(message.equals("true")){
                	message = "ɾ����������ϵ������Ϣ�ɹ�";
                }
            }else{
            	message = "δ��ȡ��ɾ����������ϵ������Ϣ�����������Ϣ���޷�����ɾ������";
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
	 * ������������ϵ���÷���
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
        //��ȡ������������ϵ��Ϣ
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
    				message = "�޸Ĺ�������ϵ������Ϣ�ɹ�";
    			else
    				message = "������������ϵ������Ϣ�ɹ�";
            	
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

