package com.lilai.framework.security.pojo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.lilai.framework.entity.User;

public class TDSecurityUser extends User implements UserDetails{

	private static final long serialVersionUID = -5848448898671654353L;
	
	

	public TDSecurityUser(User user) {
		if (user != null) {
			this.setId(user.getId());
			//this.setLastname(String.valueOf(user.getId()));
			this.setPassword(user.getPassword());

			this.setLastname(user.getLastname());
			
			this.setPhoneNum(user.getPhoneNum());
		}
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_tduser");
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
		authorities.add(authority);
	    return authorities;
	}

	@Override
	public String getUsername() {
		return String.valueOf(super.getId());
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result
				+ ((lastname == null) ? 0 : lastname.hashCode());
		result = prime * result
				+ ((password == null) ? 0 : password.hashCode());
//		result = prime * result
//				+ ((phoneNum == null) ? 0 : phoneNum.hashCode());
//		
//		result = (int) (prime * result
//				+ ((phoneNum == null) ? 0 : getAuthorities().hashCode()));
		
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TDSecurityUser other = (TDSecurityUser) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (lastname == null) {
			if (other.lastname != null)
				return false;
		} else if (!lastname.equals(other.lastname))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
//		if (phoneNum == null) {
//			if (other.phoneNum != null)
//				return false;
//		} else if (!phoneNum.equals(other.phoneNum))
//			return false;
		return true;
	}
	
	
	
//	@Override  
//    public boolean equals(Object obj)  
//    {  
//  
//        if (this == obj)  
//        {  
//            return true;  
//        }  
//        if (obj instanceof TDSecurityUser)  
//        {  
//        	TDSecurityUser et = (TDSecurityUser) obj;  
//            if (et.getId() == this.getId()
//                    && (et.getLastname() == this.getLastname()
//                    && (et.getAuthorities()==this.getAuthorities())  
//                    && et.getPassword() == this.getPassword() && et.getPhoneNum() == this.getPhoneNum()  
//                    && et.getUsername() == this.getUsername()
//                    && et.serialVersionUID == this.serialVersionUID
//            )) {  
//                return true;  
//            }  
//        }  
//        return false;  
//    }  
//  
//    /**  
//     *   
//     * {@inheritDoc}  
//     */  
//    @Override  
//    public int hashCode()  
//    {  
//        // 正整数常量，值为素数  
//        int result = 17;  
//        // 计算hashCode，37是素数  
//          
//        // 整数  
//        result = (int) (37 * result + this.getId());  
//        // 对象  
//        result = 37 * result + objectHashCode(this.getLastname());  
//        // 浮点型  
//        result = 37 * result + objectHashCode(this.getPassword());  
//        // boolean  
//        result = 37 * result + objectHashCode(this.getPhoneNum());  
//        // byte  
//        result = 37 * result + objectHashCode(this.getUsername());  
//        
//        result = (int) (37 * result + serialVersionUID);  
//
//        return result;  
//    }  
//    
//    int objectHashCode(Object obj){  
//        
//        if (obj == null)  
//        {  
//            return 0;  
//        }  
//        return obj.hashCode();  
//    }  
//
//    public static void main(String[] args) {
//;
//	}
}
