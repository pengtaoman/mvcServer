package com.neusoft.uniflow.web.monitor.procdef.beans;

import java.awt.Point;
import java.util.Hashtable;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWTransition;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.monitor.procinst.beans.SVGMonitorConstants;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.MathUtil;
import com.neusoft.uniflow.web.util.SVGUtil;

/**
 * 
 * 供流程定义监控，客户端显示Servlet使用
 *
 */
public class SVGCreateFactory {
	public static String tab = System.getProperty("line.separator");
	private Hashtable acts = new Hashtable();
	private Hashtable apps = new Hashtable();

	private int maxX = 0;
	private int maxY = 0;
	// 存放坐标和大小 x,y,l
	private Hashtable noParentNodes = new Hashtable();// 父亲节点为流程的节点坐标
	private Hashtable hasParentNodes = new Hashtable();// 父亲节点为节点的节点坐标
	private Hashtable firstLevelParallel_unit = new Hashtable();// 第一层并发（父亲节点为流程）坐标

	private Hashtable parallel_unitXY = new Hashtable();// 并发单元体绝对坐标
	private Hashtable parallel_branchXY = new Hashtable();// 并发分支绝对坐标
	// 存放各个体的关系
	
	private Hashtable parallel_unit = new Hashtable();// 并发体-节点关系数组 key 并发体ID
														// value 并发体的子节点ID
	private Hashtable branch_children = new Hashtable();// 分支-节点关系数组 key 分支ID
														// value 分支的子节点ID
	public static SVGCreateFactory svgcreatefac = null;

	public static SVGCreateFactory getInstance() {
		if (svgcreatefac == null)
			return new SVGCreateFactory();
		else
			return svgcreatefac;
	}
	
	/**
	 * Servlet 直接调用此方法完成SVG显示
	 * @param request 请求对象
	 * @param session 会话对象
	 * @param path
	 * @param pathimg
	 * @return SVG XML
	 * @throws NWException
	 */
	public String createProcessDefine(HttpServletRequest request,
			NWSession session, String path, String pathimg) throws NWException {
		StringBuffer sb = new StringBuffer();
		String pid = (String) request.getParameter("processid");
		String pv = (String) request.getParameter("version");
		NWProcDef process = session.getProcDef("", pid, pv, 0);
		Vector transitions = process.openTransitionList();
		Vector activities = process.openActivityList();

		SVGTranstionManager tranManager=SVGTranstionManager.getInstance();
		 
		 SVGTranstion tran=(SVGTranstion)tranManager.getTranstion(pid);
		 if(tran==null){
			 try {
				tran = new SVGTranstion(process);
				tranManager.put(pid, tran);} 
			 catch (Exception e) {				
				e.printStackTrace();
			}
		 }
		apps = tran.getApps();
 		acts = tran.getActs();
		maxX = tran.getMaxX();
		maxY = tran.getMaxY();
		noParentNodes = tran.getNoParentNodes();// 父亲节点为流程的节点坐标
		hasParentNodes = tran.getHasParentNodes();// 父亲节点为节点的节点坐标
		firstLevelParallel_unit = tran.getFirstLevelParallel_unit();// 第一层并发（父亲节点为流程）坐标

		parallel_unitXY = tran.getParallel_unitXY();// 并发单元体绝对坐标
		parallel_branchXY = tran.getParallel_branchXY();// 并发分支绝对坐标

		parallel_unit = tran.getParallel_unit();// 并发体-节点关系数组 key 并发体ID value
												// 并发体的子节点ID
		branch_children = tran.getParallel_branch();// 分支-节点关系数组 key 分支ID value
													// 分支的子节点ID
		
		try {

			sb.append(this.createHeader(path));
		    if (!noParentNodes.isEmpty()){	
				for (int i=0;i<activities.size();i++){
					NWActDef actdef = (NWActDef)activities.elementAt(i);
		            if (noParentNodes.containsKey(actdef.getID())){
		            	sb.append(this.createActivitie(process,apps,actdef,pathimg,path,0)); 
		            }
				}

			}
		    if (!this.firstLevelParallel_unit.isEmpty()){
				for (int i=0;i<activities.size();i++){
					NWActDef actdef = (NWActDef)activities.elementAt(i);
		            if (firstLevelParallel_unit.containsKey(actdef.getID())){
		            	sb.append(this.createParallelUnit(actdef.getID(),pathimg));			       		            	
		            }
				}			       
			}

		    if (!hasParentNodes.isEmpty()){	
				for (int i=0;i<activities.size();i++){
					NWActDef actdef = (NWActDef)activities.elementAt(i);
		            if (hasParentNodes.containsKey(actdef.getID())){
		            	sb.append(this.createActivitie(process,apps,actdef,pathimg,path,1)); 
		            }
				}

			} 
  
		    for(int i=0;i<transitions.size();i++){
			    NWTransition trans = (NWTransition)transitions.elementAt(i);
			    sb.append(this.createTransition(trans));
		    }

		} catch (Exception e) {
			e.printStackTrace();
		}
		sb.append("</svg>");
		return sb.toString();
	}
	
	private String createHeader(String path) {
		StringBuffer sb = new StringBuffer();
		sb.append("<svg width=\"").append("100%").append("\" height=\"")
				.append("100%").append("\" onmousemove=\"findXY(evt)\" ")
				.append(" onmousedown=\"initMenu()\"").append(">").append(tab);
		sb.append("<script language=\"text/javascript\" xlink:href=\"").append(
				path).append("/js/ProcDefSvg.js\"/>").append(tab);
		sb.append("<defs>").append(tab);
		sb.append("<linearGradient id=\"linerec1\">").append(tab);
		sb.append("<stop offset=\"0%\" stop-color=\"white\"/>").append(tab);
		sb.append("<stop offset=\"100%\" stop-color=\"#F0F0F0\"/>").append(tab);
		sb.append("</linearGradient>").append(tab);

		sb
				.append(
						"<linearGradient id=\"linerec2\" gradientTransform=\"rotate(90)\">")
				.append(tab);
		sb.append("<stop offset=\"0%\" stop-color=\"white\"/>").append(tab);
		sb.append("<stop offset=\"100%\" stop-color=\"#F0F0F0\"/>").append(tab);
		sb.append("</linearGradient>").append(tab);

		sb.append("<g id=\"arrow\">").append(tab);
		sb
				.append(
						"<path d=\"M 0 0 L 1 0 L 5 4 L 7 4 L 11 0 L 12 0\" style=\"stroke-width:1;stroke:#eec5fd;fill:none\" />")
				.append(tab);
		sb
				.append(
						"<path d=\"M 1 1 L 6 6 L 11 1 \" style=\"stroke-width:1;stroke:#49006b;fill:none\" />")
				.append(tab);
		sb
				.append(
						"<path d=\"M 0 1 L 5 6\" style=\"stroke-width:1;stroke:#de90fe;fill:none\" />")
				.append(tab);
		sb
				.append(
						"<path d=\"M 7 6 L 12 1 \" style=\"stroke-width:1;stroke:#de90fe;fill:none\" />")
				.append(tab);
		sb.append("</g>").append(tab);

		sb.append("</defs>").append(tab);
		sb.append("<rect x=\"0\" y=\"0\" width=\"").append(maxX).append(
				"\" height=\"").append(maxY).append("\"").append(
				" style=\"fill:#ffffff;").append(tab);
		sb.append("stroke:#ffffff; stroke-width: 2; stroke-opacity: 0.2;\" />")
				.append(tab);
		return sb.toString();
	}
	private String createActivitie(NWProcDef process,Hashtable apps,NWActDef actdef,String path,String Contextpath,int hs_type)throws NWException{
		int imageComp=SVGUtil.NODE_IMAGE_COMPENSATION;   
		StringBuffer sb = new StringBuffer();
		   String apptype = "";
		   String actPosition;
		   if (hs_type == 0)
			   actPosition = (String)noParentNodes.get(actdef.getID());
		   else
			   actPosition = (String)hasParentNodes.get(actdef.getID());

		   String pos[] = actPosition.split(",");
		   int x = Integer.valueOf(pos[0]).intValue();
		   int y = Integer.valueOf(pos[1]).intValue();
		   int l = Integer.valueOf(pos[2]).intValue();
		   int h=Integer.valueOf(pos[3]).intValue();
		   int type = actdef.getType();
		   
		   String htID = actdef.getID();
		   String recID = htID;
		   
		   String name = actdef.getFormatName();	
		   String svgText=this.createMultiLineText(x+30, y+17, name);
		   if (name.indexOf(">")>0 || name.startsWith(">")) 
			   name = name.replaceAll(">","&gt;");
		   if (name.indexOf("<")>0 || name.startsWith("<")) 
			   name = name.replaceAll("<","&lt;");
		   
		   if (actdef.getAppID()!=null &&!actdef.getAppID().equals("")){
			      apptype = (String)apps.get(actdef.getAppID());
			      if (apptype == null)
			    	  apptype = "";
		   }
		   //自动节点		   
		   if (type==0){
			   String curID = htID;
			   if(htID==recID)
				   curID ="none";
//			   sb.append("<g onmouseover=\"byRecSelected('0',evt,'").append(recID)
//			     .append("','").append(htID).append("','")
//			     .append(Contextpath).append("')\"").append(tab)
//			     .append(" onmouseout=\"unRecSelected(evt,'").append("rec"+recID).append("','")
//               .append(Contextpath).append("')\"").append(tab)
//			     .append(" onclick=\"auto_onClick(evt,'")
//			     .append(curID).append("','").append(recID).append("')\"").append(tab)
//			     .append(" id=\"").append(htID).append("\">").append(tab);		
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" rx=\"3\" ry=\"3\" height=\"")
			     .append(h)
			     .append("\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);
			   String png = "auto.png";
			   String imageText=this.createImage(x+8, y+h/2-imageComp, path, png);
			   sb.append(imageText);			   
			   sb.append(svgText).append(tab);
//			   sb.append("</g>").append(tab);
		   }
		   //手动节点
		   if (type==1){
			   String curID = htID;
			   if(htID==recID)
				   curID ="none";
			   
//			   sb.append("<g onmouseover=\"byRecSelected('1',evt,'").append(recID)
//			     .append("','").append(htID).append("','")
//			     .append(Contextpath).append("')\"").append(tab)
//			     .append(" onmouseout=\"unRecSelected(evt,'").append("rec"+recID).append("','")
//                 .append(Contextpath).append("')\"").append(tab)
//			     .append(" onclick=\"manual_onClick(evt,'")
//			     .append(curID).append("','").append(recID).append("')\"").append(tab)
//			     .append(" id=\"").append(htID).append("\">").append(tab);	
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			   	 .append("\" width=\"").append(l).append("\" height=\"")
			   	 .append(h)
			   	 .append("\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
		         .append("id=\"").append("rec"+actdef.getID()).append("\" />")
		         .append(tab);	
			   String png = "manual.png";
			   String imageText=this.createImage(x+8, y+h/2-imageComp, path, png);
			   sb.append(imageText);	
			   sb.append(svgText).append(tab);		
//			   sb.append("</g>").append(tab);
		   }
		   //子流程节点
		   if (type==2||type==3){
//			   sb.append("<g onmouseover=\"byRecSelected('2',evt,'").append(
//						"rec" + actdef.getID()).append("','").append(Contextpath)
//						.append("')\"").append(tab)
//						.append(" onmouseout=\"unRecSelected(evt,'").append(
//								"rec" + actdef.getID()).append("','").append(
//								Contextpath).append("')\"").append(tab).append(
//								" onclick=\"subproc_onClick('").append(
//								actdef.getSubprocID() + "#"
//										+ actdef.getSubprocVersionName()).append(
//								"')\"").append(tab).append(" id=\"").append(
//								actdef.getID()).append("\">").append(tab);
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"")
			     .append(h)
			     .append("\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);	
			   
			   String png = "subproc.png";	
			   
			   String imageText=this.createImage(x+8, y+h/2-imageComp, path, png);
			   sb.append(imageText);	
			   sb.append(svgText).append(tab);	
			   
//			   sb.append("</g>").append(tab);
		   }
		   //选择节点
		   if (type==5){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"")
			     .append(h)
			     .append("\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "choice.png";				   
			   String imageText=this.createImage(x+8, y+h/2-imageComp, path, png);
			   sb.append(imageText);	
			   sb.append(svgText).append(tab);
		   }
		   //开始节点
		   if (type==8){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"")
			     .append(h)
			     .append("\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "start.png";				   
			   String imageText=this.createImage(x+8, y+h/2-imageComp, path, png);
			   sb.append(imageText);	
			   sb.append(svgText).append(tab);
		   }
		   //结束节点
		   if (type==9){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"")
			     .append(h)
			     .append("\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "end.png";				   
			   String imageText=this.createImage(x+8, y+h/2-imageComp, path, png);
			   sb.append(imageText);	
			   sb.append(svgText).append(tab);
		   }

		   if (type == 20 || type == 21) {
				String png = "inner.png";
				sb.append("<image xlink:href=\"").append(path).append(png).append(
						"\" x=\"").append(x).append("\" y=\"").append(y).append(
						"\" width=\"").append(l).append("\" height=\"").append(h).append("\"/>").append(tab);

			}
		   

		return sb.toString();
	}
	
	/**
	 * 创建图标
	 * @param x
	 * @param y
	 * @param path
	 * @param png
	 * @return
	 */
	private String createImage(int x,int y,String path,String png){
		StringBuffer sb=new StringBuffer();
		sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x)
	     .append("\" y=\"").append(y).append("\" width=\"").append(SVGUtil.NODE_IMAGE_WIDTH)
	     .append("\" height=\"").append(SVGUtil.NODE_IMAGE_HIGHT).append("\"/>").append(tab);
		return sb.toString();
	}
	
	/**
	 *节点名称多行显示
	 * @param x
	 * @param y
	 * @param name
	 * @param color
	 * @return
	 */
	private String createMultiLineText(int x,int y,String name){
		String[] names=name.split("\\r\\n");
		StringBuffer strBuffer=new StringBuffer();
		strBuffer.append("<text x=\"").append(x).append("\" y=\"")
	     .append(y).append("\" style=\"text-anchor: left").append("\">").append(names[0]);
		for(int i=1;i<names.length;i++)
		{		
			strBuffer.append("<tspan x=\"").append(x).append("\" dy=\"")
			.append(SVGUtil.NODE_ONELINE_HIGHT)
			.append("\">").append(names[i]).append("</tspan>");
		}
		strBuffer.append("</text>").append(tab);
		return strBuffer.toString();
	}
	
	private String createParallelUnit(String unit_id,String path)throws Exception{
		StringBuffer sb = new StringBuffer();
		String value = (String) parallel_unitXY.get(unit_id);
		
		String[] values = value.split(",");
		int x = Integer.valueOf(values[0]).intValue() ;
		int y = Integer.valueOf(values[1]).intValue() ;
		int w = Integer.valueOf(values[2]).intValue() ;
		int h = Integer.valueOf(values[3]).intValue();

		parallel_unitXY.put(unit_id, x + "," + y + "," + w + "," + h);
		
		sb
				.append("<rect x=\"")
				.append(x)
				.append("\" y=\"")
				.append(y)
				.append("\" width=\"")
				.append(w)
				.append("\" height=\"")
				.append(h)
				.append(
						"\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec2);stroke-width:1;stroke:#B4B2B4;\" ")
				.append("/>").append(tab);

		NWActDef actdef = (NWActDef) acts.get(unit_id);

		//lincx 修改 对齐
		//int l = 8 + 16 + 6 + caclNameStrLength(actdef.getName()) + 12;
		int l = 8 + 16 + 6 + SVGUtil.caclNameStrLength(actdef.getFormatName()) + 12;
		int ax = x + w / 2 - l / 2;
		int ay = y-SVGMonitorConstants.PARALLEL_NAME_RECT_Y;

		sb
				.append("<rect x=\"")
				.append(ax)
				.append("\" y=\"")
				.append(ay)
				.append("\" width=\"")
				.append(l)
				.append("\" height=\"")
				.append("25")
				.append(
						"\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
				.append("/>").append(tab);

		String png = "parallel.png";
		String name = actdef.getName();
		sb.append("<image xlink:href=\"").append(path).append(png).append(
				"\" x=\"").append(ax + 8).append("\" y=\"").append(ay + 6)
				.append("\" width=\"16\" height=\"16\"/>").append(tab);
		sb.append("<text x=\"").append(ax + 30).append("\" y=\"").append(
				ay + 17).append("\" style=\"text-anchor: left\" >").append(name)
				.append("</text>").append(tab);

		int ix1 = x + w / 2 - 4;
		int iy1 = y + 12;

		String ipng = "expand.gif";
		sb.append("<image xlink:href=\"").append(path).append(ipng).append(
				"\" x=\"").append(ix1).append("\" y=\"").append(iy1).append(
				"\" width=\"9\" height=\"9\"/>").append(tab);

		int ix2 = x + w / 2 - 4;
		int iy2 = y + h - 4;

		sb.append("<image xlink:href=\"").append(path).append(ipng).append(
				"\" x=\"").append(ix2).append("\" y=\"").append(iy2).append(
				"\" width=\"9\" height=\"9\"/>").append(tab);

		String branches = (String) parallel_unit.get(unit_id);
		String[] bs = branches.split(",");
		for (int j = 0; j < bs.length; j++) {
			NWActDef act = (NWActDef) acts.get(bs[j]);
			if (act.getType() == 19 && parallel_branchXY.containsKey(bs[j])) {
				sb.append(this.createParallelBranch(bs[j], path));
			}
		}

		return sb.toString();
	}
	
	private String reviseParallelSourceTran(String endPoint) {
		String[] ep = endPoint.split(",");
		int y=Integer.parseInt(ep[1]);
		y -= SVGMonitorConstants.PARALLEL_NAME_RECT_Y;
		endPoint = ep[0]+","+y+","+ep[2]+","+ep[3];
		return endPoint;
	}
	
	private String createParallelBranch(String branch_id ,String path) throws Exception{
		StringBuffer sb = new StringBuffer();
		String value = (String) parallel_branchXY.get(branch_id);
		String[] values = value.split(",");
		int x = Integer.valueOf(values[0]).intValue();
		int y = Integer.valueOf(values[1]).intValue();
		int w = Integer.valueOf(values[2]).intValue();
		int h = Integer.valueOf(values[3]).intValue();
		
		parallel_branchXY.put(branch_id,x + "," + y + "," + w + "," + h);
		
		String name = "";
		name = ((NWActDef)acts.get(branch_id)).getFormatName();
		if (name.equals("")||name==null)
			name = branch_id;
		
//		sb.append("<g onmouseover=\"byBranchRecSelected(evt,'").append(branch_id).append("','")
//		  .append(name).append("',").append(x).append(",").append(y).append(",").append(SVGUtil.caclNameStrLength(name)).append(")\"").append(tab)
//		  .append(" onmouseout=\"unBranchRecSelected(evt,'").append("rec"+branch_id).append("')\"").append(tab)
//		  .append("onclick=\"branch_onClick(evt,'").append(branch_id).append("')\"").append(tab)
//		  .append(">").append(tab);

		sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
		  .append("\" width=\"").append(w).append("\" height=\"").append(h)
		  .append("\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec2);stroke-width:1;stroke:#B4B2B4;\" id=\"")
		  .append("rec"+branch_id).append("\"").append("/>").append(tab);
		
//		sb.append("</g>").append(tab);
		
 	String nodes = (String) branch_children.get(branch_id);
 	String[] ns = nodes.split(",");
 	for (int j=0;j<ns.length;j++){
			NWActDef act = (NWActDef)acts.get(ns[j]);
			if (act.getType()==16 && parallel_unitXY.containsKey(ns[j])){
	            	sb.append(this.createParallelUnit(ns[j],path));
	        }
		}
		
		return sb.toString();
	}
	
	private String createTransition(NWTransition tran)throws NWException{
		StringBuffer sb = new StringBuffer();
		String startactid = tran.getPrevActID();
		String endactid = tran.getNextActID();
		NWActDef s_act = (NWActDef) acts.get(startactid);
		NWActDef e_act = (NWActDef) acts.get(endactid);
		int s_type = s_act.getType();
		int e_type = e_act.getType();
		String pointInitSize = "0,0,0,0";
		String startPoint = pointInitSize;
		String endPoint = pointInitSize;
		if (s_type == NWActDef.ACT_TYPE_PARALLEL_UNIT_BEGIN) {
			int ax =0 ,ay=0 ,bx=0 ,by=0;
			if (parallel_unitXY.containsKey(s_act.getParentActDefID())) {
				String parallelXY = (String)parallel_unitXY.get(s_act.getParentActDefID());
				String[] sp = parallelXY.split(",");
				int width = Integer.parseInt(sp[2]);
				ax = Integer.parseInt(sp[0]) + width/2;
				ay = Integer.parseInt(sp[1]) + 5;
			}
			if (parallel_branchXY.containsKey(endactid)) {
				String branchXY = (String)parallel_branchXY.get(endactid);
				String[] ep = branchXY.split(",");
				int width = Integer.parseInt(ep[2]);
				bx = Integer.parseInt(ep[0]) + width/2;
				by = Integer.parseInt(ep[1]);
			}
			
			String firstMidpointXY = ax + "," + (ay + 10);
			String secondMidPointXY = bx + "," + (ay + 10);
			
			String[] bendpointPositions = new String[]{firstMidpointXY ,secondMidPointXY};
			
			sb.append(createAllPolyTransiton(tran, bendpointPositions, ax, ay, bx, by, true));
			
			return sb.toString();
		} else if(e_type == NWActDef.ACT_TYPE_PARALLEL_UNIT_END) {
			int ax =0 ,ay=0 ,bx=0 ,by=0;
			if (parallel_unitXY.containsKey(e_act.getParentActDefID())) {
				String parallelXY = (String)parallel_unitXY.get(e_act.getParentActDefID());
				String[] ep = parallelXY.split(",");
				int width = Integer.parseInt(ep[2]);
				int height = Integer.parseInt(ep[3]);
				bx = Integer.parseInt(ep[0]) + width/2;
				by = Integer.parseInt(ep[1]) + height -5;
			}
			if (parallel_branchXY.containsKey(startactid)) {
				String branchXY = (String)parallel_branchXY.get(startactid);
				String[] sp = branchXY.split(",");
				int width = Integer.parseInt(sp[2]);
				int height = Integer.parseInt(sp[3]);
				ax = Integer.parseInt(sp[0]) + width/2;
				ay = Integer.parseInt(sp[1]) + height;
			}
			
			String firstMidpointXY = ax + "," + (by - 15);
			String secondMidPointXY = bx + "," + (by - 15);
			
			String[] bendpointPositions = new String[]{firstMidpointXY ,secondMidPointXY};
			
			sb.append(createAllPolyTransiton(tran, bendpointPositions, ax, ay, bx, by, true));
			
			return sb.toString();
		} else {
			boolean isInProcess = true;
			if (hasParentNodes.containsKey(startactid)) {
				startPoint = (String)hasParentNodes.get(startactid);
				isInProcess = false;
			} 
			if (hasParentNodes.containsKey(endactid)){
				endPoint = (String)hasParentNodes.get(endactid);
				isInProcess = false;
			} 
			if (isInProcess) {
				if (noParentNodes.containsKey(startactid)) {
					startPoint = (String)noParentNodes.get(startactid);
				} else if (firstLevelParallel_unit.containsKey(startactid)) {
					startPoint = (String)firstLevelParallel_unit.get(startactid);
				}
				if (noParentNodes.containsKey(endactid)) {
					endPoint = (String)noParentNodes.get(endactid);
				} else if (firstLevelParallel_unit.containsKey(endactid)) {
					endPoint = (String)firstLevelParallel_unit.get(endactid);
					endPoint = reviseParallelSourceTran(endPoint);
				}
			} else {
				if (startPoint.equals(pointInitSize)) {
					if (parallel_unitXY.containsKey(startactid)) {
						startPoint = (String)parallel_unitXY.get(startactid);
					}
				}
				if (endPoint.equals(pointInitSize)) {
					if (parallel_unitXY.containsKey(endactid)) {
						endPoint = (String)parallel_unitXY.get(endactid);
						endPoint = reviseParallelSourceTran(endPoint);
					}
				}
			}
			String[] sp = startPoint.split(",");
			String[] ep = endPoint.split(",");
			int x1 = Integer.parseInt(sp[0]);
			int y1 = Integer.parseInt(sp[1]);
			int l1 = Integer.parseInt(sp[2]);
			int h1=Integer.parseInt(sp[3]);
			
			int x2 = Integer.parseInt(ep[0]);
			int y2 = Integer.parseInt(ep[1]);
			int l2 = Integer.parseInt(ep[2]);
			int h2=Integer.parseInt(ep[3]);
			
			String[] positions = tran.getPosition().split(";");
			if(!positions[0].equals("")){
				if (acts.get(s_act.getParentActDefID()) != null) {
					NWActDef parentActDef = (NWActDef)acts.get(s_act.getParentActDefID());
					if (parallel_branchXY.containsKey(parentActDef.getID())) {
						String parentXY = (String)parallel_branchXY.get(parentActDef.getID());
						String[] parentXYArray = parentXY.split(",");
						int parentX = Integer.parseInt(parentXYArray[0]);
						int parentY = Integer.parseInt(parentXYArray[1]);
						for (int i=0; i<positions.length; i++) {
							String[] positionXY = positions[i].split(",");
							int newX = Integer.parseInt(positionXY[0]) +  parentX;
							int newY = Integer.parseInt(positionXY[1]) +  parentY;
							positions[i] = newX + "," + newY;
						}
					}
				}
			}
			
			sb.append(this.createAutoTransiton(tran ,positions, x1, y1, x2, y2, l1, l2, h1, h2));
			return sb.toString();
		}
	}
	
	private String createAutoTransiton(NWTransition tran ,String[] positions, int x1, int y1,
			int x2, int y2, int l1, int l2, int h1, int h2)
	{
		int xa =0,ya=0,xd=0,yd=0;
		Point refer = new Point();
		if(!positions[0].equals("")){
			
			String startNodeInfo = x1+","+y1+","+l1+","+h1;
			String [] startBendpoint = positions[0].split(",");
			
			int startBendPointX = Integer.parseInt(startBendpoint[0]);
			int startBendPointY = Integer.parseInt(startBendpoint[1]);
			refer.x = startBendPointX;
			refer.y = startBendPointY;
			Point startNodePoint = getLocation(startNodeInfo, refer);
			xa = startNodePoint.x;
			ya = startNodePoint.y;
			
			String endNodeInfo = x2+","+y2+","+l2+","+h2;
			String [] endBendPoint = positions[positions.length-1].split(",");
			int endPointX = Integer.parseInt(endBendPoint[0]);
			int endPointY = Integer.parseInt(endBendPoint[1]);
			refer.x = endPointX;
			refer.y = endPointY;
			Point endNodePoint = getLocation(endNodeInfo, refer);
			xd = endNodePoint.x;
			yd = endNodePoint.y;
			
		} else {
			String startNodeInfo = x1+","+y1+","+l1+","+h1;
			refer.x = x2+l2/2;
			refer.y = y2+h2/2;
			Point startNodePoint = getLocation(startNodeInfo, refer);
			xa = startNodePoint.x;
			ya = startNodePoint.y;
			
			String endNodeInfo = x2+","+y2+","+l2+","+h2;
			refer.x = x1+l1/2;
			refer.y = y1+h1/2;
			Point endNodePoint = getLocation(endNodeInfo, refer);
			xd = endNodePoint.x;
			yd = endNodePoint.y;
		}
		
		return this.createAllPolyTransiton(tran ,positions, xa ,ya , xd  , yd , true);
	}
	
	private Point getLocation(String nodeInfo,Point refer)
	{
		String[] info = nodeInfo.split(",");
		int nodex = Integer.parseInt(info[0]);
		int nodey = Integer.parseInt(info[1]);
		int width = Integer.parseInt(info[2]);
		int height = Integer.parseInt(info[3]);
		
		float centerX=nodex+width*0.5f;
		float centerY=nodey+height*0.5f;
		float dx = refer.x - centerX;
		float dy = refer.y - centerY;
		
		if(Math.abs(dx)>Math.abs(dy)){
			if((nodex+width)<refer.x)
				centerX += 0.5f*width;
			else if (nodex>refer.x)
				centerX -= 0.5f*width;
			else
			{
				if(refer.y>(nodey+height/2))
					centerY += 0.5f*height;
				else
					centerY -= 0.5f*height;
			}
		}
		else{
			if((nodey+height)<refer.y)
				
				centerY += 0.5f*height;
			else if(nodey>refer.y)
				centerY -= 0.5f*height;
			else
			{
				if(refer.x<nodex)
					centerX -= 0.5f*width;
				else if(refer.x>(nodex+width))
					centerX += 0.5f*width;
				else
				{
					if(refer.y>(nodey+height/2))
						centerY += 0.5f*height;
					else
						centerY -= 0.5f*height;
				}
			}
			
		}
	
		return new Point(Math.round(centerX), Math.round(centerY));
		
	}
	
	//根据起始和终止坐标画出传输线,还要参考拐点positions
	private String createAllPolyTransiton(NWTransition tran ,String[] allPosition, float ax, float ay,
			float bx, float by,boolean isInParallel)
	{
		StringBuffer sb = new StringBuffer();
		sb.append("<polyline points=\"");
		sb.append(ax).append(",").append(ay).append(" ");
		if (!allPosition[0].equals(""))
			for (int i = 0; i < allPosition.length; i++) {
				String[] xy = allPosition[i].split(",");
				int x = Integer.parseInt(xy[0]);
				int y = Integer.parseInt(xy[1]);
				sb.append(x).append(",").append(y).append(" ");
			}

		sb.append(bx).append(",").append(by);
		sb.append("\" style=\"fill:none;stroke-width:0.9;stroke:#de90fe\"></polyline> ").append(tab);
		
		if (!allPosition[0].equals(""))
		{
			int k=allPosition.length-1;
			sb.append(creatArrow(get(k,0,allPosition), get(k,1,allPosition), (int)bx, (int)by));
		}
		else
			sb.append(creatArrow((int)ax, (int)ay, (int)bx, (int)by));
		
		//通过拐点的个数画出描述
		if(!allPosition[0].equals(""))
		{
			int inte=allPosition.length/2;
			int mod=allPosition.length%2;
			if (mod==1)
			{
				String[] xy = allPosition[inte].split(",");
				ax=bx=Integer.parseInt(xy[0]);
				ay=by=Integer.parseInt(xy[1]);
			}
			else
			{
				String[] xy = allPosition[inte-1].split(",");
				ax=Integer.parseInt(xy[0]);
				ay=Integer.parseInt(xy[1]);
				xy = allPosition[inte].split(",");
				bx=Integer.parseInt(xy[0]);
				by=Integer.parseInt(xy[1]);
			}
		}
		sb.append(this.createDescription(tran,ax,ay,bx,by));
		return sb.toString();
	}
	
	private int get(int index, int y ,String[] positions) {

		String num = positions[index];
		String[] number = num.split(",");
		if (y < 2)
			return Integer.parseInt(number[y]);
		else
			return 0;
	}
	
	//获取传输线的描述
	private String createDescription(NWTransition trans,float ax,float ay,float bx,float by)
	{
		// 绘制传输线上的描述
		StringBuffer sb = new StringBuffer();
		if (trans.getDescription() != null&& !trans.getDescription().equals("")) {
			String name = trans.getFormatDescription();
			int l = SVGUtil.caclNameStrLength(name);
			int h=SVGUtil.getTransitionHight(name);
			if (name.indexOf(">") > 0 || name.startsWith(">"))
				name = name.replaceAll(">", "&gt;");
			if (name.indexOf("<") > 0 || name.startsWith("<"))
				name = name.replaceAll("<", "&lt;");
			float tdx = 0;
			float tdy = 0;
			tdx = tdx - l / 2;
			if (by > ay)
				tdy = ay + (by - ay) / 2 - 6;
			else
				tdy = by + (ay - by) / 2 - 6;
			if (ax > bx) 
				tdx = bx + (ax - bx)/2-l/2; 
			else
				tdx = ax + (bx - ax)/2-l/2; 
			
			sb.append("<rect x=\"").append(tdx).append("\" y=\"").append(tdy)
					.append("\" width=\"").append(l).append(
							"\" height=\"").append(h).append("\" style=\"fill:#de90fe;\" ")
					.append("/>").append(tab);
			String svgText=createMultiLineText(new Float(tdx).intValue(), new Float(tdy + 11).intValue(), name);
			sb.append(svgText);
		}
		return sb.toString();
	}
	private String creatArrow(int ax,int  ay,int bx,int by)
	{
		StringBuffer sb=new StringBuffer();
		Point p1=new Point(ax,ay);
		Point p2=new Point(bx,by);
		Point a1=MathUtil.getLPoint(p1,p2);
		Point a2=MathUtil.getRPoint(p1,p2);
		sb.append("<polyline points=\"");
		sb.append(p2.x).append(",").append(p2.y).append(" ");
		sb.append(a1.x).append(",").append(a1.y);
		sb.append("\" style=\"fill:none;stroke-width:0.9;stroke:#de90fe\"></polyline> ").append(tab);
		sb.append("<polyline points=\"");
		sb.append(p2.x).append(",").append(p2.y).append(" ");
		sb.append(a2.x).append(",").append(a2.y);
		sb.append("\" style=\"fill:none;stroke-width:0.9;stroke:#de90fe\"></polyline> ").append(tab);
		return sb.toString();
	}

}