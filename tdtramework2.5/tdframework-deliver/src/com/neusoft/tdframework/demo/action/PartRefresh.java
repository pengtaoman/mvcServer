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
 ����ʱ�䣺2003-04-07
 �޸�������
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
	 * ���ܣ�����ѡ���������Ϣ��̬������Ӧ��ɫ��Ϣ�б�
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
		StringBuffer result = new StringBuffer("<option value=''>��ѡ��</option>\n");
		
		while (it.hasNext()) {
			Map role = (Map) it.next();
			result.append("\t<option value='" + role.get("id") + "'>"+ role.get("name") + "</option>\n");
		}
		
		response.getWriter().write(result.toString());
		
		return null;
	}

	/**
	 * ���ܣ�
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
	 * ���ܣ�listboxʾ��
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
	 * ����:��̬�ĸı���һ�����������
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
	 * ���ܣ�������ѡʡ�ݷ��ض�Ӧ�ĳ����б���Ϣ
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
	 * ���ܣ�������ѡ���з��ض�Ӧ�Ĵ�ѧ�б���Ϣ
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
	 * ����:���ذ���ʡ�ݶ�Ӧ�����б��map
	 * @return
	 */
	private Map getTestCityData() {
		
		Map citys = new HashMap();
		
		List l1 = new ArrayList();
		l1.add("����");
		l1.add("��˳");
		l1.add("����");
		
		List l2 = new ArrayList();
		l2.add("����");
		
		List l3 = new ArrayList();
		l3.add("�Ϻ�");
		
		citys.put("����", l1);
		citys.put("����", l2);
		citys.put("�Ϻ�", l3);
		
		return citys;
	}
    
	/**
	 * ����:�����������ж�Ӧ��ѧ�б��map
	 * @return
	 */
	private Map getTestSchoolData() {
		
		Map colleges = new HashMap();
		
		List l1 = new ArrayList();
		l1.add("������ѧ");
		l1.add("����ʦ����ѧ");
		
		List l2 = new ArrayList();
		l2.add("�廪��ѧ");
		l2.add("������ѧ");
		l2.add("�����ѧ");
		l2.add("����ʦ����ѧ");
		
		List l3 = new ArrayList();
		l3.add("��������ѧ");
		l3.add("�������´�ѧ");
		l3.add("���������ѧԺ");
		
		List l4 = new ArrayList();
		l4.add("����ʯ�ͻ�����ѧ");
		l4.add("��˳��ѧ");
		
		List l5 = new ArrayList();
		l5.add("�Ϻ���ͨ��ѧ");
		l5.add("ͬ�ô�ѧ");
		l5.add("������ѧ");

		colleges.put("����", l1);
		colleges.put("����", l3);
		colleges.put("����", l2);
		colleges.put("��˳", l4);
		colleges.put("�Ϻ�", l5);

		return colleges;
	}

	/**
	 * ����:����ʡ����Ϣ������Ӧ������Ϣ�б�
	 * @param provinceName
	 * @return
	 */
	public List getCitys(String provinceName) {
		
		List result = new ArrayList();
		
		if (provinceName.equals("1")) {
			result.add("������");
			result.add("������");
			result.add("��ͷ����");
			result.add("������");
			result.add("ͨ����");
			result.add("������");
			result.add("������");
			result.add("������");
			result.add("������");
			result.add("ʯ��ɽ��");
			result.add("��̨��");
		} else if (provinceName.equals("2")) {
			result.add("�����");
			result.add("������");
			result.add("������");
			result.add("բ����");
			result.add("�����");
			result.add("������");
			result.add("��ɽ��");
			result.add("�ζ���");
			result.add("�ֶ���");
			result.add("������");
			result.add("������");
		} else {
			result.add("������");
			result.add("��ɽ");
			result.add("������");
			result.add("��˳��");
			result.add("������");
			result.add("������");
			result.add("������");
			result.add("������");
			result.add("��«����");
		}
		return result;
	}
}
