$.components.register("mLogin", {
    init: function () {

    },
    api: function () {
        /**
         *  声明提交事件
         *
         */
        var _from = $('#login-form');
        var $this = this;
        _from.on('click', '#login-submit', function () {


            //验证
            if (!$this.look(_from)) {
                toastr.warning('The user name or password error', '', {
                    showMethod: "slideDown",
                    positionClass: "toast-top-full-width",
                    containerId: "toast-topFullWidth"
                });
                return false;
            }


            //加载动画

            var box = $('#login-box');
            var css = box.attr('class');
            box.attr('class', 'loader vertical-align-middle loader-grill');

            //通过后Ajax请求
            //

            //$.ajax({
            //    type: 'POST',
            //    url: '/login',
            //    data: $from.serialize(),
            //    dataType: 'json',
            //    success: function (data) {
            //        console.log('login is ok');
            //        console.log('666666666');
            //        console.log(data.url);
            //    },
            //    error: function () {
            //        //失败还原登陆界面显示
            //        box.attr('class', css);
            //    }
            //
            //});

            $.post('/login', _from.serialize(), function (data) {

                //$(document).find('body').html(data);

                console.log('=====================' + data);

                if (data && data.result === 'success') {
                    console.log('abc');
                    window.location = data.url;
                }
                console.log('def');
            });

            //console.log('666')
            //_from.submit();


            return false;
        }).on('blur', '[name=email]', function () {
            /*
             预留用户名判断是否存在事件
             */
        });


        $(document).on('click', '#cookie-test', function () {

            //console.log($.cookie('key'));


            $.get('/zmqTest', function(data){
                console.log(666);
            });


        });


        /**
         * 语言选择功能初始化
         * BEGIN
         */
        var lis = $('#languageSelect li');

        var currentLg = $.cookie('lg');
        if(typeof currentLg === 'undefined')
            currentLg = 'us';

        console.log(currentLg);
        var selectLgSpan;
        lis.each(function (i) {
            var li = $('span:first', lis[i]);
            if (li.attr('data-lg') === currentLg) {
                selectLgSpan = li;
            }
        });

        if (selectLgSpan != undefined) {
            var currentLgSpan = $('span', $('#currentLg'));
            $(selectLgSpan).replaceWith(currentLgSpan.clone());
            $('span', $('#currentLg')).replaceWith(selectLgSpan.clone());
        }
        lis.each(function (key) {
            var li = lis[key];
            $(li).on('click', function () {
                var lg = $('span', this).attr('data-lg');
                $.cookie('lg', lg);
                window.location.reload();
            });
        });
        $('#lg-box').show();
        /**
         * END
         */
    },
    look: function (content) {

        var username = $('[name=username]', content).val();
        var password = $('[name=password]', content).val();

        if (username === 'admin' && password === 'admin') {
            return true;
        }
        return false;

        //if (username === 'admin' && password === 'admin') {
        //
        //}

    }
});