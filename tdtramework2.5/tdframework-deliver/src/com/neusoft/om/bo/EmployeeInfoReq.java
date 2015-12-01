/**
 * EmployeeInfoReq.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.neusoft.om.bo;

public class EmployeeInfoReq  implements java.io.Serializable {
    private int appid;

    private java.lang.String ext_password;

    private java.lang.String ext_username;

    private int method;

    private java.lang.String password;

    private java.lang.String systemid;

    private java.lang.String token;

    private java.lang.String username;

    public EmployeeInfoReq() {
    }

    public EmployeeInfoReq(
           int appid,
           java.lang.String ext_password,
           java.lang.String ext_username,
           int method,
           java.lang.String password,
           java.lang.String systemid,
           java.lang.String token,
           java.lang.String username) {
           this.appid = appid;
           this.ext_password = ext_password;
           this.ext_username = ext_username;
           this.method = method;
           this.password = password;
           this.systemid = systemid;
           this.token = token;
           this.username = username;
    }


    /**
     * Gets the appid value for this EmployeeInfoReq.
     * 
     * @return appid
     */
    public int getAppid() {
        return appid;
    }


    /**
     * Sets the appid value for this EmployeeInfoReq.
     * 
     * @param appid
     */
    public void setAppid(int appid) {
        this.appid = appid;
    }


    /**
     * Gets the ext_password value for this EmployeeInfoReq.
     * 
     * @return ext_password
     */
    public java.lang.String getExt_password() {
        return ext_password;
    }


    /**
     * Sets the ext_password value for this EmployeeInfoReq.
     * 
     * @param ext_password
     */
    public void setExt_password(java.lang.String ext_password) {
        this.ext_password = ext_password;
    }


    /**
     * Gets the ext_username value for this EmployeeInfoReq.
     * 
     * @return ext_username
     */
    public java.lang.String getExt_username() {
        return ext_username;
    }


    /**
     * Sets the ext_username value for this EmployeeInfoReq.
     * 
     * @param ext_username
     */
    public void setExt_username(java.lang.String ext_username) {
        this.ext_username = ext_username;
    }




    public int getMethod() {
		return method;
	}

	public void setMethod(int method) {
		this.method = method;
	}

	/**
     * Gets the password value for this EmployeeInfoReq.
     * 
     * @return password
     */
    public java.lang.String getPassword() {
        return password;
    }


    /**
     * Sets the password value for this EmployeeInfoReq.
     * 
     * @param password
     */
    public void setPassword(java.lang.String password) {
        this.password = password;
    }


    /**
     * Gets the systemid value for this EmployeeInfoReq.
     * 
     * @return systemid
     */
    public java.lang.String getSystemid() {
        return systemid;
    }


    /**
     * Sets the systemid value for this EmployeeInfoReq.
     * 
     * @param systemid
     */
    public void setSystemid(java.lang.String systemid) {
        this.systemid = systemid;
    }


    /**
     * Gets the token value for this EmployeeInfoReq.
     * 
     * @return token
     */
    public java.lang.String getToken() {
        return token;
    }


    /**
     * Sets the token value for this EmployeeInfoReq.
     * 
     * @param token
     */
    public void setToken(java.lang.String token) {
        this.token = token;
    }


    /**
     * Gets the username value for this EmployeeInfoReq.
     * 
     * @return username
     */
    public java.lang.String getUsername() {
        return username;
    }


    /**
     * Sets the username value for this EmployeeInfoReq.
     * 
     * @param username
     */
    public void setUsername(java.lang.String username) {
        this.username = username;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof EmployeeInfoReq)) return false;
        EmployeeInfoReq other = (EmployeeInfoReq) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.appid==other.getAppid() &&
            ((this.ext_password==null && other.getExt_password()==null) || 
             (this.ext_password!=null &&
              this.ext_password.equals(other.getExt_password()))) &&
            ((this.ext_username==null && other.getExt_username()==null) || 
             (this.ext_username!=null &&
              this.ext_username.equals(other.getExt_username()))) &&
            this.method == other.getMethod() &&
            ((this.password==null && other.getPassword()==null) || 
             (this.password!=null &&
              this.password.equals(other.getPassword()))) &&
            ((this.systemid==null && other.getSystemid()==null) || 
             (this.systemid!=null &&
              this.systemid.equals(other.getSystemid()))) &&
            ((this.token==null && other.getToken()==null) || 
             (this.token!=null &&
              this.token.equals(other.getToken()))) &&
            ((this.username==null && other.getUsername()==null) || 
             (this.username!=null &&
              this.username.equals(other.getUsername())));
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
        _hashCode += getAppid();
        if (getExt_password() != null) {
            _hashCode += getExt_password().hashCode();
        }
        if (getExt_username() != null) {
            _hashCode += getExt_username().hashCode();
        }
        _hashCode += getMethod();
        if (getPassword() != null) {
            _hashCode += getPassword().hashCode();
        }
        if (getSystemid() != null) {
            _hashCode += getSystemid().hashCode();
        }
        if (getToken() != null) {
            _hashCode += getToken().hashCode();
        }
        if (getUsername() != null) {
            _hashCode += getUsername().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(EmployeeInfoReq.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("urn:EmployeeManagement", "EmployeeInfoReq"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("appid");
        elemField.setXmlName(new javax.xml.namespace.QName("", "appid"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://schemas.xmlsoap.org/soap/encoding/", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("ext_password");
        elemField.setXmlName(new javax.xml.namespace.QName("", "ext_password"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://schemas.xmlsoap.org/soap/encoding/", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("ext_username");
        elemField.setXmlName(new javax.xml.namespace.QName("", "ext_username"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://schemas.xmlsoap.org/soap/encoding/", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("mothod");
        elemField.setXmlName(new javax.xml.namespace.QName("", "mothod"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("password");
        elemField.setXmlName(new javax.xml.namespace.QName("", "password"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://schemas.xmlsoap.org/soap/encoding/", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("systemid");
        elemField.setXmlName(new javax.xml.namespace.QName("", "systemid"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://schemas.xmlsoap.org/soap/encoding/", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("token");
        elemField.setXmlName(new javax.xml.namespace.QName("", "token"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://schemas.xmlsoap.org/soap/encoding/", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("username");
        elemField.setXmlName(new javax.xml.namespace.QName("", "username"));
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
