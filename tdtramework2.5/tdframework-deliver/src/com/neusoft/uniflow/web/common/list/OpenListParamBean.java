package com.neusoft.uniflow.web.common.list;

public class OpenListParamBean
{
	private String orderBy;
	private boolean isAscending;
	private int start;
	private int offset;

	public OpenListParamBean(String orderBy, boolean isAscending, int start,int offset)
	{
		this.orderBy = orderBy;
		this.isAscending = isAscending;
		this.start = start;
		this.offset = offset;
	}
	public String getOrderBy()
	{
		return orderBy;
	}
	public void setOrderBy(String orderBy)
	{
		this.orderBy = orderBy;
	}
	public boolean isIsAscending()
	{
		return isAscending;
	}
	public void setIsAscending(boolean isAscending)
	{
		this.isAscending = isAscending;
	}
	public int getStart()
	{
		return start;
	}
	public void setStart(int start)
	{
		this.start = start;
	}
	public int getOffset()
	{
		return offset;
	}
	public void setOffset(int offset)
	{
		this.offset = offset;
	}
}