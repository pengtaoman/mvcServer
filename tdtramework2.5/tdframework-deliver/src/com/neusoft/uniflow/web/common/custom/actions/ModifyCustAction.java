package com.neusoft.uniflow.web.common.custom.actions;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.common.custom.forms.CustomForm;
import com.neusoft.uniflow.web.util.CustomHandler;
import com.neusoft.uniflow.web.util.SessionManager;

public class ModifyCustAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		HttpSession session = request.getSession();
		CustomForm customForm = (CustomForm) form;
		String liststring = (String) session
				.getAttribute(SessionManager.CUSTOMATION);
		String[] elementsvalue = {};
		String extendType = request.getParameter("extendType");
		elementsvalue = customForm.getSelectedItems();
		String elements_name = customForm.getElementsName();
		String elementlist = CustomHandler.getElements(elements_name,
				liststring);
		String elementLabel = customForm.getElementLabel();
       //add category
		String category=customForm.getCategory();
		//int catlength = category.length();
		
		int extendWINo = 0, extendPINo = 0;
		if (customForm.getExtendWINo() != null
				&& !customForm.getExtendWINo().equals("")) {
			extendWINo = Integer.parseInt((customForm.getExtendWINo()));
		}
		if (customForm.getExtendPINo() != null
				&& !customForm.getExtendPINo().equals("")) {
			extendPINo = Integer.parseInt((customForm.getExtendPINo()));
		}
		String extendWIinfo = "", extendWIvalue = "", extendPIinfo = "", extendPIvalue = "";
		char c[] = new char[elementLabel.split(",").length];
		for (int i = 0; i < c.length; i++) {
			c[i] = '0';

		}
		for (int i = 0; i < elementsvalue.length; i++) {
			int place = Integer.parseInt(elementsvalue[i]);
			c[place] = '1';

		}
		elementlist = new String(c);
		liststring = CustomHandler.setElements(elements_name, elementlist,
				liststring);
		String temp = "", laststr = "", preStr = "", extendNo="";;
		String flag = "0";
		String[] tesplist = liststring.split("#");
		if (extendWINo != 0 && extendType.equalsIgnoreCase("wi")) {
			for (int i = elementLabel.split(",").length; i > elementLabel
					.split(",").length
					- extendWINo; i--) {
				extendWIinfo += elementLabel.split(",")[i - 1] + ":";
				extendWIvalue += elementlist.substring(i - 1, i);
			}
			for (int i = tesplist.length; i > 0; i--) {
				if (tesplist[i - 1].startsWith("extendWIvalue:")&&tesplist[i - 1].indexOf(category)!=-1) {
					flag = "1";
					laststr = liststring.substring(liststring
							.indexOf("#extendWIvalue:"+category) + 1);
					laststr = laststr.substring(laststr.indexOf("#") + 1);
					preStr = liststring.substring(0, liststring
							.indexOf("#extendWIvalue:"+category) + 1);
					temp = "extendWIvalue:" +category+ extendWIvalue + "#";
					liststring = preStr + temp + laststr;

					break;
				}
			}
			if (flag.equals("0")) {
				String extendString = "extendWIvalue:" +category+ extendWIvalue + "#";
				liststring += extendString;
			}
			extendNo=customForm.getExtendWINo();
		}
		if (extendPINo != 0 && extendType.equalsIgnoreCase("pi")) {
			for (int i = elementLabel.split(",").length; i > elementLabel
					.split(",").length
					- extendPINo; i--) {
				extendPIinfo += elementLabel.split(",")[i - 1] + ":";
				extendPIvalue += elementlist.substring(i - 1, i);
			}
         //add category 
			for (int i = tesplist.length; i > 0; i--) {
				if (tesplist[i - 1].startsWith("extendPIvalue:")&&tesplist[i - 1].indexOf(category)!=-1) {
					flag = "1";
					laststr = liststring.substring(liststring
							.indexOf("#extendPIvalue:"+category) + 1);
					laststr = laststr.substring(laststr.indexOf("#") + 1);
					preStr = liststring.substring(0, liststring
							.indexOf("#extendPIvalue:"+category) + 1);
					temp = "extendPIvalue:" + category+extendPIvalue + "#";
					liststring = preStr + temp + laststr;
					break;
				}
			}
			if (flag.equals("0")) {
				String extendString = "extendPIvalue:" + category+extendPIvalue + "#";
				liststring += extendString;
			}
			extendNo=customForm.getExtendPINo();
		}
		request.setAttribute("extendNo", extendNo);
		request.setAttribute("elementNo", Integer.toString(elementLabel.split(",").length));
		
		session.setAttribute(SessionManager.CUSTOMATION, liststring);
		/*Cookie defaultitem = new Cookie((String) session
				.getAttribute(SessionManager.BIZ_USERID), liststring);
		defaultitem.setMaxAge(60 * 60 * 24 * 30);
		response.addCookie(defaultitem);*/
		request.setAttribute("close_flag", "close");
		request.setAttribute("window_header", "");

		return mapping.findForward("success");

	}
	
}
