package com.java110.core.smo.fee;

import com.java110.core.feign.FeignConfiguration;
import com.java110.dto.fee.FeeConfigDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * @ClassName IFeeConfigInnerServiceSMO
 * @Description 费用配置接口类
 * @Author wuxw
 * @Date 2019/4/24 9:04
 * @Version 1.0
 * add by wuxw 2019/4/24
 **/
@FeignClient(name = "fee-service", configuration = {FeignConfiguration.class})
@RequestMapping("/feeConfigApi")
public interface IFeeConfigInnerServiceSMO {

    /**
     * <p>查询小区楼信息</p>
     *
     *
     * @param feeConfigDto 数据对象分享
     * @return FeeConfigDto 对象数据
     */
    @RequestMapping(value = "/queryFeeConfigs", method = RequestMethod.POST)
    List<FeeConfigDto> queryFeeConfigs(@RequestBody FeeConfigDto feeConfigDto);

    /**
     * 查询<p>小区楼</p>总记录数
     *
     * @param feeConfigDto 数据对象分享
     * @return 小区下的小区楼记录数
     */
    @RequestMapping(value = "/queryFeeConfigsCount", method = RequestMethod.POST)
    int queryFeeConfigsCount(@RequestBody FeeConfigDto feeConfigDto);
}
