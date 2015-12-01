/**
 * 文件说明信息
 */
package com.neusoft.om.action.loginuserlist;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.LoginUserListBO;
import com.neusoft.om.dao.loginuserlist.LoginUserListVO;
import com.neusoft.tdframework.action.TDServletWrapper;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.DateUtil;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;

/**<p>Module: </p>
 * <p>Description: </p>
 * <p>Remark: </p>
 * <p>Date: 2010-06-12</p>
 *
 * @author liushen
 * @version
 * 
 * <p> 修改历史</p>
 * <p> 序号 日期 修改人 修改原因</p>
 * 
 */
public class LoginUserListAction extends TDDispatchAction {
    // 默认显示行数
    private static int DEFAULT_PAGE_SIZE = 5;
    
    /**
     * 初始化查询页面
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws ActionException 
     * @throws Exception
     */
    public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	
    	LoginUserListBO loginUserListBO = (LoginUserListBO) getServiceFacade("loginUserListBO", mapping);
    	 // 区域集合
        ParamObjectCollection areaCollection = null;
		AuthorizeVO vo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String cityCode = vo.getCityCode();
		int cityLevel = vo.getAreaLevel();
		String beginDate = DateUtil.getDate().substring(0,8)+"01";
		String endDate = DateUtil.getDate().substring(0,10);

        try {
            areaCollection = loginUserListBO.getAreaCollection(cityCode, cityLevel);
        } catch (ServiceException e) {
            SysLog.writeLogs("loginUserList", GlobalParameters.ERROR, "LoginUserListAction--init-1:" + e.getMessage());
            throw new ActionException(e);
        }
		
		request.setAttribute("AreaColl", areaCollection);
		request.setAttribute("cityCode", cityCode);
		request.setAttribute("beginDate",beginDate);
		request.setAttribute("endDate",endDate);
    	return mapping.findForward("query");
    }
    
    /**
     * 查询列表
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    public ActionForward getList(ActionMapping mapping, ActionForm form, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        // 查询结果列表
        List loginUserList = null;
        // 查询条件：登录帐号
        String workNo = NullProcessUtil.nvlToString(request.getParameter("workNo"), "");
        // 查询条件：IP地址
        String ipAddress = NullProcessUtil.nvlToString(request.getParameter("ipAddress"), "");
        // 查询条件：开始登录时间
        String beginTime = NullProcessUtil.nvlToString(request.getParameter("beginLoginTime"), "");
        // 查询条件：结束登录时间
        String endTime = NullProcessUtil.nvlToString(request.getParameter("endLoginTime"), "");
        // 查询条件：月份
        int partMonth = Integer.parseInt(beginTime.substring(5, 7));
        // 查询条件: 区域
        String areaCode = NullProcessUtil.nvlToString(request.getParameter("area"), "");

        //查询条件VO对象
        LoginUserListVO loginUserListVO = new LoginUserListVO();
        loginUserListVO.setPartMm(partMonth);
        loginUserListVO.setPartCity(areaCode);
        loginUserListVO.setPersonId(workNo);
        loginUserListVO.setIpAddress(ipAddress);
        loginUserListVO.setLoginTime(beginTime);
        loginUserListVO.setLogoutTime(endTime);

        LoginUserListBO loginUserListBO = (LoginUserListBO) getServiceFacade("loginUserListBO", mapping);
        // 查询总行数
        int totalRows = getTotalRowsFromRequest(request);
        try {
            if (totalRows < 0) {
                // 从数据库取得总行数
                totalRows = loginUserListBO.getLoginUserListCount(loginUserListVO);
            }
            // 得到当页显示的起始行数和结束行数
            int[] startEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
                // 获取查询集
            	loginUserList = loginUserListBO.getLoginUserList(loginUserListVO, startEnd[0], startEnd[1]);
            }
        } catch (ServiceException e) {
            SysLog.writeLogs("getUserList", GlobalParameters.ERROR, "LoginUserListAction--doQuery-1:" + e.getMessage());
            throw new ActionException(e);
        }
        // 返回列表
        request.setAttribute("loginUserList", loginUserList);
        // 设置查询总条数
        request.setAttribute("totalRows", new Integer(totalRows));

        return mapping.findForward("list");
    }
    
    /**
     * 查看登录人员详细信息
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    public String getDetail(TDServletWrapper servletWrapper) throws ActionException {
        LoginUserListBO loginUserListBO = (LoginUserListBO) getServiceFacade("loginUserListBO", servletWrapper.getMapping());

        //获取页面输入的值
        String id = NullProcessUtil.nvlToString((String) servletWrapper.getParameter("id"), "");

        //查询条件VO对象
        LoginUserListVO loginUserListVO = new LoginUserListVO();
        loginUserListVO.setId(id);
        try {
        	loginUserListVO = loginUserListBO.getDetailById(loginUserListVO);
        } catch (ServiceException e) {
            SysLog.writeLogs("loginUserList", GlobalParameters.ERROR, "LoginUserListAction--getDetail-1:" + e.getMessage());
            throw new ActionException(e);
        }
        servletWrapper.setAttribute("loginUserListVO", loginUserListVO);
        return "detail";
    }
    /**
     * 导出登录人员信息
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    public ActionForward doDirectExportCSV(ActionMapping mapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException, Exception {
        // 提取查询条件
    	LoginUserListBO loginUserListBO = (LoginUserListBO) getServiceFacade("loginUserListBO", mapping);
    	 // 查询结果列表
        List loginUserList = null;
        // 查询条件：登录帐号
        String workNo = NullProcessUtil.nvlToString(request.getParameter("workNo"), "");
        // 查询条件：IP地址
        String ipAddress = NullProcessUtil.nvlToString(request.getParameter("ipAddress"), "");
        // 查询条件：开始登录时间
        String beginTime = NullProcessUtil.nvlToString(request.getParameter("beginLoginTime"), "");
        // 查询条件：结束登录时间
        String endTime = NullProcessUtil.nvlToString(request.getParameter("endLoginTime"), "");
        // 查询条件：月份
        int partMonth = Integer.parseInt(beginTime.substring(5, 7));
        // 查询条件: 区域
        String areaCode = NullProcessUtil.nvlToString(request.getParameter("area"), "");
        // 把导出的参数放入 map 中 
		Map dataMap = new HashMap();
		dataMap.put("workNo",workNo);
		dataMap.put("ipAddress",ipAddress);
		dataMap.put("beginLoginTime",beginTime);
		dataMap.put("endLoginTime",endTime);
		dataMap.put("areaCode",areaCode);
		
        beforeDirectExport(request, response);

        loginUserListBO.exportAllLoginUserColl(dataMap, response.getOutputStream());

        afterDirectExport(request, response);

        return null;
    }
}
