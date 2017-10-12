package com.doublecolorball.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doublecolorball.mapper.DoublecolorballInfoDAO;
import com.doublecolorball.mapper.UserSsqDAO;
import com.doublecolorball.model.UserSsq;
import com.doublecolorball.service.UserSsqService;
@Service("userSsqService")
public class UserSsqServiceImpl implements UserSsqService {

    /** 日志管理 */
    private static final Logger logger = LoggerFactory.getLogger(UserSsqServiceImpl.class);
    
	@Autowired
	private UserSsqDAO userSsqDAO;
	@Autowired
	private DoublecolorballInfoDAO doublecolorballInfoDAO;

	@Override
	public int insertSelective(UserSsq userSsq) {
		userSsq.setOpenNo(String.valueOf(Integer.valueOf(doublecolorballInfoDAO.selectMaxOpenNo()) + 1));
		userSsq.setCount(1);
		
		return userSsqDAO.insertSelective(userSsq);
	}
	


	
}
