$.components.register("mLg", {
    init: function () {

    },
    api: function () {


        /**
         * 语言选择功能初始化
         * BEGIN
         */
        var lis = $('#languageSelect li');

        var currentLg = $.cookie('lg');
        var selectLgBox;
        lis.each(function (i) {
            var li = $('span:first', lis[i]);
            if (li.attr('data-lg') === currentLg) {
                selectLgBox = li;
            }
        });

        if (selectLgBox != undefined) {
            var currentLgSpan = $('span', $('#currentLg'));
            $(selectLgBox).replaceWith(currentLgSpan.clone());
            $('span', $('#currentLg')).replaceWith(selectLgBox.clone());
        }
        lis.each(function (key) {
            var li = lis[key];
            $(li).on('click', function () {
                var lg = $('span', this).attr('data-lg');
                $.cookie('lg', lg);
                window.location.reload();
            });
        });
        $('#top-lg-box').show();
        /**
         * END
         */



    }
});