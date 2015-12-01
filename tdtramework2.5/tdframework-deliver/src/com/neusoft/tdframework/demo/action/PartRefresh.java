/*
 * Created on 2006-3-1
 */
package com.neusoft.tdframework.demo.action;

/**
 * @author wanghx
 * 
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
/*--------------------------------------------------------------
 创建时间：2003-04-07
 修改履历：
 --------------------------------------------------------------*/
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.demo.bo.common.RoleListBo;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.comp.datawindow.OptionCell;
import com.neusoft.unieap.taglib.combobox.ComboData;
import com.neusoft.unieap.taglib.listbox.ListBoxUtil;
import com.neusoft.unieap.util.RequestUtil;
import com.neusoft.unieap.util.ResponseUtil;

public class PartRefresh extends TDDispatchAction {
	
	/**
	 * 功能：根据选择的区域信息动态更新相应角色信息列表
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	public ActionForward demo(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		
		RequestUtil requestUtil = new RequestUtil(request);
		ResponseUtil responseUtil = new ResponseUtil(response);

		String value = requestUtil.getParameter("storeValue");
		RoleListBo bo = (RoleListBo) getServiceFacade("roleListBo",actionMapping);
		List roles = bo.getRolesByAreaId(value);

		Iterator it = roles.iterator();
		StringBuffer result = new StringBuffer("<option value=''>请选择</option>\n");
		
		while (it.hasNext()) {
			Map role = (Map) it.next();
			result.append("\t<option value='" + role.get("id") + "'>"+ role.get("name") + "</option>\n");
		}
		
		response.getWriter().write(result.toString());
		
		return null;
	}

	/**
	 * 功能：
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	public ActionForward demo2(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		RequestUtil requestUtil = new RequestUtil(request);
		request.setAttribute("certificateType", requestUtil.getParameter("certificateType"));
		return actionMapping.findForward("certificate");
	}
	
	/**
	 * 功能：listbox示例
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	public ActionForward listbox(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		
		ListBoxUtil util = new ListBoxUtil(request);
		
		//System.out.println("name=" + util.getListBoxName());
		//System.out.println("method=" + util.getEventMethod());
		//System.out.println("selected=" + toArray(util.getSelectedCells()));
		//System.out.println("left=" + toArray(util.getLeftZoneCells()));
		//System.out.println("right=" + toArray(util.getRightZoneCells()));
		//System.out.println("right=" + util.getParameter("zhanglinlin"));
		
		List left = new ArrayList();
		String[] t = util.getLeftZoneCells();
		
		for (int i = 0; i < t.length; i++) {
			OptionCell cell = new OptionCell(t[i]);
			left.add(cell);
		}
		
		List right = new ArrayList();
		t = util.getRightZoneCells();
		
		for (int i = 0; i < t.length; i++) {
			OptionCell cell = new OptionCell(t[i]);
			right.add(cell);
		}
		
		t = util.getSelectedCells();
		
		if ("add".equals(util.getEventMethod())) {
			for (int i = 0; i < t.length; i++) {
				OptionCell cell = new OptionCell(t[i]);
				right.add(cell);
			}
		} else {
			for (int i = 0; i < t.length; i++) {
				OptionCell cell = new OptionCell(t[i]);
				left.add(cell);
			}
		}
		util.freshListBox(left, right, response);
		return null;
	}

	private String toArray(String[] arg) {
		String s = "";
		for (int i = 0; i < arg.length; i++) {
			s += arg[i] + " ";
		}
		return s;
	}

	/**
	 * 功能:动态的改变另一个组件的内容
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	public ActionForward doubleCombo(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		String value = request.getParameter("query");
		ComboData comboData = new ComboData();
		
		List vec = getCitys(value);
		Iterator it = vec.iterator();
		
		while (it.hasNext()) {
			String city = (String) it.next();
			comboData.addOption(city, city);
		}
		
		response.setContentType("text/xml;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache");
		
		PrintWriter out = response.getWriter();
		out.write(comboData.transformToXml("UTF-8"));
		out.flush();
		out.close();
		
		return null;
	}
    
	/**
	 * 功能：根据所选省份返回对应的城市列表信息
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	public ActionForward selectCity(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		
		String value = request.getParameter("query");
		value = new String(value.getBytes("gbk"), "utf-8");
		
		String[] selectId = request.getParameter("slaveSelect").split(":");
		List city = (List) this.getTestCityData().get(value);
		
		ComboData comboData = new ComboData();
		
		if (city != null && city.size() > 0) {

			for (Iterator iter = city.iterator(); iter.hasNext();) {
				String element = (String) iter.next();
				comboData.addOption(selectId[0], element, element);
			}
			
			List school = (List) this.getTestSchoolData().get((String) city.get(0));
			
			if (school != null && school.size() > 0) {
				for (Iterator iter = school.iterator(); iter.hasNext();) {
					String element = (String) iter.next();
					comboData.addOption(selectId[1], element, element);
				}
			}
		}
		
		response.setContentType("text/xml;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache");
		
		PrintWriter out = response.getWriter();
		out.write(comboData.transformToXml("UTF-8"));
		out.flush();
		out.close();
		
		return null;
	}
    
	/**
	 * 功能：根据所选城市返回对应的大学列表信息
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	public ActionForward selectCollege(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		String value = request.getParameter("query");
		String selectId = request.getParameter("slaveSelect");
		
		value = new String(value.getBytes("gbk"), "utf-8");
		List school = (List) this.getTestSchoolData().get(value);
		ComboData comboData = new ComboData();
		
		if (school != null && school.size() > 0) {
			for (Iterator iter = school.iterator(); iter.hasNext();) {
				String element = (String) iter.next();
				comboData.addOption(selectId, element, element);
			}
		}
		
		response.setContentType("text/xml;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache");
		
		PrintWriter out = response.getWriter();
		out.write(comboData.transformToXml("UTF-8"));
		out.flush();
		out.close();
		
		return null;
	}
    
	/**
	 * 功能:返回包含省份对应城市列表的map
	 * @return
	 */
	private Map getTestCityData() {
		
		Map citys = new HashMap();
		
		List l1 = new ArrayList();
		l1.add("沈阳");
		l1.add("抚顺");
		l1.add("大连");
		
		List l2 = new ArrayList();
		l2.add("北京");
		
		List l3 = new ArrayList();
		l3.add("上海");
		
		citys.put("辽宁", l1);
		citys.put("北京", l2);
		citys.put("上海", l3);
		
		return citys;
	}
    
	/**
	 * 功能:构建包含城市对应大学列表的map
	 * @return
	 */
	private Map getTestSchoolData() {
		
		Map colleges = new HashMap();
		
		List l1 = new ArrayList();
		l1.add("东北大学");
		l1.add("辽宁师范大学");
		
		List l2 = new ArrayList();
		l2.add("清华大学");
		l2.add("北京大学");
		l2.add("人民大学");
		l2.add("北京师范大学");
		
		List l3 = new ArrayList();
		l3.add("大连理工大学");
		l3.add("大连海事大学");
		l3.add("大连外国语学院");
		
		List l4 = new ArrayList();
		l4.add("辽宁石油化工大学");
		l4.add("抚顺大学");
		
		List l5 = new ArrayList();
		l5.add("上海交通大学");
		l5.add("同济大学");
		l5.add("复旦大学");

		colleges.put("沈阳", l1);
		colleges.put("大连", l3);
		colleges.put("北京", l2);
		colleges.put("抚顺", l4);
		colleges.put("上海", l5);

		return colleges;
	}

	/**
	 * 功能:根据省份信息返回相应的区信息列表
	 * @param provinceName
	 * @return
	 */
	public List getCitys(String provinceName) {
		
		List result = new ArrayList();
		
		if (provinceName.equals("1")) {
			result.add("朝阳区");
			result.add("宣武区");
			result.add("门头沟区");
			result.add("大兴区");
			result.add("通州区");
			result.add("东城区");
			result.add("西城区");
			result.add("崇文区");
			result.add("海淀区");
			result.add("石景山区");
			result.add("丰台区");
		} else if (provinceName.equals("2")) {
			result.add("徐汇区");
			result.add("长宁区");
			result.add("普陀区");
			result.add("闸北区");
			result.add("虹口区");
			result.add("杨浦区");
			result.add("宝山区");
			result.add("嘉定区");
			result.add("浦东区");
			result.add("黄埔区");
			result.add("奉贤区");
		} else {
			result.add("沈阳市");
			result.add("鞍山");
			result.add("大连市");
			result.add("抚顺市");
			result.add("丹东市");
			result.add("辽阳市");
			result.add("锦州市");
			result.add("潮阳市");
			result.add("葫芦岛市");
		}
		return result;
	}
}
