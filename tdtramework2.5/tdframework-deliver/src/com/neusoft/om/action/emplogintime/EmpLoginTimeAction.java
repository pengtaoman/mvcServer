package com.neusoft.om.action.emplogintime;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.emplogintime.EmpLoginTimeDAO;
import com.neusoft.om.dao.emplogintime.EmpLoginTimeVO;
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
 * 程序名 :员工登录时间维护action
 * 日期 : 2008-7-9
 * 作者 : zhaof@neusoft.com 
 * 模块 : 框架-权限系统
 * 描述 : OM_EMP_LOGIN_TIME 表的维护 
 * 备注 :
 * 
 * ------------------------------------------------------------
 * 修改历史 序号 日期 修改人
 * 修改原因 1 2
 ******************************************************************************/
public class EmpLoginTimeAction extends TDDispatchAction{
    //查找
    public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	int totalRows = getTotalRowsFromRequest(request);
    	EmpLoginTimeDAO empLoginTimeDAO = getEmpLoginTimeDAO(request);        
        List empLoginTimeList = null;
        int DEFAULT_PAGE_SIZE = 10;        
        try {
            if (totalRows <= 0) {
                totalRows = empLoginTimeDAO.getRowCount();
            }
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
            	empLoginTimeList = empLoginTimeDAO.getEmpLoginTimeList(getStartEnd[0], getStartEnd[1]);
            }
        } catch (DataAccessException e) {
            SysLog.writeExceptionLogs("EmpIpLimitAction", GlobalParameters.ERROR, "EmpIpLimitAction--query()--1:", e);
            throw new ActionException(e);
        }
        request.setAttribute("empLoginTimeList", empLoginTimeList);
        return actionMapping.findForward("list");
    }
    /*
     * 编辑 - 初始化
     */
    public ActionForward modiInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String priWorkNo = NullProcessUtil.nvlToString((String) request.getParameter("priWorkNo"), "");
    	String priLogId = NullProcessUtil.nvlToString((String) request.getParameter("priLogId"), "");
    	String oper = request.getParameter("oper");
    	EmpLoginTimeDAO ipLimitDAO = getEmpLoginTimeDAO(request);  
    	EmpLoginTimeVO empLoginTimeVO = new  EmpLoginTimeVO();
        try {
        	if(oper.trim().equals("modify")){        	
        		empLoginTimeVO = ipLimitDAO.getEmpLoginTimeVO(priLogId,priWorkNo);            	
        	}  
        } catch (DataAccessException e) {
            SysLog.writeExceptionLogs("EmpLoginTimeAction", GlobalParameters.ERROR, "EmpLoginTimeAction--modiInit()--1:", e);
            throw new ActionException(e);
        }
        request.setAttribute("empLoginTimeVO", empLoginTimeVO);        
        request.setAttribute("oper", oper);        
    	return actionMapping.findForward("modify");
    }
    /*
     * 保存
     */
    public ActionForward doModify(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String priLogId = request.getParameter("priLogId");
    	String priWorkNo = request.getParameter("priWorkNo");
    	String logId = request.getParameter("logId");
    	String workNo = request.getParameter("workNo");
    	String startDate = request.getParameter("startDate");
    	String startTime = request.getParameter("startTime");
    	String endDate = request.getParameter("endDate");
    	String endTime = request.getParameter("endTime");
		String forceFlagS = request.getParameter("forceFlag");
		String detailDesc = request.getParameter("detailDesc");
		AuthorizeVO authVO = getAuthorize(request);
		String updateEmp = authVO.getEmployeeId();
		String updateOrgan = authVO.getDepartmentId();	
    	String oper = request.getParameter("oper");
    	EmpLoginTimeVO vo = new EmpLoginTimeVO();
    	int forceFlag = 0;
    	if(forceFlagS != null && !forceFlagS.trim().equals("")){
    		forceFlag = Integer.parseInt(forceFlagS);
    	}
    	vo.setLogId(logId);
    	vo.setWorkNo(workNo);
    	vo.setStartDate(startDate);
    	vo.setStartTime(startTime);
    	vo.setEndDate(endDate);
    	vo.setEndTime(endTime);
    	vo.setForceFlag(forceFlag);
    	vo.setDetailDesc(detailDesc);
    	vo.setUpdateEmp(updateEmp);
    	vo.setUpdateOrgan(updateOrgan);    	
    	EmpLoginTimeDAO empLoginTimeDAO = getEmpLoginTimeDAO(request);  
    	String message = "保存成功";
    	try{
    		if(oper != null && oper.equals("modify")){
    			empLoginTimeDAO.doModifyEmpLoginTime(vo, priLogId, priWorkNo);
    		}else if(oper != null && oper.equals("add")){
    			empLoginTimeDAO.doAddEmpLoginTime(vo);    			
    		}else{
    			message = "保存失败,操作类型不详";
    		}
    		
    	}catch(DataAccessException e){
    		 message = "保存失败--"+e.getMessage();
    		 SysLog.writeExceptionLogs("EmpLoginTimeAction", GlobalParameters.ERROR, "EmpLoginTimeAction--doModify()--1:", e);
             throw new ActionException(e);
    	}
    	request.setAttribute("message", message);
    	return this.query(actionMapping ,actionForm,request,response);
    }
    /*
     * 删除
     */
    public ActionForward doDelete(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	String workNo = request.getParameter("priWorkNo");
    	String logId = request.getParameter("priLogId");
    	EmpLoginTimeDAO empLoginTimeDAO = getEmpLoginTimeDAO(request);  
    	String message = "删除成功";
    	try{
    		empLoginTimeDAO.doDeleteEmpLoginTime(logId, workNo);
    	}catch(DataAccessException e){
   		 message = "删除失败--"+e.getMessage();
		 SysLog.writeExceptionLogs("EmpLoginTimeAction", GlobalParameters.ERROR, "EmpLoginTimeAction--doDelete()--1:", e);
         throw new ActionException(e);
    	}
    	request.setAttribute("message", message);
    	return this.query(actionMapping ,actionForm,request,response);
    }
    //得到dao
    private EmpLoginTimeDAO getEmpLoginTimeDAO(HttpServletRequest request){    	
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmpLoginTimeDAO empLoginTimeDAO = (EmpLoginTimeDAO) factory.getInteractionObject("empLoginTimeDAO", appContext);
        return empLoginTimeDAO;
    }
   
	/**
	 * 获取认证信息
	 * @param request
	 * @return
	 */
	protected AuthorizeVO getAuthorize(HttpServletRequest request) {
		return (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
	}
}
