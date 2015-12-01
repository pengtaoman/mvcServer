package com.neusoft.om.action.dataParamRole.dataSourceInfo;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.dataParamRole.dataSourceInfo.DataSourceInfoBO;
import com.neusoft.om.dao.dataParamRole.DataSourceInfoVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

/*******************************************************************************
 * ������ : ddss.java.java 
 * ���� : 2007-8-11 
 * ���� : sunchonggui@neusoft.com 
 * ģ�� : ���� :OM_PARAM_TABLE_INFO_T ���ά�� ��ע :
 * 
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸���
 * �޸�ԭ�� 1 2
 ******************************************************************************/

public class DataSourceInfoAction extends TDDispatchAction {
    private static int DEFAULT_PAGE_SIZE = 10;
    //��ʼ������
    public ActionForward init(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        ParamObjectCollection tableColl=null;
        DataSourceInfoBO bo = (DataSourceInfoBO) getServiceFacade("dataSourceInfoBO", actionMapping);
        try {
            tableColl=bo.getTables();
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataSourceInfoAction--init()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("tableColl", tableColl);
        return actionMapping.findForward("query");
    }
    //��ѯ��ʾOM_PARAM_TABLE_INFO_T �Ľ����
    public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        DataSourceInfoBO bo = (DataSourceInfoBO) getServiceFacade("dataSourceInfoBO", actionMapping);
        int totalRows = getTotalRowsFromRequest(request);
        List dataSourceInfoObjs = null;
        
        String tableId = NullProcessUtil.nvlToString((String) request.getParameter("tableId"), "");
        String tableDesc = NullProcessUtil.nvlToString(request.getParameter("tableDesc"), "");
        String showNewData = NullProcessUtil.nvlToString(request.getParameter("showNewData"), "");
        //���������
        String tableName =NullProcessUtil.nvlToString((String)request.getAttribute("tableName"), "");
        if(!tableName.equals("")){
            tableId=tableName;
        }
        try {
            if (totalRows <= 0) {
                totalRows = bo.getRowCount(tableId, tableDesc, showNewData);
            }
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
                dataSourceInfoObjs = bo.getInfoColl(tableId, tableDesc, showNewData,getStartEnd[0], getStartEnd[1]);
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataSourceInfoAction--init()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("dataSourceInfoObjs", dataSourceInfoObjs);
        return actionMapping.findForward("list");
    }
    //������ʼ��
    public ActionForward insertInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        return actionMapping.findForward("insert");
    }
    
// //��������
    public ActionForward insert(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        DataSourceInfoBO bo = (DataSourceInfoBO) getServiceFacade("dataSourceInfoBO", actionMapping);
        int totalRows = getTotalRowsFromRequest(request);
        List colsInfoObjs = null;
        
        ParamObjectCollection filterColl=null;
       
        String tableName = NullProcessUtil.nvlToString((String) request.getParameter("tableName"), "");
        String tableDesc =NullProcessUtil.nvlToString((String) request.getParameter("tableDesc"), "");
        String showNewData =NullProcessUtil.nvlToString((String) request.getParameter("showNewData"), "");
        try {
            if (totalRows <= 0) {
                totalRows = bo.getColsCount(tableName);
            }
            getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
                colsInfoObjs = bo.getColsInfoColl(tableName);
            }
            //��ȡ��������ť����ʾ��insert.jsp �еĹ��������������б�����
            filterColl=bo.getFilter();
            
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataSourceInfoAction--insert()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("colsInfoObjs", colsInfoObjs);
        request.setAttribute("filterColl", filterColl);
        request.setAttribute("flagDisplay","dispaly");
        // tableName �� tableDesc ֵ�ش���insert.jsp ҳ��
        request.setAttribute("tableName",tableName);
        request.setAttribute("tableDesc",tableDesc);
        request.setAttribute("showNewData", showNewData);
        return actionMapping.findForward("insert");
    }
//  ���淽��
    public ActionForward doSave(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        DataSourceInfoBO bo = (DataSourceInfoBO) getServiceFacade("dataSourceInfoBO", actionMapping);
        String values[]=request.getParameterValues("checkboxs");
        String tableName=request.getParameter("tableName");
        String tableDesc=request.getParameter("tableDesc");
        String showNewData = request.getParameter("showNewData");
        String message="����ʧ��";
        try{
            if(values!=null&&values.length>0){
//              ��om_param_table_desc_t �в�������
               String flag= bo.doSaveDesc(tableName,tableDesc,showNewData);
               if(flag.equals("true")){
                   message=bo.doSave(values);
               }                
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataSourceInfoAction--insert()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("message",message);
        //�� query�����л�ȡtableName ���� ���������
        request.setAttribute("tableName",tableName);
        return this.queryBack(actionMapping,actionForm,request,response);
    }
//  ��ѯ��ʾOM_PARAM_TABLE_INFO_T �Ľ����
    public ActionForward queryBack(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        DataSourceInfoBO bo = (DataSourceInfoBO) getServiceFacade("dataSourceInfoBO", actionMapping);
        int totalRows = getTotalRowsFromRequest(request);
        List dataSourceInfoObjs = null;
        try {
            if (totalRows <= 0) {
                totalRows = bo.getRowCountBack();
            }
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
                dataSourceInfoObjs = bo.getInfoCollBack(getStartEnd[0], getStartEnd[1]);
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataSourceInfoAction--queryBack()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("dataSourceInfoObjs", dataSourceInfoObjs);
        return actionMapping.findForward("list");
    }
   //ɾ������
    public ActionForward doDelete(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        DataSourceInfoBO bo = (DataSourceInfoBO) getServiceFacade("dataSourceInfoBO", actionMapping);
        String values[]=request.getParameterValues("checkboxs");
        String message="";
        try{
            if(values.length>0){
                message=bo.doDelete(values);
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataSourceInfoAction--doDelete()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("message",message);
        
        return this.query(actionMapping,actionForm,request,response);
    }
    /**
     * ��ȡ����ϸ��Ϣ�����޸� ʱ��ʾ����
     * @param 
     * @return
     */
    public ActionForward modiInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        DataSourceInfoBO bo = (DataSourceInfoBO) getServiceFacade("dataSourceInfoBO", actionMapping);
        
        String tableId=request.getParameter("tableId");
        String columnInfo=request.getParameter("columnInfo");
        ParamObjectCollection filterColl=null;
        String ifUsed = "";
        DataSourceInfoVO vo=null;
        
        try {
            vo = bo.modiInit(tableId,columnInfo);
            if(vo.getIfUsed()!=null){
            	ifUsed = vo.getIfUsed();
            }
            filterColl = bo.getFilter();
        } catch (ServiceException e) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataSourceInfoAction--modiInit()--1:", e);
            throw new ActionException(e);
        }
        
        request.setAttribute("ifUsed",ifUsed);
        request.setAttribute("dataSourceInfoVO",vo);
        request.setAttribute("filterColl",filterColl);
        
        return actionMapping.findForward("detail");
    }
    /**
     * �޸ķ���
     * @param 
     * @return
     */
    public ActionForward modify(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        DataSourceInfoBO bo = (DataSourceInfoBO) getServiceFacade("dataSourceInfoBO", actionMapping);
        String tableId=request.getParameter("tableId");
        String columnInfo=request.getParameter("columnInfo");
        String columnKind=request.getParameter("columnKind");
        String columnDesc=request.getParameter("columnDesc");
        String columnOrder=request.getParameter("columnOrder");
        String columnType=request.getParameter("columnType");
        String filterEff=request.getParameter("filterEff");
        String tableDesc=request.getParameter("tableDesc");
        HashMap map=new HashMap();
        map.put("tableId",tableId);
        map.put("columnInfo",columnInfo);
        map.put("columnKind",columnKind);
        map.put("columnDesc",columnDesc);
        map.put("columnOrder",columnOrder);
        map.put("columnType",columnType);
        map.put("filterEff",filterEff);
        map.put("tableDesc",tableDesc);
        String message="";       
        try {
            message=bo.modify(map);
        } catch (ServiceException e) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataSourceInfoAction--modiInit()--1:", e);
            throw new ActionException(e);
        }
        request.setAttribute("message",message);
        return this.queryBack(actionMapping ,actionForm,request,response,map);
    }
//  ��ѯ��ʾ ���޸��˵� OM_PARAM_TABLE_INFO_T �Ľ����
    public ActionForward queryBack(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response,HashMap map ) throws ActionException {

        DataSourceInfoBO bo = (DataSourceInfoBO) getServiceFacade("dataSourceInfoBO", actionMapping);
        int totalRows = getTotalRowsFromRequest(request);
        List dataSourceInfoObjs = null;
        try {
            if (totalRows <= 0) {
                totalRows = bo.getRowCountL(map);
            }
            getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
                dataSourceInfoObjs = bo.getInfoCollL(map);
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataSourceInfoAction--init()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("dataSourceInfoObjs", dataSourceInfoObjs);
        return actionMapping.findForward("list");
    }
}
