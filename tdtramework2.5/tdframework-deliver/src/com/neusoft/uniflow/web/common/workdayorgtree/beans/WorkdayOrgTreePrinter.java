package com.neusoft.uniflow.web.common.workdayorgtree.beans;

import java.util.Enumeration;
import java.util.Vector;

import javax.servlet.jsp.JspWriter;

import com.neusoft.uniflow.web.common.trees.beans.OrgNode;
import com.neusoft.uniflow.web.common.trees.beans.RoleSelPrinter;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class WorkdayOrgTreePrinter {
	public static final String IMG_SPACE = "space.gif";

	public static final String IMG_FOLDERCLOSED = "closefolder.gif";
	
	public static final String IMG_FOLDEROPENED="openfolder.gif";
	
	public static final String IMG_ROLE = "role.png";
	
	public static final String IMG_UNIT="unit.gif";
	
	public static final String IMG_PERSONNEL = "person.png";

	public static final String IMG_JOIN = "space.gif";

	public static final String IMG_JOINBOTTOM = "space.gif";

	public static final String IMG_LINE = "space.gif";

	public static final String IMG_MINUS = "open.gif";

	public static final String IMG_MINUSBOTTOM = "open.gif";

	public static final String IMG_PLUS = "close.gif";

	public static final String IMG_PLUSBOTTOM = "close.gif";
	
	
	private WorkdayOrgTree tree = null;

	public WorkdayOrgTreePrinter() {
	}

	public void printTree(WorkdayOrgTree tree, JspWriter out)
			throws java.io.IOException {
		this.tree = tree;
		if (tree != null) {
			this.printHeader(out);
			writeNode(tree.getRootNode(), out);
			//writeNode(tree.getPersonRoot(), out);
			this.printTail(out);
		}
	}

	private void writeNode(OrgNode node, JspWriter out)
			throws java.io.IOException {
		StringBuffer buffer = new StringBuffer();
		buffer.append("  <tr height=\"16\">\n");
		buffer.append("    <td height=\"16\" valign=\"center\">");
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
							!node.hasNextSibling(), node.getID()));
				else
					cascadeBuffer.append(this.printPlus(!node.hasNextSibling(),
							node.getID()));
			} else
				// 没有children
				cascadeBuffer.append(this.printJoin(!node.hasNextSibling()));
		} else
			// 没有被点击过，先画＋
			cascadeBuffer.append(this.printPlus(!node.hasNextSibling(), node
					.getID()));
		// 画和父role相关的，"|"
		for (OrgNode parent = node.getParentNode(); parent != null; parent = parent
				.getParentNode()) {
			if (parent.hasNextSibling()
					|| parent.getID() == WorkdayOrgTree.ORGUNITROOT_ID)// 有后继，画|
			{
				cascadeBuffer.insert(0, this.formatImg(IMG_LINE));
			} else {
				cascadeBuffer.insert(0, this.formatImg(IMG_SPACE));
			}
		}

		buffer.append(cascadeBuffer.toString());
		// 画文件夹符号，表示是否选中
		// if(node.getID().equals(this.tree.getOpenNodeID()))
		if (node.getType()==4){
			if(node.isExpanded())
				buffer.append(this.formatImg(WorkdayOrgTreePrinter.IMG_FOLDEROPENED));
			else
				buffer.append(this.formatImg(WorkdayOrgTreePrinter.IMG_FOLDERCLOSED));
		}
		else if (node.getType()==1)
			buffer.append(this.formatImg(WorkdayOrgTreePrinter.IMG_ROLE));
		else if(node.getType()==2){
			buffer.append(this.formatImg(WorkdayOrgTreePrinter.IMG_UNIT));
		}
		else
			buffer.append(this.formatImg(RoleSelPrinter.IMG_PERSONNEL));

		// 画role名，超连接
		if (node.getParentID() == null || node.getParentID().equals(""))
			buffer.append(node.getName());
		else
			buffer.append(formatNameLink(node));

		// 输出当前节点
		buffer.append("    </td>\n");
		buffer.append("  </tr>\n");
		// buffer.append("<br>\n");
		out.print(buffer.toString());

		// 递归调用，画出所有子节点
		if (node.isClicked() && node.hasChildren() && node.isExpanded()) {
			Vector children = node.getChildren();
			if (children == null || children.isEmpty())
				return;
			for (Enumeration enumeration = children.elements(); enumeration
					.hasMoreElements();) {
				OrgNode child = (OrgNode) enumeration.nextElement();
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
		return "<a href='workdayCategory.do?expandNodeId=" + nodeID + "'>" + img + "</a>";
	}

	private String formatImg(String imgName) {
		return "<IMG SRC='"+WorkflowManager.getWorkflowStylePath()+"/style1/orgtree_img/"
				+ imgName + "' border = '0'/>";
	}

	private String formatNameLink(OrgNode node) {
		StringBuffer buffer = new StringBuffer();
		if(node.getID().equals(tree.getRootNode().firstChild().getID())){
			buffer.append("<a id=\"firstChild\" href=\"javascript:selected_onclick('");
			buffer.append(node.getID());
			buffer.append("')\"");
		}else{
			buffer.append("<a href=\"javascript:selected_onclick('");
			buffer.append(node.getID());
			buffer.append("')\"");
		}
		if (node.getID().equals(this.tree.getOpenNodeID()))
			buffer.append(" class='Input_text'");
		else
			buffer.append(" class='Input_text'");
		buffer.append(">");

		buffer.append(node.getName());
		buffer.append("</a>");

		return buffer.toString();
	}

	private void printHeader(JspWriter out) throws java.io.IOException {
		StringBuffer sb = new StringBuffer();
		sb.append("<table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"Input_text\">\n");
		out.print(sb.toString());
	}

	private void printTail(JspWriter out) throws java.io.IOException {
		StringBuffer sb = new StringBuffer();
		// sb.append(" </tr>\n");
		sb.append("</table>\n");
		out.print(sb.toString());
	}


}