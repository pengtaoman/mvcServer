package com.neusoft.uniflow.web.common.processtree.beans;

import java.util.Enumeration;
import java.util.Vector;

import javax.servlet.jsp.JspWriter;

import com.neusoft.uniflow.api.def.NWActDef;

public class TreePrinter {
	public String IMG_PROCESS_PATH = "unieap/pages/workflow/stylesheet/style1/process_img/";

	public String IMG_SPACE = "space.gif";

	public String IMG_FOLDER = "folderclosed.gif";

	public String IMG_FOLDEROPEN = "folderopen.gif";

	public String IMG_JOIN = "space.gif";

	public String IMG_JOINBOTTOM = "space.gif";

	public String IMG_LINE = "space.gif";

	public String IMG_MINUS = "open.gif";

	public String IMG_MINUSBOTTOM = "open.gif";

	public String IMG_PLUS = "close.gif";

	public String IMG_PLUSBOTTOM = "close.gif";

	private ProcessTree tree = null;

	public TreePrinter() {
	}

	public void printTree(ProcessTree tree, JspWriter out)
			throws java.io.IOException {
		this.tree = tree;
		if (tree != null)
			writeNode(tree.getRootNode(), out);
	}

	private void writeNode(ProcessNode node, JspWriter out)
			throws java.io.IOException {
		StringBuffer buffer = new StringBuffer();
		// if(node.getParentNode() == null)
		{
			// 画个icon，return
		}
		// ********************先画＋―|这些操作展开、合并的符号
		StringBuffer cascadeBuffer = new StringBuffer();
		// 画和自己相关部分"+","-"
		if (node.isClicked())// 判断节点有没有被点击过
		{
			if (node.hasChildren())// 如果被点击过，则判断是否有children
			{
				if (node.isExpanded())// 如果有Children，判断是否Expand
					cascadeBuffer.append(this.printMinus(
							!node.hasNextSibling(), node.getNodeID()));
				else
					cascadeBuffer.append(this.printPlus(!node.hasNextSibling(),
							node.getNodeID()));
			} else
				// 没有children
				cascadeBuffer.append(this.printJoin(!node.hasNextSibling()));
		} else
			// 没有被点击过，先画＋
			cascadeBuffer.append(this.printPlus(!node.hasNextSibling(), node
					.getNodeID()));
		// 画和父role相关的，"|"
		for (ProcessNode parent = node.getParentNode(); parent != null; parent = parent
				.getParentNode()) {
			if (parent.hasNextSibling())// 有后继，画|
			{
				cascadeBuffer.insert(0, this.formatImg(IMG_LINE));
			} else {
				cascadeBuffer.insert(0, this.formatImg(IMG_SPACE));
			}
		}

		buffer.append(cascadeBuffer.toString());
		// 画文件夹符号，表示是否选中
		if (node.getNodeID().equals(ProcessTree.NODE_ROOT_ID)) {
			if (node.getNodeID().equals(this.tree.getOpenNodeID()))
				buffer.append(this.formatImg(this.IMG_FOLDEROPEN));
			else
				buffer.append(this.formatImg(this.IMG_FOLDER));
		} else {
			buffer.append(this.formatActivityImg(node.getNodeType()));
		}
		buffer.append(formatNameLink(node.getNodeName(), node.getNodeID()));
		buffer.append("<br>\n");
		out.print(buffer.toString());

		// 递归调用，画出所有子角色节点
		if (node.isClicked() && node.hasChildren() && node.isExpanded()) {
			Vector children = node.getChildren();
			if (children == null || children.isEmpty())
				return;
			for (Enumeration enumeration = children.elements(); enumeration
					.hasMoreElements();) {
				ProcessNode child = (ProcessNode) enumeration.nextElement();
				this.writeNode(child, out);
			}
		}
	}

	private String printPlus(boolean isBottom, String nodeID) {
		if (isBottom)
			return this.formatImgLink(formatImg(IMG_PLUSBOTTOM), nodeID);
		else
			return this.formatImgLink(formatImg(IMG_PLUS), nodeID);
	}

	private String printJoin(boolean isBottom) {
		if (isBottom)
			return formatImg(IMG_JOINBOTTOM);
		else
			return formatImg(IMG_JOIN);
	}

	private String printMinus(boolean isBottom, String nodeID) {
		if (isBottom)
			return this.formatImgLink(formatImg(IMG_MINUSBOTTOM), nodeID);
		else
			return this.formatImgLink(formatImg(IMG_MINUS), nodeID);
	}

	private String formatImgLink(String img, String nodeID) {
		return "<a href=\"javascript:expandNode('" + nodeID + "');\">" + img
				+ "</a>";
	}

	private String formatImg(String imgName) {
		return "<IMG SRC='unieap/pages/workflow/stylesheet/style1/orgtree_img/"
				+ imgName + "' border = '0' />";
	}

	private String formatActivityImg(int type) {
		String img = "";
		if (type==0)
			img = "<IMG SRC='" + this.IMG_PROCESS_PATH + "auto.png" + "' border = '0' />";
		if (type==1)
			img = "<IMG SRC='" + this.IMG_PROCESS_PATH + "manual.png" + "' border = '0' />";
		if (type==2||type==3)
			img = "<IMG SRC='" + this.IMG_PROCESS_PATH + "subproc.png" + "' border = '0' />";
		if (type==4)
			img = "<IMG SRC='" + this.IMG_PROCESS_PATH + "event.png" + "' border = '0' />";
		if (type==5)
			img = "<IMG SRC='" + this.IMG_PROCESS_PATH + "choice.png" + "' border = '0' />";
		if (type==9)
			img = "<IMG SRC='" + this.IMG_PROCESS_PATH + "end.png" + "' border = '0' />";
		if (type==16)
			img = "<IMG SRC='" + this.IMG_PROCESS_PATH + "parallel.png" + "' border = '0' />";
		if (type==19)
			img = "<IMG SRC='" + this.IMG_PROCESS_PATH + "case.gif" + "' border = '0' />";
		if (type==21)
			img = "<IMG SRC='" + this.IMG_PROCESS_PATH + "branchstart.png" + "' border = '0' />";
		
		return img;
	}

	private String formatNameLink(String name, String id) {
		StringBuffer buffer = new StringBuffer();
		NWActDef actdef = null;
		int type = 0;
		try {
			if (!id.equals(ProcessTree.NODE_ROOT_ID)) {
				actdef = tree.getProcess().getActivity(id);
				type = actdef.getType();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (!ProcessTree.NODE_ROOT_ID.equals(id)
				&& !tree.getCurrentActID().equals(id)) {
			if (type == 19) {
				buffer.append("<INPUT TYPE=checkbox ID='");
				buffer.append(tree.getProcessNode(id).getParentID());
				buffer.append("'");
			} else if (type == 5) {
				buffer.append("<INPUT TYPE=radio  disabled=\"true\" value='");
				buffer.append(id);
				buffer.append("' name='");
				buffer.append(tree.getCurrentActID());
				buffer.append("'");
			} else {
				if (tree.getProcessNode(id).getParentNode().getNodeType()==6){
					buffer.append("<INPUT TYPE=checkbox ID='");
					buffer.append(tree.getProcessNode(id).getParentID());
					buffer.append("'");
				}else{
					buffer.append("<INPUT TYPE=radio value='");
					buffer.append(id);
					buffer.append("'name='");
					buffer.append(tree.getCurrentActID());
					buffer.append("'");
				}
			}
			if (tree.getNextActList().contains(id)){
				buffer.append(" checked "); 
			}	
			buffer.append(" onclick=\"javascript:choosebox('");
			buffer.append(id);
			buffer.append("')\">");;
		}
		if (tree.getProcessNode(id).getNodeType()==1 && !tree.getCurrentActID().equals(id)&&tree.getNextActList().contains(id)){
			buffer.append("<a href=\"javascript:par_onclick('");
			buffer.append(id);
			buffer.append("')\">");
			buffer.append(name);
			buffer.append("</a>");
		}else{
			buffer.append(name);
		}
		

		return buffer.toString();
	}

}