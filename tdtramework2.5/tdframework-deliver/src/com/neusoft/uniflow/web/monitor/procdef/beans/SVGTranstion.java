package com.neusoft.uniflow.web.monitor.procdef.beans;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWTransition;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.web.util.SVGUtil;

public class SVGTranstion implements Serializable{
	
	//分支结束到分支高度距离
	private static final int BRANCHEND_TO_BRANCH_GAP=30;
	//并发分支的高度偏移
	private static final int BRANCH_OFFSET=32;
	
	private static final int PARALLEL_LEFT_MARGIN = 3;
	//并发分支到并发体的高度距离
	private static final int BRANCH_TO_PARALLEL_GAP=10;
	
	/** 节点左侧透明距离,为了适应CS设计器节点 */
	private static final int NODE_LEFT_MARGIN = 15;
	
	private static final int BRANCH_RIGHT_MARGIN = 15;
	
	private static final int BRANCH_GAP = 5;
	
	private static final long serialVersionUID = 2143657812;
	private Hashtable acts = new Hashtable();
	Hashtable apps = new Hashtable();
	Hashtable states = new Hashtable();
	Hashtable actInstIDs = new Hashtable();
	Hashtable subProc = new Hashtable();
	Hashtable overtimeInfo=new Hashtable();
	private String pid;
	//画布大小
	private int maxX = 0;
	private int maxY = 0;
	//存放坐标和大小 x,y,l
	private Hashtable noParentNodes = new Hashtable();//父亲节点为流程的节点坐标
	private Hashtable hasParentNodes = new Hashtable();//父亲节点为节点的节点坐标
	private Hashtable firstLevelParallel_unit = new Hashtable();//第一层并发（父亲节点为流程）坐标
	/**
	 * 并发单元体原始坐标
	 */
	private Hashtable parallel_unit_init = new Hashtable();
	/** 并发单元体绝对坐标 */
	private Hashtable parallel_unitXY = new Hashtable();
	/** 分支绝对坐标 */
	private Hashtable parallel_branchXY = new Hashtable();
	private Hashtable Cparallel_branchXY = new Hashtable();//并发分支绝对坐标
	//存放各个体的关系
	private Hashtable parallel_branch = new Hashtable();//并发体-节点关系数组 key 并发体ID value 并发体的子节点ID
	private Hashtable branch_child = new Hashtable();//分支-节点关系数组 key 分支ID value 分支的子节点ID
	
	private Map actGraphicalInfoMap = new HashMap();
	
	public class ActGraphicalInfo {
		private String id;
		private int[] globalXY;
		private int[] localXY;
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public int[] getGlobalXY() {
			return globalXY;
		}
		public void setGlobalXY(int[] globalXY) {
			this.globalXY = globalXY;
		}
		public int[] getLocalXY() {
			return localXY;
		}
		public void setLocalXY(int[] localXY) {
			this.localXY = localXY;
		}
	}
	
	public SVGTranstion(NWProcDef procdef)throws Exception{
		this.pid = procdef.getID();
		this.initHashtable(procdef);
		this.caclMaxXY(procdef);
		
	}

	//以Hashtable存放 节点列表，记录 x,y,l（长度）
	private void initHashtable(NWProcDef process){
		
		//初始化节点坐标
		try{
		Vector activities=process.openActivityList();
		for (int i=0;i<activities.size();i++){
			NWActDef actdef = (NWActDef)activities.elementAt(i);
	        acts.put(actdef.getID(), actdef); 
	         
	        String[] pos = actdef.getPosition().split(",");
	      	int x = Integer.parseInt(pos[0]);
	      	int y = Integer.parseInt(pos[1]);
	      	
	      	ActGraphicalInfo info = new ActGraphicalInfo();
	      	info.setId(actdef.getID());
	      	info.setLocalXY(new int[]{x,y});
	      	actGraphicalInfoMap.put(info.getId(), info);
         
         int type = actdef.getType();
         //手动 自动 路由
         if (type<=11){
         	int l = 41 + SVGUtil.caclNameStrLength(actdef.getFormatName());
         	int h=SVGUtil.getNodeHightByName(actdef.getFormatName());
         	
         	if (actdef.getParentActDefID().equals(this.pid)) {
         		String value = (x+NODE_LEFT_MARGIN) + "," + y + "," + l + "," +h;
         		noParentNodes.put(actdef.getID(), value);
         	}
         	else if (!actdef.getParentActDefID().equals(this.pid)) {
         		String value =x + "," +y + "," +l+","+h;
         		hasParentNodes.put(actdef.getID(), value);
         	}
         	
         }
         //并发分支开始、分支结束         
         else if(type==20 ||type==21){
         	if (!actdef.getParentActDefID().equals(this.pid)){
	            	int l = 20;
	            	int h = 5;
	            	String value = String.valueOf(x) + "," + String.valueOf(y) + "," + String.valueOf(l)+","+h;;
	            	hasParentNodes.put(actdef.getID(), value);
         	}
         }
         //并发体
         else  if (type==16){
         	int l = 0;
         	int h=0;
         	if (actdef.getParentActDefID().equals(pid)) {
         		String value = String.valueOf(x+NODE_LEFT_MARGIN) + "," + String.valueOf(y) + "," + String.valueOf(l)+","+h;;
         		firstLevelParallel_unit.put(actdef.getID(), value);
         		parallel_unit_init.put(actdef.getID(), value);
         	} else {
         		String value = String.valueOf(x) + "," + String.valueOf(y) + "," + String.valueOf(l)+","+h;;
         		parallel_unit_init.put(actdef.getID(), value);
         	}
         }
		}
		
		//建立并发与分支、分支与分支内节点的关系
		for (int i=0;i<activities.size();i++){
			NWActDef actdef = (NWActDef)activities.elementAt(i);
         String pareActID = actdef.getParentActDefID();
         if (!pareActID.equals(pid) && !pareActID.equals("")){
         	NWActDef pareAct = (NWActDef) acts.get(pareActID);
         	if (pareAct.getType()==NWActDef.ACT_TYPE_PARALLEL_UNIT && actdef.getType()==NWActDef.ACT_TYPE_PARALLEL_BRANCH){//并发体
         		if (parallel_branch.containsKey(pareActID)){
         			String value = (String) parallel_branch.get(pareActID);
         			value = value + "," + actdef.getID();
         			parallel_branch.put(pareActID, value);
         		}else{
         			String value = actdef.getID();
         			parallel_branch.put(pareActID, value);
         		}
         	}
         	if (pareAct.getType()==NWActDef.ACT_TYPE_PARALLEL_BRANCH){//分支
         		if (branch_child.containsKey(pareActID)){
         			String value = (String) branch_child.get(pareActID);
         			value = value + "," + actdef.getID();
         			branch_child.put(pareActID, value);
         		}else{
         			String value = actdef.getID();
         			branch_child.put(pareActID, value);
         		}
         	}   	
         }
		}
		
		//将并发内分支排序
		for (int i=0;i<activities.size();i++){
			NWActDef actdef = (NWActDef)activities.elementAt(i);
            if (this.parallel_branch.containsKey(actdef.getID())){
            	String branch = (String) this.parallel_branch.get(actdef.getID());
            	String[] branches = branch.split(",");
            	String[] new_branches = new String[branches.length];

            	boolean oflag = false;
            	if (branches.length>1)
            		oflag = this.isBranchesOrder(branches[0], branches[1]);
            	if (oflag){
                	for (int j=0;j<branches.length;j++){
                		NWActDef act = (NWActDef) acts.get(branches[j]);
                		if (act.getType()==NWActDef.ACT_TYPE_PARALLEL_BRANCH){
                    		String pos = act.getPosition();
                    		String[] poss = pos.split(",");
                    		int order = Integer.parseInt(poss[0]);
                        	new_branches[order] = branches[j];
                		}
                	}
                	String new_value=new_branches[0];
                	for (int j=1;j<new_branches.length;j++){
                		new_value = new_value + "," + new_branches[j];
                	}
                	this.parallel_branch.put(actdef.getID(), new_value);
            	}
            }
		}
		
		initUnitBranchCompensation(activities);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	private void initUnitBranchCompensation(Vector activities)throws Exception{
		//绝对坐标转化-并发体
		for (int i=0;i<activities.size();i++){
			NWActDef actdef = (NWActDef)activities.elementAt(i);
			if (this.firstLevelParallel_unit.containsKey(actdef.getID())){
				String wideAndheight = this.translationUnitXY(actdef.getID());
				String xy = (String) firstLevelParallel_unit.get(actdef.getID());
		    	String[] pos = xy.split(",");
		    	String value = pos[0]+","+pos[1]+","+wideAndheight;
		    	firstLevelParallel_unit.put(actdef.getID(), value);	
			}
		}
		//分支平移
		for (int i=0;i<activities.size();i++){
			NWActDef actdef = (NWActDef)activities.elementAt(i);
			if (this.firstLevelParallel_unit.containsKey(actdef.getID())){
				String xy = (String) firstLevelParallel_unit.get(actdef.getID());
		    	String[] pos = xy.split(",");
		    	int tx = Integer.parseInt(pos[0]);
		    	int ty = Integer.parseInt(pos[1]);
				moveUnit(actdef.getID(),tx,ty,PARALLEL_LEFT_MARGIN,BRANCH_OFFSET);
			}
		}
	}
	
	private void moveCompUnit (String unit_id,int unitX,int unitY,int tx,int ty)throws Exception{			
		if (this.parallel_unitXY.containsKey(unit_id)){
			String xy = (String) parallel_unitXY.get(unit_id);
	    	String[] pos = xy.split(",");

	    	int h = Integer.parseInt(pos[3]) -34 -50;
			String branchs = (String) parallel_branch.get(unit_id);
			String[] brancn_nodes = branchs.split(",");
			for (int i=0;i<brancn_nodes.length;i++){
				NWActDef act = (NWActDef)acts.get(brancn_nodes[i]);
				if (act.getType()==19){
					String OldXY = (String) this.Cparallel_branchXY.get(brancn_nodes[i]);
			    	String[] obpos = OldXY.split(",");			    	
			    	int obx = Integer.parseInt(obpos[0]) ;
			    	int oby = Integer.parseInt(obpos[1]) ;
										
					String bxy = (String) parallel_branchXY.get(brancn_nodes[i]);
			    	String[] bpos = bxy.split(",");			    	
			    	int bx = tx + unitX;
			    	int by = ty + unitY;
			    	String value = String.valueOf(bx)+","+String.valueOf(by)+","+bpos[2]+","+String.valueOf(h);
			    	parallel_branchXY.put(brancn_nodes[i],value);
			    	moveCompBranch(brancn_nodes[i],bx - obx,by - oby);
			    	tx = tx + Integer.parseInt(bpos[2]) + 15;

				}
			}
		}
	}
	private void moveCompBranch (String branch_id,int tx,int ty)throws Exception{
		String nodes = (String) branch_child.get(branch_id);
		String[] brancn_nodes = nodes.split(",");
		for (int i=0;i<brancn_nodes.length;i++){
			NWActDef actdef = (NWActDef)acts.get(brancn_nodes[i]);
			if (actdef.getType()==16){				
				String uxy = (String) parallel_unitXY.get(brancn_nodes[i]);
		    	String[] upos = uxy.split(",");
		    	int ux = Integer.parseInt(upos[0]);
		    	int uy = Integer.parseInt(upos[1]);
		    	String value = String.valueOf(ux+tx) + "," + String.valueOf(uy+ty) + "," + upos[2]+","+upos[3];
		    	parallel_unitXY.put(brancn_nodes[i], value);		    			    	
		    	moveCompUnit(brancn_nodes[i],ux,uy,tx+3,ty + 50);
			}else{
				if (this.hasParentNodes.containsKey(brancn_nodes[i])){
					String xy = (String) hasParentNodes.get(brancn_nodes[i]);
			    	String[] pos = xy.split(",");
			    	int xx = Integer.parseInt(pos[0])+tx;
			    	int yy = Integer.parseInt(pos[1])+ty;
			    	String value = String.valueOf(xx) + "," + String.valueOf(yy) + "," + pos[2]+","+pos[3];
			    	hasParentNodes.put(brancn_nodes[i], value);

				}
			}
		}
	}
	
	private void moveUnit (String unit_id,int unitX,int unitY,int tx,int ty)throws Exception{			
			if (this.parallel_unitXY.containsKey(unit_id)){
				String xy = (String) parallel_unitXY.get(unit_id);
		    	String[] pos = xy.split(",");
		    	int h = Integer.parseInt(pos[3]) -34 -BRANCHEND_TO_BRANCH_GAP;
				String branchs = (String) parallel_branch.get(unit_id);
				String[] brancn_nodes = branchs.split(",");
				for (int i=0;i<brancn_nodes.length;i++){
					NWActDef act = (NWActDef)acts.get(brancn_nodes[i]);
					if (act.getType()==NWActDef.ACT_TYPE_PARALLEL_BRANCH){
						String bxy = (String) parallel_branchXY.get(brancn_nodes[i]);
				    	String[] bpos = bxy.split(",");			    	
				    	int bx = Integer.parseInt(bpos[0]) + tx + unitX;
				    	int by = Integer.parseInt(bpos[1]) + ty + unitY;
				    	String value = String.valueOf(bx)+","+String.valueOf(by)+","+bpos[2]+","+String.valueOf(h);
				    	parallel_branchXY.put(brancn_nodes[i],value);
				    	moveBranch(brancn_nodes[i],tx,ty);
				    	//分支之间的间隔15
				    	tx = tx + Integer.parseInt(bpos[2]) + BRANCH_GAP;
				    	ActGraphicalInfo info = (ActGraphicalInfo)actGraphicalInfoMap.get(brancn_nodes[i]);
				    	info.setGlobalXY(new int[]{bx ,by});
					}
				}
			}
	}
	private void moveBranch (String branch_id,int tx,int ty)throws Exception{
		String nodes = (String) branch_child.get(branch_id);
		String[] brancn_nodes = nodes.split(",");
		for (int i=0;i<brancn_nodes.length;i++){
			NWActDef actdef = (NWActDef)acts.get(brancn_nodes[i]);
			if (actdef.getType()==NWActDef.ACT_TYPE_PARALLEL_UNIT){				
				String uxy = (String) parallel_unitXY.get(actdef.getID());
		    	String[] upos = uxy.split(",");
		    	int ux = Integer.parseInt(upos[0]);
		    	int uy = Integer.parseInt(upos[1]);
		    	String value = String.valueOf(ux+tx) + "," + String.valueOf(uy+ty) + "," + upos[2]+","+upos[3];
		    	parallel_unitXY.put(brancn_nodes[i], value);		    			    	
				moveUnit(actdef.getID(),ux,uy,tx + PARALLEL_LEFT_MARGIN,ty + BRANCH_OFFSET);
			}else{
				if (this.hasParentNodes.containsKey(brancn_nodes[i])){
					String xy = (String) hasParentNodes.get(brancn_nodes[i]);
			    	String[] pos = xy.split(",");
			    	int xx = Integer.parseInt(pos[0])+tx;
			    	int yy = Integer.parseInt(pos[1])+ty;
			    	String value = String.valueOf(xx) + "," + String.valueOf(yy) + "," + pos[2]+","+pos[3];
			    	hasParentNodes.put(brancn_nodes[i], value);
				}
			}
		}
	}
	
	/**
	 * 计算并发分支的宽度以及高度
	 * @param parallel_unit_id
	 * @return
	 * @throws Exception
	 */
	private String translationUnitXY(String parallel_unit_id)throws Exception{
		String wideAndheight="0,0";
		int wide = 0;
		int height = 0;
		String branchs = (String) parallel_branch.get(parallel_unit_id);
		String xy = (String) parallel_unit_init.get(parallel_unit_id);
	 	String[] pos = xy.split(",");
	 	int x = Integer.parseInt(pos[0]);
	 	int y = Integer.parseInt(pos[1]);

		String[] brancn_nodes = branchs.split(",");
		for (int i=0;i<brancn_nodes.length;i++){
			NWActDef actdef = (NWActDef)acts.get(brancn_nodes[i]);
			if (actdef.getType()==NWActDef.ACT_TYPE_PARALLEL_BRANCH){
				//计算每个分支的宽度和高度
				String wh = translationBranchXY(brancn_nodes[i],x,y);
				String[] whs = wh.split(",");
				int w = Integer.parseInt(whs[0]);
				int h = Integer.parseInt(whs[1]);
				wide = wide + w + BRANCH_GAP;
				if (height<h) height = h;
			}
		}
		wideAndheight = String.valueOf(wide + 2)+","+String.valueOf(height+34+1+BRANCH_TO_PARALLEL_GAP);
		String value = x +","+ y +","+wideAndheight;
		parallel_unitXY.put(parallel_unit_id, value);
		return wideAndheight;
		
	}
	
	 /**
	  * 计算并发分支的宽度以及高度，并返回并发体的最大高度以及宽度
	  * @param branch_id 分支ID
	  * @param x 并发体X坐标
	  * @param y 并发体Y坐标
	  * @return 返回并发体的最大高度以及宽度
	  * @throws Exception
	  */
	private String translationBranchXY(String branch_id,int x,int y) throws Exception{
		String wideAndheight="0,0";
		int wide = 0;
		int height = 0;
		String nodes = (String) branch_child.get(branch_id);
		String[] branch_children = nodes.split(",");
		/***
		 * 遍历分支中的所有节点，找出宽度和高度最大值
		 */
		for (int i=0;i<branch_children.length;i++){
			NWActDef actdef = (NWActDef)acts.get(branch_children[i]);
			if (actdef.getType()==NWActDef.ACT_TYPE_PARALLEL_UNIT){

				//计算嵌套并发
				String xy = (String) parallel_unit_init.get(branch_children[i]);
		    	String[] pos = xy.split(",");
		    	
		    	//lincx 嵌套节点的边距
		    	int xx = Integer.parseInt(pos[0])+15;
		    	int yy = Integer.parseInt(pos[1])+15;
		    	String value = String.valueOf(xx+x) + "," + String.valueOf(yy+y) + "," + pos[2];
		    	parallel_unit_init.put(branch_children[i], value);
		    	
				String wh = translationUnitXY(branch_children[i]);
				String[] whs = wh.split(",");
				int w = Integer.parseInt(whs[0])+xx;
				int h = Integer.parseInt(whs[1])+yy;
		    	if (wide<w + BRANCH_RIGHT_MARGIN) wide=w + BRANCH_RIGHT_MARGIN;
		    	if (height<h) height=h;

			}else{
				if (this.hasParentNodes.containsKey(branch_children[i])){
					String xy = (String) hasParentNodes.get(branch_children[i]);
			    	String[] pos = xy.split(",");
			    	int xx = Integer.parseInt(pos[0])+NODE_LEFT_MARGIN;
			    	int yy = Integer.parseInt(pos[1]);
			    	int l = Integer.parseInt(pos[2]);
			    	if (wide<xx+l+BRANCH_RIGHT_MARGIN) wide=xx+l+BRANCH_RIGHT_MARGIN;
			    	NWActDef act = (NWActDef)acts.get(branch_children[i]);
			    	int type = act.getType();
			    	if (type==NWActDef.ACT_TYPE_PARALLEL_BRANCH_BEGIN || type==NWActDef.ACT_TYPE_PARALLEL_BRANCH_END){
			    		xx = xx -NODE_LEFT_MARGIN;
			    		if (height<yy) height=yy;//距下框的距离
			    	}else{
			    		if (height<yy) height=yy;
			    	}
			    	String value = String.valueOf(xx+x) + "," + String.valueOf(yy+y) + "," + pos[2]+","+pos[3];
			    	hasParentNodes.put(branch_children[i], value);
			    	
				}
			}
		}
		wideAndheight = String.valueOf(wide)+","+String.valueOf(height+25);
		String value = "0,0,"+wideAndheight;
		this.parallel_branchXY.put(branch_id, value);
		return wideAndheight;
	}
	
	
	
	/**
	 * 计算图像区
	 * @param procinst
	 * @throws Exception
	 */
	private void caclMaxXY(NWProcDef procdef) throws Exception{
		
		Vector activities = procdef.openActivityList();
		for (int i=0;i<activities.size();i++){
			NWActDef actdef = (NWActDef)activities.elementAt(i);
			String pactid = actdef.getParentActDefID();
			String actid = actdef.getID();
			
            if (pactid.equals(pid)){
            	if (this.noParentNodes.containsKey(actid)){
            		String node_value = (String)this.noParentNodes.get(actid);
            		String[] nds = node_value.split(",");
            		int x = Integer.parseInt(nds[0]);
            		int y = Integer.parseInt(nds[1]);
            		int w = Integer.parseInt(nds[2]);
            		int h = 25;
            		if (maxX < x+w) this.maxX = x + w;
            		if (maxY < y+h) this.maxY = y + h;
            		
            	}
            	if (this.firstLevelParallel_unit.containsKey(actid)){
            		String node_value = (String)this.parallel_unitXY.get(actid);
            		String[] nds = node_value.split(",");
            		int x = Integer.parseInt(nds[0]);
            		int y = Integer.parseInt(nds[1]);
            		int w = Integer.parseInt(nds[2]);
            		int h = Integer.parseInt(nds[3]);
            		if (maxX < x+w) this.maxX = x + w;
            		if (maxY < y+h) this.maxY = y + h;

            	}
            }
		}
		
		//lincx 遍历所有的传输线的拐点，找到x坐标和y坐标的最大值
		int transitionMaxX = 0;
		int transitionMaxY = 0;
		Vector transitions = procdef.openTransitionList();	
		Iterator transitionsIte = transitions.iterator();
		while(transitionsIte.hasNext())
		{
			NWTransition trans = (NWTransition)transitionsIte.next();
			if(!"".equals(trans.getPosition()))
			{
				//遍历一条传输线的所有拐点
				String[] positions = trans.getPosition().split(";");
				for(int j =0; j < positions.length;j++)
				{
					String bendpoints = positions[j];
					String[] bendPointXY = bendpoints.split(",");
					String xStr = bendPointXY[0];
					int x = new Integer(xStr).intValue();
					String yStr = bendPointXY[1];
					int y = new Integer(yStr).intValue();
					if(transitionMaxX <= x)
					{
						transitionMaxX = x;
					}
					if(transitionMaxY <= y)
					{
						transitionMaxY = y;
					}
				}
			}
		}	
		if(maxX <= transitionMaxX)
		{
			maxX = transitionMaxX;
		}
		if(maxY<= transitionMaxY)
		{
			maxY = transitionMaxY;
		}
				
		maxX = maxX + 150;
		maxY = maxY + 50;

	}
	private boolean isBranchesOrder(String firstid,String secondid){
		NWActDef first_act = (NWActDef) acts.get(firstid);
		String fpos = first_act.getPosition();
		String[] fposs = fpos.split(",");
		NWActDef second_act = (NWActDef) acts.get(secondid);
		String spos = second_act.getPosition();
		String[] sposs = spos.split(",");
		if (fposs[0].equals(sposs[0]))
			return false;
		else
			return true;
	}
	
	public Hashtable getActs() {
		return acts;
	}
	public Hashtable getCparallel_branchXY() {
		return Cparallel_branchXY;
	}
	public Hashtable getFirstLevelParallel_unit() {
		return firstLevelParallel_unit;
	}
	public Hashtable getHasParentNodes() {
		return hasParentNodes;
	}
	public int getMaxX() {
		return maxX;
	}
	public int getMaxY() {
		return maxY;
	}
	public Hashtable getNoParentNodes() {
		return noParentNodes;
	}
	public Hashtable getParallel_branch() {
		return branch_child;
	}
	public Hashtable getParallel_branchXY() {
		return parallel_branchXY;
	}
	public Hashtable getParallel_unit() {
		return parallel_branch;
	}
	public Hashtable getParallel_unit_init() {
		return parallel_unit_init;
	}
	public Hashtable getParallel_unitXY() {
		return parallel_unitXY;
	}
	
	public Hashtable getApps()
	{
		return this.apps;
	}
	public Hashtable getSubProc()
	{
		return this.subProc;
	}
	
	public Hashtable getStates()
	{
		return this.states;
	}
	public Hashtable getActInstIDs()
	{
		return this.actInstIDs;
	}
	public Hashtable getOverTimeInfo()
	{
		return this.overtimeInfo;
	}
	public String getPid() {
		return pid;
	}
}