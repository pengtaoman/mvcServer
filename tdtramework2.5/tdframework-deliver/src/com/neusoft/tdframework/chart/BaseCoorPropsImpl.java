/*
 * Created on 2005-1-4
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.chart;

import java.awt.Color;
import java.awt.Font;

/**
 * @author mdj
 *
 * X-Y二维图的基本属性实现类
 * 
 */
public final class BaseCoorPropsImpl implements BaseCoorPropsInter {
    
    private String coorXName =null;
    private String coorYName =null;
    private Font   chartFont =null;
    private String title = null;
    private String chartName = null;
    private Color bgColor = null;
    private int width;
    private int height;
    
    public BaseCoorPropsImpl()
    {
        this.coorXName = "";
        this.coorYName = "";
        this.chartFont = null;
        this.title="";
        this.chartName = "";
        this.bgColor = null;
        this.width = 500;
        this.height = 300;
    }
    public BaseCoorPropsImpl(
                            String coorXName, 
                            String coorYName,
                            Font chartFont,
                            String title,
                            String chartName,
                            Color bgColor,
                            int width,
                            int height)
    {
        this.coorXName = coorXName;
        this.coorYName = coorYName;
        this.chartFont = chartFont;
        this.title = title;
        this.chartName = chartName;
        this.bgColor = bgColor;
        this.width = width;
        this.height = height;
    }
    public void setCoorXName(String coorXName)
    {
        this.coorXName = coorXName;
    }
    public void setCoorYName(String coolYName)
    {
        this.coorYName = coolYName;
    }
    
    public String getCoorXName()
    {
        return this.coorXName;
    }
    public String getCoorYName()
    {
        return this.coorYName;
    }
    
    public void setChartFont(Font chartFont)
    {
        this.chartFont = chartFont;
    }
    public Font getChartFont()
    {
        return this.chartFont;
    }
    
    public void setTitle(String title)
    {
        this.title = title;
    }
    
    public String getTitle()
    {
        return this.title;
    }
    
    public void setChartName(Comparable chartName)
    {
        this.chartName = (String)chartName;
    }
    public Comparable getChartName()
    {
        return this.chartName;
    }
    
    public void setBgColor(Color bgColor)
    {
     this.bgColor = bgColor;   
    }
    public Color getBgColor()
    {
        return this.bgColor;
    }
    
    public void setWidth(int width)
    {
        this.width = width;
    }
    public int getWidth()
    {
        return this.width;
    }
    
    public void setHeight(int height)
    {
        this.height = height;
    }
    public int getHeight()
    {
        return this.height;   
    }
}
