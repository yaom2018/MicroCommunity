(function(vc,vm){

    vc.extends({
        data:{
            editVisitInfo:{
                vId:'',
name:'',
visitGender:'',
phoneNumber:'',
ownerId:'',
case:'',
visit_time:'',
departure_time:'',

            }
        },
         _initMethod:function(){

         },
         _initEvent:function(){
             vc.on('editVisit','openEditVisitModal',function(_params){
                vc.component.refreshEditVisitInfo();
                $('#editVisitModel').modal('show');
                vc.copyObject(_params, vc.component.editVisitInfo );
                vc.component.editVisitInfo.communityId = vc.getCurrentCommunity().communityId;
            });
        },
        methods:{
            editVisitValidate:function(){
                        return vc.validate.validate({
                            editVisitInfo:vc.component.editVisitInfo
                        },{
                            'editVisitInfo.name':[
{
                            limit:"required",
                            param:"",
                            errInfo:"访客姓名不能为空"
                        },
 {
                            limit:"maxin",
                            param:"2,50",
                            errInfo:"访客姓名必须在2至50字符之间"
                        },
                    ],
'editVisitInfo.visitGender':[
 {
                            limit:"maxLength",
                            param:"1",
                            errInfo:"请填写男或女即可"
                        },
                    ],
'editVisitInfo.phoneNumber':[
{
                            limit:"required",
                            param:"",
                            errInfo:"访客电话不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"11",
                            errInfo:"电话号不能超过11位！"
                        },
                    ],
'editVisitInfo.ownerId':[
{
                            limit:"required",
                            param:"",
                            errInfo:"目标业主不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"目标业主信息填写错误"
                        },
                    ],
'editVisitInfo.case':[
{
                            limit:"required",
                            param:"",
                            errInfo:"来访事由不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"500",
                            errInfo:"来访事由内容不能超过500"
                        },
                    ],
'editVisitInfo.visit_time':[
{
                            limit:"required",
                            param:"",
                            errInfo:"来访时间不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"访客来访时间错误"
                        },
                    ],
'editVisitInfo.departure_time':[
{
                            limit:"required",
                            param:"",
                            errInfo:"离开时间不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"访客离开时间错误"
                        },
                    ],
'editVisitInfo.vId':[
{
                            limit:"required",
                            param:"",
                            errInfo:"访客登录记录Id不能为空"
                        }]

                        });
             },
            editVisit:function(){
                if(!vc.component.editVisitValidate()){
                    vc.message(vc.validate.errInfo);
                    return ;
                }

                vc.http.post(
                    'editVisit',
                    'update',
                    JSON.stringify(vc.component.editVisitInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editVisitModel').modal('hide');
                             vc.emit('visitManage','listVisit',{});
                            return ;
                        }
                        vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        vc.message(errInfo);
                     });
            },
            refreshEditVisitInfo:function(){
                vc.component.editVisitInfo= {
                  vId:'',
name:'',
visitGender:'',
phoneNumber:'',
ownerId:'',
case:'',
visit_time:'',
departure_time:'',

                }
            }
        }
    });

})(window.vc,window.vc.component);
