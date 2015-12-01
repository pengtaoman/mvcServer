package com.neusoft.om.action.loginFail;

import com.neusoft.om.dao.loginFail.LoginFailLogDAO;
import com.neusoft.om.dao.loginFail.LoginFailLogQueryVO;
import com.neusoft.tdframework.common.util.GridUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class LoginFailLogQueryAction extends TDDispatchAction
{
  private static int DEFAULT_PAGE_SIZE = 10;

  public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request, HttpServletResponse response) throws ActionException
  {
    String message = "";
    String starttime = request.getParameter("starttime");
    starttime = starttime + " 00:00:00";
    String endtime = request.getParameter("endtime");
    endtime = endtime + " 23:59:59";
    String partMonth = starttime.substring(5, 7);

    String loginId = request.getParameter("loginId").trim();
    LoginFailLogQueryVO vo = new LoginFailLogQueryVO();
    vo.setLoginId(loginId);
    vo.setStartTime(starttime);
    vo.setEndTime(endtime);
    vo.setPartMm(partMonth);
    int totalRows = GridUtil.getTotalRowsFromRequest(request);
    InteractionObjectFactory factory = null;
    AppContext appCtx = null;
    List list = new ArrayList();
    try {
      factory = InteractionObjectFactory.getInstance();
      appCtx = new AppContextImpl();
      appCtx.setApplicationName("home");
      LoginFailLogDAO loginFailLogDAO = (LoginFailLogDAO)factory.getInteractionObject("loginFailLogDAO", appCtx);
      if (totalRows < 0) {
        totalRows = loginFailLogDAO.getLogRowCount(vo);
      }
      int[] startEnd = GridUtil.getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE, 1);
      if (totalRows > 0) {
        list = loginFailLogDAO.getLogList(vo, startEnd[0], startEnd[1]);
      }
      if (list.isEmpty())
        message = "没有您要查找的日志信息";
    }
    catch (DataAccessException e) {
      SysLog.writeLogs("om", "ERROR", "LoginFailLogQueryAction--query:" + e.getMessage());
      message = "查询失败!" + e.getMessage();
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "LoginFailLogQueryAction--query:" + e.getMessage());
      message = "查询失败!" + e.getMessage();
    }
    request.setAttribute("totalRows", new Integer(totalRows));
    request.setAttribute("Message", message);
    request.setAttribute("LogList", list);

    return actionMapping.findForward("query");
  }
}