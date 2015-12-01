package com.neusoft.uniflow.web.common.trees.beans;


public class ValueLabelPair {
  private int value = 0;
  private String label = "";
  public ValueLabelPair(int value, String label) {
    this.value = value;
    this.label = label;
  }

  public int getValue() {
    return value;
  }

  public void setValue(int value) {
    this.value = value;
  }

  public String getLabel() {
    return this.label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

}