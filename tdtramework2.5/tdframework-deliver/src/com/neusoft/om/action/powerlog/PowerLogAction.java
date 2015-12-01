package com.neusoft.om.action.powerlog;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.powerlog.PowerLogColl;
import com.neusoft.om.dao.powerlog.PowerLogDAO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.GridUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class PowerLogAction extends TDDispatchAction{
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
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PowerLogAction--initQueryPage:"+e.getMessage());		
		}
	    ParamObjectCollection  operTypeColl = getOperTypeColl();
	    request.setAttribute("operTypeColl", operTypeColl);
	    request.setAttribute("opAreaId", authAreaId);
	    request.setAttribute("AreaColl", areaColl);
		return mapping.findForward("queryInit");
	}

	
	public ActionForward getPowerLogInfo(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		String message = "";
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    PowerLogDAO powerlogDAO = (PowerLogDAO) factory.getInteractionObject("powerLogDAO",appContext);
	    String partCity = request.getParameter("cityId");
	    String operType = request.getParameter("operType");
	    String startTime = request.getParameter("starttime");
	    String endTime = request.getParameter("endtime");
	    String workNo = request.getParameter("workNo");
	    String operObj = request.getParameter("operObj");
	    
	    Map map = new HashMap();
	    map.put("partCity",partCity );
	    map.put("operType", operType);
	    map.put("startTime", startTime);
	    map.put("endTime", endTime);
	    map.put("workNo", workNo);
	    map.put("operObj",operObj );
	    
	    int totalRows = GridUtil.getTotalRowsFromRequest(request);
	    PowerLogColl logColl = new PowerLogColl();
	    try{
			if(totalRows<0){
				totalRows = powerlogDAO.getMenuCount(map);
			}
			int[] startEnd = GridUtil.getStartEnd(request,totalRows,DEFAULT_PAGE_SIZE,1);
			if(totalRows > 0){
				logColl = powerlogDAO.getMenuPowerLogColl(map, startEnd[0], startEnd[1]);
			}
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"LogQueryAction--getResult:"+e.getMessage());
			message = "查询失败!"+e.getMessage();			
		}	
		if(logColl == null || logColl.getRowCount() == 0){
			message = "没有符合查询条件的日志信息。";
		}
		request.setAttribute("message", message);
		request.setAttribute("logList", logColl.getList());
		return actionMapping.findForward("result");
	}
	
	private ParamObjectCollection getOperTypeColl(){
		ParamObjectCollection coll = new ParamObjectCollection();
		ParamObject obj0 = new ParamObject();
		obj0.setId("0");
		obj0.setName("功能赋权");
		coll.addParamObject(obj0);
		ParamObject obj1 = new ParamObject();
		obj1.setId("1");
		obj1.setName("权限微调");
		coll.addParamObject(obj1);
		return coll;
	}

}
