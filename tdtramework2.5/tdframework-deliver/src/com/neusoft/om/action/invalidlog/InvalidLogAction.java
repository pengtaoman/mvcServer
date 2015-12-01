package com.neusoft.om.action.invalidlog;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.invalidlog.InvalidLogColl;
import com.neusoft.om.dao.invalidlog.InvalidLogDAO;
import com.neusoft.om.dao.invalidlog.InvalidLogVO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.GridUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class InvalidLogAction extends TDDispatchAction{
	public static int DEFAULT_PAGE_SIZE = 20;
	
	public ActionForward initQueryPage(ActionMapping mapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response)throws ActionException {
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AuthorizeVO authVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
	    String authId = authVO.getEmployeeId();
	    String authAreaId = authVO.getAreaId();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    AreaDAO areaDAO = (AreaDAO) factory.getInteractionObject("areaDAO", appContext);
	    ParamObjectCollection areaColl = null;
        try {        	
        	areaColl = areaDAO.getAreaCollByEmp(authId);
		} catch (Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"InvalidLogAction--initQueryPage:"+e.getMessage());		
		}
	    request.setAttribute("opAreaId", authAreaId);
	    request.setAttribute("AreaColl", areaColl);
		return mapping.findForward("queryInit");
	}

	
	public ActionForward getInvalidLogInfo(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		String message = "";
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    InvalidLogDAO invalidLogDAO = (InvalidLogDAO) factory.getInteractionObject("invalidLogDAO",appContext);
	    String partCity = request.getParameter("cityId");
	    String startTime = request.getParameter("starttime");
	    String endTime = request.getParameter("endtime");
	    String workNo = request.getParameter("workNo");
	    
	    Map map = new HashMap();
	    map.put("partCity",partCity );
	    map.put("startTime", startTime);
	    map.put("endTime", endTime);
	    map.put("workNo", workNo);
		String queryInfo = "";
        if(partCity != null && !partCity.equals("")){
        	queryInfo += "&cityId="+partCity;
        }
        if(workNo != null && !workNo.equals("")){
        	queryInfo += "&workNo="+workNo;
        }    
        if(startTime != null && !startTime.equals("")){
        	queryInfo += "&startTime="+startTime;
        }
        if(endTime != null && !endTime.equals("")){
        	queryInfo += "&endTime="+endTime;
        }
	    int totalRows = GridUtil.getTotalRowsFromRequest(request);
	    InvalidLogColl logColl = new InvalidLogColl();
	    try{
			if(totalRows<0){
				totalRows = invalidLogDAO.getInvalidLogCount(map);
			}
			int[] startEnd = GridUtil.getStartEnd(request,totalRows,DEFAULT_PAGE_SIZE,1);
			if(totalRows > 0){
				logColl = invalidLogDAO.getInvalidLogColl(map, startEnd[0], startEnd[1]);
			}
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"InvalidLogAction--getInvalidLogInfo:"+e.getMessage());
			message = "查询失败!"+e.getMessage();			
		}	
		if(logColl == null || logColl.getRowCount() == 0){
			message = "没有符合查询条件的日志信息。";
		}
		request.setAttribute("message", message);
		request.setAttribute("logList", logColl.getList());
		request.setAttribute("queryInfo", queryInfo);
        
		return actionMapping.findForward("result");
	}
	public ActionForward doExport(ActionMapping mapping, ActionForm actionForm,HttpServletRequest request,
			HttpServletResponse response) {		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");        
        InvalidLogDAO  invalidLogDAO = (InvalidLogDAO)factory.getInteractionObject("invalidLogDAO", appContext);
        String cityId = request.getParameter("cityId");
        String workNo = request.getParameter("workNo"); 
        String startTime = request.getParameter("startTime"); 
        String endTime = request.getParameter("endTime"); 
	    Map map = new HashMap();
	    map.put("partCity",cityId );
	    map.put("startTime", startTime);
	    map.put("endTime", endTime);
	    map.put("workNo", workNo);
	    
	    InvalidLogColl invalidLogColl = invalidLogDAO.getInvalidLog(map);
	    
		 try {
				response.setContentType("text/plain");
				
				String codedfilename = URLEncoder.encode("工号停用信息.csv","UTF8");
				response.setHeader("Content-Disposition", "attachment;filename=\""+ codedfilename + "\"");
				response.setHeader("Cache-Control","must-revalidate, post-check=0, pre-check=0");
				response.setHeader("Pragma", "public");
			
				ByteArrayOutputStream wb = getTxtFileStream(invalidLogColl);
				wb.writeTo(response.getOutputStream());
				
				response.getOutputStream().flush();
				response.getOutputStream().close();			 

		} catch (Exception e) {
			System.out.println("Error : " + e.toString());
		}    
		
		
		return null;
	}
	private ByteArrayOutputStream getTxtFileStream(InvalidLogColl invalidLogColl) {
		
		ByteArrayOutputStream fos = new ByteArrayOutputStream();
		OutputStreamWriter osw = new OutputStreamWriter(fos);
		java.io.BufferedWriter bw = new BufferedWriter(osw);
		
		try {

			if(invalidLogColl!= null){
				bw.write("工号,停用时间");
				bw.newLine();
				for (short i = 0; i < invalidLogColl.getRowCount(); i++) {
					InvalidLogVO vo = invalidLogColl.getInvalidLogVO(i);
					bw.write(vo.getWorkNo()+","+vo.getTime());
					bw.newLine();
				}
				bw.flush();
				bw.close();
			}		

		} catch (IOException e) {
			e.printStackTrace();
		}
		return fos;
	}
}
