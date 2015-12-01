package com.neusoft.om.action.doublescreen;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.appcontainer.AppContainerDAO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.PassWord;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.config.SystemConfig;

/**<p>Module:</p>
 * <p>Description: 获得外屏模块webPath </p>
 * <p>Remark: </p>
 * <p>Date: 2008-03-04</p>
 *
 * @author zhuguojun@neusoft.com
 * @version 1.0
 * 
 * <p> 修改历史</p>
 * <p> 序号 日期 修改人 修改原因</p>
 * 
 */
public class DoubleScreenAction extends TDDispatchAction {
    
	/**
	 * <p>Description:局部刷新，获取外屏提示模块webpath及用户名、密码、是否支持双屏标识</p>
	 * <p>Remark: zhuguojun@neusoft.com</p>
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return 如：1~http://127.0.0.1:8080/assistsell/
	 * @throws ServiceException
	 * @throws IOException
	 */
	public void getServicePromptPath(ActionMapping mapping, ActionForm form,
            HttpServletRequest request,
            HttpServletResponse response) throws IOException, ActionException {
		response.setContentType(SystemConfig.CONTENT_TYPE);
		AppContainerDAO containerDAO = (AppContainerDAO)getServiceFacade("containerDAO", mapping);
		AuthorizeVO userVO = ((AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO));
		String path = "";
		String localPath = "";//路径  如: http://127.0.0.1:8088
		String container = "";//应用 如：/crm1
		String param = "";
		String userName = userVO.getWorkNo();//操作员的用户名
		String userPassWord = PassWord.decode(userVO.getWorkPwd());//操作员的密码
		String returnValue = "";
		String double_flag = "0";//是否支持双屏 0 不支持  1 支持
		try {
			/*得到基本路径*/
			localPath = request.getScheme()+"://"+ request.getServerName() + ":" +  request.getServerPort();
			container = containerDAO.getAppContainer(7);//双屏应用
			path = localPath + container;
			param = "&j_username="+userName+"&j_password="+userPassWord+"&webPath="+path;
			returnValue = path + "servicePromptAction.do?method=showServicePrompt" + param;
			/*得到是否支持双屏*/
			double_flag = NullProcessUtil.nvlToString(request.getSession().getAttribute("double_flag"),"0");
			returnValue = double_flag + "~" + returnValue;
		} catch (Exception e) {
			SysLog.writeExceptionLogs("BSS", GlobalParameters.ERROR,
					"DoubleScreenAction--getServicePromptPath:", e);
		}
		response.getWriter().write(returnValue);// 开关标识
	}
}
