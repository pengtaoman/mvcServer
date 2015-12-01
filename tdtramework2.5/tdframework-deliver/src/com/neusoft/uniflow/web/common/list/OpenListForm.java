package com.neusoft.uniflow.web.common.list;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class OpenListForm extends ActionForm {
	private static final long serialVersionUID = 123456789;
	private Vector list = new Vector(10, 5);
	private int currentPage = 1; // 页面数从1开始
	private int pagesCount = 0;
	private int countOfPage = 0;
	private int requestPage = 1;
	private String orderBy = "";
	private String selectedItem = "";
	private boolean ascending = true;
	private int total = 0;

	public void reset(ActionMapping mapping, HttpServletRequest request) {
		list = new Vector(10, 5);
		currentPage = 1;
		pagesCount = 0;
		countOfPage = 0;
		requestPage = 1;
		orderBy = "";
		selectedItem = "";
		ascending = true;
		;
	}

	public void setTotal(int t) {
		this.total = t;
	}

	public int getTotal() {
		return this.total;
	}

	public Vector getList() {
		return list;
	}

	public void setList(Vector list) {
		this.list = list;
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

	public int getCountOfPage() {
		return countOfPage;
	}

	public void setCountOfPage(int countOfPage) {
		this.countOfPage = countOfPage;
	}

	public int getRequestPage() {
		return requestPage;
	}

	public void setRequestPage(int requestPage) {
		this.requestPage = requestPage;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public String getSelectedItem() {
		return selectedItem;
	}

	public void setSelectedItem(String selectedItem) {
		this.selectedItem = selectedItem;
	}

	public boolean isAscending() {
		return ascending;
	}

	public void setAscending(boolean ascending) {
		this.ascending = ascending;
	}

}