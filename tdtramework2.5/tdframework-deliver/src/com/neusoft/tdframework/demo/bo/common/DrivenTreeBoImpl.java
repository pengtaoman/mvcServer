/*
 * Created on 2006-3-14
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.bo.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import com.neusoft.tdframework.demo.dao.common.DrivenTreeDao;

/**
 * @author zhangjn
 */
public class DrivenTreeBoImpl implements DrivenTreeBo {
	
	private DrivenTreeDao dao;

	public List getRolesByAreaId(String areaId) {
		return new ArrayList();
	}

	public Vector getOrgsByAreaId(String areaId) {
		return dao.getOrgsByAreaId(areaId);
	}

	public void setDrivenTreeDao(DrivenTreeDao pdao) {
		dao = pdao;
	}
}
