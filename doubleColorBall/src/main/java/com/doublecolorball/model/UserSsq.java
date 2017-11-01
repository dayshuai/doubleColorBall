package com.doublecolorball.model;

import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Case;

public class UserSsq {

	private static final long serialVersionUID = 1L;
	

	/** 序号 **/
	private Integer id;

	/** 红球号码 **/
	private String redNums;

	/** 蓝球 **/
	private String blueNum;

	/** 期号 **/
	private String openNo;

	/** 生成日期 **/
	private Date createDate;

	/** 用户id **/
	private Integer userId;

	/** 注数 **/
	private Integer count;
	
	private int grade;
	
	private String gradeDetail;
	
	
	private String [] redNumArr;
	
	public String[] getRedNumArr() {
		return StringUtils.isBlank(this.redNums)?null:this.redNums.split(",");
	}
	

	
	public String getGradeDetail() {
		switch (this.grade) {
			case 1:
				this.gradeDetail = "一等奖";
				break;
			case 2:
				this.gradeDetail = "二等奖";
				break;
			case 3:
				this.gradeDetail = "三等奖";
				break;
			case 4:
				this.gradeDetail = "四等奖";
				break;
			case 5:
				this.gradeDetail = "五等奖";
				break;
			case 6:
				this.gradeDetail = "六等奖";
				break;
			case -1:
				this.gradeDetail = "没中奖";
				break;
			default:
				this.gradeDetail = "没开奖";
				break;
		}
		return gradeDetail;
	}



	public void setGradeDetail(String gradeDetail) {
		this.gradeDetail = gradeDetail;
	}



	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}


	public UserSsq(){

	}

	public UserSsq(String redNums,String blueNum,String openNo,Date createDate,Integer userId,Integer count){
		this.redNums=redNums;
		this.blueNum=blueNum;
		this.openNo=openNo;
		this.createDate=createDate;
		this.userId=userId;
		this.count=count;
	}
	public void setId(Integer id){
		this.id=id;
	}

	public Integer getId(){
		return this.id;
	}
	
	public void setRedNums(String redNums){
		this.redNums=redNums;
	}

	public String getRedNums(){
		return this.redNums;
	}
	
	public void setBlueNum(String blueNum){
		this.blueNum=blueNum;
	}

	public String getBlueNum(){
		return this.blueNum;
	}
	
	public void setOpenNo(String openNo){
		this.openNo=openNo;
	}

	public String getOpenNo(){
		return this.openNo;
	}
	
	public void setCreateDate(Date createDate){
		this.createDate=createDate;
	}

	public Date getCreateDate(){
		return this.createDate;
	}
	
	public void setUserId(Integer userId){
		this.userId=userId;
	}

	public Integer getUserId(){
		return this.userId;
	}
	
	public void setCount(Integer count){
		this.count=count;
	}

	public Integer getCount(){
		return this.count;
	}
	
}