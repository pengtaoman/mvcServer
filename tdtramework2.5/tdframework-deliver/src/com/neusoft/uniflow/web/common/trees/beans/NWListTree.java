package com.neusoft.uniflow.web.common.trees.beans;

public class NWListTree {
	private String[] stub;;
	private String[][] node;
	private NWListLeaf[][][] leaf;
	private int stubNum;
	private int nodeNum[];
	private int leafNum[][];
	private String[][] flag;
	
	public NWListTree(String[] stub,String[][] node,NWListLeaf[][][] leaf,String[][] flag){
		this.stub = stub;
		this.node = node;
		this.leaf = leaf;
		this.flag = flag;
	}
	public String getStubName(int stubID)throws Exception{
		return stub[stubID];
	}
	public int getStubNum(){
		return this.stubNum;
	}
	public String getNodeNameFromStub(int stubID,int nodeID)throws Exception{
		return node[stubID][nodeID];	
	}
	public int getNodeNumFromStub(int stubID){
		return nodeNum[stubID];
	}
	public String getLeafNameFromStubAndNode(int stubID,int nodeID,int leafID)throws Exception{
		return leaf[stubID][nodeID][leafID].getName();
	}
	public String getLeafActionFromStubAndNode(int stubID,int nodeID,int leafID)throws Exception{
		return leaf[stubID][nodeID][leafID].getAction();
	}
	public int getLeafNumFromStubAndNode(int stubID,int nodeID){
		return this.leafNum[stubID][nodeID];
	}
	public String getNodeFlagFromStub(int stubID ,int nodeID){
		return this.flag[stubID][nodeID];
	}
	public void setLeafNum(int[][] leafNum) {
		this.leafNum = leafNum;
	}
	public void setNodeNum(int[] nodeNum) {
		this.nodeNum = nodeNum;
	}
	public void setStubNum(int stubNum) {
		this.stubNum = stubNum;
	}


}
