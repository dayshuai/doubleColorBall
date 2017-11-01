package com.doublecolorball.utils;

/**
 * 公钥信息
 * 
 * @author shi zunming
 */
public class PublicKeyMap {
	private String modulus;
	private String exponent;
	private String token;

	public String getModulus() {
		return modulus;
	}

	public void setModulus(String modulus) {
		this.modulus = modulus;
	}

	public String getExponent() {
		return exponent;
	}

	public void setExponent(String exponent) {
		this.exponent = exponent;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "PublicKeyMap [modulus=" + modulus + ", exponent=" + exponent
				+ "]";
	}
}
