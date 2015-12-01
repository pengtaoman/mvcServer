package com.neusoft.uniflow.web.common.trees.beans;



public class PageControl {

  private int curPage;
  private int maxPage;
  private int maxRowCount;
  private int rowsPerPage;

  public PageControl() {
  }

  public int getCurPage() {
    return this.curPage;
  }

  public void setCurPage(int curPage) {
    this.curPage = curPage;
  }

  public int getMaxPage() {
    return this.maxPage;
  }

  public void setMaxPage(int maxPage) {
    this.maxPage = maxPage;
  }

  public int getMaxRowCount() {
    return this.maxRowCount;
  }

  public void setMaxRowCount(int maxRowCount) {
    this.maxRowCount = maxRowCount;
  }

  public int getRowsPerPage() {
    return this.rowsPerPage;
  }

  public void setRowsPerPage(int rowsPerPage) {
    this.rowsPerPage = rowsPerPage;
  }

  public int getStartLocation(int rowsPerPage,int curPage){
    int startLocation = 1;
    startLocation = rowsPerPage * (curPage-1) + 1;
    return startLocation;
  }
}