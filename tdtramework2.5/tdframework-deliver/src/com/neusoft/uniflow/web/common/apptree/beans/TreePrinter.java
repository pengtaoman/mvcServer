package com.neusoft.uniflow.web.common.apptree.beans;

import java.util.Enumeration;
import java.util.Vector;

import javax.servlet.jsp.JspWriter;

import com.neusoft.uniflow.web.common.processtree.beans.ProcessTree;

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

	private ApplicationTree tree = null;

	public TreePrinter() {
	}

	public void printTree(ApplicationTree tree, JspWriter out)
			throws java.io.IOException {
		this.tree = tree;
		if (tree != null) {
			this.printHeader(out);
			writeNode(tree.getRootNode(), out);
			this.printTail(out);
		}
	}

	private void writeNode(ApplicationNode node, JspWriter out)
			throws java.io.IOException {
		StringBuffer buffer = new StringBuffer();
		StringBuffer cascadeBuffer = new StringBuffer();
		// �����Լ���ز���"+","-"
		if (node.isClicked()) {// �жϽڵ���û�б������
			if (node.hasChildren()) {// ���������������ж��Ƿ���children
				if (node.isExpanded())// �����Children���ж��Ƿ�Expand
					cascadeBuffer.append(this.printMinus(
							!node.hasNextSibling(), node.getNodeID()));
				else
					cascadeBuffer.append(this.printPlus(!node.hasNextSibling(),
							node.getNodeID()));
			} else
				cascadeBuffer.append(this.printJoin(!node.hasNextSibling()));
		} else { // û�б���������Ȼ���
			cascadeBuffer.append(this.printPlus(!node.hasNextSibling(), node
					.getNodeID()));
		}
		for (ApplicationNode parent = node.getParentNode(); parent != null; parent = parent
				.getParentNode()) {
			if (parent.hasNextSibling()) {// �к�̣���|
				cascadeBuffer.insert(0, this.formatImg(IMG_LINE));
			} else {
				cascadeBuffer.insert(0, this.formatImg(IMG_SPACE));
			}
		}
		buffer.append(cascadeBuffer.toString());
		// ���ļ��з��ţ���ʾ�Ƿ�ѡ��
		if (node.getNodeID().equals(ApplicationTree.NODE_ROOT_ID)
				|| node.getNodeType().equals("application")) {
			if (node.getNodeID().equals(this.tree.getOpenNodeID()))
				buffer.append(this.formatImg(this.IMG_FOLDEROPEN));
			else
				buffer.append(this.formatImg(this.IMG_FOLDER));
		} else {
			buffer.append(this.formatApplicationImg(node.getNodeType()));
		}
		buffer.append(formatNameLink(node.getNodeName(), node.getNodeID()));
		buffer.append("<br>\n");
		out.print(buffer.toString());

		// �ݹ���ã����������ӽ�ɫ�ڵ�
		if (node.isClicked() && node.hasChildren() && node.isExpanded()) {
			Vector children = node.getChildren();
			if (children == null || children.isEmpty())
				return;
			for (Enumeration enumeration = children.elements(); enumeration
					.hasMoreElements();) {
				ApplicationNode child = (ApplicationNode) enumeration
						.nextElement();
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

	private String formatApplicationImg(String type) {
		String img = "";
		img = "<IMG SRC='" + this.IMG_PROCESS_PATH + "variable.gif"
				+ "' border = '0' />";
		return img;
	}

	private String formatNameLink(String name, String id) {
		StringBuffer buffer = new StringBuffer();
		ApplicationNode node = tree.getApplicationNode(id);
		if (!ApplicationTree.NODE_ROOT_ID.equals(id)
				&& !node.getNodeType().equals("application")) {
			buffer.append("<INPUT TYPE=checkbox ID='");
			buffer.append(id);
			buffer.append("'");
			if (tree.getUsedActList().contains(id)) {
				buffer.append(" checked ");
			}
			buffer.append(" onclick=\"javascript:choosebox('");
			buffer.append(id);
			buffer.append("')\">");
			;
		}
		if (!ProcessTree.NODE_ROOT_ID.equals(id)
				&& !node.getNodeType().equals("application") && tree.getUsedActList().contains(id)) {
			buffer.append("<a href=\"javascript:application_onclick('");
			buffer.append(tree.getCurrentActivity().getID());
			buffer.append("','");
			buffer.append(tree.getCurrentActivity().getName());
			buffer.append("','");
			buffer.append(node.getUrl());
			buffer.append("','");
			buffer.append(node.getNodeType());
			buffer.append("','");
			buffer.append(node.getParticipants());
			buffer.append("')\">");
			buffer.append(name);
			buffer.append("</a>");
		} else {
			buffer.append(name);
		}
		return buffer.toString();
	}

	private void printHeader(JspWriter out) throws java.io.IOException {
		StringBuffer sb = new StringBuffer();
		sb
				.append("<table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#EEEEEE\">\n");
		out.print(sb.toString());
	}

	private void printTail(JspWriter out) throws java.io.IOException {
		StringBuffer sb = new StringBuffer();
		sb.append("</table>\n");
		out.print(sb.toString());
	}

}