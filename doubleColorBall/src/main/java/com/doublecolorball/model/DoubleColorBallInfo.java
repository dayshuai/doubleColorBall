package com.doublecolorball.model;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.model.AfterExtractor;
import us.codecraft.webmagic.model.annotation.ExtractBy;
import us.codecraft.webmagic.model.annotation.HelpUrl;
import us.codecraft.webmagic.model.annotation.TargetUrl;

/**
 * @author code4crafer@gmail.com
 *         Date: 13-6-23
 *         Time: 下午4:28
 */
@TargetUrl("http://kaijiang.zhcw.com/zhcw/html/ssq/list_\\d.html")
@HelpUrl("/zhcw/inc/ssq/ssq_wqhg.jsp?pageNum=\\d")
public class DoubleColorBallInfo implements AfterExtractor {
    
    private int id;
    
    private String redNums;
    
    private String openDate;
    
    private String openNo;
    
    private String blueNum;
    
    private String allNums;
    
    private String saleNum;
    @ExtractBy(value = ".wqhgt", type = ExtractBy.Type.Css)
    private String table;
    @ExtractBy(value = "tr", type = ExtractBy.Type.Css)
    private List<String> tableTr;
    
    private String firstGradeNum;
    
    private String secondGradeNum;
    @ExtractBy(value = ".pg > strong", type = ExtractBy.Type.Css)
    private String allPageNo;
    
    private String [] redNumArr;
    
    

    public String[] getRedNumArr() {
		return StringUtils.isBlank(this.redNums)?null:this.redNums.split(",");
	}





	public void setRedNumArr(String[] redNumArr) {
		this.redNumArr = redNumArr;
	}





	public int getId() {
		return id;
	}





	public void setId(int id) {
		this.id = id;
	}





	public String getAllPageNo() {
		return allPageNo;
	}





	public void setAllPageNo(String allPageNo) {
		this.allPageNo = allPageNo;
	}





	public String getFirstGradeNum() {
		return firstGradeNum;
	}





	public void setFirstGradeNum(String firstGradeNum) {
		this.firstGradeNum = firstGradeNum;
	}





	public String getSecondGradeNum() {
		return secondGradeNum;
	}





	public void setSecondGradeNum(String secondGradeNum) {
		this.secondGradeNum = secondGradeNum;
	}





	public List<String> getTableTr() {
		return tableTr;
	}





	public void setTableTr(List<String> tableTr) {
		this.tableTr = tableTr;
	}





	public String getTable() {
		return table;
	}





	public void setTable(String table) {
		this.table = table;
	}





	@Override
	public String toString() {
		return "DoubleColorBallInfo [redNums=" + redNums + ", openDate=" + openDate + ", openNo=" + openNo
				+ ", blueNum=" + blueNum + ", allNums=" + allNums + ", saleNum=" + saleNum + "]";
	}





	public String getRedNums() {
		return redNums;
	}





	public void setRedNums(String redNums) {
		this.redNums = redNums;
	}





	public String getOpenDate() {
		return openDate;
	}





	public void setOpenDate(String openDate) {
		this.openDate = openDate;
	}





	public String getOpenNo() {
		return openNo;
	}





	public void setOpenNo(String openNo) {
		this.openNo = openNo;
	}





	public String getBlueNum() {
		return blueNum;
	}





	public void setBlueNum(String blueNum) {
		this.blueNum = blueNum;
	}





	public String getAllNums() {
		return allNums;
	}





	public void setAllNums(String allNums) {
		this.allNums = allNums;
	}





	public String getSaleNum() {
		return saleNum;
	}





	public void setSaleNum(String saleNum) {
		this.saleNum = saleNum;
	}





	@Override
    public void afterProcess(Page page) {
    }
}
