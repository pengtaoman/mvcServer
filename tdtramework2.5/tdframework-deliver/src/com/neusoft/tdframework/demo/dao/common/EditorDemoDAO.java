package com.neusoft.tdframework.demo.dao.common;

import java.util.List;

import com.neusoft.tdframework.dao.BaseDao;

public interface EditorDemoDAO extends BaseDao {
	
	public void insertHTML(String contentId, String content);

	public List getAllHtmls();

	public String getHtml(String contentId);
}
