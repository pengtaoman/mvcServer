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
 * X-Y二维图的基本属性
 */
public interface BaseCoorPropsInter {
    public void setCoorXName(String coorXName);
    public void setCoorYName(String coolYName);
    
    public String getCoorXName();
    public String getCoorYName();
    
    public void setChartFont(Font chartFont);
    public Font getChartFont();
    
    public void setTitle(String title);
    public String getTitle();
    
    public void setChartName(Comparable chartName);
    public Comparable getChartName();
    
    public void setBgColor(Color bgColor);
    public Color getBgColor();
    
    public void setWidth(int width);
    public int getWidth();
    
    public void setHeight(int height);
    public int getHeight();
}
