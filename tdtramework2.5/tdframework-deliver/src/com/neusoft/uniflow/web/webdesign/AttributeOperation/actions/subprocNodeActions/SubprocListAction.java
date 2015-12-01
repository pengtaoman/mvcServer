package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.subprocNodeActions;

import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.neusoft.unieap.action.EAPDispatchAction;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWProcDefManager;
import com.neusoft.uniflow.category.ICategory;
import com.neusoft.uniflow.category.ICategoryEntry;
import com.neusoft.uniflow.web.management.procresourcemgt.actions.ActTmpManagerAction;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniflowManager;

public class SubprocListAction extends EAPDispatchAction {
	private Log log = LogFactory.getLog(ActTmpManagerAction.class);

	public ActionForward appNewManager(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return actionMapping.findForward("appNewManager");
	}

	public ActionForward getCategory(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		NWSession nwSession = UniflowManager.getNWSession();
		ICategoryEntry categoryEntry = nwSession.getCategoryEntry();
		NWProcDefManager resourceManager = nwSession.getProcDefManager();
		HttpSession session = request.getSession();

		final String personID = (String) session
				.getAttribute(SessionManager.BIZ_USERID);

		String id = request.getParameter("category_id");
		String type = request.getParameter("type");

		StringBuffer buf = new StringBuffer();
		buf
				.append("'text','category_id','category_name','leaf','cls','allowDelete','allowEdit','checked','type'");

		buf.append("\n");
		JSONArray array = new JSONArray();
		if ("root".equals(type)) {

			if (log.isDebugEnabled()) {
				log
						.debug("CategoryManagerProc : Type is #getCategory# ,get type is  #root# ");
			}
			Vector categories = categoryEntry
					.openAbsoluteRootCategoryList(ICategoryEntry.PROCESS);
			for (int i = 0; i < categories.size(); i++) {
				ICategory category = (ICategory) categories.get(i);
				int size = resourceManager.getProcDefNumByClassifiedID(category
						.getId());
				if (size == 0) {
					Vector categoryList = categoryEntry
							.openNextLevelCategoryList(category.getId());
					size = categoryList.size();
				}
				try {
					JSONObject j = new JSONObject();
					j.put("category_name", category.getCategoryFeature());
					j.put("category_id", category.getId());
					j.put("text", category.getName());
					if (size > 0) {
						j.put("leaf", false);
					} else {
						j.put("leaf", true);
					}
					j.put("iconCls", "folder");
					j.put("cls", "cmp");
					j.put("allowDelete", true);
					j.put("allowEdit", true);
					j.put("type", "category");
					array.put(j);
				} catch (JSONException e) {
					throw new ServletException(e);
				}

			}

		}

		if ("category".equals(type)) {
			String realId = "";
			// realId = Integer.parseInt(id);
			realId = id;

			if (log.isDebugEnabled()) {
				log
						.debug("CategoryManagerProc : Type is #getCategory# ,get type is  #category# , the id of category is "
								+ realId + "now");
			}

			// List categorie = (List)categoryEntry.getSubCategory(realId);
			Vector categorie = categoryEntry.openNextLevelCategoryList(realId);
			for (int i = 0; i < categorie.size(); i++) {
				ICategory categorySub = (ICategory) categorie.get(i);
				int size = resourceManager
						.getProcDefNumByClassifiedID(categorySub.getId());
				if (size == 0) {
					Vector categorieList = categoryEntry
							.openNextLevelCategoryList(categorySub.getId());
					size = categorieList.size();
				}
				try {
					JSONObject j = new JSONObject();
					j.put("category_name", categorySub.getCategoryFeature());
					j.put("category_id", categorySub.getId());
					j.put("text", categorySub.getName());
					j.put("type", "category");
					j.put("allowDelete", true);
					j.put("allowEdit", true);
					// j.put("categorytype", category.getCategoryType());
					j.put("iconCls", "folder");
					if (size > 0) {
						j.put("leaf", false);

					} else {
						j.put("leaf", true);
					}
					array.put(j);
				} catch (JSONException e) {
					throw new ServletException(e);
				}
			}
			Vector resource = resourceManager.openProcDefListByClassifiedID(realId,"");
			for (int i = 0; i < resource.size(); i++) {
				NWProcDef appResource = (NWProcDef) resource.get(i);
				try {
					JSONObject json = new JSONObject();
					json.put("category_name", appResource.getDescription());
					json.put("category_id", appResource.getID());
					json.put("text", appResource.getName());
					json.put("version",appResource.getVersionName());
					json.put("type", "resource");
					json.put("leaf", true);
					json.put("iconCls", "comres");
					array.put(json);
				} catch (JSONException ej) {
					throw new ServletException(ej);
				}

			}

		}
		response.setContentType("text/xml;charset=UTF-8");// weblogic
		response.getWriter().write(array.toString());

		return null;
	}

}
