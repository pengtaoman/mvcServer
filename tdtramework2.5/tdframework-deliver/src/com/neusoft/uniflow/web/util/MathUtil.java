package com.neusoft.uniflow.web.util;


import java.awt.Point;

/*
 * author zhaozhg
 */
public class MathUtil {
	
//以下两个方法完成了上面等同的功能，所采用的策略是：首先获取p2指向p1的向量(x1-x2)+(y1-y2)i,如果绕
//p2点逆时针旋转30度，则该向量应该乘以cos30+sin30i，此时得到了旋转后的矢量（(x1-x2)+(y1-y2)i）*（cos30+sin30i）
//由于此矢量的长度还是原来的长度，所以在这里换算成单位矢量。由于矢量是两个点之间的差值，所以，我们只要给他一个起始点就能确定他的另外一个点
//很明显，这里的起始点应该是P2。（顺时针旋转同理）
	public static  Point getRPoint(Point p1,Point p2)
	{
		double arrowLen=12,dx,dy;
		dx=p1.getX()-p2.getX();
		dy=p1.getY()-p2.getY();
		double temx=dx*0.5*Math.sqrt(3)-dy*0.5;
		double	temy=dy*0.5*Math.sqrt(3)+dx*0.5;
		dx=temx/Math.sqrt(temx*temx+temy*temy);
		dy=temy/Math.sqrt(temx*temx+temy*temy);
		Point left=new Point();
		left.x=new Double(dx*arrowLen).intValue()+p2.x;
		left.y=new Double(dy*arrowLen).intValue()+p2.y;
		return left;
		
	}
	public static Point getLPoint(Point p1,Point p2)
	{
		double arrowLen=12,dx,dy,x;
		dx=p1.getX()-p2.getX();
		dy=p1.getY()-p2.getY();
		double temx=dx*0.5*Math.sqrt(3)+dy*0.5;
		double	temy=dy*0.5*Math.sqrt(3)-dx*0.5;
		dx=temx/Math.sqrt(temx*temx+temy*temy);
		dy=temy/Math.sqrt(temx*temx+temy*temy);
		Point left=new Point();
		left.x=new Double(dx*arrowLen).intValue()+p2.x;
		left.y=new Double(dy*arrowLen).intValue()+p2.y;
		return left;
		
	}

}