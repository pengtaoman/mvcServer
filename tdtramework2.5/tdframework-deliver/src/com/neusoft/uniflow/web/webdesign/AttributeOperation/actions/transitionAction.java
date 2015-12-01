package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.neusoft.uniflow.api.def.NWRelData;

public class transitionAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		String type = request.getParameter("nodeType");
		String id = request.getParameter("id");
		String varTree = request.getParameter("varTree");
		request.getCharacterEncoding();
		JSONArray array = new JSONArray();
		String[] varArrary=varTree.split(";");
		if ("rightSource1".equalsIgnoreCase(id)||"leftSource1".equalsIgnoreCase(id)) {
			
			for (int i = 0; i < varArrary.length; i++) {
				String[] var=varArrary[i].toString().split(",");
				String varId=var[0];
				String varText=var[1];
				String varType=var[2];
				String xmlType=new Integer(NWRelData.RELDATA_TYPE_XML).toString();
				if(varType.equalsIgnoreCase(xmlType))
					continue;
				try {
					JSONObject j = new JSONObject();
					if(varTree.toString().equals("")){
					}else{
						j.put("id", varId);
						j.put("text", varText);
						j.put("iconCls", "variable");	
						j.put("nodeType", "variable");
						j.put("leaf", true);
						j.put("allowDrag", false);
						j.put("allowDrop", false);
						array.put(j);
					}
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().write(array.toString());
		return null;
	}
}
