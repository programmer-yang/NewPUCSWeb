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
            $.get('/callManager/setting', function (data) {
                var bodyClass = 'site-menubar-unfold';
                _this.changeContent(bodyClass, data, function (contentBox) {


                    /**
                     * Add Transports
                     */
                    $('#testLogBut', contentBox).on('click', function (contentBox) {
                        $.get('/callManager/setting/transports', function (data) {
                            _this.changeContent(undefined, data, function (contentBox) {

                                //初始化Bootstrap Select
                                var selects = $('[name=modal-transport-select]', contentBox);
                                selects.each(function (key) {
                                    $(selects[key]).selectpicker({style: 'btn dropdown-toggle btn-select'});
                                });

                                //动态跳转group高度（提示文本换行情况）
                                //var groups = $('.form-group', contentBox);
                                //groups.each(function (key) {
                                //    var group = $(groups[key]);
                                //    var label = $('label', group);
                                //    if (typeof label.html() != 'undefined') {
                                //        if (label.html().replace(/(\s)|(\t)/g, '').length > 25 && label.html().indexOf(' ') > 0) {
                                //            //console.log(label.html().replace(/(\s)|(\t)/g,''));
                                //            $('.col-sm-8', group).css('padding-top', '7.5px');
                                //        }
                                //    }
                                //});

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


                            });
                        });
                    });


                });
            });
        },
        ex: function (_this) {
            $.get('/callManager/extensions', function (data) {
                _this.changeContent(undefined, data, function (contentBox) {

                    /*
                    选项卡折叠事件暂不添加，待有需求时添加即可
                      现在只有3个选项卡，手机屏幕现实没太大问题，如果将来要继续添加或者别的地方有使用到多个，可以参考这里的代码
                     */
                    //$.getScript('/javascripts/plugins/responsive-tabs.js', function () {
                    //    //。。。
                    //});


                    //绑定add Extensions 事件
                    $('#btn-add-extension').on('click', function(){
                        $.get('/callManager/extensions/setting', function (data) {
                            _this.changeContent(undefined, data, function (contentBox) {

                                //初始化Bootstrap Select
                                var selects = $('[name=modal-transport-select]', contentBox);
                                selects.each(function (key) {
                                    $(selects[key]).selectpicker({style: 'btn dropdown-toggle btn-select'});
                                });

                                //绑定返回事件
                                $('#but-cancel,#a-return', contentBox).on('click', function () {
                                    _this.menuDescribe['ex'](_this);
                                });

                            });
                        });
                    });
                });
            });
        },
        sex: function (_this) {

            $.get('/callManager/systemExtensions', function (data) {
                _this.changeContent(undefined, data, function (contentBox) {
                    //...
                });
            });
        },
        vpt: function (_this) {

            $.get('/callManager/vpt', function(data){
                _this.changeContent(undefined, data, function(contentBox){

                    //绑定Add事件
                    $('#add-provider', contentBox).on('click', function(){

                    });


                })
            });

            _this.get('/callManager/vpt', function(contentBox){
                //绑定Add事件
                $('#add-provider', contentBox).on('click', function () {
                    _this.get('/callManager/vpt/setting/provider',function(contentBox){

                        //初始化Bootstrap Select
                        var selects = $('[data-select=my-select]', contentBox);
                        selects.each(function (key) {
                            $(selects[key]).selectpicker({style: 'btn dropdown-toggle btn-select'});
                        });

                        //绑定返回事件
                        $('#but-cancel,#a-return', contentBox).on('click', function () {
                            _this.menuDescribe['vpt'](_this);


                            console.log(' ********************** ');
                            console.log(' extensions 里的ejs模板名称需要修改 ok');
                            console.log(' voip 选项卡页面内容还未开始修改 ok');
                            console.log(' 绑定返回事件是否需要写成公共方法需要思考 ');






                        });
                    });
                });
            });

        }
    }
});




















