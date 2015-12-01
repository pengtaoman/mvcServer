/**
 * EmployeeManagementServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.neusoft.om.bo;

public class EmployeeManagementServiceLocator extends org.apache.axis.client.Service implements com.neusoft.om.bo.EmployeeManagementService {

    public EmployeeManagementServiceLocator() {
    }


    public EmployeeManagementServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public EmployeeManagementServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for EmployeeManagement
    private java.lang.String EmployeeManagement_address = "http://localhost:8080/crm1/services/EmployeeManagement";

    public java.lang.String getEmployeeManagementAddress() {
        return EmployeeManagement_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String EmployeeManagementWSDDServiceName = "EmployeeManagement";

    public java.lang.String getEmployeeManagementWSDDServiceName() {
        return EmployeeManagementWSDDServiceName;
    }

    public void setEmployeeManagementWSDDServiceName(java.lang.String name) {
        EmployeeManagementWSDDServiceName = name;
    }

    public com.neusoft.om.bo.EmployeeManagement getEmployeeManagement() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(EmployeeManagement_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getEmployeeManagement(endpoint);
    }

    public com.neusoft.om.bo.EmployeeManagement getEmployeeManagement(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            com.neusoft.om.bo.EmployeeManagementSoapBindingStub _stub = new com.neusoft.om.bo.EmployeeManagementSoapBindingStub(portAddress, this);
            _stub.setPortName(getEmployeeManagementWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setEmployeeManagementEndpointAddress(java.lang.String address) {
        EmployeeManagement_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (com.neusoft.om.bo.EmployeeManagement.class.isAssignableFrom(serviceEndpointInterface)) {
                com.neusoft.om.bo.EmployeeManagementSoapBindingStub _stub = new com.neusoft.om.bo.EmployeeManagementSoapBindingStub(new java.net.URL(EmployeeManagement_address), this);
                _stub.setPortName(getEmployeeManagementWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("EmployeeManagement".equals(inputPortName)) {
            return getEmployeeManagement();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("urn:EmployeeManagement", "EmployeeManagementService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("urn:EmployeeManagement", "EmployeeManagement"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("EmployeeManagement".equals(portName)) {
            setEmployeeManagementEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
