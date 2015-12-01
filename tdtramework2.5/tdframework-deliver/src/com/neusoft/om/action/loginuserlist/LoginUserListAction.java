/**
 * �ļ�˵����Ϣ
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
 * <p> �޸���ʷ</p>
 * <p> ��� ���� �޸��� �޸�ԭ��</p>
 * 
 */
public class LoginUserListAction extends TDDispatchAction {
    // Ĭ����ʾ����
    private static int DEFAULT_PAGE_SIZE = 5;
    
    /**
     * ��ʼ����ѯҳ��
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
    	 // ���򼯺�
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
     * ��ѯ�б�
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
        // ��ѯ����б�
        List loginUserList = null;
        // ��ѯ��������¼�ʺ�
        String workNo = NullProcessUtil.nvlToString(request.getParameter("workNo"), "");
        // ��ѯ������IP��ַ
        String ipAddress = NullProcessUtil.nvlToString(request.getParameter("ipAddress"), "");
        // ��ѯ��������ʼ��¼ʱ��
        String beginTime = NullProcessUtil.nvlToString(request.getParameter("beginLoginTime"), "");
        // ��ѯ������������¼ʱ��
        String endTime = NullProcessUtil.nvlToString(request.getParameter("endLoginTime"), "");
        // ��ѯ�������·�
        int partMonth = Integer.parseInt(beginTime.substring(5, 7));
        // ��ѯ����: ����
        String areaCode = NullProcessUtil.nvlToString(request.getParameter("area"), "");

        //��ѯ����VO����
        LoginUserListVO loginUserListVO = new LoginUserListVO();
        loginUserListVO.setPartMm(partMonth);
        loginUserListVO.setPartCity(areaCode);
        loginUserListVO.setPersonId(workNo);
        loginUserListVO.setIpAddress(ipAddress);
        loginUserListVO.setLoginTime(beginTime);
        loginUserListVO.setLogoutTime(endTime);

        LoginUserListBO loginUserListBO = (LoginUserListBO) getServiceFacade("loginUserListBO", mapping);
        // ��ѯ������
        int totalRows = getTotalRowsFromRequest(request);
        try {
            if (totalRows < 0) {
                // �����ݿ�ȡ��������
                totalRows = loginUserListBO.getLoginUserListCount(loginUserListVO);
            }
            // �õ���ҳ��ʾ����ʼ�����ͽ�������
            int[] startEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
                // ��ȡ��ѯ��
            	loginUserList = loginUserListBO.getLoginUserList(loginUserListVO, startEnd[0], startEnd[1]);
            }
        } catch (ServiceException e) {
            SysLog.writeLogs("getUserList", GlobalParameters.ERROR, "LoginUserListAction--doQuery-1:" + e.getMessage());
            throw new ActionException(e);
        }
        // �����б�
        request.setAttribute("loginUserList", loginUserList);
        // ���ò�ѯ������
        request.setAttribute("totalRows", new Integer(totalRows));

        return mapping.findForward("list");
    }
    
    /**
     * �鿴��¼��Ա��ϸ��Ϣ
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

        //��ȡҳ�������ֵ
        String id = NullProcessUtil.nvlToString((String) servletWrapper.getParameter("id"), "");

        //��ѯ����VO����
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
     * ������¼��Ա��Ϣ
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
        // ��ȡ��ѯ����
    	LoginUserListBO loginUserListBO = (LoginUserListBO) getServiceFacade("loginUserListBO", mapping);
    	 // ��ѯ����б�
        List loginUserList = null;
        // ��ѯ��������¼�ʺ�
        String workNo = NullProcessUtil.nvlToString(request.getParameter("workNo"), "");
        // ��ѯ������IP��ַ
        String ipAddress = NullProcessUtil.nvlToString(request.getParameter("ipAddress"), "");
        // ��ѯ��������ʼ��¼ʱ��
        String beginTime = NullProcessUtil.nvlToString(request.getParameter("beginLoginTime"), "");
        // ��ѯ������������¼ʱ��
        String endTime = NullProcessUtil.nvlToString(request.getParameter("endLoginTime"), "");
        // ��ѯ�������·�
        int partMonth = Integer.parseInt(beginTime.substring(5, 7));
        // ��ѯ����: ����
        String areaCode = NullProcessUtil.nvlToString(request.getParameter("area"), "");
        // �ѵ����Ĳ������� map �� 
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
