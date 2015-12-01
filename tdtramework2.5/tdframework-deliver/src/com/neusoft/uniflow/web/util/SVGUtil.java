package com.neusoft.uniflow.web.util;

/**
 * 流程监控辅助类
 * 
 * @author zhaozg
 * @version 3.4
 */
public class SVGUtil {

	//普通节点正常高度
	public final static int  NODE_STANDARD_HIGHT=25;
	//传输线描述标准高度
	public final static int  TRANSITION_STANDARD_HIGHT=12;
	//每行文本所占高度
	public final static int NODE_ONELINE_HIGHT=12;
	//节点图标高度
	public final static int NODE_IMAGE_HIGHT=16;
	//节点图标宽度
	public final static int NODE_IMAGE_WIDTH=16;
	//节点图标补偿
	public final static int NODE_IMAGE_COMPENSATION=6;
	
	/*
	 * 根据节点名称（存在换行）计算节点的高度
	 */
	public static int getNodeHightByName(String name){
		String[] multiNames=name.split("\\r\\n");
		int lines=multiNames.length;
		return NODE_STANDARD_HIGHT+(lines-1)*NODE_ONELINE_HIGHT;
	}
	

	/*
	 * 根据节点名称（存在换行）计算节点的高度
	 */
	public static int getTransitionHight(String description)
	{
		String[] multiNames=description.split("\\r\\n");
		int lines=multiNames.length;
		return TRANSITION_STANDARD_HIGHT+(lines-1)*NODE_ONELINE_HIGHT;
	}
	/**
	 * 计算名称字符串长度
	 */
	public static int caclNameStrLength(String nameStr){
		String[] names=nameStr.split("\\r\\n");
		String maxLenName="";
		for(int i=0;i<names.length;i++){
			String name=names[i];
			if(name.length()>maxLenName.length())
				maxLenName=name;
		}
		int length = maxLenName.getBytes().length * 6;
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
	
}
