package com.neusoft.uniflow.web.management.worktimemgt.forms;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;
/**
 * <p>Title: uniflow 4.0 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2004</p>
 * <p>Company: neusoft</p>
 * @author shangzf
 * @version 1.0
 */

public class WorktimeForm extends ActionForm
{
	private static final long serialVersionUID = 12345;
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
    private String categoryId = "";
    private String dayPartId ="";
    private String type = "";
    private String calendarId="";
    public String getDayPartId() {
		return dayPartId;
	}
	public void setDayPartId(String dayPartId) {
		this.dayPartId = dayPartId;
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
	
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	/*public String getScheduleID() {
		return scheduleID;
	}*/
	
	public String getCalendarId() {
		return calendarId;
	}
	public void setCalendarId(String calendarId) {
		this.calendarId = calendarId;
	}
	/*public void setScheduleID(String scheduleID) {
		this.scheduleID = scheduleID;
	}*/
}