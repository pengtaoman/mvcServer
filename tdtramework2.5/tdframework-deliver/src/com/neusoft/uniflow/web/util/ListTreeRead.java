/*
 * Created on 2006-7-25
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.uniflow.web.util;

import java.io.InputStream;

import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.neusoft.uniflow.service.cfg.io.IOUtil;
import com.neusoft.uniflow.util.XMLUtil;
import com.neusoft.uniflow.web.common.trees.beans.NWListLeaf;
import com.neusoft.uniflow.web.common.trees.beans.NWListTree;

/**
 * @author tianj
 * 
 * todo
 */
public class ListTreeRead {

	private String[] stub;

	private String[][] node;

	private NWListLeaf[][][] leaf;

	private int stubNum = 0;

	private int nodeNum[];

	private int leafNum[][];

	// private String[] stubflag;

	private String[][] nodeflag;

	private NWListTree listtree = null;

	private String url = null;

	private Document doc = null;

	private static ListTreeRead rmc = null;

	public ListTreeRead(String url,HttpSession session) throws Exception {
		try {			
			String filepath = url + "/list.xml";
			InputStream inputStream=IOUtil.read(filepath);
			try {
				doc = XMLUtil.parse(inputStream);
			} catch (Exception e) {
				throw new Exception("Cannot read struts.xml file");
			}
			
			read(session);
		} catch (Exception e) {
			//e.printStackTrace();
			throw e;
		}
	}

	protected void read(HttpSession session) throws Exception {

		stub = new String[10];
		// stubflag = new String[4];
		node = new String[10][10];
		nodeflag = new String[10][15];
		leaf = new NWListLeaf[10][10][15];
		nodeNum = new int[15];
		leafNum = new int[10][15];
		for (int i = 0; i < 10; i++) {
			nodeNum[i] = 0;
			for (int j = 0; j < 15; j++) {
				leafNum[i][j] = 0;
			}
		}

		Element root = doc.getDocumentElement();

		int rooti = 0;
		while (rooti >= 0) {
			Element stubroot = (Element) root.getElementsByTagName("root").item(rooti);
			if (stubroot == null)
				rooti = -1;
			else if (stubroot.getAttribute("enable").equals("true")) {
				int temp = stubNum;
				stub[temp] = MessageUtil.getString(stubroot.getAttribute("name"), session);
				// stubflag[temp] = "false";
				stubNum++;

				int itemi = 0;
				while (itemi >= 0) {
					Element nodeItem = (Element) stubroot.getElementsByTagName("item").item(itemi);
					if (nodeItem == null) {
						int leafIndexi = 0;
						int leafi = 0;
						boolean hasItemIndex = false;
						while (leafi >= 0) {
							Element leafIndex = (Element) stubroot.getElementsByTagName("itemindex").item(leafi);
							if (leafIndex == null) {
								leafi = -1;
								itemi = -1;
							} else if (leafIndex.getAttribute("enable").equals("true")) {
								int nodetemp = nodeNum[temp];
								nodeflag[temp][nodetemp] = "false";
								//nodeNum[temp]++;								
								NWListLeaf lleaf = new NWListLeaf();
								lleaf.setName(MessageUtil.getString(leafIndex.getAttribute("name"),session));
								lleaf.setAction(leafIndex.getAttribute("action"));
								leaf[temp][nodetemp][leafIndexi] = lleaf;
								leafNum[temp][nodetemp]++;
								leafIndexi++;
								leafi++;
								itemi++;
								hasItemIndex = true;
							} else {
								leafi++;
								itemi++;
							}
						}
						if (hasItemIndex)
							nodeNum[temp]++;
					} else if (nodeItem.getAttribute("enable").equals("true")) {
						int nodetemp = nodeNum[temp];
						node[temp][nodetemp] = MessageUtil.getString(nodeItem.getAttribute("name"),session);
						nodeflag[temp][nodetemp] = "true";
						nodeNum[temp]++;

						int leafIndexi = 0;
						int leafi = 0;
						while (leafi >= 0) {
							Element leafIndex = (Element) nodeItem.getElementsByTagName("index").item(leafi);
							if (leafIndex == null)
								leafi = -1;
							else if (leafIndex.getAttribute("enable").equals("true")) {
								NWListLeaf lleaf = new NWListLeaf();
								lleaf.setName(MessageUtil.getString(leafIndex.getAttribute("name"),session));
								lleaf.setAction(leafIndex.getAttribute("action"));
								leaf[temp][nodetemp][leafIndexi] = lleaf;
								leafNum[temp][nodetemp]++;
								leafIndexi++;
								leafi++;
							} else {
								leafi++;
							}
						}
						itemi++;
					} else {
						itemi++;
					}
				}
				rooti++;

			} else {
				rooti++;
			}

		}

		initListTree(this.leaf, this.leafNum, this.node, this.nodeNum,
				this.stub, this.stubNum, this.nodeflag);

	}

	private void initListTree(NWListLeaf[][][] leaf, int[][] leafNum,
			String[][] node, int[] nodeNum, String[] stub, int stubNum,
			String[][] nodeflag) {
		this.listtree = new NWListTree(stub, node, leaf, nodeflag);
		listtree.setStubNum(this.stubNum);
		listtree.setNodeNum(this.nodeNum);
		listtree.setLeafNum(this.leafNum);
	}

	public static ListTreeRead getRmc() {
		return rmc;
	}

	public static void setRmc(ListTreeRead rmc) {
		ListTreeRead.rmc = rmc;
	}

	public Document getDoc() {
		return doc;
	}

	public void setDoc(Document doc) {
		this.doc = doc;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public NWListTree getListtree() throws Exception {
		return listtree;
	}

}