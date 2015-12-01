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

import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.org.NWUnit;
import com.neusoft.uniflow.web.util.UniflowManager;

public class unitOrgTreeAction extends Action{

	public ActionForward execute(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String type = request.getParameter("nodeType");
		String id = request.getParameter("id");
		JSONArray array = new JSONArray();
			if("root".equalsIgnoreCase(type)){
				Vector units =  UniflowManager.getNWOrg().openAbsoluteRootUnitList();
				Vector rlist =  UniflowManager.getNWOrg().openOrphanRoleList();
				
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
				for(int j=0;j<rlist.size();j++){
					NWRole roleobj =(NWRole) rlist.get(j);
					try {
						JSONObject n= new JSONObject();
						n.put("id",roleobj.getID());
						n.put("text", roleobj.getName());
						n.put("iconCls", "role");
						n.put("nodeType", "role");
						array.put(n);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}else if("unit".equalsIgnoreCase(type)){
				NWUnit uniobj = UniflowManager.getNWOrg().getUnit(id);
				Vector subunits = uniobj.openSubUnitList(false);
				Vector rlist = uniobj.openRoleList(false);
				Vector personList = uniobj.openPersonList(false);
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
				
				for(int j=0;j<rlist.size();j++){
					NWRole roleobj =(NWRole) rlist.get(j);
					try {
						JSONObject n= new JSONObject();
						n.put("id",roleobj.getID());
						n.put("text", roleobj.getName());
						n.put("iconCls", "role");
						n.put("nodeType", "role");
						array.put(n);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				for(int j=0;j<personList.size();j++){
					NWPerson personobj =(NWPerson) personList.get(j);
					try {
						JSONObject n= new JSONObject();
						n.put("id",personobj.getID());
						n.put("text", personobj.getName());
						n.put("leaf", true);
						n.put("iconCls", "person");
						n.put("nodeType", "person");
						array.put(n);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}else if("role".equalsIgnoreCase(type)){
				NWRole roleobj = UniflowManager.getNWOrg().getRole(id);
				Vector personList = roleobj.openMemberList();
				Vector	roleoList=roleobj.openChildRoleList(false, false);
				for(int j=0;j<roleoList.size();j++){
					NWRole subRoleobj =(NWRole) roleoList.get(j);
					try {
						JSONObject n= new JSONObject();
						n.put("id",subRoleobj.getID());
						n.put("text", subRoleobj.getName());
						n.put("iconCls", "role");
						n.put("nodeType", "role");
						array.put(n);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				for(int j=0;j<personList.size();j++){
					NWPerson personobj =(NWPerson) personList.get(j);
					try {
						JSONObject n= new JSONObject();
						n.put("id",personobj.getID());
						n.put("text", personobj.getName());
						n.put("leaf", true);
						n.put("iconCls", "person");
						n.put("nodeType", "person");
						array.put(n);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		response.setContentType("text/html;charset=GBK");
		response.getWriter().write(array.toString());
		return null;
	}
	
}
