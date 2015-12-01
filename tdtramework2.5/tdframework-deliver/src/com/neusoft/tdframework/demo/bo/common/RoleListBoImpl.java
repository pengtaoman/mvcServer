/*
 * Created on 2006-3-14
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.bo.common;

import java.util.List;

import com.neusoft.tdframework.demo.dao.common.RoleListDao;

/**
 * @author zhangjn
 */
public class RoleListBoImpl implements RoleListBo {
	
	private RoleListDao dao;

	public void setRoleListDao(RoleListDao pdao) {
		dao = pdao;
	}

	public List getRolesByAreaId(String areaId) {
		return dao.getRolesByAreaId(areaId);
	}

}
