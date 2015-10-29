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
            contentBox.html('');
            contentBox.replaceWith(content);
        }
        if (typeof callback === 'function')
            callback($('#content-box', body));
        $('#content-box').animsition('init').animsition('pageIn');

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

                    //初始化Bootstrap Select
                    var selects = $('[name=modal-transport-select]',contentBox);
                    selects.each(function(key){
                        $(selects[key]).selectpicker({style:'btn dropdown-toggle btn-select'});
                    });

                    //动态跳转group高度（提示文本换行情况）
                    var groups = $('.form-group', contentBox);
                    groups.each(function(key){
                        var group = $(groups[key]);
                        var label = $('label', group);
                        if (typeof label.html() != 'undefined') {
                            if(label.html().replace(/(\s)|(\t)/g,'').length > 25 && label.html().indexOf(' ')>0) {
                                //console.log(label.html().replace(/(\s)|(\t)/g,''));
                                $('.col-sm-8', group).css('padding-top','7.5px');
                            }
                        }
                    });

                    //初始化文件上传事件
                    var inputFiles = $('.input-group.input-group-file', contentBox);

                    inputFiles.each(function(key){
                        var inputFileBox = $(inputFiles[key]);
                        var inpuText = $('[type=text]', inputFileBox);
                        var inputFile = $('[type=file]', inputFileBox);
                        inputFile.on('change', function(){
                            var url = $(this).val();
                            if(typeof url != 'undefined' && url.length > 0)
                                inpuText.val(url);
                        });



                    });


                });
            });
        }
    }
});




















