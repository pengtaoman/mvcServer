package com.neusoft.om.action.empiplimit;

import java.util.List;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.empiplimit.EmpIpLimitDAO;
import com.neusoft.om.dao.empiplimit.EmpIpLimitVO;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
/*******************************************************************************
 * ������ :��¼ipά��action
 * ���� : 2008-6-26
 * ���� : zhaof@neusoft.com 
 * ģ�� : ���-Ȩ��ϵͳ
 * ���� : OM_IP_LIMIT_T ���ά�� 
 * ��ע :
 * 
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸���
 * �޸�ԭ�� 1 2
 ******************************************************************************/
public class EmpIpLimitAction extends TDDispatchAction {
    //����
    public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	int totalRows = getTotalRowsFromRequest(request);
    	EmpIpLimitDAO empIpLimitDAO = getEmpIpLimitDAO(request);        
        List empIpLimitList = null;
        int DEFAULT_PAGE_SIZE = 10;        
        try {
            if (totalRows <= 0) {
                totalRows = empIpLimitDAO.getRowCount();
            }
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
            	empIpLimitList = empIpLimitDAO.getEmpIpLimitList(getStartEnd[0], getStartEnd[1]);
            }
        } catch (DataAccessException e) {
            SysLog.writeExceptionLogs("EmpIpLimitAction", GlobalParameters.ERROR, "EmpIpLimitAction--query()--1:", e);
            throw new ActionException(e);
        }
        request.setAttribute("empIpLimitList", empIpLimitList);
        return actionMapping.findForward("list");
    }
    /*
     * �༭ - ��ʼ��
     */
    public ActionForward modiInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String workNo = NullProcessUtil.nvlToString((String) request.getParameter("workNo"), "");
    	String ipStartAdd = NullProcessUtil.nvlToString((String) request.getParameter("ipStartAdd"), "");
    	String ipEndAdd = NullProcessUtil.nvlToString((String) request.getParameter("ipEndAdd"), "");
    	String oper = request.getParameter("oper");
    	EmpIpLimitDAO ipLimitDAO = getEmpIpLimitDAO(request);  
    	EmpIpLimitVO empIpLimitVO = new  EmpIpLimitVO();
        AreaDAO areaDAO = getAreaDAO(request);
        AuthorizeVO authVO = getAuthorize(request);
        String authareaId = authVO.getAreaId();
        Vector areaColl = areaDAO.getAllAreaInfo(authareaId, 4); 
        try {
        	if(oper.trim().equals("modify")){        	
            	empIpLimitVO = ipLimitDAO.getEmpIpLimitVO(workNo,ipStartAdd,ipEndAdd);            	
        	}  
        } catch (DataAccessException e) {
            SysLog.writeExceptionLogs("IpLimitAction", GlobalParameters.ERROR, "IpLimitAction--modiInit()--1:", e);
            throw new ActionException(e);
        }
        request.setAttribute("empIpLimitVO", empIpLimitVO);        
        request.setAttribute("oper", oper);
        request.setAttribute("areaTree", areaColl);
        
    	return actionMapping.findForward("modify");
    }
    /*
     * ����
     */
    public ActionForward doModify(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String workNo = request.getParameter("workNo");
    	String priStartAdd = request.getParameter("priStartAdd");
    	String priEndAdd = request.getParameter("priEndAdd");
    	String ipStartAdd = request.getParameter("ipStartAdd");
    	String ipEndAdd = request.getParameter("ipEndAdd");
		String areaId = request.getParameter("areaId");
		String forceFlagS = request.getParameter("forceFlag");
		String detailDesc = request.getParameter("detailDesc");
		AuthorizeVO authVO = getAuthorize(request);
		String updateEmp = authVO.getEmployeeId();
		String updateOrgan = authVO.getOrganID();	
    	String oper = request.getParameter("oper");
    	EmpIpLimitVO vo = new EmpIpLimitVO();
    	int forceFlag = 0;
    	if(forceFlagS != null && !forceFlagS.trim().equals("")){
    		forceFlag = Integer.parseInt(forceFlagS);
    	}
    	vo.setWorkNo(workNo);
    	vo.setIpStartAdd(ipStartAdd);
    	vo.setIpEndAdd(ipEndAdd);
    	vo.setAreaId(areaId);
    	vo.setForceFlag(forceFlag);
    	vo.setDetailDesc(detailDesc);
    	vo.setUpdateEmp(updateEmp);
    	vo.setUpdateOrgan(updateOrgan);    	
    	EmpIpLimitDAO ipLimitDAO = getEmpIpLimitDAO(request);  
    	String message = "����ɹ�";
    	try{
    		if(oper != null && oper.equals("modify")){
    			ipLimitDAO.doModifyEmpIpLimit(vo, workNo,priStartAdd,priEndAdd);
    		}else if(oper != null && oper.equals("add")){
    			ipLimitDAO.doAddEmpIpLimit(vo);    			
    		}else{
    			message = "����ʧ��,�������Ͳ���";
    		}
    		
    	}catch(DataAccessException e){
    		 message = "����ʧ��--"+e.getMessage();
    		 SysLog.writeExceptionLogs("IpLimitAction", GlobalParameters.ERROR, "IpLimitAction--doModify()--1:", e);
             throw new ActionException(e);
    	}
    	request.setAttribute("message", message);
    	return this.query(actionMapping ,actionForm,request,response);
    }
    /*
     * ɾ��
     */
    public ActionForward doDelete(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String workNo = request.getParameter("workNo");
    	String ipEndAdd = request.getParameter("ipEndAdd");
    	String ipStartAdd = request.getParameter("ipStartAdd");
    	EmpIpLimitDAO empIpLimitDAO = getEmpIpLimitDAO(request);  
    	String message = "ɾ���ɹ�";
    	try{
    		empIpLimitDAO.doDeleteEmpIpLimit(workNo,ipStartAdd, ipEndAdd);
    	}catch(DataAccessException e){
   		 message = "ɾ��ʧ��--"+e.getMessage();
		 SysLog.writeExceptionLogs("IpLimitAction", GlobalParameters.ERROR, "IpLimitAction--doDelete()--1:", e);
         throw new ActionException(e);
    	}
    	request.setAttribute("message", message);
    	return this.query(actionMapping ,actionForm,request,response);
    }
    //�õ�dao
    private EmpIpLimitDAO getEmpIpLimitDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmpIpLimitDAO empIpLimitDAO = (EmpIpLimitDAO) factory.getInteractionObject("empIpLimitDAO", appContext);
        return empIpLimitDAO;
    }
    private AreaDAO getAreaDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
        return areaDAO;
    }
   
	/**
	 * ��ȡ��֤��Ϣ
	 * @param request
	 * @return
	 */
	protected AuthorizeVO getAuthorize(HttpServletRequest request) {
		return (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
	}
}
