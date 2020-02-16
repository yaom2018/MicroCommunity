(function(vc){

    vc.extends({
        propTypes: {
               callBackListener:vc.propTypes.string, //父组件名称
               callBackFunction:vc.propTypes.string //父组件监听方法
        },
        data:{
            addInspectionRouteInfo:{
                configId:'',
                routeName:'',
inspectionName:'',
machineQuantity:'',
checkQuantity:'',
remark:'',

            }
        },
         _initMethod:function(){

         },
         _initEvent:function(){
            vc.on('addInspectionRoute','openAddInspectionRouteModal',function(){
                $('#addInspectionRouteModel').modal('show');
            });
        },
        methods:{
            addInspectionRouteValidate(){
                return vc.validate.validate({
                    addInspectionRouteInfo:vc.component.addInspectionRouteInfo
                },{
                    'addInspectionRouteInfo.routeName':[
{
                            limit:"required",
                            param:"",
                            errInfo:"路线名称不能为空"
                        },
 {
                            limit:"maxin",
                            param:"1,100",
                            errInfo:"路线名称字数不能超过100个"
                        },
                    ],
'addInspectionRouteInfo.inspectionName':[
{
                            limit:"required",
                            param:"",
                            errInfo:"巡检点不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"3000",
                            errInfo:"1个巡检路线的巡检点上限为100个"
                        },
                    ],
'addInspectionRouteInfo.machineQuantity':[
{
                            limit:"required",
                            param:"",
                            errInfo:"设备数量不能为空"
                        },
 {
                            limit:"num",
                            param:"",
                            errInfo:"数量（数字）格式错误"
                        },
                    ],
'addInspectionRouteInfo.checkQuantity':[
{
                            limit:"required",
                            param:"",
                            errInfo:"检查项数量不能为空"
                        },
 {
                            limit:"num",
                            param:"",
                            errInfo:"数量（数字）格式错误"
                        },
                    ],
'addInspectionRouteInfo.remark':[
 {
                            limit:"maxin",
                            param:"1,200",
                            errInfo:"收费项目不能超过100位"
                        },
                    ],




                });
            },
            saveInspectionRouteInfo:function(){
                if(!vc.component.addInspectionRouteValidate()){
                    vc.toast(vc.validate.errInfo);

                    return ;
                }

                vc.component.addInspectionRouteInfo.communityId = vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if(vc.notNull($props.callBackListener)){
                    vc.emit($props.callBackListener,$props.callBackFunction,vc.component.addInspectionRouteInfo);
                    $('#addInspectionRouteModel').modal('hide');
                    return ;
                }

                vc.http.post(
                    'addInspectionRoute',
                    'save',
                    JSON.stringify(vc.component.addInspectionRouteInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addInspectionRouteModel').modal('hide');
                            vc.component.clearAddInspectionRouteInfo();
                            vc.emit('inspectionRouteManage','listInspectionRoute',{});

                            return ;
                        }
                        vc.message(json);

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        vc.message(errInfo);

                     });
            },
            clearAddInspectionRouteInfo:function(){
                vc.component.addInspectionRouteInfo = {
                                            routeName:'',
inspectionName:'',
machineQuantity:'',
checkQuantity:'',
remark:'',

                                        };
            }
        }
    });

})(window.vc);
