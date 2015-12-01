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
		comboBox1.add("����");
		comboBox1.add("��");
		comboBox1.add("��ɽ");
		comboBox1.add("���");
		comboBox1.add("�л����񹲺͹�");
		comboBox1.add("���»�");
		comboBox1.add("�޼��");
		comboBox1.add("����ν");
		comboBox1.add("���ɶ���");
		comboBox1.add("���ɶ������");
		comboBox1.add("���˺�ķ");
		comboBox1.add("����");
		comboBox1.add("����Ա");
		comboBox1.add("����Ӣ");
		comboBox1.add("������");
		comboBox1.add("������");
		comboBox1.add("���μ�");
		comboBox1.add("ˮ�");
		comboBox1.add("OK");
		comboBox1.add("�������籭");
		comboBox1.add("������˧��");
		comboBox1.add("����̫˧��");
		
		Map dataMap = new HashMap();
		dataMap.put(ComboBoxUtil.COMBOBOX_SHOWDATA, comboBox1);
		dataMap.put(ComboBoxUtil.COMBOBOX_VALUE, comboBox1);
		
		request.setAttribute("comboBox1", dataMap);

		List comboBox2a = new ArrayList();
		comboBox2a.add("����");
		comboBox2a.add("���»�");
		comboBox2a.add("���˺�ķ");
		comboBox2a.add("���ɶ������");
		comboBox2a.add("���ɶ���");
		comboBox2a.add("������");
		
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

		String[] comboBox3 = { "0001#��װ����", "0002#��������", "0003#Ӳ�����",
				"0004#�������", "0005#��Ҫ��Դ", "0006#���繤��", "0007#ͼ��ͼ��",
				"0008#������Ƶ", "0009#��������", "0010#�������" };
		
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
		
		String[] comboBox4 = { "AB#����", "AC#�����Ĵ���", "AD#��������", "AE#��",
				"AF#��������", "AR#����", "AH#��������ѧ", "AP#Linux", "AQ#window xp",
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

		String[] comboBox5 = { "DRDZ#500501#�������", "DRGFC#500672#����ɷ�",
				"KOKL#200636#�ɿڿ���", "MFSY#200646#����ʯ��", "WR#200300#΢��",
				"TYDQ#200754#ͨ�õ���", "RDDS#200879#���ϴ�˹", "NK#200588#�Ϳ�",
				"JSYH#500688#��������" };
		
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
