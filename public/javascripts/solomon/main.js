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
            callback();
        //$(document).on("before.run");
        //cye-workaround-body
        //cye-workaround-body-image
        var newHeight = $('#content-box', body).css('height');
        $('#content-box').animsition('init').animsition('pageIn');
        //console.log(newHeight+'      6666666666666');
        //$('#cye-workaround-body').css('height',newHeight);
        //$('cye-workaround-body-image').css('height',newHeight);
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
                _this.changeContent(bodyClass, data, function () {
                    //初始化Bootstrap Select
                    //$('#modal-transport-protocol').selectpicker({style:'btn dropdown-toggle btn-select'});
                    var selects = $('[name=modal-transport-select]',_this);
                    console.log(selects)


                    console.log('*********** ' +
                        '解决select初始化问题');

                });
            });
        }
    }
});




















