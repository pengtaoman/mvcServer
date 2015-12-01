package com.neusoft.om.action.checkPerson;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.CheckPersonBO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

/*******************************************************************************
 * ������ : 
 * ���� : 2007-7-17 
 * ���� : sunchonggui@neusoft.com 
 * ģ�� : ���� :om_employee_check_t ���ά�� ��ע :
 * 
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸���
 * �޸�ԭ�� 1 2
 ******************************************************************************/

public class CheckPersonAction extends TDDispatchAction {
    
    //��ʼ������
    public ActionForward init(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

          return actionMapping.findForward("query");
    }
    
    public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        CheckPersonBO bo = (CheckPersonBO) getServiceFacade("checkPersonBO", actionMapping);
        int totalRows = getTotalRowsFromRequest(request);
        List cheObjs = null;
        int DEFAULT_PAGE_SIZE = 10;
        
        String fWorkNo = NullProcessUtil.nvlToString( request.getParameter("f_work_no"), "");
        String checkFlag = NullProcessUtil.nvlToString(request.getParameter("check_flag"), "");
        fWorkNo=fWorkNo.trim();
        //��˻���
        if(fWorkNo.equals("")){
            fWorkNo=NullProcessUtil.nvlToString((String)request.getAttribute("fWorkNO"),"");
        }
        try {
            if (totalRows <= 0) {
                totalRows = bo.getRowCount(fWorkNo, checkFlag);
            }
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
                cheObjs = bo.getColl(fWorkNo,  checkFlag, getStartEnd[0], getStartEnd[1]);
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("CheckPerson", GlobalParameters.ERROR, "CheckPersonAction--init()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("cheObjs", cheObjs);
        return actionMapping.findForward("list");
    }
    //��˷���
    public ActionForward check(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        String message="";
        CheckPersonBO bo = (CheckPersonBO) getServiceFacade("checkPersonBO", actionMapping);
        String fWorkNO=NullProcessUtil.nvlToString((String) request.getParameter("fWorkNO"), "");
        try {
           message=bo.check(fWorkNO,request);
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("CheckPerson", GlobalParameters.ERROR, "CheckPersonAction--check()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("message", message);
        request.setAttribute("fWorkNO",fWorkNO);
        return this.query(actionMapping,actionForm,request,response);
    }
    //��˻��˷���
    public ActionForward undoCheck(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        String message="";
        CheckPersonBO bo = (CheckPersonBO) getServiceFacade("checkPersonBO", actionMapping);
        String fWorkNO=NullProcessUtil.nvlToString((String) request.getParameter("fWorkNO"), "");
        try {
           message=bo.undoCheck(fWorkNO);
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("CheckPerson", GlobalParameters.ERROR, "CheckPersonAction--check()--1:", se);
            throw new ActionException(se);
        }
        request.setAttribute("message", message);
        request.setAttribute("fWorkNO",fWorkNO);
        return this.query(actionMapping,actionForm,request,response);
    }
   
}
