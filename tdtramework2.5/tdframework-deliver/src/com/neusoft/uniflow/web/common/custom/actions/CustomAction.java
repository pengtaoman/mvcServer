package com.neusoft.uniflow.web.common.custom.actions;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Vector;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.bizhandler.NWBizMetaDataImpl;
import com.neusoft.uniflow.web.common.trees.beans.Element;
import com.neusoft.uniflow.web.common.custom.forms.CustomForm;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.MessageUtil;
import com.neusoft.uniflow.web.util.SessionManager;

public class CustomAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		ServletContext ctx = session.getServletContext();
		Hashtable props = (Hashtable) ctx
				.getAttribute(CustomHandler.CUSTOM_PROPS);
		String liststring = (String) session
				.getAttribute(SessionManager.CUSTOMATION);
		CustomForm customForm = (CustomForm) form;
		String elements_name = request.getParameter("elements_name");
		String extendType = request.getParameter("extendType");
		Vector extendWINames = (Vector) session
				.getAttribute(SessionManager.BIZWICATEGORY);
		Vector extendPINames = (Vector) session
				.getAttribute(SessionManager.BIZPICATEGORY);
		ArrayList components = null;

		// add category dutt
		String category = request.getParameter("category");
		int catlength = 0;

		if (props.containsKey(elements_name)) {
			components = new ArrayList();
			components = (ArrayList) props.get(elements_name);
		}
		String elementlist = CustomHandler.getElements(elements_name,
				liststring);
		String[] value = null;
		String[] tesplist = liststring.split("#");
		ArrayList elements = new ArrayList();
		String elementLabel = "";

		String vlauestr = "";
		if (category != null && !category.equals("")) { // 业务数据相关
			catlength = category.length();
			String temp = "";
			String vflag = "0";
			if (extendWINames != null && extendType != null
					&& extendType.equalsIgnoreCase("wi")) {
				for (int i = tesplist.length; i > 0; i--) {
					if (tesplist[i - 1].startsWith("extendWIvalue:")
							&& tesplist[i - 1].indexOf(category) != -1) {
						temp = liststring.substring(liststring
								.indexOf("#extendWIvalue:" + category) + 1);
						temp = temp.substring(
								temp.indexOf(":") + 1 + catlength, temp
										.indexOf("#"));
						for (int k = 0; k < temp.length(); k++) {
							vlauestr += temp.substring(temp.length() - k - 1,
									temp.length() - k);
						}
						
						vflag = "1";
						break;
					}
				}
				if (vflag.equals("0")) {
					for (int i = 0; i < extendWINames.size(); i++) {
						// elementlist += "1";
						vlauestr += "1";
					}
				}
				value = new String[components.size() + extendWINames.size()];
				for (int i = 0; i < components.size(); i++) {
					Element element = new Element();
					String key = "workflow.".concat(elements_name).concat(".")
							.concat((String) components.get(i)).trim();
					String label = MessageUtil.getString(key,request.getSession());// messages.getMessage(locale,key);
					element.setElementLabel(label);
					element.setElementValue(String.valueOf(i));
					elements.add(i, element);
					elementLabel += label + ",";
					if (elementlist.charAt(i) == '1') {
						value[i] = String.valueOf(i);
					}

				}
				if (extendWINames != null && extendType != null
						&& extendType.equalsIgnoreCase("wi")) {
					for (int j = 0; j < extendWINames.size(); j++) // 扩展工作项显示项
					{
						Element extendElement = new Element();
						extendElement
								.setElementLabel(((NWBizMetaDataImpl) extendWINames
										.elementAt(j)).name);
						extendElement.setElementValue(String.valueOf(components
								.size()
								+ j));
						elements.add(components.size() + j, extendElement);
						elementLabel += ((NWBizMetaDataImpl) extendWINames
								.elementAt(j)).name
								+ ",";
						if (vlauestr.charAt(j) == '1') {
							value[components.size() + j] = String
									.valueOf(components.size() + j);
						}

					}
				}
			} else if (extendPINames != null && extendType != null
					&& extendType.equalsIgnoreCase("pi")) {
				for (int i = tesplist.length; i > 0; i--) {
					// add category
					if (tesplist[i - 1].startsWith("extendPIvalue:")
							&& tesplist[i - 1].indexOf(category) != -1) {
						temp = liststring.substring(liststring
								.indexOf("#extendPIvalue:" + category) + 1);
						temp = temp.substring(
								temp.indexOf(":") + 1 + catlength, temp
										.indexOf("#"));
						for (int k = 0; k < temp.length(); k++) {
							vlauestr += temp.substring(temp.length() - k - 1,
									temp.length() - k);
						}
						
						vflag = "1";
						break;

					}
				}
				if (vflag.equals("0")) {
					for (int i = 0; i < extendPINames.size(); i++) {
						
						vlauestr += "1";
					}
				}
				value = new String[components.size() + extendPINames.size()];

				for (int i = 0; i < components.size(); i++) {
					Element element = new Element();
					String key = "workflow.".concat(elements_name).concat(".")
							.concat((String) components.get(i)).trim();
					String label = MessageUtil.getString(key,request.getSession());// messages.getMessage(locale,key);
					element.setElementLabel(label);
					element.setElementValue(String.valueOf(i));
					elements.add(i, element);
					elementLabel += label + ",";
					if (elementlist.charAt(i) == '1') {
						value[i] = String.valueOf(i);
					}

				}

				for (int j = 0; j < extendPINames.size(); j++) // 扩展流程实例显示项
				{
					Element extendElement = new Element();
					extendElement
							.setElementLabel(((NWBizMetaDataImpl) extendPINames
									.elementAt(j)).name);
					extendElement.setElementValue(String.valueOf(components
							.size()
							+ j));
					elements.add(components.size() + j, extendElement);
					elementLabel += ((NWBizMetaDataImpl) extendPINames
							.elementAt(j)).name
							+ ",";
					if (vlauestr.charAt(j) == '1') {
						value[components.size() + j] = String
								.valueOf(components.size() + j);
					}

				}
			}

		} else {

			value = new String[components.size()];
			for (int i = 0; i < components.size(); i++) {
				Element element = new Element();
				String key = "workflow.".concat(elements_name).concat(".")
						.concat((String) components.get(i)).trim();
				String label = MessageUtil.getString(key,request.getSession());// messages.getMessage(locale,key);
				element.setElementLabel(label);
				element.setElementValue(String.valueOf(i));
				elements.add(i, element);
				elementLabel += label + ",";
				if (elementlist.charAt(i) == '1') {
					value[i] = String.valueOf(i);
				}

			}

		}

		String window_header = "workflow.".concat(elements_name).concat(
				".windows.header.customation".trim());
		customForm.setSelectedItems(value);
		customForm.setElements(elements);
		customForm.setElementsName(elements_name);
		customForm.setElementLabel(elementLabel);
		String extendNo = "";
		if (extendWINames != null && extendType != null
				&& extendType.equalsIgnoreCase("wi")) {
			extendNo = String.valueOf(extendWINames.size());
			customForm.setExtendWINo(extendNo);
		}
		if (extendPINames != null && extendType != null
				&& extendType.equalsIgnoreCase("pi")) {
			extendNo = String.valueOf(extendPINames.size());
			customForm.setExtendPINo(extendNo);
		}
		request.setAttribute("extendNo", extendNo);
		request.setAttribute("elementNo", String.valueOf(elements.size()));
		request.setAttribute("window_header", MessageUtil
				.getString(window_header,request.getSession()));// messages.getMessage(locale,window_header));

		return mapping.findForward("success");
	}
}