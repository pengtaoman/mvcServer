package com.neusoft.uniflow.web.taglib.pagectrl;

import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.web.taglib.main.NoContentBaseTag;

import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class PageControlTag extends NoContentBaseTag {
	private static final long serialVersionUID = 1245678111;
	static final String stylepath = WorkflowManager.getWorkflowStylePath();

	static final String firstpage = "<img src='"
			+ stylepath
			+ "/style1/pagectrl_img/top.gif' width='22' height='22' alt='";

	static final String firstpage_iv = "<img src='"
			+ stylepath
			+ "/style1/pagectrl_img/top2.gif' width='22' height='22' alt='";

	static final String prepage = "<img src='"
			+ stylepath
			+ "/style1/pagectrl_img/up.gif' width='22' height='22' alt='";

	static final String prepage_iv = "<img src='"
			+ stylepath
			+ "/style1/pagectrl_img/up2.gif' width='22' height='22' alt='";

	static final String nextpage = "<img src='"
			+ stylepath
			+ "/style1/pagectrl_img/down.gif' width='22' height='22' alt='";

	static final String nextpage_iv = "<img src='"
			+ stylepath
			+ "/style1/pagectrl_img/down2.gif' width='22' height='22' alt='";

	static final String lastpage = "<img src='"
			+ stylepath
			+ "/style1/pagectrl_img/bottom.gif' width='22' height='22' alt='";

	static final String lastpage_iv = "<img src='"
			+ stylepath
			+ "/style1/pagectrl_img/bottom2.gif' width='22' height='22' alt='";

	static final String page_go = "<img src='"
			+ stylepath
			+ "/style1/pagectrl_img/back.gif' width='22' height='22' align='absmiddle' alt='";

	static final String page_go_iv = "<img src='"
			+ stylepath
			+ "/style1/pagectrl_img/back2.gif' width='22' height='22' align='absmiddle' alt='";
	
	static final String end_str = "' border='0'>";

	private int maxPage;

	private int curPage;

	private int total;

	public PageControlTag() {
		
	}

	public int getTotal() {
		return this.total;
	}

	public void setTotal(int t) {
		this.total = t;
	}

	public int getMaxPage() {
		return this.maxPage;
	}

	public void setMaxPage(int maxPage) {
		this.maxPage = maxPage;
	}

	public int getCurPage() {
		return this.curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	protected String getOutput() {
		HttpSession session = pageContext.getSession();
		StringBuffer out = new StringBuffer();
		out.append("<table cellspacing=\"0\" class=\"icon_table \" >\n");
		out.append("<tr>\n");
		out.append("<td class=\"icon_td\">\n");
		out.append(curPage == 1 ? firstpage_iv + MessageUtil.getString("workflow.alt.first.page", session)+ end_str
				: ("<A HREF='javascript:gotoPage(1)'>" + firstpage + MessageUtil.getString("workflow.alt.first.page", session)+ end_str + "</A>"));
		out.append("</td>\n");
		out.append("<td class=\"icon_td\">\n");
		out.append(curPage == 1 ? prepage_iv + MessageUtil.getString("workflow.alt.previous.page", session)+ end_str : ("<A HREF='javascript:gotoPage("
				+ (curPage - 1) + ")'>" + prepage + MessageUtil.getString("workflow.alt.previous.page", session)+ end_str + "</A>"));
		out.append("</td>\n");
		out.append("<td class=\"page_number\" nowrap align=\"center\">\n");
		out.append(curPage);
		out.append("/");
		out.append(maxPage);
		out.append("</td>\n");
		out.append("<td class=\"icon_td\">\n");
		out.append(curPage == maxPage ? nextpage_iv + MessageUtil.getString("workflow.alt.next.page", session)+ end_str
				: ("<A HREF='javascript:gotoPage(" + (curPage + 1) + ")'>"
						+ nextpage + MessageUtil.getString("workflow.alt.next.page", session)+ end_str + "</A>"));
		out.append("</td>\n");
		out.append("<td class=\"icon_td\">\n");
		out.append(curPage == maxPage ? lastpage_iv + MessageUtil.getString("workflow.alt.last.page", session)+ end_str
				: ("<A HREF='javascript:gotoPage(" + maxPage + ")'>"
						+ lastpage + MessageUtil.getString("workflow.alt.last.page", session)+ end_str + "</A>"));
		out.append("</td>\n");
		
		
		out.append("<td nowrap  ><span class=\"page_number\">");
		out.append("<input name=\"aptPage\"type=\"text\" class=\"input_goto\" onkeypress=\"OnlyNumber(this.value)\" value=\"");
		out.append(curPage);
		out.append("\" size=\"2\">&nbsp;");
		out.append(maxPage == 1 ? page_go_iv + MessageUtil.getString("workflow.alt.go", session)+ end_str
				: "<A HREF='javascript:gotoPage(document.forms[0].aptPage.value)'>"
						+ page_go + MessageUtil.getString("workflow.alt.go", session)+ end_str + "</A>");
		out.append("</span>");
		if (total != 0) {
			out.append(MessageUtil.getString("workflow.page.info.total", session));
			out.append(total);
			out.append(MessageUtil.getString("workflow.page.info.item", session));
		}
	    out.append("</td>\n");
		out.append("  </tr>\n");
		out.append("</table>\n");
		return out.toString();
	}

}