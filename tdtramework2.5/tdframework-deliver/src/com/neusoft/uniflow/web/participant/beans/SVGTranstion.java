package com.neusoft.uniflow.web.participant.beans;

import java.io.Serializable;
import java.util.Hashtable;
import java.util.Vector;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;

public class SVGTranstion implements Serializable{
	
	private static final long serialVersionUID = 6271415226137921548L;
	private Hashtable acts = new Hashtable();
	private String pid;
	//画布大小
	private int maxX = 0;
	private int maxY = 0;
	//存放坐标和大小 x,y,l
	private Hashtable noParentNodes = new Hashtable();//父亲节点为流程的节点坐标
	private Hashtable hasParentNodes = new Hashtable();//父亲节点为节点的节点坐标
	private Hashtable firstLevelParallel_unit = new Hashtable();//第一层并发（父亲节点为流程）坐标
	private Hashtable parallel_unit_init = new Hashtable();//并发单元体原始坐标

	private Hashtable parallel_unitXY = new Hashtable();//并发单元体绝对坐标
	private Hashtable parallel_branchXY = new Hashtable();//并发分支绝对坐标
	private Hashtable Cparallel_branchXY = new Hashtable();//并发分支绝对坐标
	//存放各个体的关系
	private Hashtable parallel_unit = new Hashtable();//并发体-节点关系数组 key 并发体ID value 并发体的子节点ID
	private Hashtable parallel_branch = new Hashtable();//分支-节点关系数组 key 分支ID value 分支的子节点ID
	//当图像存在负坐标时，用于图像平移
	private int trX = 0;//图像偏移值
	private int trY = 0;//图像偏移值
	
	public SVGTranstion(NWSession session,Vector activities,String processid)throws Exception{
		this.pid = processid;
		this.initHashtable(session, activities);
		this.caclMaxXY(activities);
		
	}
	//以Hashtable存放 节点列表，记录 x,y,l（长度）
	private void initHashtable(NWSession session,Vector activities){
		//初始化节点坐标
		for (int i=0;i<activities.size();i++){
			NWActDef actdef = (NWActDef)activities.elementAt(i);
         acts.put(actdef.getID(), actdef); 
         int type = actdef.getType();
         if (type<=11){
         	if (actdef.getParentActDefID().equals(this.pid)){
	            	String[] pos = actdef.getPosition().split(",");
	            	int x = Integer.parseInt(pos[0]);
	            	int y = Integer.parseInt(pos[1]);
	            	if (x<trX) trX = x;
	            	if (y<trY) trY = y;
	            	int l = 41 + caclNameStrLength(actdef.getName());
	            	String value = String.valueOf(x) + "," + String.valueOf(y) + "," + String.valueOf(l);
	            	noParentNodes.put(actdef.getID(), value);
         	}else if (!actdef.getParentActDefID().equals(this.pid)){
	            	String[] pos = actdef.getPosition().split(",");
	            	int x = Integer.parseInt(pos[0]);
	            	int y = Integer.parseInt(pos[1]);
	            	int l = 41 + caclNameStrLength(actdef.getName()) ;
	            	String value = String.valueOf(x) + "," + String.valueOf(y) + "," + String.valueOf(l);
	            	hasParentNodes.put(actdef.getID(), value);
         	}
         }
         if(type==20 ||type==21){
         	if (!actdef.getParentActDefID().equals(this.pid)){
	            	String[] pos = actdef.getPosition().split(",");
	            	int x = Integer.parseInt(pos[0]);
	            	int y = Integer.parseInt(pos[1]);
	            	int l = 50;
	            	String value = String.valueOf(x) + "," + String.valueOf(y) + "," + String.valueOf(l);
	            	hasParentNodes.put(actdef.getID(), value);
         	}
         }
         if (type==16){
         	if (actdef.getParentActDefID().equals(pid)){
	            	String[] pos = actdef.getPosition().split(",");
	            	int x = Integer.parseInt(pos[0]);
	            	int y = Integer.parseInt(pos[1]);
	            	if (x<trX) trX = x;
	            	if (y<trY) trY = y;
	            	int l = 0;
	            	String value = String.valueOf(x) + "," + String.valueOf(y) + "," + String.valueOf(l);
	            	firstLevelParallel_unit.put(actdef.getID(), value);
	            	parallel_unit_init.put(actdef.getID(), value);
         	}else{
	            	String[] pos = actdef.getPosition().split(",");
	            	int x = Integer.parseInt(pos[0]);
	            	int y = Integer.parseInt(pos[1]);
	            	if (x<trX) trX = x;
	            	if (y<trY) trY = y;
	            	int l = 0;
	            	String value = String.valueOf(x) + "," + String.valueOf(y) + "," + String.valueOf(l);
	            	parallel_unit_init.put(actdef.getID(), value);
         	}
         }
		}

		//坐标平移
		
		if (trX<-10 || trY<-10){
			for (int i=0;i<activities.size();i++){
				NWActDef actdef = (NWActDef)activities.elementAt(i);
				if (noParentNodes.containsKey(actdef.getID())){
					String position = (String)noParentNodes.get(actdef.getID());
	            	String[] pos = position.split(",");
	            	int x = Integer.parseInt(pos[0]) - trX;
	            	int y = Integer.parseInt(pos[1]) - trY;
	            	int l = Integer.parseInt(pos[2]);
	            	String value = String.valueOf(x) + "," + String.valueOf(y) + "," + String.valueOf(l);
	            	noParentNodes.put(actdef.getID(), value);
				}
				if (firstLevelParallel_unit.containsKey(actdef.getID())){
					String position = (String)noParentNodes.get(actdef.getID());
	            	String[] pos = position.split(",");
	            	int x = Integer.parseInt(pos[0]) - trX;
	            	int y = Integer.parseInt(pos[1]) - trY;
	            	int l = Integer.parseInt(pos[2]);
	            	String value = String.valueOf(x) + "," + String.valueOf(y) + "," + String.valueOf(l);
	            	firstLevelParallel_unit.put(actdef.getID(), value);
				}
			}
		}
		
		//初始化并发、补偿等关系体
		for (int i=0;i<activities.size();i++){
			NWActDef actdef = (NWActDef)activities.elementAt(i);
         String pareActID = actdef.getParentActDefID();
         if (!pareActID.equals(pid) && !pareActID.equals("")){
         	NWActDef pareAct = (NWActDef) acts.get(pareActID);
         	if (pareAct.getType()==16 && actdef.getType()==19){//并发体
         		if (parallel_unit.containsKey(pareActID)){
         			String value = (String) parallel_unit.get(pareActID);
         			value = value + "," + actdef.getID();
         			parallel_unit.put(pareActID, value);
         		}else{
         			String value = actdef.getID();
         			parallel_unit.put(pareActID, value);
         		}
         	}
         	if (pareAct.getType()==19){//分支
         		if (parallel_branch.containsKey(pareActID)){
         			String value = (String) parallel_branch.get(pareActID);
         			value = value + "," + actdef.getID();
         			parallel_branch.put(pareActID, value);
         		}else{
         			String value = actdef.getID();
         			parallel_branch.put(pareActID, value);
         		}
         	}      	
         }
		}
		
		//初始化并发分支次序
		for (int i=0;i<activities.size();i++){
			NWActDef actdef = (NWActDef)activities.elementAt(i);
            if (this.parallel_unit.containsKey(actdef.getID())){
            	String branch = (String) this.parallel_unit.get(actdef.getID());
            	String[] branches = branch.split(",");
            	String[] new_branches = new String[branches.length];
            	boolean oflag = false;
            	if (branches.length>1)
            		oflag = this.isBranchesOrder(branches[0], branches[1]);
            	if (oflag){
                	for (int j=0;j<branches.length;j++){
                		NWActDef act = (NWActDef) acts.get(branches[j]);
                		if (act.getType()==19){
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
                	this.parallel_unit.put(actdef.getID(), new_value);
            	}
            }
		}
		
     //初始化体的坐标及大小
		try{
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
				moveUnit(actdef.getID(),tx,ty,3,50);
			}
		}
	}
	
	private void moveCompUnit (String unit_id,int unitX,int unitY,int tx,int ty)throws Exception{			
		if (this.parallel_unitXY.containsKey(unit_id)){
			String xy = (String) parallel_unitXY.get(unit_id);
	    	String[] pos = xy.split(",");

	    	int h = Integer.parseInt(pos[3]) -34 -50;
			String branchs = (String) parallel_unit.get(unit_id);
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
		String nodes = (String) parallel_branch.get(branch_id);
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
			    	String value = String.valueOf(xx) + "," + String.valueOf(yy) + "," + pos[2];
			    	hasParentNodes.put(brancn_nodes[i], value);

				}
			}
		}
	}
	
	private void moveUnit (String unit_id,int unitX,int unitY,int tx,int ty)throws Exception{			
			if (this.parallel_unitXY.containsKey(unit_id)){
				String xy = (String) parallel_unitXY.get(unit_id);
		    	String[] pos = xy.split(",");
		    	int h = Integer.parseInt(pos[3]) -34 -50;
				String branchs = (String) parallel_unit.get(unit_id);
				String[] brancn_nodes = branchs.split(",");
				for (int i=0;i<brancn_nodes.length;i++){
					NWActDef act = (NWActDef)acts.get(brancn_nodes[i]);
					if (act.getType()==19){
						moveBranch(brancn_nodes[i],tx,ty);
						String bxy = (String) parallel_branchXY.get(brancn_nodes[i]);
				    	String[] bpos = bxy.split(",");			    	
				    	int bx = Integer.parseInt(bpos[0]) + tx + unitX;
				    	int by = Integer.parseInt(bpos[1]) + ty + unitY;
				    	String value = String.valueOf(bx)+","+String.valueOf(by)+","+bpos[2]+","+String.valueOf(h);
				    	parallel_branchXY.put(brancn_nodes[i],value);
				    	//分支之间的间隔15
				    	tx = tx + Integer.parseInt(bpos[2]) + 15;
					}
				}
			}
	}
	private void moveBranch (String branch_id,int tx,int ty)throws Exception{
		String nodes = (String) parallel_branch.get(branch_id);
		String[] brancn_nodes = nodes.split(",");
		for (int i=0;i<brancn_nodes.length;i++){
			NWActDef actdef = (NWActDef)acts.get(brancn_nodes[i]);
			if (actdef.getType()==16){				
				String uxy = (String) parallel_unitXY.get(actdef.getID());
		    	String[] upos = uxy.split(",");
		    	int ux = Integer.parseInt(upos[0]);
		    	int uy = Integer.parseInt(upos[1]);
		    	String value = String.valueOf(ux+tx) + "," + String.valueOf(uy+ty) + "," + upos[2]+","+upos[3];
		    	parallel_unitXY.put(brancn_nodes[i], value);		    			    	
				moveUnit(actdef.getID(),ux,uy,tx+3,ty + 50);
			}else{
				if (this.hasParentNodes.containsKey(brancn_nodes[i])){
					String xy = (String) hasParentNodes.get(brancn_nodes[i]);
			    	String[] pos = xy.split(",");
			    	int xx = Integer.parseInt(pos[0])+tx;
			    	int yy = Integer.parseInt(pos[1])+ty;
			    	String value = String.valueOf(xx) + "," + String.valueOf(yy) + "," + pos[2];
			    	hasParentNodes.put(brancn_nodes[i], value);
				}
			}
		}
	}
	private String translationUnitXY(String parallel_unit_id)throws Exception{
		String wideAndheight="0,0";
		int wide = 0;
		int height = 0;
		String branchs = (String) parallel_unit.get(parallel_unit_id);
		String xy = (String) parallel_unit_init.get(parallel_unit_id);
	 	String[] pos = xy.split(",");
	 	int x = Integer.parseInt(pos[0]);
	 	int y = Integer.parseInt(pos[1]);

		String[] brancn_nodes = branchs.split(",");
		for (int i=0;i<brancn_nodes.length;i++){
			NWActDef actdef = (NWActDef)acts.get(brancn_nodes[i]);
			if (actdef.getType()==19){
				String wh = translationBranchXY(brancn_nodes[i],x,y);
				String[] whs = wh.split(",");
				int w = Integer.parseInt(whs[0]);
				int h = Integer.parseInt(whs[1]);
				if(i == brancn_nodes.length-1)
				{
					wide = wide + w + 5;
				}
				else
				{
					wide = wide + w + 14;
				}
				if (height<h) height = h;
			}
		}
		//TODO
		wideAndheight = String.valueOf(wide+2)+","+String.valueOf(height+34+1+50);
		
		String value = x+","+y+","+wideAndheight;
		parallel_unitXY.put(parallel_unit_id, value);
		return wideAndheight;
		
	}
	private String translationBranchXY(String parallel_branch_id,int x,int y) throws Exception{
		String wideAndheight="0,0";
		int wide = 0;
		int height = 0;
		String nodes = (String) parallel_branch.get(parallel_branch_id);
		String[] brancn_nodes = nodes.split(",");
		/***
		 * 遍历分支中的所有节点，找出宽度和高度最大值
		 */
		for (int i=0;i<brancn_nodes.length;i++){
			NWActDef actdef = (NWActDef)acts.get(brancn_nodes[i]);
			if (actdef.getType()==16){

				//计算嵌套并发
				String xy = (String) parallel_unit_init.get(brancn_nodes[i]);
		    	String[] pos = xy.split(",");
		    	
		    	//lincx 嵌套节点的边距
		    	int xx = Integer.parseInt(pos[0])+15;
		    	int yy = Integer.parseInt(pos[1]);
		    	
		    	String value = String.valueOf(xx+x) + "," + String.valueOf(yy+y) + "," + pos[2];
		    	parallel_unit_init.put(brancn_nodes[i], value);
		    	
				String wh = translationUnitXY(brancn_nodes[i]);
				String[] whs = wh.split(",");
				int w = Integer.parseInt(whs[0])+xx;//modify by zhaozhg 20080527 "+xx"
				int h = Integer.parseInt(whs[1])+yy;
		    	if (wide<w) wide=w;
		    	if (height<h) height=h;

			}else{
				if (this.hasParentNodes.containsKey(brancn_nodes[i])){
					String xy = (String) hasParentNodes.get(brancn_nodes[i]);
			    	String[] pos = xy.split(",");
			    	int xx = Integer.parseInt(pos[0])+15;
			    	int yy = Integer.parseInt(pos[1])+15;//上方留距离框15的距离
			    	int l = Integer.parseInt(pos[2]);
			    	if (wide<xx+l) wide=xx+l;
			    	NWActDef act = (NWActDef)acts.get(brancn_nodes[i]);
			    	int type = act.getType();
			    	if (type==20 || type==21){
			    		xx = xx -15;
			    		if (height<yy+5+15) height=yy+5+15;//距下框的距离
			    	}else{
			    		if (height<yy+25+15) height=yy+25+15;
			    	}
			    	String value = String.valueOf(xx+x) + "," + String.valueOf(yy+y) + "," + pos[2];
			    	hasParentNodes.put(brancn_nodes[i], value);
			    	
				}
			}
		}
		wideAndheight = String.valueOf(wide+15)+","+String.valueOf(height+10);
		String value = "0,0,"+wideAndheight;
		this.parallel_branchXY.put(parallel_branch_id, value);
		return wideAndheight;
	}
	//计算名称字符串长度
	private int caclNameStrLength(String nameStr){
		int length = 0;
		length = (nameStr.getBytes().length * 6);
		//根据字符进行过滤
		/*************************不同的字符所占的像素不同
			两个像素是：il
			三个像素是：j
			四个像素是：frtI
			五个像素是：ckszJL
			七个像素是：ACDGHNRU
			八个像素是：mwMOQ
			十个像素是：W
		*********************/
		
		
		//字符串中的大写英文字母增加1px间距
		int width = 0;
		for(int i = 0; i < nameStr.length();i++)
		{
			int c = nameStr.charAt(i);
			if(c> 64&&  c<123 )
			{
				if("il".indexOf(c)>= 0)
				{
					width -=4;
				}
				else if("j".indexOf(c)>= 0)
				{
					width -=3;
					
				} else if("frtI".indexOf(c)>= 0)
				{
					width -=2;
					
				}else if("ckszJL".indexOf(c)>= 0)
				{
					width -=1;
					
				}else if("ACDGHNRU".indexOf(c)>= 0)
				{
					width +=1;
					
				}else if("mwMOQ".indexOf(c)>= 0)
				{
					width +=2;
				}
				else if("W".indexOf(c)>= 0)
				{
					width +=4;
				}
				
			}
			//英文字符()字符的情况
			if(c == 40||c ==41)
			{
				width -=2;
			}
		}
		length += width;
		return length;
	}
	private void caclMaxXY(Vector activities) throws Exception{
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
		return parallel_branch;
	}
	public Hashtable getParallel_branchXY() {
		return parallel_branchXY;
	}
	public Hashtable getParallel_unit() {
		return parallel_unit;
	}
	public Hashtable getParallel_unit_init() {
		return parallel_unit_init;
	}
	public Hashtable getParallel_unitXY() {
		return parallel_unitXY;
	}
	public String getPid() {
		return pid;
	}
	public int getTrX() {
		return trX;
	}
	public int getTrY() {
		return trY;
	}


	

}
