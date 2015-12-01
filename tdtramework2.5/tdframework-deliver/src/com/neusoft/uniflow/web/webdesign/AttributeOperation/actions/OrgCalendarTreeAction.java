package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.web.util.UniflowManager;

public class OrgCalendarTreeAction extends Action {
	public ActionForward execute(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String type = request.getParameter("nodeType");
		String id = request.getParameter("id");
		JSONArray array = new JSONArray();
			if("root".equalsIgnoreCase(type)){
				Vector units =  UniflowManager.getNWOrg().openAbsoluteRootUnitList();
				/*
				JSONObject systemJ=new JSONObject();		
				systemJ.put("id", "system");
				systemJ.put("text", "系统默认日程");
				systemJ.put("iconCls", "unit");
				systemJ.put("nodeType", "unit");
				array.put(systemJ);
				*/
				for(int i=0;i<units.size();i++){
					NWUnit unit = (NWUnit)units.get(i);
					try {
						JSONObject j = new JSONObject();
						j.put("id",unit.getID());
						j.put("text", unit.getName());
						j.put("iconCls", "unit");
						j.put("nodeType", "unit");
						j.put("allowDrag", true);
						j.put("allowDrop", false);
					array.put(j);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}else if("unit".equalsIgnoreCase(type)){
				NWUnit uniobj = UniflowManager.getNWOrg().getUnit(id);
				if(uniobj!=null){
				Vector subunits = uniobj.openSubUnitList(false);
				for (int i = 0; i < subunits.size(); i++) {
					NWUnit unit = (NWUnit)subunits.get(i);
					try {
						JSONObject j = new JSONObject();
						j.put("id",unit.getID());
						j.put("text", unit.getName());
						j.put("iconCls", "unit");
						j.put("nodeType", "unit");
						j.put("allowDrag", true);
						j.put("allowDrop", false);
						array.put(j);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				}
			}
		response.setContentType("text/html;charset=GBK");
		response.getWriter().write(array.toString());
		return null;
	}
	
}