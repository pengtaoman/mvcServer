package com.neusoft.uniflow.web.taglib.main;

import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class TabElementTag extends NoContentBaseTag {
	private static final long serialVersionUID = 1234990;
	/**
	 * tab项上要显示的文本的key值
	 */
	private String messageKey;

	/**
	 * 该tab是否被选中
	 */
	private boolean selected;

	/**
	 * 点击该tab项要进行的操作
	 */
	private String action;

	/**
	 * 该tab项宽度
	 */
	private String width;

	public TabElementTag() {
		messageKey = "";
		selected = false;
		width = "80";
		action = "#";

	}

	protected String getOutput() {
		StringBuffer out = new StringBuffer();
		
		if (!isSelected()) {
			out.append("    <td align=\"right\" valign=\"bottom\"  onclick=\" ");
			out.append(getAction());
			out.append("\">\n ");

		} else {
			out.append("    <td  valign=\"bottom\" nowrap>\n ");
		}

		out
				.append("       <table height=\"27\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"table_base\">\n");
		out.append("          <tr>\n");
		out.append("              <td width=\"5\"><img src=\"");
		out.append(WorkflowManager.getWorkflowStylePath());
		if (!isSelected()) {
			out
					.append("/style1/tabctrl_img/main_unchecked_left.gif\" width=\"20\" height=\"27\" ></td>\n ");
		} else
			out
					.append("/style1/tabctrl_img/main_checked_left.gif\" width=\"20\" height=\"27\" ></td>\n ");
		if (!isSelected()) {
			out
					.append("             <td align=\"center\" nowrap class=\"main_tab_unchecked_center\">");

			out.append(getTabTitle());
		} else {
			out
					.append("             <td align=\"center\" nowrap class=\"main_tab_checked_center\">");
			out.append(getTabTitle());
		}

		out.append("</td>\n");
		out
				.append("              <td width=\"5\" align=\"right\"> <img src=\"");
		out.append(WorkflowManager.getWorkflowStylePath());
		if (!isSelected()) {
			out
					.append("/style1/tabctrl_img/main_unchecked_right.gif\" width=\"20\" height=\"27\" ></td>\n");
		} else
			out
					.append("/style1/tabctrl_img/main_checked_right.gif\" width=\"20\" height=\"27\" ></td>\n");
		out.append("           </tr>\n");
		out.append("        </table>\n");
		out.append("        </td>\n");

		return out.toString();
	}

	private String getTabTitle() {
		String title = "";
		HttpSession session = pageContext.getSession();
		try {
			// return MessageUtil.getMessage(getMessageKey(), pageContext);
			title = MessageUtil.getString(this.messageKey,session);
			if (title==null || title.equals("#-1"))
				title = this.messageKey;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return title;
	}

	public String getMessageKey() {
		return messageKey;
	}

	public void setMessageKey(String messageKey) {
		this.messageKey = messageKey;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

}