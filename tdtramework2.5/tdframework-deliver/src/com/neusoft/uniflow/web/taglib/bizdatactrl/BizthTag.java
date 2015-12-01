package com.neusoft.uniflow.web.taglib.bizdatactrl;


import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.bizhandler.NWBizMetaDataManager;
import com.neusoft.uniflow.api.bizhandler.NameAndColumnBean;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.taglib.main.NoContentBaseTag;
import com.neusoft.uniflow.web.util.WorkflowManager;
import com.neusoft.uniflow.web.util.SessionManager;

public class BizthTag extends NoContentBaseTag {
	private static final long serialVersionUID = 123474;

	private String name;

	private String orderKey;

	private boolean ascending;

	private String category;

	public BizthTag() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	protected String getOutput() {
		StringBuffer results = new StringBuffer();
		NWSession nwsession = WorkflowManager.getNWSession();
		NWBizMetaDataManager manager = nwsession.getBizMetaDataManager();
		NameAndColumnBean bean = null;
		HttpSession session = pageContext.getSession();
		String liststring = (String) session
				.getAttribute(SessionManager.CUSTOMATION);

		String[] tesplist = liststring.split("#");
		String extendvalues = "";
		for (int i = tesplist.length; i > 0; i--) {
			if (tesplist[i - 1].startsWith("extendWIvalue:")
					&& tesplist[i - 1].indexOf(category) != -1)// 
			{
				extendvalues = tesplist[i - 1].substring(tesplist[i - 1]
						.indexOf(":") + 1);
				int catlength = category.length();
				extendvalues = extendvalues.substring(catlength);
				break;
			}
		}
		try {
			bean = (NameAndColumnBean) manager
					.getNameAndColumnByCategory(this.category);

			String[] names = bean.getNames();
			String[] sortValue = bean.getColNames();
			for (int i = 0; i < names.length; i++) {
				if ((!extendvalues.equals("") && extendvalues.substring(
						names.length - i - 1, names.length - i).equals("1"))
						|| (extendvalues.equals("") && bean != null)) {

					results
							.append("<td class=\"main_list_th\" valign=\"middle\"");
					results.append("onclick=\"javascript:sort('");
					results.append(sortValue[i]);
					results.append("')\"");
					results.append(" nowrap");
					results.append(">\n");
					results.append(names[i]);
					if (this.orderKey != null && !this.orderKey.equals("")
							&& orderKey.equals(names[i])) {
						if (!this.ascending) {
							results.append("<img src=\"");
							results.append(WorkflowManager
									.getWorkflowStylePath());
							results
									.append("/style1/main_img/top.gif\" width=\"7\" height=\"7\">");
						} else {
							results.append("<img src=\"");
							results.append(WorkflowManager
									.getWorkflowStylePath());
							results
									.append("/style1/main_img/bottom.gif\" width=\"7\" height=\"7\">");
						}
					}

				}
			}
		} catch (NWException e1) {
			e1.printStackTrace();
		}
		return results.toString();
	}

	public String getOrderKey() {
		return orderKey;
	}

	public void setOrderKey(String orderKey) {
		this.orderKey = orderKey;
	}

	public boolean isAscending() {
		return ascending;
	}

	public void setAscending(boolean ascending) {
		this.ascending = ascending;
	}
}
