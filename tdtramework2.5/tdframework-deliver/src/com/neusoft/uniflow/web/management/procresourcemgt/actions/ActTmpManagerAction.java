package com.neusoft.uniflow.web.management.procresourcemgt.actions;

import java.rmi.server.UID;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.category.ICategory;
import com.neusoft.uniflow.category.ICategoryEntry;
import com.neusoft.uniflow.category.demo.DemoCategory;
import com.neusoft.uniflow.web.util.TranslateCode;
import com.neusoft.uniflow.web.util.UniflowManager;

public class ActTmpManagerAction extends DispatchAction {
	private Log log = LogFactory.getLog(ActTmpManagerAction.class);

	public ActionForward templetManager(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return actionMapping.findForward("templetManager");
	}

	public ActionForward addCategory(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		NWSession session = UniflowManager.getNWSession();
		ICategoryEntry categoryEntry = session.getCategoryEntry();
		
		String inserttype = request.getParameter("inserttype"); // 传来的第一个参数一定要是"inserttype"

		String name = request.getParameter("name");
		if ((name != null) && (name.length() > 0)) {
			name = TranslateCode.translateISOtoUTF8(name); // 转码
		}

		String parentId_temp = request.getParameter("parentid");
		String describe = request.getParameter("title");

		if (describe != null && describe.length() > 0) {
			describe = TranslateCode.translateISOtoUTF8(describe);
		}

		String categoryType = request.getParameter("categorytype");
		if ((categoryType != null) && (categoryType.length() > 0)) {
			categoryType = TranslateCode.translateISOtoUTF8(categoryType);
		}

		if (inserttype.equals("category")) {
			if ((name == null) || (describe == null) || (categoryType == null)) // 这三个值都是必要的
			{
				return null;
			}
			String parentId = "";
			if (parentId_temp == null || parentId_temp.equals("")) {
				parentId = ""; // 顶层子节点
			} else {
				parentId = parentId_temp;
			}
			if (log.isDebugEnabled()) {
				log
						.debug("CategoryManagerProc : Type is #insertcategory# ,insert type is  #category# ,the name of category is  #"
								+ name
								+ "#  ,title is #"
								+ describe
								+ "#,categorytype is #" + categoryType + "#");
			}
			JSONArray array = new JSONArray();
			// 验证数据是否超过长度限制
			if (name.getBytes().length > 40 || describe.getBytes().length > 40
					|| categoryType.getBytes().length > 40) {
				JSONObject j = new JSONObject();
				try {
					j.put("category_id", "");
				} catch (JSONException e) {
					throw new ServletException(e);
				}
				array.put(j);
				response.setContentType("text/xml;charset=UTF-8");// weblogic需要用这个方法
				response.getWriter().write(array.toString(1));
			}
			String category_id = "";
			ICategory newCategory = new DemoCategory();
			String id = new UID().toString();
			id = id.replaceAll(":", ""); // 生成的num包含':' ,将其去掉
			newCategory.setId(id);
			newCategory.setCategoryFeature(describe);
			newCategory.setName(name);
			newCategory.setType(ICategoryEntry.ACTTEMPLET);

			boolean middle = categoryEntry.addCategory(parentId, newCategory);

			if (middle) {
				category_id = id;
			} else {
				category_id = "";
			}
			JSONObject j = new JSONObject();
			try {
				j.put("category_id", category_id);
			} catch (JSONException e) {
				throw new ServletException(e);
			}
			array.put(j);

			// response.setCharacterEncoding("UTF-8");
			response.setContentType("text/xml;charset=UTF-8");// weblogic
			// 需要用这个方法
			response.getWriter().write(array.toString(1));

		}

		return null;
	}

	public ActionForward deleteCategory(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		NWSession session = UniflowManager.getNWSession();
		ICategoryEntry categoryEntry = session.getCategoryEntry();
		
		String type = request.getParameter("deletetype");
		if (type == null) {
			return null;
		}
		String Id = request.getParameter("id");
		String name = request.getParameter("name");
		String deletemethod = request.getParameter("deletemethod");
		if ((name != null) && (name.length() > 0)) {
			name = TranslateCode.translateISOtoUTF8(name); // 转码
		}

		if ("category".equals(type)) {
			if (Id == null) {
				return null;
			}
			String realId = "";
			realId = Id;
			if (log.isDebugEnabled()) {
				log
						.debug("CategoryManagerProc : Type is #deletecategory# ,delete type is  #category# ,the name of category is  #"
								+ name
								+ "#  ,RemoveSubCategories type is #"
								+ deletemethod + "#");
			}
			int result = 1; /* 是否成功的标志 */
			boolean middle = categoryEntry.removeCategory(realId);

			if (middle) {
				result = 1;
			} else {
				result = -1;
			}

			JSONArray array = new JSONArray();
			JSONObject j = new JSONObject();
			try {
				j.put("result", result);
			} catch (JSONException e) {
				throw new ServletException(e);
			}
			array.put(j);
			response.setContentType("text/xml;charset=UTF-8");// weblogic
			// 需要用这个方法

			response.getWriter().write(array.toString());

		}
		return null;
	}
	
	
	public ActionForward getCategory(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		NWSession session = UniflowManager.getNWSession();
		ICategoryEntry categoryEntry = session.getCategoryEntry();

		String id = request.getParameter("category_id");
		String type = request.getParameter("type");
		if ((type != null) && (type.length() > 0)) {
			type = TranslateCode.translateISOtoUTF8(type); // 转码
		}
		StringBuffer buf = new StringBuffer();
		buf
				.append("'text','category_id','category_name','leaf','cls','allowDelete','allowEdit','checked','type'");

		buf.append("\n");
		JSONArray array = new JSONArray();

		/* 负责显示的数据处理 */
		if ("root".equals(type)) {

			if (log.isDebugEnabled()) {
				log
						.debug("CategoryManagerProc : Type is #getCategory# ,get type is  #root# ");
			}
			List categories = (List) categoryEntry.openAbsoluteRootCategoryList(ICategoryEntry.ACTTEMPLET);
			if (categories.size() > 0) {
				for (Iterator iterator = categories.iterator(); iterator
						.hasNext();) {
					ICategory category = (ICategory) iterator.next();
					List categoryList = (List) categoryEntry
							.openNextLevelCategoryList(category.getId());
					JSONObject j = new JSONObject();
					j.put("category_name", category.getCategoryFeature());
					j.put("category_id", category.getId());
					j.put("text", category.getName());
					try {
						/* 如果有子节点，则显示展开图标 */
						if (categoryList.size() > 0) {
							j.put("leaf", false);
							j.put("iconCls", "acttmpbranch");
						} else {
							j.put("leaf", true);
							j.put("iconCls", "acttmpleaf");
						}
						j.put("allowDelete", true);
						j.put("allowEdit", true);
						j.put("type", "category");
					} catch (JSONException e) {
						throw new ServletException(e);
					}
					array.put(j);
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
			List categorie = (List) categoryEntry
					.openNextLevelCategoryList(realId);
			for (Iterator iterator = categorie.iterator(); iterator.hasNext();) {
				ICategory categorySub = (ICategory) iterator.next();

				List category = (List) categoryEntry
						.openNextLevelCategoryList(categorySub.getId());
				JSONObject j = new JSONObject();
				try {
					j.put("category_name", categorySub.getCategoryFeature());
					j.put("category_id", categorySub.getId());
					j.put("text", categorySub.getName());
					j.put("type", "category");
					j.put("allowDelete", true);
					j.put("allowEdit", true);
					// j.put("categorytype", category.getCategoryType());
					if (category.size() > 0) {
						j.put("leaf", false);
						j.put("iconCls", "acttmpbranch");
					} else {
						j.put("leaf", true);
						j.put("iconCls", "acttmpleaf");
					}
				} catch (JSONException e) {
					throw new ServletException(e);
				}
				array.put(j);
			}
		}
		// response.setCharacterEncoding("UTF-8");
		response.setContentType("text/xml;charset=UTF-8");// weblogic
		// 需要用这个方法
		response.getWriter().write(array.toString(1));

		return null;
	}


	public ActionForward modifyCategory(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		NWSession session = UniflowManager.getNWSession();
		ICategoryEntry categoryEntry = session.getCategoryEntry();

		String kind = request.getParameter("modifytype");
		String categoryid = request.getParameter("categoryid");
		String name = request.getParameter("category_name");

		String parentId = request.getParameter("parentid");
		String title =  request.getParameter("newtitle");

		if ((name != null) && (name.length() > 0)) {
			name = TranslateCode.translateISOtoUTF8(name); // 转码
		}

		if ((title != null) && (title.length() > 0)) {
			title = TranslateCode.translateISOtoUTF8(title); // 转码
		}
		if ("category".equals(kind)) {
			if (parentId == null || categoryid == null) {
				return null;
			}
			JSONArray array = new JSONArray();
			String realparentId = "";
			realparentId = parentId;
			String realcategoryId = "";
			realcategoryId = categoryid;
			if (log.isDebugEnabled()) {
				log
						.debug("CategoryManagerProc : Type is #modifyCategory#,modifytype is #category#,categoryid is #"
								+ realcategoryId + "#,title is #" + title + "#");
			}
			ICategory category = new DemoCategory();
			category = categoryEntry.getCategory(realcategoryId);
			category.setName(title);
			category.setParentID(realparentId);
			category.setCategoryFeature(name);

			int result = 1; /* 是否成功的标志 */
			result = categoryEntry.updateCategory(category);

			JSONObject j = new JSONObject();
			try {
				j.put("result", result);
			} catch (JSONException e) {
				throw new ServletException(e);
			}
			array.put(j);

			response.setContentType("text/xml;charset=UTF-8");// weblogic
			// 需要用这个方法
			response.getWriter().write(array.toString());

			return null;
		}

		return null;
	}
	 

}