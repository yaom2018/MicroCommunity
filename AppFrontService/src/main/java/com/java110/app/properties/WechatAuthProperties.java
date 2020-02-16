package com.java110.app.properties;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "java110.auth.wechat")
@PropertySource("classpath:wechatAuth.properties")
public class WechatAuthProperties {

    //微信支付类型
//NATIVE--原生支付
//JSAPI--公众号支付-小程序支付
//MWEB--H5支付
//APP -- app支付
    public static final String TRADE_TYPE_NATIVE = "NATIVE";
    public static final String TRADE_TYPE_JSAPI = "JSAPI";
    public static final String TRADE_TYPE_MWEB = "MWEB";
    public static final String TRADE_TYPE_APP = "APP";

    private String sessionHost;
    private String appId;
    private String secret;
    private String grantType;
    private String key;
    private String mchId;
    private String wxPayUnifiedOrder;
    private String wxNotifyUrl;

    public String getSessionHost() {
        return sessionHost;
    }

    public void setSessionHost(String sessionHost) {
        this.sessionHost = sessionHost;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public String getGrantType() {
        return grantType;
    }

    public void setGrantType(String grantType) {
        this.grantType = grantType;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getMchId() {
        return mchId;
    }

    public void setMchId(String mchId) {
        this.mchId = mchId;
    }

    public String getWxPayUnifiedOrder() {
        return wxPayUnifiedOrder;
    }

    public void setWxPayUnifiedOrder(String wxPayUnifiedOrder) {
        this.wxPayUnifiedOrder = wxPayUnifiedOrder;
    }

    public String getWxNotifyUrl() {
        return wxNotifyUrl;
    }

    public void setWxNotifyUrl(String wxNotifyUrl) {
        this.wxNotifyUrl = wxNotifyUrl;
    }
}
