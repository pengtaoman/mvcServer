package com.neusoft.uniflow.web.management.statmgt.forms;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class StatisticsForm
    extends ActionForm {
	private static final long serialVersionUID = 1234567834;
	private int currentPage=0;//页面数
	private int countofPage=0;
	private int pagesCount=0;
	private int requestPage=1;//请求页面
	private int total=0;
  private Vector list = new Vector(10, 5);
  public Vector getList() {
    return list;
  }

  public void setList(Vector list) {
    this.list = list;
  }

  public void reset(ActionMapping mapping, HttpServletRequest request) {
    list = new Vector();
    currentPage=1;
    countofPage=0;
    pagesCount=0;
    requestPage=1;
  }

public int getCountofPage() {
	return countofPage;
}

public void setCountofPage(int countofPage) {
	this.countofPage = countofPage;
}

public int getCurrentPage() {
	return currentPage;
}

public void setCurrentPage(int currentPage) {
	this.currentPage = currentPage;
}

public int getPagesCount() {
	return pagesCount;
}

public void setPagesCount(int pagesCount) {
	this.pagesCount = pagesCount;
}

public int getRequestPage() {
	return requestPage;
}

public void setRequestPage(int requestPage) {
	this.requestPage = requestPage;
}

public int getTotal() {
	return total;
}

public void setTotal(int total) {
	this.total = total;
}
  
}