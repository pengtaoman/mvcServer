package com.neusoft.uniflow.web.common.trees.beans;


public class DropListElement {
  private int type = 0;
  private String label = "";
  public DropListElement(int type, String label) {
    this.type = type;
    this.label = label;
  }

  public int getType() {
    return type;
  }

  public void setType(int type) {
    this.type = type;
  }

  public String getLabel() {
    return this.label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

}