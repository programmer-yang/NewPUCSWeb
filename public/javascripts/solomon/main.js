$.components.register("mMenu", {
    init: function () {

    },
    api: function () {
        var menuBox = $('#menu-box');
        var _this = this;













        //绑定API单击事件
        $('#menu-api-a', menuBox).on('click', function () {
            $.get('/api', function (data) {
                var bodyClass = 'page-faq site-menubar-unfold';
                _this.changeContent(bodyClass, data, function () {
                    $.getScript('/javascripts/solomon/pages/faq.js');
                });
            });
        });

    },
    changeContent: function (bodyClass, content, callback) {
        var body = $(document).find('body');
        var contentBox = $('#content-box', body);
        if (bodyClass) {
            body.attr('class', bodyClass);
            //contentBox.html(content);
        }
        if(content !=null && typeof content != 'undefined')
            contentBox.replaceWith(content);
        if(typeof callback === 'function')
            callback();
        $('#content-box').animsition('init').animsition('pageIn');
    }
});