package com.neusoft.om.dao.role;

import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.tdframework.common.data.ObjectCollection;


/**
 * Title: RoleColl
 * Description: 
 * Company: neusoft
 * Date: 2004-12-08
 * @author renh
 * @version 
 */
public class RoleColl extends ObjectCollection {

	public void addRole(RoleVO vo){
		addElement(vo);
		addElement(new Integer(vo.getRoleId()),vo);
	}
	/**
	 * �����кŻ�ȡ
	 * @param index
	 */
	public RoleVO getRole(int index) {
		return (RoleVO)getElement(index);
	}
	
	/**
	 * ���ݽ�ɫ��ʶ��ѯ��ɫ
	 * @param roleId
	 * @return
	 */
	public RoleVO getRoleById(int roleId) {
		return (RoleVO)getElement(new Integer(roleId));
	}
	
	/**
	 * �ж��Ƿ���Ӧ��ɫ��ʶ�Ľ�ɫ
	 * @param roleId
	 * @return
	 */
	public boolean isExists(int roleId) {
		if(getElement(new Integer(roleId))!=null) return true;
		else return false;
	}
}

