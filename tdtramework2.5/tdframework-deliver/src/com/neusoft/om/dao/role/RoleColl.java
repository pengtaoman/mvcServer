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
	 * 根据行号获取
	 * @param index
	 */
	public RoleVO getRole(int index) {
		return (RoleVO)getElement(index);
	}
	
	/**
	 * 根据角色标识查询角色
	 * @param roleId
	 * @return
	 */
	public RoleVO getRoleById(int roleId) {
		return (RoleVO)getElement(new Integer(roleId));
	}
	
	/**
	 * 判断是否相应角色标识的角色
	 * @param roleId
	 * @return
	 */
	public boolean isExists(int roleId) {
		if(getElement(new Integer(roleId))!=null) return true;
		else return false;
	}
}

