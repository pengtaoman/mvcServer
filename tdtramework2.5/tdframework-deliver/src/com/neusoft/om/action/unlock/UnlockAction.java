package com.neusoft.om.action.unlock;

import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.unlock.UnlockDAO;
import com.neusoft.tdframework.authorization.AuthLoginCheckBO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class UnlockAction extends TDDispatchAction
{
  public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request, HttpServletResponse response)
    throws ActionException
  {
    String message = "";
    String workno = "";
    String lockFlag = "0";
    AuthorizeVO authvo = null;
    int areaLevel = 0;
    String areaId = "";
    String areaIdLock = "";
    boolean isNo = false;
    boolean islock = false;
    InteractionObjectFactory factory = null;
    AppContext appCtx = null;
    AppContext appCtx1 = null;
    AuthLoginCheckBO authLoginCheckBO = null;
    UnlockDAO unlockDao = null;
    try {
      workno = request.getParameter("unlockno");
      authvo = (AuthorizeVO)request.getSession().getAttribute("login_info");
      String authCityCode = authvo.getCityCode();
      areaLevel = authvo.getAreaLevel();
      areaId = authvo.getAreaId();
      factory = InteractionObjectFactory.getInstance();
      appCtx = new AppContextImpl();
      appCtx.setApplicationName("home");
      appCtx1 = new AppContextImpl();
      appCtx1.setApplicationName("home");
      authLoginCheckBO = (AuthLoginCheckBO)factory.getInteractionObject("authLoginCheck", appCtx);
      unlockDao = (UnlockDAO)factory.getInteractionObject("unlockDAO", appCtx);
      EmployeeDAO employeeDAO = (EmployeeDAO)factory.getInteractionObject("employeeDAO", appCtx);
      AreaDAO areaDAO = (AreaDAO)factory.getInteractionObject("areaDAO", appCtx);
      isNo = unlockDao.getExistNo(workno.toUpperCase());
      if (!isNo) {
        message = "要解锁的工号不存在！";
        request.setAttribute("message", message);
        request.setAttribute("workno", workno);
        return actionMapping.findForward("success");
      }
      EmployeeVO lockEmpVO = employeeDAO.getEmployeeInfoByWorkNo(workno.toUpperCase());
      areaIdLock = lockEmpVO.getAreaId();
      String lockCityCode = lockEmpVO.getCityCode();
      if (areaLevel > 2) {
        AreaVO lockAreaVO = areaDAO.getAreaById(areaIdLock);
        int lockAreaLevel = lockAreaVO.getAreaLevel();
        if (areaLevel > lockAreaLevel) {
          message = "您的权限不能为该工号解锁！";
          request.setAttribute("message", message);
          request.setAttribute("workno", workno);
          return actionMapping.findForward("success");
        }
        if (!authCityCode.equals(lockCityCode)) {
          message = "您的权限不能为该工号解锁！";
          request.setAttribute("message", message);
          request.setAttribute("workno", workno);
          return actionMapping.findForward("success");
        }

        islock = authLoginCheckBO.isLock(workno.toLowerCase());
        if (!islock) {
          message = "";
          request.setAttribute("message", message);
          request.setAttribute("workno", workno);
          request.setAttribute("lockFlag", lockFlag);
          return actionMapping.findForward("success");
        }
        lockFlag = "1";
        message = "";
        request.setAttribute("message", message);
        request.setAttribute("workno", workno);
        request.setAttribute("lockFlag", lockFlag);
        return actionMapping.findForward("success");
      }

      islock = authLoginCheckBO.isLock(workno.toLowerCase());
      if (!islock) {
        message = "";
        request.setAttribute("message", message);
        request.setAttribute("workno", workno);
        request.setAttribute("lockFlag", lockFlag);
        return actionMapping.findForward("success");
      }
      lockFlag = "1";
      message = "";
      request.setAttribute("message", message);
      request.setAttribute("workno", workno);
      request.setAttribute("lockFlag", lockFlag);
      return actionMapping.findForward("success");
    }
    catch (DataAccessException e)
    {
      SysLog.writeLogs("om", "ERROR", "UnlockAction--query:" + e.getMessage());
      message = "发生异常!" + e.getMessage();
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "UnlockAction--query:" + e.getMessage());
      message = "发生异常!" + e.getMessage();
    }
    request.setAttribute("message", message);
    return actionMapping.findForward("success");
  }

  public ActionForward delLockStatus(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response)
    throws ActionException
  {
    String message = "";
    String workno = "";
    InteractionObjectFactory factory = null;
    AppContext appCtx = null;
    AuthLoginCheckBO authLoginCheckBO = null;
    try {
      workno = request.getParameter("unlockno");
      factory = InteractionObjectFactory.getInstance();
      appCtx = new AppContextImpl();
      appCtx.setApplicationName("");
      authLoginCheckBO = (AuthLoginCheckBO)factory.getInteractionObject("authLoginCheck", appCtx);
      authLoginCheckBO.updateLoginLog(workno.toLowerCase());
      authLoginCheckBO.delLoginCount(workno.toLowerCase());
      message = "解锁成功！";
      request.setAttribute("workno", workno);
    } catch (Exception e) {
      SysLog.writeLogs("om", "ERROR", "UnlockAction--delLockStatus:" + e.getMessage());
      message = "解锁失败!" + e.getMessage();
    }
    request.setAttribute("message", message);
    return mapping.findForward("success");
  }
}