$.components.register("mLogin", {
    init: function () {

    },
    api: function () {

        //初始化动画
        $('#login-box').animsition('init').animsition('pageIn');



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


            $.post('/login',_from.serialize()).success(function(data){


                if (data && data.result === 'success') {
                    //console.log('abc');
                    window.location = data.url;
                    //console.log(data);
                }else if(data || data.result === 'error' || data.err_code){


                    console.log(data.result);
                    console.log(data.message);
                    box.attr('class', css);
                    toastr.warning(data.message || data.msg || 'login is error', '', {
                        showMethod: "slideDown",
                        positionClass: "toast-top-full-width",
                        containerId: "toast-topFullWidth"
                    });
                }else {
                    //特殊情况处理
                    //...
                  console.log('不是是这里吧')
                }


            }).error(function(error){
                var data = $.parseJSON(error.responseText);
                box.attr('class', css);
                toastr.warning(data.msg, '', {
                    showMethod: "slideDown",
                    positionClass: "toast-top-full-width",
                    containerId: "toast-topFullWidth"
                });
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

        if (username || password) {
            return true;
        }
        return false;

        //if (username === 'admin' && password === 'admin') {
        //
        //}

    }
});