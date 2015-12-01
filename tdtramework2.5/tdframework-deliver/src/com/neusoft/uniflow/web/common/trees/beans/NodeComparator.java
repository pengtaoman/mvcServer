package com.neusoft.uniflow.web.common.trees.beans;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author wangwb
 * @version 1.0
 */
import java.util.Comparator;

import com.neusoft.org.NWRole;

public class NodeComparator
    implements Comparator {
  public NodeComparator() {
  }

  public int compare(Object o1, Object o2) {
    NWRole node_1 = (NWRole) o1;
    NWRole node_2 = (NWRole) o2;
    return node_1.getName().compareTo(node_2.getName());
  }
 }