package com.doublecolorball.cache.redis.exception;

public class PrincipalIdNullException extends RuntimeException  {

    /**
	 * 
	 */
	private static final long serialVersionUID = 3171529707777229691L;
	private static final String MESSAGE = "Principal Id shouldn't be null!";

    public PrincipalIdNullException(Class clazz, String idMethodName) {
        super(clazz + " id field: " +  idMethodName + ", value is null\n" + MESSAGE);
    }
}
