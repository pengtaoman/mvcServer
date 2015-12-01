package com.neusoft.om.action.invpn;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.invpn.IpsInvpnDAO;
import com.neusoft.om.dao.invpn.IpsInvpnVO;
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
 * ������ :������������action
 * ���� : 2008-3-10
 * ���� : zhaof@neusoft.com 
 * ģ�� : ���-Ȩ��ϵͳ
 * ���� : OM_IPS_INVPN_T ���ά�� 
 * ��ע :
 * 
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸���
 * �޸�ԭ�� 1 2
 ******************************************************************************/
public class IpsInvpnAction extends TDDispatchAction {
    //��ʼ������
    public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	int totalRows = getTotalRowsFromRequest(request);
    	String segmentAddress = NullProcessUtil.nvlToString((String) request.getParameter("segmentAddress"), "");
    	String segmentDesc = NullProcessUtil.nvlToString((String) request.getParameter("segmentDesc"), "");
    	if(segmentAddress == null || segmentAddress.trim().equals("")){
    		segmentAddress = (String)request.getAttribute("ipSegmentAddress");
    	}
    	if(segmentAddress == null || segmentAddress.trim().equals("")){
    		segmentAddress = (String)request.getAttribute("ipSegmentDesc");
    	}
    	IpsInvpnDAO ipsInvpnDAO = getInpvnDAO(request);        
        List ipsInvpnList = null;
        int DEFAULT_PAGE_SIZE = 10;        
        try {
            if (totalRows <= 0) {
                totalRows = ipsInvpnDAO.getRowCount(segmentAddress, segmentDesc);
            }
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
            	ipsInvpnList = ipsInvpnDAO.getIpsInvpnList(segmentAddress, segmentDesc, getStartEnd[0], getStartEnd[1]);
            }
        } catch (DataAccessException e) {
            SysLog.writeExceptionLogs("IpsInvpnAction", GlobalParameters.ERROR, "IpsInvpnAction--query()--1:", e);
            throw new ActionException(e);
        }
        request.setAttribute("ipsInvpnList", ipsInvpnList);
        return actionMapping.findForward("list");
    }
    
    public ActionForward modiInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String address = NullProcessUtil.nvlToString((String) request.getParameter("address"), "");
    	IpsInvpnDAO ipsInvpnDAO = getInpvnDAO(request);
        IpsInvpnVO invpnVO = new  IpsInvpnVO();
        
        try {
        	invpnVO = ipsInvpnDAO.getIpsInvpnVO(address);
        } catch (DataAccessException e) {
            SysLog.writeExceptionLogs("IpsInvpnAction", GlobalParameters.ERROR, "IpsInvpnAction--modiInit()--1:", e);
            throw new ActionException(e);
        }
        request.setAttribute("invpnVO", invpnVO);
        String oper = "";
        if(invpnVO == null){
        	oper = "add";
        }else{
        	oper= "modify";
        }
        request.setAttribute("oper", oper);
    	return actionMapping.findForward("modify");
    }
    
    public ActionForward doModify(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String id = request.getParameter("ipSegmentId");
    	String address = request.getParameter("ipSegmentAddress");
    	String desc = request.getParameter("ipSegmentDesc");
    	String priAddress = request.getParameter("priAddress");
    	String oper = request.getParameter("oper");
    	IpsInvpnVO vo = new IpsInvpnVO();
    	vo.setIpSegmentId(id);
    	vo.setIpSegmentAddress(address);
    	vo.setIpSegmentDesc(desc);
    	IpsInvpnDAO ipsInvpnDAO = getInpvnDAO(request);
    	String message = "����ɹ�";
    	try{
    		if(oper != null && oper.equals("modify")){
    			ipsInvpnDAO.doModifyIpsInvpn(vo, priAddress);
    		}else if(oper != null && oper.equals("add")){
    			IpsInvpnVO priVO = ipsInvpnDAO.getIpsInvpnVO(address);
    			if(priVO != null){ //���ݿ����Ѿ����ڴ����εļ�¼�����������
    				message = "����ʧ�ܣ��Ѿ����ڸ���������";
    			}else{
    				ipsInvpnDAO.doAddIpsInvpn(vo);
    			}
    			
    		}else{
    			message = "����ʧ��,�������Ͳ���";
    		}
    		
    	}catch(DataAccessException e){
    		 message = "����ʧ��--"+e.getMessage();
    		 SysLog.writeExceptionLogs("IpsInvpnAction", GlobalParameters.ERROR, "IpsInvpnAction--doModify()--1:", e);
             throw new ActionException(e);
    	}
    	request.setAttribute("message", message);
    	request.setAttribute("ipSegmentAddress", address);
    	return this.query(actionMapping ,actionForm,request,response);
    }
    public ActionForward doDelete(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String address = NullProcessUtil.nvlToString((String) request.getParameter("address"), "");    	
    	String ipSegmentAddress = NullProcessUtil.nvlToString((String) request.getParameter("segmentAddress"), "");//��ѯ����
    	String ipSegmentDesc = NullProcessUtil.nvlToString((String) request.getParameter("segmentDesc"), "");//��ѯ����
    	IpsInvpnDAO ipsInvpnDAO = getInpvnDAO(request);
    	String message = "ɾ���ɹ�";
    	try{
    		ipsInvpnDAO.doDeleteIpsInvpn(address);
    	}catch(DataAccessException e){
   		 message = "ɾ��ʧ��--"+e.getMessage();
		 SysLog.writeExceptionLogs("IpsInvpnAction", GlobalParameters.ERROR, "IpsInvpnAction--doDelete()--1:", e);
         throw new ActionException(e);
    	}
    	request.setAttribute("message", message);
    	request.setAttribute("ipSegmentDesc", ipSegmentDesc);
    	request.setAttribute("ipSegmentAddress", ipSegmentAddress);
    	return this.query(actionMapping ,actionForm,request,response);
    }
    private IpsInvpnDAO getInpvnDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        IpsInvpnDAO ipsInvpnDAO = (IpsInvpnDAO) factory.getInteractionObject("ipsInvpnDAO", appContext);
        return ipsInvpnDAO;
    }
}
