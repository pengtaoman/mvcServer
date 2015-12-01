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
 * <p>Description: �������ģ��webPath </p>
 * <p>Remark: </p>
 * <p>Date: 2008-03-04</p>
 *
 * @author zhuguojun@neusoft.com
 * @version 1.0
 * 
 * <p> �޸���ʷ</p>
 * <p> ��� ���� �޸��� �޸�ԭ��</p>
 * 
 */
public class DoubleScreenAction extends TDDispatchAction {
    
	/**
	 * <p>Description:�ֲ�ˢ�£���ȡ������ʾģ��webpath���û��������롢�Ƿ�֧��˫����ʶ</p>
	 * <p>Remark: zhuguojun@neusoft.com</p>
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return �磺1~http://127.0.0.1:8080/assistsell/
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
		String localPath = "";//·��  ��: http://127.0.0.1:8088
		String container = "";//Ӧ�� �磺/crm1
		String param = "";
		String userName = userVO.getWorkNo();//����Ա���û���
		String userPassWord = PassWord.decode(userVO.getWorkPwd());//����Ա������
		String returnValue = "";
		String double_flag = "0";//�Ƿ�֧��˫�� 0 ��֧��  1 ֧��
		try {
			/*�õ�����·��*/
			localPath = request.getScheme()+"://"+ request.getServerName() + ":" +  request.getServerPort();
			container = containerDAO.getAppContainer(7);//˫��Ӧ��
			path = localPath + container;
			param = "&j_username="+userName+"&j_password="+userPassWord+"&webPath="+path;
			returnValue = path + "servicePromptAction.do?method=showServicePrompt" + param;
			/*�õ��Ƿ�֧��˫��*/
			double_flag = NullProcessUtil.nvlToString(request.getSession().getAttribute("double_flag"),"0");
			returnValue = double_flag + "~" + returnValue;
		} catch (Exception e) {
			SysLog.writeExceptionLogs("BSS", GlobalParameters.ERROR,
					"DoubleScreenAction--getServicePromptPath:", e);
		}
		response.getWriter().write(returnValue);// ���ر�ʶ
	}
}
