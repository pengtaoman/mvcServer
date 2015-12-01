/*
 * Created on 2006-11-25
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.demo.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.taglib.combobox.ComboBoxUtil;

/**
 * @author zhangjn
 */
public class CreateComboDataAction extends TDDispatchAction {
	
	public ActionForward createCombo(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) {
		
		List comboBox1 = new ArrayList();
		comboBox1.add("大连");
		comboBox1.add("大海");
		comboBox1.add("大山");
		comboBox1.add("你好");
		comboBox1.add("中华人民共和国");
		comboBox1.add("刘德华");
		comboBox1.add("无间道");
		comboBox1.add("无所谓");
		comboBox1.add("罗纳尔多");
		comboBox1.add("罗纳尔迪尼奥");
		comboBox1.add("贝克汉姆");
		comboBox1.add("中心");
		comboBox1.add("程序员");
		comboBox1.add("刘若英");
		comboBox1.add("刘嘉玲");
		comboBox1.add("创世纪");
		comboBox1.add("西游记");
		comboBox1.add("水浒");
		comboBox1.add("OK");
		comboBox1.add("足球世界杯");
		comboBox1.add("裴涛是帅哥");
		comboBox1.add("裴涛太帅了");
		
		Map dataMap = new HashMap();
		dataMap.put(ComboBoxUtil.COMBOBOX_SHOWDATA, comboBox1);
		dataMap.put(ComboBoxUtil.COMBOBOX_VALUE, comboBox1);
		
		request.setAttribute("comboBox1", dataMap);

		List comboBox2a = new ArrayList();
		comboBox2a.add("成龙");
		comboBox2a.add("刘德华");
		comboBox2a.add("贝克汉姆");
		comboBox2a.add("罗纳尔迪尼奥");
		comboBox2a.add("罗纳尔多");
		comboBox2a.add("刘嘉玲");
		
		List comboBox2b = new ArrayList();
		comboBox2b.add("chenglong");
		comboBox2b.add("liudehua");
		comboBox2b.add("beikehanmu");
		comboBox2b.add("luonaerdineao");
		comboBox2b.add("luonaerduo");
		comboBox2b.add("liujialing");
		
		dataMap = new HashMap();
		dataMap.put(ComboBoxUtil.COMBOBOX_SHOWDATA, comboBox2a);
		dataMap.put(ComboBoxUtil.COMBOBOX_VALUE, comboBox2b);
		
		request.setAttribute("comboBox2", dataMap);

		String[] comboBox3 = { "0001#安装配置", "0002#基础入门", "0003#硬件解决",
				"0004#软件管理", "0005#重要资源", "0006#网络工具", "0007#图形图像",
				"0008#音乐视频", "0009#字体中文", "0010#软件其它" };
		
		List comboBox3a = new ArrayList();
		List comboBox3b = new ArrayList();
		
		for (int i = 0; i < comboBox3.length; i++) {
			String[] data = comboBox3[i].split("#");
			comboBox3a.add(data[0]);
			comboBox3b.add(data[1]);
		}
		
		dataMap = new HashMap();
		dataMap.put(ComboBoxUtil.COMBOBOX_SHOWDATA, comboBox3b);
		dataMap.put(ComboBoxUtil.COMBOBOX_VALUE, comboBox3a);
		
		request.setAttribute("comboBox3", dataMap);
		
		String[] comboBox4 = { "AB#大连", "AC#美丽的大连", "AD#海滨城市", "AE#大海",
				"AF#海洋生物", "AR#物理", "AH#大连理工大学", "AP#Linux", "AQ#window xp",
				"AX#ubuntu" };
		
		List comboBox4a = new ArrayList();
		List comboBox4b = new ArrayList();
		
		for (int i = 0; i < comboBox4.length; i++) {
			String[] data = comboBox4[i].split("#");
			comboBox4a.add(data[0]);
			comboBox4b.add(data[1]);
		}
		
		dataMap = new HashMap();
		dataMap.put(ComboBoxUtil.COMBOBOX_SHOWDATA, comboBox4b);
		dataMap.put(ComboBoxUtil.COMBOBOX_VALUE, comboBox4a);
		
		request.setAttribute("comboBox4", dataMap);

		String[] comboBox5 = { "DRDZ#500501#德润电子", "DRGFC#500672#东软股份",
				"KOKL#200636#可口可乐", "MFSY#200646#美孚石油", "WR#200300#微软",
				"TYDQ#200754#通用电器", "RDDS#200879#阿迪达斯", "NK#200588#耐克",
				"JSYH#500688#建设银行" };
		
		List comboBox5a = new ArrayList();
		List comboBox5b = new ArrayList();
		List comboBox5c = new ArrayList();
		List comboBox5d = new ArrayList();
		
		List match = new ArrayList();
		
		for (int i = 0; i < comboBox5.length; i++) {
			String[] data = comboBox5[i].split("#");
			comboBox5a.add(data[0]);
			comboBox5b.add(data[1]);
			comboBox5c.add(data[1] + " " + data[2]);
			comboBox5d.add(data[2]);
		}
		
		match.add(comboBox5a);
		match.add(comboBox5b);
		match.add(comboBox5d);
		
		dataMap = new HashMap();
		dataMap.put(ComboBoxUtil.COMBOBOX_SHOWDATA, comboBox5c);
		dataMap.put(ComboBoxUtil.COMBOBOX_VALUE, comboBox5b);
		dataMap.put(ComboBoxUtil.COMBOBOX_OPTIONMATCH, match);
		
		request.setAttribute("comboBox6", dataMap);
		
		return actionMapping.findForward("showcombo");
	}

	public ActionForward createDoubleCombo(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) {
		return actionMapping.findForward("init");
	}
}
