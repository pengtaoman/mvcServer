package com.neusoft.uniflow.web.util;

import java.io.File;
import java.io.InputStream;

import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import com.neusoft.uniflow.service.cfg.io.IOUtil;
import com.neusoft.uniflow.util.XMLUtil;
import com.neusoft.uniflow.web.common.trees.beans.NWMenuTreeNode;

/**
 * 
 * For Style 2009 读取list2009.xml
 * 
 * @author yuyang
 * @since 2009.06.12
 * 
 */
public class ListTreeRead2009 {
	
	private NWMenuTreeNode _struts = null;

	private Document doc = null;

	public ListTreeRead2009(String url,HttpSession session) throws Exception {
				
			String filepath = url + "/list2009.xml";
			InputStream inputStream=IOUtil.read(filepath);
			try {
				doc = XMLUtil.parse(inputStream);
			} catch (Exception e) {
				throw new Exception("Cannot read list.xml file");
			}
			readMenuTree(session);
	}
	
	private void getBasicInfoForNode(NWMenuTreeNode node,Element ele, int _level, HttpSession session)
	{
		String id = ele.getAttribute("id");
		if(id==null || id.length()==0) id="";
		
		String enable = ele.getAttribute("enable");
		if(enable==null || enable.length()==0) enable="false";
		
		String name = MessageUtil.getString(ele.getAttribute("name"), session);
		if(name==null || name.length()==0) name="";
		
		String action = ele.getAttribute("action");
		if(action==null || action.length()==0) action="";

		int level = _level;
		
		String instruction = ele.getAttribute("instruction");
		if(instruction==null || instruction.length()==0) instruction="";
		
		String icon = ele.getAttribute("icon");
		if(icon==null || icon.length()==0) icon="";
		
		String picBase = ele.getAttribute("picBase");
		if(picBase==null || picBase.length()==0) picBase ="";
		
		String titlePic = ele.getAttribute("titlePic");
		if(titlePic==null || titlePic.length()==0) titlePic = "";
		
		node.setId(id);
		node.setAction(action);
		node.setEnable(enable);
		node.setIcon(icon);
		node.setInstruction(instruction);
		node.setLevel(level);
		node.setName(name);
		node.setPicBase(picBase);
		node.setTitlePic(titlePic);
	}
	
	protected void readMenuTree(HttpSession session) throws Exception {
		Element docRoot = doc.getDocumentElement();
		NodeList roots = docRoot.getElementsByTagName("root");
		if(roots == null) return;
		int rootLen = roots.getLength();
		NWMenuTreeNode struts = new NWMenuTreeNode();
		getBasicInfoForNode(struts,docRoot,-1,session);
		for(int i=0;i<rootLen;i++)
		{
			Element root = (Element) roots.item(i);
			NWMenuTreeNode currentRoot = new NWMenuTreeNode();
			getBasicInfoForNode(currentRoot,root,0,session);
			if(currentRoot.getEnable().equals("true")) struts.addLeaf(currentRoot);
			
			NodeList items = root.getElementsByTagName("item");
			if(items == null) continue;
			int itemLen = items.getLength();
			
			for(int j=0;j<itemLen;j++)
			{
				Element item = (Element) items.item(j);
				NWMenuTreeNode currentItem = new NWMenuTreeNode();
				getBasicInfoForNode(currentItem,item,1,session);
				if(currentItem.getEnable().equals("true")) currentRoot.addLeaf(currentItem);
				
				NodeList indices = item.getElementsByTagName("index");
				if(indices==null) continue;
				int indicesLen = indices.getLength();
				
				for(int k=0;k<indicesLen;k++)
				{
					Element index = (Element) indices.item(k);
					NWMenuTreeNode currentIndex = new NWMenuTreeNode();
					getBasicInfoForNode(currentIndex,index,2,session);
					if(currentIndex.getEnable().equals("true")) currentItem.addLeaf(currentIndex);
				}
			}
			
			NodeList itemindices = root.getElementsByTagName("itemindex");
			if(itemindices==null) continue;
			int itemIndicesLen = itemindices.getLength();
			
			for(int m=0;m<itemIndicesLen;m++)
			{
				Element itemIndex = (Element) itemindices.item(m);
				NWMenuTreeNode currentItemIndex = new NWMenuTreeNode();
				getBasicInfoForNode(currentItemIndex,itemIndex,1,session);
				if(currentItemIndex.getEnable().equals("true")) currentRoot.addLeaf(currentItemIndex);
			}
		}
		this._struts = struts;
	}
	
	public NWMenuTreeNode getMenuTree()
	{
		return this._struts;
	}
}