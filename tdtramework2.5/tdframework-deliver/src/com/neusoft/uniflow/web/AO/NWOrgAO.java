/*
 * Copyright 2006 The Neusoft Software Foundation.
 * 
 */
package com.neusoft.uniflow.web.AO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.WorkflowManager;
/**
 * 工作流组织机构接口相关方法
 * 
 * @author shangzf 
 * @version $Revision: 1.1 $ $Date: 2007/11/29 03:37:01 $
 *
 */
public class NWOrgAO {

    private static NWOrgAO instance = null;
    
    private NWOrgAO(){
  	   
    }
    public static NWOrgAO getInstance() {
		if (instance == null)
			instance = new NWOrgAO();
		return instance;
   } 
	/**
	 * 获取登陆系统的用户对象
	 * 
	 * @param request HTTP请求对象
	 * @return NWPerson 工作流定义的人员对象
	 * @throws Exception 调用组织机构方法获取人员对象时如有错误会有异常抛出
	 */
	public NWPerson getLoginUser(HttpServletRequest request) throws Exception{
		HttpSession session = request.getSession();
	    NWOrg org = WorkflowManager.getNWOrg();
	    NWPerson person = org.getPerson((String)session.getAttribute(SessionManager.BIZ_USERID));
		return person;
	}
}
