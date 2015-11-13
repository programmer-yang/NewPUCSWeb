$.components.register("mMenu", {
    init: function () {

    },
    api: function () {
        var menuBox = $('#menu-box');
        var _this = this;


        var lis = $('li[data-role=menu]', menuBox);
        lis.each(function (key) {
            $(lis[key]).on('click', function () {
                _this.holdMenu($(this), _this);
            });
        });

        //绑定API单击事件
        //$('#menu-api-a', menuBox).on('click', function () {
        //
        //});

    },
    changeContent: function (bodyClass, content, callback) {
        var body = $(document).find('body');
        //body.css('height','0');
        var contentBox = $('#content-box', body);
        if (bodyClass) {
            body.attr('class', bodyClass);
            //contentBox.html(content);
        }
        if (content != null && typeof content != 'undefined') {
            contentBox.html(content);
            //contentBox.replaceWith(content);
        }
        //if (typeof callback === 'function')
        //    callback($('#content-box', body));
        //$('#content-box').animsition('init').animsition('pageIn');

        //page animsition
        var content = $('.page.animsition', contentBox);
        content.animsition('init').animsition('pageIn');

        if (typeof callback === 'function')
            callback(content);


        //统一绑定返回事件
        var _this = this;
        $('[data-return]', content).on('click', function(){
            _this.menuDescribe[$(this).attr('data-return')](_this);
        });

        //初始化select
        $('[data-role=select]', content).selectpicker({style: 'btn dropdown-toggle btn-select'});
    },
    get: function (url, callback, className) {

        var _this = this;
        $.get(url, function (data) {
            _this.changeContent(className, data, callback);
        })
    },
    holdMenu: function (li, _this) {

        var menuType = li.attr('data-menu');

        switch (menuType) {
            case 'h':
                _this.menuDescribe['h']();
                break;
            case 'api':
                _this.menuDescribe['api'](_this);
                break;
            case 'cmi':
                _this.menuDescribe['cmi'](_this);
                break;
            case 'dat':
                _this.menuDescribe['dat'](_this);
                break;
            case 'ex':
                _this.menuDescribe['ex'](_this);
                break;
            case 'sex':
                _this.menuDescribe['sex'](_this);
                break;
            case 'vpt':
                _this.menuDescribe['vpt'](_this);
                break;
            case 'ir':
                _this.menuDescribe['ir'](_this);
                break;
            case 'or':
                _this.menuDescribe['or'](_this);
                break;
            case 'rg':
                _this.menuDescribe['rg'](_this);
                break;
        }


    },
    menuDescribe: {
        h: function () {
            window.location = '/main';
        },
        api: function (_this) {
            $.get('/api', function (data) {
                var bodyClass = 'page-faq site-menubar-unfold';
                _this.changeContent(bodyClass, data, function () {
                    $.getScript('/javascripts/solomon/pages/faq.js');
                });
            });
        },
        cmi: function (_this) {
            $.get('/callManager/information', function (data) {
                _this.changeContent(undefined, data, function () {
                });
            });
        },
        dat: function (_this) {

            _this.get('/callManager/domain', function(contentBox){
                /**
                 * Add Transports
                 */
                $('#testLogBut', contentBox).on('click', function (contentBox) {

                    _this.get('/callManager/domain/transports', function(contentBox){

                        //初始化文件上传事件
                        var inputFiles = $('.input-group.input-group-file', contentBox);
                        inputFiles.each(function (key) {
                            var inputFileBox = $(inputFiles[key]);
                            var inpuText = $('[type=text]', inputFileBox);
                            var inputFile = $('[type=file]', inputFileBox);
                            inputFile.on('change', function () {
                                var url = $(this).val();
                                if (typeof url != 'undefined' && url.length > 0)
                                    inpuText.val(url);
                            });
                        });

                        //动态跳转group高度（提示文本换行情况）
                        var groups = $('.form-group', contentBox);
                        groups.each(function (key) {
                            var group = $(groups[key]);
                            var label = $('label', group);
                            if (typeof label.html() != 'undefined') {
                                //if (label.html().replace(/(\s)|(\t)/g, '').length > 25 && label.html().indexOf(' ') > 0) {
                                //    //console.log(label.html().replace(/(\s)|(\t)/g,''));
                                //    $('.col-sm-8', group).css('padding-top', '7.5px');
                                //}

                                if(label){
                                    if(label.height()>22){
                                        $('.col-sm-9', group).css('margin-top','10px');
                                    }
                                }
                            }
                        });

                    });
                });
            });

        },
        ex: function (_this) {

            _this.get('/callManager/extensions',function(){


                //绑定add Extensions 事件
                $('#btn-add-extension').on('click', function(){
                    _this.get('/callManager/extensions/extension', function(contentBox){
                        /*
                         选项卡折叠事件暂不添加，待有需求时添加即可
                         现在只有3个选项卡，手机屏幕现实没太大问题，如果将来要继续添加或者别的地方有使用到多个，可以参考这里的代码
                         */
                        //$.getScript('/javascripts/plugins/responsive-tabs.js', function () {
                        //    //。。。
                        //});

                    });
                });
            });
        },
        sex: function (_this) {

            _this.get('/callManager/systemExtensions');

        },
        vpt: function (_this) {

            _this.get('/callManager/voIp', function(contentBox){
                //绑定Add事件
                $('#add-provider', contentBox).on('click', function () {
                    _this.get('/callManager/voIp/provider',function(contentBox){

                    });
                });
            });

        },
        ir: function (_this) {
            _this.get('/callManager/inbound', function(contentBox){

                //绑定add Inbound Rule 事件
                $('#add-inbound-rule', contentBox).on('click', function () {
                    _this.get('/callManager/inbound/rule', function(contentBox){


                        /**
                         * 修改布局后正常情况下不会出现自动换行了
                         */
                        //挑战group高度
                        //var groups = $('.form-group', contentBox);
                        //groups.each(function(key){
                        //    var group = groups[key];
                        //
                        //    var label = $('label', group);
                        //    if(label.height() > 0 ) {
                        //        console.log(label.height());
                        //        var top = (label.height()/22-1) * 10 ;
                        //        $('.col-sm-8', group).css('margin-top',top+'px');
                        //    }
                        //});

                    });
                });




            });
        },
        or: function (_this) {
            _this.get('/callManager/outbound', function(contentBox) {

                $('#add-outbound-rule', contentBox).on('click', function(){


                   _this.get('/callManager/outbound/rule', function(contentBox) {



                   });
                });



            });
        },
        rg: function (_this) {
            _this.get('/callManager/ringGroups', function(contentBox){
                $('#add-ring-group', contentBox).on('click', function(){

                    _this.get('/callManager/ringGroups/ringGroup', function(contentBox) {
                        //....
                    });

                });
            });
        }

    }
});




















