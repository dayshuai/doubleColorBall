package com.doublecolorball.service.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doublecolorball.mapper.DoublecolorballInfoDAO;
import com.doublecolorball.mapper.UserSsqDAO;
import com.doublecolorball.model.DoubleColorBallInfo;
import com.doublecolorball.model.UserSsq;
import com.doublecolorball.service.DoublecolorballInfoService;
import com.doublecolorball.utils.ValidBall;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service("doublecolorballInfoService")
public class DoubleColorBallInfoServiceImpl implements DoublecolorballInfoService {

	/** 日志管理 */
	private static final Logger logger = LoggerFactory.getLogger(DoubleColorBallInfoServiceImpl.class);

	@Autowired
	private DoublecolorballInfoDAO doublecolorballInfoDAO;
	
	@Autowired
	private ValidBall validBall;
	
	@Autowired
	private UserSsqDAO userSsqDAO;

	public PageInfo<DoubleColorBallInfo> findAll(int currentPage, int pageSize) {
		PageHelper.startPage(currentPage, pageSize);
		DoubleColorBallInfo doubleColorBallInfo = new DoubleColorBallInfo();
		List<DoubleColorBallInfo> balls = doublecolorballInfoDAO.findAll(doubleColorBallInfo);
		PageInfo<DoubleColorBallInfo> pageInfo = new PageInfo<>(balls);
		return pageInfo;
	}
	
	public void queryBallListForValid() {
		List<UserSsq> ssqList = userSsqDAO.queryNoGradeBall();
		for(UserSsq ssq : ssqList){
			try {
				validBall(ssq);
			} catch (Exception e) {
				logger.error("查询中奖信息更新状态失败,error:{}", ssq);
			}
		}
	}
	
	@Override
	public void validBall(UserSsq userSsq) {
		String openNo = userSsq.getOpenNo();
		DoubleColorBallInfo ball = doublecolorballInfoDAO.selectByOpenNo(openNo);
		userSsq.setGrade(validBallWithOfficial(userSsq, ball));
		userSsqDAO.updateIdKeySelective(userSsq);
	}
	
	public int validBallWithOfficial (UserSsq userSsq, DoubleColorBallInfo ball) {
		if(StringUtils.isBlank(userSsq.getBlueNum()) || StringUtils.isBlank(userSsq.getRedNums()) || StringUtils.isBlank(ball.getRedNums()) || StringUtils.isBlank(ball.getBlueNum())){
			logger.info("双色球数据有空值");
			return -1;
		}
		return validBall.isMiddle(tansferStringArr2IntArr(userSsq.getRedNums().split(",")), Integer.valueOf(userSsq.getBlueNum()), tansferStringArr2IntArr(ball.getRedNums().split(",")), Integer.valueOf(ball.getBlueNum()));
	}
	
	private int [] tansferStringArr2IntArr(String [] fromArr){
		int [] intArr = new int [fromArr.length];
		for(int i = 0; i < fromArr.length; i++){
			intArr[i] = Integer.valueOf(fromArr[i]);
		}
		return intArr;
	}

}
