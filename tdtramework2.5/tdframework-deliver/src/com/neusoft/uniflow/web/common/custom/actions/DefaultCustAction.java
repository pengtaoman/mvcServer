package com.neusoft.uniflow.web.common.custom.actions;

import java.util.ArrayList;
import java.util.Hashtable;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.custom.forms.CustomForm;
import com.neusoft.uniflow.web.common.trees.beans.Element;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.SessionManager;

public class DefaultCustAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		CustomForm customForm = (CustomForm) form;
		String extendType = request.getParameter("extendType");
		ServletContext ctx = session.getServletContext();
		String liststring = (String) ctx
				.getAttribute(CustomHandler.CUSTOM_DEFAULT)
				+ CustomHandler.COOKIE_DEFAULT;

		Hashtable props = (Hashtable) ctx
				.getAttribute(CustomHandler.CUSTOM_PROPS);
		String elementslabel = customForm.getElementLabel();
		// add category dutt
		String category = customForm.getCategory();
		int catlength = category.length();
		//
		int pino = customForm.getExtendPINo().equals("") ? 0 : Integer
				.parseInt(customForm.getExtendPINo());
		int wino = customForm.getExtendWINo().equals("") ? 0 : Integer
				.parseInt(customForm.getExtendWINo());
		String elements_name = customForm.getElementsName();
		String elementlist = CustomHandler.getElements(elements_name,
				liststring);

		ArrayList components = null;
		if (props.containsKey(elements_name)) {
			components = new ArrayList();
			components = (ArrayList) props.get(elements_name);
		}

		String liststring_extend = (String) session
				.getAttribute(SessionManager.CUSTOMATION);
		String tempwi = "", temppi = "";
		String tempvalue = "";
		String defaultvalue = "";
		String[] tesplist = liststring_extend.split("#");
		ArrayList elements = new ArrayList();
		String[] value = new String[components.size()];
		String flag = "0";

		int beg = liststring_extend.indexOf(elements_name);
		String tmp = liststring_extend.substring(beg);
		int end = tmp.indexOf("#");
		liststring_extend = liststring_extend.replaceFirst(liststring_extend
				.substring(beg, end + beg), elements_name + ":" + elementlist);

		if (extendType.equalsIgnoreCase("wi")) {// 扩展工作项
			for (int i = tesplist.length; i > 0; i--) {
				if (tesplist[i - 1].startsWith("extendWIvalue:")
						&& tesplist[i - 1].indexOf(category) != -1) {
					flag = "1";
					tempvalue = tesplist[i - 1];
					tempvalue = tempvalue.substring(tempvalue.indexOf(category)
							+ catlength);
					for (int j = 0; j < tempvalue.length(); j++) {
						defaultvalue += "1";
					}

					beg = liststring_extend
							.indexOf("extendWIvalue:" + category);
					tmp = liststring_extend.substring(beg);
					end = tmp.indexOf("#");
					liststring_extend = liststring_extend.replaceFirst(
							liststring_extend.substring(beg, end + beg),
							"extendWIvalue:" + category + defaultvalue);

					for (int k = 0; k < wino; k++) {
						int j = elementslabel.split(",").length;
						tempwi += elementslabel.split(",")[j - wino + k] + ":";
					}

					break;
				}
			}

			if (flag.equals("0") && wino != 0) {
				for (int i = 0; i < wino; i++) {
					int j = elementslabel.split(",").length;
					tempwi += elementslabel.split(",")[j - wino + i] + ":";
					defaultvalue += "1";
				}
				liststring_extend += "#extendWIvalue:" + category
						+ defaultvalue + "#";
			}
			value = new String[components.size() + wino];

		}

		else if (extendType.equalsIgnoreCase("pi")) {
			for (int i = tesplist.length; i > 0; i--) {
				if (tesplist[i - 1].startsWith("extendPIvalue:")
						&& tesplist[i - 1].indexOf(category) != -1) {
					flag = "1";
					tempvalue = tesplist[i - 1];
					tempvalue = tempvalue.substring(tempvalue.indexOf(category)
							+ catlength);
					for (int j = 0; j < tempvalue.length(); j++) {
						defaultvalue += "1";
					}

					beg = liststring_extend
							.indexOf("extendPIvalue:" + category);
					tmp = liststring_extend.substring(beg);
					end = tmp.indexOf("#");
					liststring_extend = liststring_extend.replaceFirst(
							liststring_extend.substring(beg, end + beg),
							"extendPIvalue:" + category + defaultvalue);

					for (int k = 0; k < pino; k++) {
						int j = elementslabel.split(",").length;
						temppi += elementslabel.split(",")[j - pino + k] + ":";
					}
					break;
				}
			}

			if (flag.equals("0") && pino != 0) {
				for (int i = 0; i < pino; i++) {
					int j = elementslabel.split(",").length;
					temppi += elementslabel.split(",")[j - pino + i] + ":";
					defaultvalue += "1";
				}
				liststring_extend += "#extendPIvalue:" + category
						+ defaultvalue + "#";
			}
			value = new String[components.size() + pino];

		}
		

		for (int i = 0; i < components.size(); i++) {
			Element element = new Element();
			String key = "workflow.".concat(elements_name).concat(".").concat(
					(String) components.get(i)).trim();
			String label = MessageUtil.getString(key,request.getSession());
			element.setElementLabel(label);
			element.setElementValue(String.valueOf(i));
			elements.add(i, element);
			if (elementlist.charAt(i) == '1') {
				value[i] = String.valueOf(i);
			}
		}
		if (extendType.equalsIgnoreCase("wi")) {
			for (int j = 0; j < tempwi.split(":").length; j++) // 扩展工作项显示项
			{
				if (!tempwi.equals("")) {
					Element extendElement = new Element();
					extendElement.setElementLabel(tempwi.split(":")[j]);
					extendElement.setElementValue(String.valueOf(components
							.size()
							+ j));
					elements.add(components.size() + j, extendElement);
					value[components.size() + j] = String.valueOf(components
							.size()
							+ j);
				}
			}
		}
		if (extendType.equalsIgnoreCase("pi")) {
			for (int j = 0; j < temppi.split(":").length; j++) // 扩展工作项显示项
			{
				if (!temppi.equals("")) {
					Element extendElement = new Element();
					extendElement.setElementLabel(temppi.split(":")[j]);
					extendElement.setElementValue(String.valueOf(components
							.size()
							+ j));
					elements.add(components.size() + j, extendElement);
					value[components.size() + j] = String.valueOf(components
							.size()
							+ j);
				}
			}
		}
		String extendNo = customForm.getExtendPINo();
		request.setAttribute("extendNo", extendNo);
		request.setAttribute("elementNo", String.valueOf(elements.size()));
		session.setAttribute(SessionManager.CUSTOMATION, liststring_extend);
		Cookie defaultitem = new Cookie((String) session
				.getAttribute(SessionManager.BIZ_USERID), liststring_extend);
		defaultitem.setMaxAge(60 * 60 * 24 * 30);
		response.addCookie(defaultitem);
		String window_header = "workflow.".concat(elements_name).concat(
				".windows.header.customation".trim());
		customForm.setSelectedItems(value);
		customForm.setElements(elements);
		session.setAttribute(SessionManager.CUSTOMATION, liststring_extend);

		request.setAttribute("close_flag", "close");
		request.setAttribute("window_header", MessageUtil
				.getString(window_header,request.getSession()));
		return mapping.findForward("success");
	}
}