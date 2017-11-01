package com.doublecolorball.service.impl;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.doublecolorball.mapper.DoublecolorballInfoDAO;
import com.doublecolorball.mapper.UserSsqDAO;
import com.doublecolorball.model.DoubleColorBallInfo;
import com.doublecolorball.model.UserSsq;
import com.doublecolorball.service.UserSsqService;
import com.doublecolorball.shiro.SessionUser;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
@Component
public class UserSsqServiceImpl implements UserSsqService {

    /** 日志管理 */
    private static final Logger logger = LoggerFactory.getLogger(UserSsqServiceImpl.class);
    
	@Autowired
	private UserSsqDAO userSsqDAO;
	@Autowired
	private DoublecolorballInfoDAO doublecolorballInfoDAO;

	@Override
	public int insertSelective(UserSsq userSsq) {
		Subject subject = SecurityUtils.getSubject();
    	SessionUser user = (SessionUser) subject.getPrincipal();
    	userSsq.setUserId(user.getId());
		userSsq.setOpenNo(String.valueOf(Integer.valueOf(doublecolorballInfoDAO.selectMaxOpenNo()) + 1));
		userSsq.setCount(1);
		String [] redNumsArr = userSsq.getRedNums().split(",");
		Arrays.sort(redNumsArr);
		userSsq.setRedNums(StringUtils.join(redNumsArr,","));
		return userSsqDAO.insertSelective(userSsq);
	}
	public PageInfo<DoubleColorBallInfo> findAll(int currentPage, int pageSize) {
		PageHelper.startPage(currentPage, pageSize);
		DoubleColorBallInfo doubleColorBallInfo = new DoubleColorBallInfo();
		List<DoubleColorBallInfo> balls = doublecolorballInfoDAO.findAll(doubleColorBallInfo);
		PageInfo<DoubleColorBallInfo> pageInfo = new PageInfo<>(balls);
		return pageInfo;
	}
	public PageInfo<UserSsq> findUserSsq(int currentPage, int pageSize) {
		PageHelper.startPage(currentPage, pageSize);
		Subject subject = SecurityUtils.getSubject();
		SessionUser user = (SessionUser) subject.getPrincipal();
		UserSsq userSsq = new UserSsq();
		userSsq.setUserId(user.getId());
		List<UserSsq> userSsqList =  userSsqDAO.findUserSsq(userSsq);
		PageInfo<UserSsq> pageInfo = new PageInfo<>(userSsqList);
		return pageInfo;
	}
	
	


	
}
