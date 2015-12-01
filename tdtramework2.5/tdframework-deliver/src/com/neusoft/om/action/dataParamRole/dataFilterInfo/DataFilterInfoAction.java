package com.neusoft.om.action.dataParamRole.dataFilterInfo;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.dataParamRole.dataFilterInfo.DataFilterInfoBO;
import com.neusoft.om.dao.dataParamRole.DataFilterInfoVO;
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
 * ������ :����������
 * ���� : 2007-8-15
 * ���� : sunchonggui@neusoft.com 
 * ģ�� : ���� :OM_PARAM_TABLE_INFO_T ���ά�� ��ע :
 * 
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸���
 * �޸�ԭ�� 1 2
 ******************************************************************************/

public class DataFilterInfoAction extends TDDispatchAction {
    
    //��ʼ������
    public ActionForward init(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        ParamObjectCollection filterColl=null;
        DataFilterInfoBO bo = (DataFilterInfoBO) getServiceFacade("dataFilterInfoBO", actionMapping);
        try {
            filterColl=bo.getFilters();
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataFilterInfoAction--init()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("filterColl", filterColl);
        return actionMapping.findForward("query");
    }
    //��ѯ��ʾom_param_filter_info_t �Ľ����
    public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        DataFilterInfoBO bo = (DataFilterInfoBO) getServiceFacade("dataFilterInfoBO", actionMapping);
        int totalRows = getTotalRowsFromRequest(request);
        List dataFilterInfoObjs = null;
        int DEFAULT_PAGE_SIZE = 10;
        String filterInfo = NullProcessUtil.nvlToString((String) request.getParameter("filterInfo"), "");
        String filterDesc = NullProcessUtil.nvlToString(request.getParameter("filterDesc"), "");
        
        try {
            if (totalRows <= 0) {
                totalRows = bo.getRowCount(filterInfo, filterDesc);
            }
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
                dataFilterInfoObjs = bo.getInfoColl(filterInfo, filterDesc, getStartEnd[0], getStartEnd[1]);
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataFilterInfoAction--init()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("dataFilterInfoObjs", dataFilterInfoObjs);
        return actionMapping.findForward("list");
    }
    //������ʼ��
    public ActionForward insertInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        return actionMapping.findForward("insert");
    }
    // �ֲ�ˢ�¸��ݱ����ֻ�ȡ������
    public ActionForward getColumnName(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException, IOException {
        RequestUtil requestUtil = new RequestUtil(request);
        response.setCharacterEncoding("GBK");

        ParamObjectCollection columnNameColl = null;
        String tableName = NullProcessUtil.nvlToString(requestUtil.getParameter("tableName"), "");
        // select * from cols where table_name ='OM_DATA_FILTER_T'
        DataFilterInfoBO bo = (DataFilterInfoBO) getServiceFacade("dataFilterInfoBO", actionMapping);
        try {
            columnNameColl = bo.getColumn(tableName);
        } catch (ServiceException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataFilterAction--getColumnName()-1 :" + e.getMessage());
            throw new ActionException(e);
        }
        StringBuffer result = new StringBuffer();
        for (int i = 0; i < columnNameColl.getRowCount(); i++) {
            ParamObject vo = (ParamObject) columnNameColl.getElement(i);
            result.append("\t<option value='" + vo.getId() + "'>" + vo.getName() + "</option>\n");
        }
        response.getWriter().write(result.toString());
        return null;
    }
    
// ����
    public ActionForward doSave(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {       
        DataFilterInfoBO bo = (DataFilterInfoBO) getServiceFacade("dataFilterInfoBO", actionMapping);
        String filterDesc=request.getParameter("filterDesc").trim();
        String tableName=request.getParameter("filterInfo").trim();
        String columnId=request.getParameter("columnId").trim();
        String columnName=request.getParameter("columnName").trim();
        String filterParam=request.getParameter("filterParam");
        HashMap map=new HashMap();
        map.put("filterDesc",filterDesc);
        map.put("tableName",tableName);
        map.put("columnId",columnId);
        map.put("columnName",columnName);
        map.put("filterParam",filterParam);      
        String message="";
        try{
              message=bo.doSave(map);
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataFilterInfoAction--doSave()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("message",message);
        return this.queryBack(actionMapping,actionForm,request,response);
    }
    // ���������
    public ActionForward queryBack(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        DataFilterInfoBO bo = (DataFilterInfoBO) getServiceFacade("dataFilterInfoBO", actionMapping);
        int totalRows = getTotalRowsFromRequest(request);
        List dataFilterInfoObjs = null;
        int DEFAULT_PAGE_SIZE = 10;
        
        try {
            if (totalRows <= 0) {
                totalRows = bo.getRowCountBack();
            }
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
                dataFilterInfoObjs = bo.getInfoCollBack( getStartEnd[0], getStartEnd[1]);
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataFilterInfoAction--queryBack()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("dataFilterInfoObjs", dataFilterInfoObjs);
        return actionMapping.findForward("list");
    }
    /**
     * ��ȡ����ϸ��Ϣ�����޸� ʱ��ʾ����
     * @param 
     * @return
     */
    public ActionForward modiInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        String filterId=request.getParameter("filterId");
        String filterInfo=request.getParameter("filterInfo");
        ParamObjectCollection columnNameColl = null;
        DataFilterInfoVO vo=null;
        DataFilterInfoBO bo = (DataFilterInfoBO) getServiceFacade("dataFilterInfoBO", actionMapping);
        try {
            columnNameColl = bo.getColumn(filterInfo);
            vo=bo.modifyInit(filterId);
        } catch (ServiceException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, "DataFilterAction--getColumnName()-1 :" + e.getMessage());
            throw new ActionException(e);
        }
        
        request.setAttribute("dataFilterInfoVO",vo);
        request.setAttribute("columnNameColl",columnNameColl);
        return actionMapping.findForward("detail");
    }
    /**
     * �޸ķ���
     * @param 
     * @return
     */
    public ActionForward modify(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        DataFilterInfoBO bo = (DataFilterInfoBO) getServiceFacade("dataFilterInfoBO", actionMapping);
        String filterId=request.getParameter("filterIdHid");
        String filterInfo=request.getParameter("filterInfo");
        String filterDesc=request.getParameter("filterDesc");
        String filterSelId=request.getParameter("filterSelId");
        String filterSelValue=request.getParameter("filterSelValue");
        String filterSelParam=request.getParameter("filterSelParam");
        HashMap map=new HashMap();
        map.put("filterId",filterId);
        map.put("filterInfo",filterInfo);
        map.put("filterDesc",filterDesc);
        map.put("filterSelId",filterSelId);
        map.put("filterSelValue",filterSelValue);
        map.put("filterSelParam",filterSelParam);
        String message="";       
        try {
            message=bo.modify(map);
        } catch (ServiceException e) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataFilterInfoAction--modify()--1:", e);
            throw new ActionException(e);
        }
        request.setAttribute("message",message);
       // return actionMapping.findForward("list"); 
       return this.queryBack(actionMapping ,actionForm,request,response,filterId);
    }
//  ��ѯ��ʾ ���޸��˵� om_param_filter_info_t �Ľ����
    public ActionForward queryBack(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response,String filterId ) throws ActionException {

        DataFilterInfoBO bo = (DataFilterInfoBO) getServiceFacade("dataFilterInfoBO", actionMapping);
        int totalRows = 1;
        List dataFilterInfoObjs = null;
        int DEFAULT_PAGE_SIZE = 10;
        try {
            getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            dataFilterInfoObjs = bo.getInfoCollBack(Integer.parseInt(filterId));
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataFilterInfoAction--init()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("dataFilterInfoObjs", dataFilterInfoObjs);
        return actionMapping.findForward("list");
    }
    
   //ɾ������
    public ActionForward doDelete(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        DataFilterInfoBO bo = (DataFilterInfoBO) getServiceFacade("dataFilterInfoBO", actionMapping);
        String values[]=request.getParameterValues("checkboxs");
        String message="";
        try{
            if(values.length>0){
                message=bo.doDelete(values);
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("DataFilter", GlobalParameters.ERROR, "DataFilterInfoAction--doDelete()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("message",message);
        
        return this.query(actionMapping,actionForm,request,response);
    }
}
