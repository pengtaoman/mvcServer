/*
 * Created on Dec 28, 2005
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.authorization;
import java.util.Iterator;
import java.util.Vector;

import net.sf.acegisecurity.GrantedAuthority;
import net.sf.acegisecurity.UserDetails;
import net.sf.acegisecurity.providers.dao.AuthenticationDao;
import net.sf.acegisecurity.providers.dao.UsernameNotFoundException;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.dao.DataAccessException;

import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.om.omutil.PassWord;
import com.neusoft.tdframework.common.util.StringUtil;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.service.org.Org;
import com.neusoft.unieap.service.security.providers.dao.SecurityRoleImpl;
import com.neusoft.unieap.service.security.providers.dao.SecurityUser;

import org.springframework.jdbc.support.nativejdbc.NativeJdbcExtractor;
/**
 * @author shark
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class UnieapOrgDaoImpl implements AuthenticationDao, InitializingBean {

	private Org org = null;

	public void afterPropertiesSet() throws Exception {

	}

	/**
	 * 通过用户名取得安全用户SecurityUser
	 * 
	 * @see net.sf.acegisecurity.providers.dao.AuthenticationDao#loadUserByUsername(java.lang.String)
	 */
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException {

		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		EmployeeManagementBO employeeFacade = (EmployeeManagementBO) factory.getInteractionObject("employeeManagementFacade", appContext);
		EmployeeVO employeeVO = null;
		RoleColl roles = null;
		String workno = null;
		String password = null;
		//String cName = StringUtil.convertToChinese(username);
		
		try {
			employeeVO = employeeFacade.getEmployeeByWorkNo(username);
			//Add by zhouty 20060227 begin:
			if (employeeVO == null){
				GrantedAuthority[] ga = new GrantedAuthority[0];
				SecurityUser us = null;
//				try {
//					us = new SecurityUser(null, null, false, false, false, false, ga);
//				}catch (IllegalArgumentException e){
//					e.printStackTrace();
//				}
				return us;
			}
			//Add by zhouty 20060227 end.
			String employeeId = employeeVO.getEmployeeId();
			roles = employeeFacade.getPermmitedRoleColl(employeeId);
		} catch (ServiceException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}	
		Vector temp = new Vector();
		/*
		for (Iterator iter = roles.getList().iterator(); iter.hasNext();) {
			RoleVO element = (RoleVO) iter.next();
			if (!temp.contains(element)) {
				if (element != null )
					temp.add(new SecurityRoleImpl(String.valueOf(element.getRoleId())));
			}
		}
		*/
		/*
		if (org == null)
		{
			try {
				org = OrgFactory.getOrgFactory().getOrg();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new DataAccessResourceFailureException("org");
			}
		}
		
		Person ps = org.getPsnByAccount(username);
		if (ps == null)
			throw new UsernameNotFoundException(username);
		Vector vt = org.getRolesByPsnID(ps.getID());

		for (Iterator iter = vt.iterator(); iter.hasNext();) {
			Role element = (Role) iter.next();
			if (!temp.contains(element)) {
				if (element != null && element.getID() != null)
					temp.add(new SecurityRoleImpl(element.getID()));
			}
		}
		*/
		// temp.add(new SecurityRoleImpl(ps.getID()));// 加入人员,基于角色的系统，需要把这句去除
		
		if(employeeVO != null ){
        		temp.add(new SecurityRoleImpl(employeeVO.getEmployeeId()));// 加入人员
        	}
		GrantedAuthority[] ga = new GrantedAuthority[temp.size()];
		int i = 0;
		for (Iterator iter = temp.iterator(); iter.hasNext();) {
			GrantedAuthority element = (GrantedAuthority) iter.next();
			ga[i++] = element;
		}

		SecurityUser us = new SecurityUser(employeeVO.getWorkNo(), PassWord.decode(employeeVO.getWorkPwd()),
				true, true, true, true, ga);
		
		return us;
	}
	
}
