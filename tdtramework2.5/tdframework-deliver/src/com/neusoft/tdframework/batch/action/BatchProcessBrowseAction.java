package com.neusoft.tdframework.batch.action;

import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.batch.bo.BatchBO;
import com.neusoft.tdframework.batch.util.BatchFileImporter;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

public class BatchProcessBrowseAction extends TDDispatchAction
{
	static int DEFAULT_PAGE_SIZE=5;
	
	public BatchProcessBrowseAction(){
		super();
	}

	public ActionForward init(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request, 
			 HttpServletResponse response)throws ActionException{
		
		//String message = "�ϴ��ļ�״̬��ѯ����";
		//request.setAttribute("message", message);
		return actionMapping.findForward("init");
	}

	/**
	 *���ݿ��ҳ��ѯ����
	 */
	public ActionForward query(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {

		String workNo = NullProcessUtil.nvlToString((String)request.getParameter("workNo"),"");
		if(!workNo.trim().equals("")){
			workNo = workNo.toUpperCase();
		}
		String fileStatus = NullProcessUtil.nvlToString((String)request.getParameter("fileStatus"),"");
		String batchNo = NullProcessUtil.nvlToString((String)request.getParameter("batchNo"),"");

		HashMap mapdata = new HashMap();
		mapdata.put("workNo",workNo);
		mapdata.put("fileStatus",fileStatus);
		mapdata.put("batchNo",batchNo);
		
		//BatchFileImporter f = new BatchFileImporter(mapdata);
		
		List records=null;
		int totalRows = getTotalRowsFromRequest(request);
    	if (totalRows<0){
    		// �����ݿ�ȡ��������
    		//totalRows=getRowCount(request, f);
    		totalRows=getRowCount(request,actionMapping,mapdata);
    	}
		
    	int[] startEnd = getStartEnd(request,totalRows,DEFAULT_PAGE_SIZE);
    	if(totalRows>0){
    		records=queryStatusInfo(actionMapping,mapdata, startEnd[0],startEnd[1]);
    	}
		request.setAttribute("optrs", records);
		request.setAttribute("totalRows",new Integer(totalRows));

		return actionMapping.findForward("query");
	}  
	
/*	*//**
	 * @param request
	 * @param records
	 * @param bo
	 * @return
	 * @throws ActionException
	 *//*
	private int getRowCount(HttpServletRequest request, BatchFileImporter f) 
		throws ActionException {
		int totalRows = 0;
		String message = null;
		
		try{	
			totalRows = f.getRowCount();
			if(totalRows<1){
				message = "û�з�������ѯ���������������ļ�";
			}
		}
		catch(Exception dae)
		{
			throw new ActionException(dae.getMessage());
		}

		request.setAttribute("message",message);
		return totalRows;
	}
*/	private int getRowCount(HttpServletRequest request,ActionMapping actionMapping,HashMap param) throws ActionException {
		int totalRows = 0;
		String message = null;
	
		BatchBO bo = (BatchBO)getServiceFacade("batchFacade",actionMapping);
		try{	
			totalRows = bo.getRowCount(param);
			if(totalRows<1){
				message = "û�з�������ѯ���������������ļ�";
			}
		}
		catch(Exception dae)
		{
			throw new ActionException(dae.getMessage());
		}
	
		request.setAttribute("message",message);
		return totalRows;
	}
	
	public List queryStatusInfo(ActionMapping actionMapping, HashMap param,
			int beginNum,int endNum)throws ActionException{
		
		List result = null;
		BatchBO bo = (BatchBO)getServiceFacade("batchFacade",actionMapping);
		try{	
			result = bo.getStatusInfo(param,beginNum,endNum);
		}catch(ServiceException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"BatchFileManagerAction--queryBatchInfo()-1 :"+e.getMessage());
		}
        return result;
	}
	
}