package com.neusoft.uniflow.web.management.workdaymgt.forms;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;
/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2004</p>
 * <p>Company: neusoft</p>
 * @author shangzf
 * @version 1.0
 */

public class ScheduleForm extends ActionForm
{
	private static final long serialVersionUID = 12347;
	private String action;
	private String selectedItem="1";
	private boolean ascending = true;
	private Vector list = new Vector(10);
	private int currentPage = 1; //页面数从1开始
	private int pagesCount = 0;
	private int countOfPage = 0;
	private int requestPage = 1;
	private String orderBy = "";
    private int total=0;// add by liwei 2004.12.20
    private String orgunit;
    private String orgunitId;
    private String worktimeType;
    private String workdaycategoryId;
    
    public String getWorktimeType() {
		return worktimeType;
	}
	public void setWorktimeType(String worktimeType) {
		this.worktimeType = worktimeType;
	}
	public String getOrgunitId() {
		return orgunitId;
	}
	public void setOrgunitId(String orgunitId) {
		this.orgunitId = orgunitId;
	}
	public String getOrgunit() {
		return orgunit;
	}
	public void setOrgunit(String orgunit) {
		this.orgunit = orgunit;
	}
	public void setTotal(int t){
    	this.total =t ;
    }
    public int getTotal(){
    	return this.total;
    }
	public String getAction()
	{
		return action;
	}

	public void setAction(String action)
	{
		this.action = action;
	}

	public Vector getList()
	{
		return list;
	}

	public void setList(Vector list)
	{
		this.list = list;
	}

	public String getSelectedItem()
	{
		return selectedItem;
	}

	public void setSelectedItem(String selectedItem)
	{
		this.selectedItem = selectedItem;
	}

	public boolean isAscending()
	{
		return ascending;
	}

	public boolean getAscending()
	{
		return ascending;
	}

	public void setAscending(boolean ascending)
	{
		this.ascending = ascending;
	}

	public int getCountOfPage()
	{
		return countOfPage;
	}

	public void setCountOfPage(int countOfPage)
	{
		this.countOfPage = countOfPage;
	}

	public int getCurrentPage()
	{
		return currentPage;
	}

	public void setCurrentPage(int currentPage)
	{
		this.currentPage = currentPage;
	}

	public String getOrderBy()
	{
		return orderBy;
	}

	public void setOrderBy(String orderBy)
	{
		this.orderBy = orderBy;
	}

	public int getPagesCount()
	{
		return pagesCount;
	}

	public void setPagesCount(int pagesCount)
	{
		this.pagesCount = pagesCount;
	}

	public int getRequestPage()
	{
		return requestPage;
	}

	public void setRequestPage(int requestPage)
	{
		this.requestPage = requestPage;
	}

	public ActionErrors validate(ActionMapping actionMapping,
										  HttpServletRequest httpServletRequest)
	{
		/**@todo: finish this method, this is just the skeleton.*/
		return null;
	}
	
	public String getWorkdaycategoryId() {
		return workdaycategoryId;
	}
	public void setWorkdaycategoryId(String workdaycategoryId) {
		this.workdaycategoryId = workdaycategoryId;
	}
	public void reset(ActionMapping actionMapping,
							HttpServletRequest httpServletRequest)
	{
		list = new Vector(10, 5);
		currentPage = 1;
		pagesCount = 0;
		countOfPage = 0;
		requestPage = 1;
		orderBy = "";
		selectedItem = "";
		ascending = true;

	}
}