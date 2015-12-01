/**
 * EmployeeManagementSoapBindingSkeleton.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.neusoft.om.bo;

public class EmployeeManagementSoapBindingSkeleton implements com.neusoft.om.bo.EmployeeManagement, org.apache.axis.wsdl.Skeleton {
    private com.neusoft.om.bo.EmployeeManagement impl;
    private static java.util.Map _myOperations = new java.util.Hashtable();
    private static java.util.Collection _myOperationsList = new java.util.ArrayList();

    /**
    * Returns List of OperationDesc objects with this name
    */
    public static java.util.List getOperationDescByName(java.lang.String methodName) {
        return (java.util.List)_myOperations.get(methodName);
    }

    /**
    * Returns Collection of OperationDescs
    */
    public static java.util.Collection getOperationDescs() {
        return _myOperationsList;
    }

    static {
        org.apache.axis.description.OperationDesc _oper;
        org.apache.axis.description.FaultDesc _fault;
        org.apache.axis.description.ParameterDesc [] _params;
        _params = new org.apache.axis.description.ParameterDesc [] {
            new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "employeeInfo"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("urn:EmployeeManagement", "EmployeeInfoReq"), com.neusoft.om.bo.EmployeeInfoReq.class, false, false), 
        };
        _oper = new org.apache.axis.description.OperationDesc("doSynFromAuthPlat", _params, new javax.xml.namespace.QName("", "doSynFromAuthPlatReturn"));
        _oper.setReturnType(new javax.xml.namespace.QName("urn:EmployeeManagement", "EmployeeInfoResp"));
        _oper.setElementQName(new javax.xml.namespace.QName("urn:EmployeeManagement", "doSynFromAuthPlat"));
        _oper.setSoapAction("");
        _myOperationsList.add(_oper);
        if (_myOperations.get("doSynFromAuthPlat") == null) {
            _myOperations.put("doSynFromAuthPlat", new java.util.ArrayList());
        }
        ((java.util.List)_myOperations.get("doSynFromAuthPlat")).add(_oper);
    }

    public EmployeeManagementSoapBindingSkeleton() {
        this.impl = new com.neusoft.om.bo.EmployeeManagementSoapBindingImpl();
    }

    public EmployeeManagementSoapBindingSkeleton(com.neusoft.om.bo.EmployeeManagement impl) {
        this.impl = impl;
    }
    public com.neusoft.om.bo.EmployeeInfoResp doSynFromAuthPlat(com.neusoft.om.bo.EmployeeInfoReq employeeInfo) throws java.rmi.RemoteException
    {
        com.neusoft.om.bo.EmployeeInfoResp ret = impl.doSynFromAuthPlat(employeeInfo);
        return ret;
    }

}
