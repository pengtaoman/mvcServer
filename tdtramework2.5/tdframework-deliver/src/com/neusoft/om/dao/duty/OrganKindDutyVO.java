/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.dao.duty;

import com.neusoft.tdframework.common.data.BaseVO;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OrganKindDutyVO extends BaseVO {
	private int organKind;
	private int areaLevel;
	private String kindDesc;
	private int parentOrganKind;
	private int organKindLevel;
	private DutyColl dutyColl;
	
	/**
	 * 设置组织机构类型
	 * @param organKind
	 */
	public void setOrganKind(int organKind){
		this.organKind = organKind;
	}
	/**
	 * 设置区域级别
	 * @param arealevel
	 */
	public void setAreaLevel(int arealevel){
		this.areaLevel = arealevel;
	}
	/**
	 * 设置描述信息
	 * @param kindDesc
	 */
	public void setKindDesc(String kindDesc){
		this.kindDesc = kindDesc;
	}
	/**
	 * 设置职务集合信息
	 * @param coll
	 */
	public void setDutyColl(DutyColl coll) {
		this.dutyColl = coll;
	}
	
	public int getOrganKind() {
		return organKind;
	}
	
	public int getAreaLevel() {
		return areaLevel;
	}
	
	public String getKindDesc() {
		return kindDesc;
	}
	
	public DutyColl getDutyColl() {
		return dutyColl;
	}
	/**
	 * @return
	 */
	public int getOrganKindLevel() {
		return organKindLevel;
	}

	/**
	 * @return
	 */
	public int getParentOrganKind() {
		return parentOrganKind;
	}

	/**
	 * @param string
	 */
	public void setOrganKindLevel(int kindLevel) {
		organKindLevel = kindLevel;
	}

	/**
	 * @param string
	 */
	public void setParentOrganKind(int kindLevel) {
		parentOrganKind = kindLevel;
	}

}
