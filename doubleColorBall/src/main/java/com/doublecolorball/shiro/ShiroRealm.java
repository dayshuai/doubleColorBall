package com.doublecolorball.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.doublecolorball.model.User;
import com.doublecolorball.service.UserService;
import com.doublecolorball.utils.BeanUtils;

/**
 * ClassName: ShiroRealm
 * Description: 自定义realm
 * Date: 2017年7月28日 上午10:54:45 
 * @Author shi zunming
 */
public class ShiroRealm extends AuthorizingRealm {
	
	private static final Logger log = LoggerFactory.getLogger(ShiroRealm.class);
	
	@Autowired
	UserService userSerivce;

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		if (principals == null) {
			throw new AuthorizationException(
					"PrincipalCollection method argument cannot be null.");
		}

		SessionUser user = (SessionUser) getAvailablePrincipal(principals);
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		
		
		return info;
	}
	
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authcToken) throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;

		User user = userSerivce.getUserByUserName(token.getUsername());
		if (user==null) {
			log.warn("用户登录的用户名不存在。Username：" + token.getUsername());
			throw new AuthenticationException("用户名或者密码错误");
		} 
		
		String userName = user.getUsername();
		String userPwd = user.getPassword();
		if (!userName.equals(token.getUsername()))
			throw new AuthenticationException();
		
		
		SessionUser sessionUser = BeanUtils.dataConvert(user, SessionUser.class);
		
	
		SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(
				sessionUser, userPwd,
				ByteSource.Util.bytes(userName), getName());
		return info;
	}

	@Override
	public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
		super.clearCachedAuthorizationInfo(principals);
	}

	@Override
	public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
		super.clearCachedAuthenticationInfo(principals);
	}

	@Override
	public void clearCache(PrincipalCollection principals) {
		super.clearCache(principals);
	}

	@Override
	public void onLogout(PrincipalCollection principals) {
		super.onLogout(principals);
		SessionUser user = (SessionUser) principals.getPrimaryPrincipal();
	}
}