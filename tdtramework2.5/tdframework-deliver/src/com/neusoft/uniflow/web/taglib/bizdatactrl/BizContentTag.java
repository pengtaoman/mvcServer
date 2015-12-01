package com.neusoft.uniflow.web.taglib.bizdatactrl;

import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.bizhandler.NWBizMetaDataManager;
import com.neusoft.uniflow.api.bizhandler.NWBizWorkItem;
import com.neusoft.uniflow.api.bizhandler.NameAndColumnBean;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.taglib.main.NoContentBaseTag;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class BizContentTag extends NoContentBaseTag {
	private static final long serialVersionUID = 123471;
	private String name;

	private String category;

	public BizContentTag() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	protected String getOutput() {
		StringBuffer out = new StringBuffer();
		HttpSession session = pageContext.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		NWBizMetaDataManager manager = nwsession.getBizMetaDataManager();
		NameAndColumnBean bean = null;
		String liststring = (String) session
				.getAttribute(SessionManager.CUSTOMATION);
		String[] tesplist = liststring.split("#");
		String extendvalues = "";
		
		for (int i = tesplist.length; i > 0; i--) {
			if (tesplist[i - 1].startsWith("extendWIvalue:")&&tesplist[i - 1].indexOf(category)!=-1) {
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

		} catch (NWException e) {
			e.printStackTrace();
		}
		String[] names = bean.getNames();
		for (int i = 0; i < names.length; i++) {
			if (!extendvalues.equals("")
					&& extendvalues.substring(names.length - i - 1,
							names.length - i).equals("1")
					|| (extendvalues.equals("") && bean != null)) {
				out.append("<td valign=\"middle\" class=\"main_list_td\">");
				String value = (String) (((NWBizWorkItem) pageContext
						.getAttribute(name)).getBizProperty(names[i]));
				if (value != null && !value.equals("")) {
					out.append(value);
				} else {
					out.append("--");
				}
				out.append("</td>");
			}
		}

		return out.toString();
	}
}
