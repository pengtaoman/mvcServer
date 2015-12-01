/**
 * EmployeeInfoResp.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.neusoft.om.bo;

public class EmployeeInfoResp  implements java.io.Serializable {
    private int retFlag;

    private java.lang.String retMsg;

    public EmployeeInfoResp() {
    }

    public EmployeeInfoResp(
           int retFlag,
           java.lang.String retMsg) {
           this.retFlag = retFlag;
           this.retMsg = retMsg;
    }


    /**
     * Gets the retFlag value for this EmployeeInfoResp.
     * 
     * @return retFlag
     */
    public int getRetFlag() {
        return retFlag;
    }


    /**
     * Sets the retFlag value for this EmployeeInfoResp.
     * 
     * @param retFlag
     */
    public void setRetFlag(int retFlag) {
        this.retFlag = retFlag;
    }


    /**
     * Gets the retMsg value for this EmployeeInfoResp.
     * 
     * @return retMsg
     */
    public java.lang.String getRetMsg() {
        return retMsg;
    }


    /**
     * Sets the retMsg value for this EmployeeInfoResp.
     * 
     * @param retMsg
     */
    public void setRetMsg(java.lang.String retMsg) {
        this.retMsg = retMsg;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof EmployeeInfoResp)) return false;
        EmployeeInfoResp other = (EmployeeInfoResp) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.retFlag == other.getRetFlag() &&
            ((this.retMsg==null && other.getRetMsg()==null) || 
             (this.retMsg!=null &&
              this.retMsg.equals(other.getRetMsg())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        _hashCode += getRetFlag();
        if (getRetMsg() != null) {
            _hashCode += getRetMsg().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(EmployeeInfoResp.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("urn:EmployeeManagement", "EmployeeInfoResp"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("retFlag");
        elemField.setXmlName(new javax.xml.namespace.QName("", "retFlag"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("retMsg");
        elemField.setXmlName(new javax.xml.namespace.QName("", "retMsg"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://schemas.xmlsoap.org/soap/encoding/", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
