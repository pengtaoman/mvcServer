package com.neusoft.om.action.iplimit;

import java.util.List;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.iplimit.IpLimitDAO;
import com.neusoft.om.dao.iplimit.IpLimitVO;
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
public class IpLimitAction extends TDDispatchAction {
    //����
    public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	int totalRows = getTotalRowsFromRequest(request);
    	IpLimitDAO ipLimitDAO = getIpLimitDAO(request);        
        List ipLimitList = null;
        int DEFAULT_PAGE_SIZE = 10;        
        try {
            if (totalRows <= 0) {
                totalRows = ipLimitDAO.getRowCount();
            }
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
            	ipLimitList = ipLimitDAO.getIpLimitList(getStartEnd[0], getStartEnd[1]);
            }
        } catch (DataAccessException e) {
            SysLog.writeExceptionLogs("IpLimitAction", GlobalParameters.ERROR, "IpLimitAction--query()--1:", e);
            throw new ActionException(e);
        }
        request.setAttribute("ipLimitList", ipLimitList);
        return actionMapping.findForward("list");
    }
    /*
     * �༭ - ��ʼ��
     */
    public ActionForward modiInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String ipStartAdd = NullProcessUtil.nvlToString((String) request.getParameter("ipStartAdd"), "");
    	String ipEndAdd = NullProcessUtil.nvlToString((String) request.getParameter("ipEndAdd"), "");
    	String oper = request.getParameter("oper");
    	IpLimitDAO ipLimitDAO = getIpLimitDAO(request);  
        IpLimitVO ipLimitVO = new  IpLimitVO();
        AreaDAO areaDAO = getAreaDAO(request);
        AuthorizeVO authVO = getAuthorize(request);
        String authareaId = authVO.getAreaId();
        Vector areaColl = areaDAO.getAllAreaInfo(authareaId, 4); 
        try {
        	if(oper.trim().equals("modify")){        	
            	ipLimitVO = ipLimitDAO.getIpLimitVO(ipStartAdd,ipEndAdd);            	
        	}  
        } catch (DataAccessException e) {
            SysLog.writeExceptionLogs("IpLimitAction", GlobalParameters.ERROR, "IpLimitAction--modiInit()--1:", e);
            throw new ActionException(e);
        }
        request.setAttribute("ipLimitVO", ipLimitVO);        
        request.setAttribute("oper", oper);
        request.setAttribute("areaTree", areaColl);
        
    	return actionMapping.findForward("modify");
    }
    public ActionForward organTree(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws java.lang.Exception{
    	String areaId = request.getParameter("areaId");
    	String ipStartAdd = request.getParameter("ipStartAdd");
    	String ipEndAdd = request.getParameter("ipEndAdd");
    	OrganDAO organDAO = getOrganDAO(request);
    	IpLimitDAO limitDAO = getIpLimitDAO(request);
    	IpLimitVO ipLimitVO =new IpLimitVO(); 
    	if(ipStartAdd != null && !ipStartAdd.equals("") && !ipStartAdd.equals("null") 
    			&& ipEndAdd != null && !ipEndAdd.equals("") && !ipEndAdd.equals("null")){
    		ipLimitVO = limitDAO.getIpLimitVO(ipStartAdd, ipEndAdd);
    	}
    	Vector organTree = organDAO.getOrgsByAreaId(areaId);
    	request.setAttribute("organTree",organTree);
    	request.setAttribute("organId",ipLimitVO.getOrganId());
    	request.setAttribute("organName", ipLimitVO.getOrganName());
    	int a = organTree.size();
    	return mapping.findForward("organTree");
    }
    /*
     * ����
     */
    public ActionForward doModify(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String priStartAdd = request.getParameter("priStartAdd");
    	String priEndAdd = request.getParameter("priEndAdd");
    	String ipStartAdd = request.getParameter("ipStartAdd");
    	String ipEndAdd = request.getParameter("ipEndAdd");
    	String terminal = request.getParameter("terminal");
		String loginFlagS = request.getParameter("loginFlag");
		String areaId = request.getParameter("areaId");
		String organId = request.getParameter("organId");
		String forceFlagS = request.getParameter("forceFlag");
		String detailDesc = request.getParameter("detailDesc");
		AuthorizeVO authVO = getAuthorize(request);
		String updateEmp = authVO.getEmployeeId();
		String updateOrgan = authVO.getOrganID();	
    	String oper = request.getParameter("oper");
    	IpLimitVO vo = new IpLimitVO();
    	int loginFlag = 0;
    	int forceFlag = 0;
    	if(loginFlagS != null && !loginFlagS.trim().equals("")){
    		loginFlag = Integer.parseInt(loginFlagS);
    	}
    	if(forceFlagS != null && !forceFlagS.trim().equals("")){
    		forceFlag = Integer.parseInt(forceFlagS);
    	}
    	vo.setIpStartAdd(ipStartAdd);
    	vo.setIpEndAdd(ipEndAdd);
    	vo.setTerminal(terminal);
    	vo.setLoginFlag(loginFlag);
    	vo.setAreaId(areaId);
    	vo.setOrganId(organId);
    	vo.setForceFlag(forceFlag);
    	vo.setDetailDesc(detailDesc);
    	vo.setUpdateEmp(updateEmp);
    	vo.setUpdateOrgan(updateOrgan);    	
    	IpLimitDAO ipLimitDAO = getIpLimitDAO(request);  
    	String message = "����ɹ�";
    	try{
    		if(oper != null && oper.equals("modify")){
    			ipLimitDAO.doModifyIpLimit(vo, priStartAdd,priEndAdd);
    		}else if(oper != null && oper.equals("add")){
    			ipLimitDAO.doAddIpLimit(vo);    			
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
    	String ipEndAdd = request.getParameter("ipEndAdd");
    	String ipStartAdd = request.getParameter("ipStartAdd");
    	IpLimitDAO ipLimitDAO = getIpLimitDAO(request);  
    	String message = "ɾ���ɹ�";
    	try{
    		ipLimitDAO.doDeleteIpLimit(ipStartAdd, ipEndAdd);
    	}catch(DataAccessException e){
   		 message = "ɾ��ʧ��--"+e.getMessage();
		 SysLog.writeExceptionLogs("IpLimitAction", GlobalParameters.ERROR, "IpLimitAction--doDelete()--1:", e);
         throw new ActionException(e);
    	}
    	request.setAttribute("message", message);
    	return this.query(actionMapping ,actionForm,request,response);
    }
    //�õ�dao
    private IpLimitDAO getIpLimitDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        IpLimitDAO ipLimitDAO = (IpLimitDAO) factory.getInteractionObject("ipLimitDAO", appContext);
        return ipLimitDAO;
    }
    private AreaDAO getAreaDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
        return areaDAO;
    }
    private OrganDAO getOrganDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        OrganDAO organDAO = (OrganDAO) factory.getInteractionObject("organDAO", appContext);
        return organDAO;
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
