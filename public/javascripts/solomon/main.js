$.components.register("mMenu", {
    init: function () {

    },
    api: function () {
        var menuBox = $('#menu-box');
        var _this = this;


        var lis = $('li[data-role=menu]', menuBox);
        lis.each(function () {
            //var li = $(this);


            $($('a',this)[0]).on('click', function(){

                //li.addClass('active');
                var li = $(this).parent();
                //if(li.hasClass('active')){
                //    return;
                //}
                lis.removeClass('active');
                li.addClass('active');

                _this.holdMenu($(this), _this);
                //console.log($(this).attr('data-menu'));
            });
            //$(this).on('click', function (event) {
            //
            //    //event.stopPropagation();
            //
            //    if($(this).hasClass('active')){
            //        return;
            //    }
            //
            //    lis.removeClass('active');
            //    $(this).addClass('active');
            //    _this.holdMenu($(this), _this);
            //});
        });

        //主动触发显示主页事件
        $($('a', $(lis[0]))[0]).trigger('click');

        //this.get('/main');
        //
        //console.log(555);
        //$.ready(function(){
        //    console.log('666656666');
        //});


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
        $('[data-return]', content).on('click', function () {
            _this.menuDescribe[$(this).attr('data-return')](_this);
        });

        //初始化select
        $('[data-role=select]', content).selectpicker({style: 'btn dropdown-toggle btn-select'});
    },
    get: function (url, callback, className) {

        var _this = this;
        _this.clear(_this);

        $.get(url, function (data) {
            _this.changeContent(className, data, callback);
        });

    },
    clear: function (_this) {
        /*
            该方法为清理方法，主要清理定时或者后台更新程序，避免浏览器卡顿或者占用内存过高情况
         */
        if (_this.resources.cmi.timers && _this.resources.cmi.timers.length > 0) {
            _this.resources.cmi.timers.forEach(function (timer) {
                clearInterval(timer);
                //timer = null;
            });
            _this.resources.cmi.timers.length = 0;
        }
    },
    holdMenu: function (li, _this) {

        var menuType = li.attr('data-menu');


        switch (menuType) {
            case 'h':
                _this.menuDescribe['h'](_this);
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
            case 'gm':
                _this.menuDescribe['gm'](_this);
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
            case 'vr':
                _this.menuDescribe['vr'](_this);
                break;
            case 'cq':
                _this.menuDescribe['cq'](_this);
                break;
            case 'cs':
                _this.menuDescribe['cs'](_this);
                break;
            case 'ch':
                _this.menuDescribe['ch'](_this);
                break;
            case 'te':
                _this.menuDescribe['te'](_this);
                break;
            case 'rm':
                _this.menuDescribe['rm'](_this);
                break;
            case 'cr':
                _this.menuDescribe['cr'](_this);
                break;
            case 'st':
                _this.menuDescribe['st'](_this);
                break;
            case 'ms':
                _this.menuDescribe['ms'](_this);
                break;
            case 'cse':
                _this.menuDescribe['cse'](_this);
                break;
            case 'ss':
                _this.menuDescribe['ss'](_this);
                break;
            case 'nb':
                _this.menuDescribe['nb'](_this);
                break;
        }


    },
    menuDescribe: {
        h: function (_this) {


            _this.resources.cmi = _this.resources.cmi || {};

            _this.resources.cmi.refreshTime = _this.resources.cmi.refreshTime || 1000*60;
            _this.resources.cmi.timers = _this.resources.cmi.timers || [];
            //_this.resources.cmi.charts = _this.resources.cmi.charts || [];

            var charts = {};


            function getTime() {
                var date = new Date();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;

                return hours + ':' + minutes + ':' + seconds;
            }

            function updateChart(contentBox) {

                if (charts.callTimer) {
                    if (charts.callTimer['datasets'][0].points.length > 10) {
                        charts.callTimer.removeData();
                    }
                    var number = Math.floor(Math.random() * 20);
                    //var time = getTime();

                    $('#current-calls-number', contentBox).html(number);
                    charts.callTimer.addData([number], '');
                }
                if (charts.extensionsTimer) {
                    if (charts.extensionsTimer['datasets'][0].points.length > 10) {
                        charts.extensionsTimer.removeData();
                    }
                    var number = Math.floor(Math.random() * 20);
                    //var time = getTime();
                    $('#current-extensions-number', contentBox).html(number);
                    charts.extensionsTimer.addData([number], '');
                }
                if (charts.resourceTimer) {
                    if (charts.resourceTimer['datasets'][0].points.length > 10) {
                        charts.resourceTimer.removeData();
                    }
                    var number1 = Math.floor(Math.random() * 100);
                    var number2 = Math.floor(Math.random() * 100);
                    //var time = getTime();
                    $('#current-cpu-number', contentBox).html(number1 + '%');
                    $('#current-memory-number', contentBox).html(number2 + '%');

                    charts.resourceTimer.addData([number1, number2], '');
                }




            }

            function startTimers(contentBox) {

                //if (_this.resources.cmi.timers.length > 0) {
                //    stopTimers();
                //}
                _this.resources.cmi.timers.push(setInterval(function () {
                    updateChart(contentBox);
                }, _this.resources.cmi.refreshTime));

            }

            //function stopTimers() {
            //    if (_this.resources.cmi.timers && _this.resources.cmi.timers.length > 0) {
            //        _this.resources.cmi.timers.forEach(function (timer) {
            //            clearInterval(timer);
            //            //timer = null;
            //        });
            //        _this.resources.cmi.timers.length = 0;
            //    }
            //}

            _this.get('/main', function (contentBox) {

                var chartBoxs = $('[name=chart-line-box]', contentBox);
                //$('#exampleChartjsLine', lineBox).css('width',lineBox.width());

                chartBoxs.each(function (key) {
                    var box = $(chartBoxs[key]);
                    $('canvas', box).css('width', box.width());
                    //$('canvas',box).css('height', box.width()/3);
                });


                //首页图标初始化
                var lineChartData = {
                    labels: [''],
                    scaleShowGridLines: true,
                    scaleShowVerticalLines: false,
                    scaleGridLineColor: "#ebedf0",
                    datasets: [{
                        fillColor: "rgba(98, 168, 234, .1)",
                        strokeColor: $.colors("primary", 600),
                        pointColor: $.colors("primary", 600),
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: $.colors("primary", 600),
                        data: [0]
                    }]
                };
                var resourceLineChartData = {
                    labels: [''],
                    scaleShowGridLines: true,
                    scaleShowVerticalLines: false,
                    scaleGridLineColor: "#ebedf0",
                    datasets: [
                        {
                            fillColor: "rgba(204, 213, 219, .1)",
                            strokeColor: $.colors("blue-grey", 300),
                            pointColor: $.colors("blue-grey", 300),
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: $.colors("blue-grey", 300),
                            data: [0]
                        }, {
                            fillColor: "rgba(98, 168, 234, .1)",
                            strokeColor: $.colors("primary", 600),
                            pointColor: $.colors("primary", 600),
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: $.colors("primary", 600),
                            data: [0]
                        }]
                };

                var callTimer = new Chart($('#line-calls')[0].getContext("2d")).Line(lineChartData);
                var extensionsTimer = new Chart($('#line-extensions')[0].getContext('2d')).Line(lineChartData);
                var resourceTimer = new Chart($('#line-resource')[0].getContext('2d')).Line(resourceLineChartData);

                charts.callTimer = callTimer;
                charts.extensionsTimer = extensionsTimer;
                charts.resourceTimer = resourceTimer;


                startTimers(contentBox);

            });




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

            _this.get('/callManager/information', function (contentBox) {



            }, 'site-menubar-unfold');
        },
        dat: function (_this) {

            _this.get('/callManager/domain', function (contentBox) {
                /**
                 * Add Transports
                 */
                $('#testLogBut', contentBox).on('click', function (contentBox) {

                    _this.get('/callManager/domain/transports', function (contentBox) {

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

                                if (label) {
                                    if (label.height() > 22) {
                                        $('.col-sm-9', group).css('margin-top', '10px');
                                    }
                                }
                            }
                        });

                    });
                });
            });

        },
        ex: function (_this) {

            _this.get('/callManager/extensions', function (contentBox) {


                //绑定add Extensions 事件
                $('#btn-add-extension', contentBox).on('click', function () {
                    _this.get('/callManager/extensions/extension', function (contentBox) {
                        /*
                         选项卡折叠事件暂不添加，待有需求时添加即可
                         现在只有3个选项卡，手机屏幕现实没太大问题，如果将来要继续添加或者别的地方有使用到多个，可以参考这里的代码
                         */
                        //$.getScript('/javascripts/plugins/responsive-tabs.js', function () {
                        //    //。。。
                        //});

                        $('[data-role=timepicker]', contentBox).timepicker({ 'scrollDefault': 'now',timeFormat: 'H:i'});

                    });
                });
            });
        },
        gm: function (_this) {
            _this.get('/callManager/extensions/getGroupManagement', function(contentBox) {
                $('#btn-add-group', contentBox).on('click', function() {
                    _this.get('/callManager/extensions/getGroupManagement/addGroup', function(contentBox) {
                        console.log('6666');
                    });
                });
            });
        },
        sex: function (_this) {

            _this.get('/callManager/systemExtensions');

        },
        vpt: function (_this) {

            _this.get('/callManager/voIp', function (contentBox) {
                //绑定Add事件
                $('#add-provider', contentBox).on('click', function () {
                    _this.get('/callManager/voIp/provider', function (contentBox) {
                        $('#add-providers-next', contentBox).on('click', function(){
                           _this.get('/callManager/voIp/provider/next', function(contentBox) {
                               //$('#add-providers-back', contentBox).on('click', function() {
                               //    _this.get('/callManager/voIp/provider',function(contentBox){
                               //        //数据保存
                               //    });
                               //});



                           });
                        });
                    });
                });
            });

        },
        ir: function (_this) {
            _this.get('/callManager/inbound', function (contentBox) {

                //绑定add Inbound Rule 事件
                $('#add-inbound-rule', contentBox).on('click', function () {
                    _this.get('/callManager/inbound/rule', function (contentBox) {


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
            _this.get('/callManager/outbound', function (contentBox) {

                $('#add-outbound-rule', contentBox).on('click', function () {
                    _this.get('/callManager/outbound/rule', function (contentBox) {
                        //...
                    });
                });

            });
        },
        rg: function (_this) {
            _this.get('/callManager/ringGroups', function (contentBox) {
                $('#add-ring-group', contentBox).on('click', function () {

                    _this.get('/callManager/ringGroups/ringGroup', function (contentBox) {
                        //....
                    });

                });
            }, 'site-menubar-unfold');
        },
        vr: function (_this) {
            //Virtual Receptionist
            _this.get('/callManager/virtualReceptionist', function (contentBox) {
                $('#add-virtual-receptionist', contentBox).on('click', function () {

                    _this.get('/callManager/virtualReceptionist/addVirtualReceptionist', function (contentBox) {
                        //....
                    });

                });
            }, 'site-menubar-unfold');
        },
        cq: function (_this) {
            //Virtual Receptionist
            _this.get('/callManager/callQueue', function (contentBox) {
                $('#add-queue', contentBox).on('click', function () {

                    _this.get('/callManager/callQueue/addQueue', function (contentBox) {
                        //....
                    });

                });
            }, 'site-menubar-unfold');
        },
        cs: function (_this) {
            _this.get('/callManager/callSessions', function (contentBox) {
                //...
            });
        },
        ch: function (_this) {
            _this.get('/callManager/callHistory', function (contentBox) {
                //....
            });
        },
        te: function (_this) {
            _this.get('/tenant', function (contentBox) {
                $('#add-tenant', contentBox).on('click', function () {
                    _this.get('/tenant/addTenant', function (contentBox) {
                        //....
                    })
                });
                //....
            });
        },
        rm: function (_this) {
            _this.get('/recordingsManagement', function (contentBox) {
                $('[data-role="datetime"]', contentBox).datetimepicker({format: 'yyyy-mm-dd hh:ii'});
            });
        },
        cr: function (_this) {
            _this.get('/callManager/callReports', function (contentBox) {
                $('#search', contentBox).on('click', function() {
                    _this.get('/callManager/callReports/search', function(contentBox) {
                        $('[data-role="datetime"]', contentBox).datetimepicker({format: 'yyyy-mm-dd hh:ii'});
                    });
                });
                $('#download', contentBox).on('click', function() {
                    _this.get('/callManager/callReports/download', function(contentBox) {
                        //...
                    });
                });
            });
        },
        st: function (_this) {
            _this.get('/settings', function (contentBox) {
                $('[data-role=timepicker]', contentBox).timepicker({ 'scrollDefault': 'now',timeFormat: 'H:i'});
            });
        },
        ms: function (_this) {
            _this.get('/settings/mediaServer', function (contentBox) {
                $('#add-server', contentBox).on('click', function () {
                    _this.get('/settings/mediaServer/addServer', function (contentBox) {
                        //....
                    })
                });
            });
        },
        cse: function (_this) {
            _this.get('/settings/conferenceServer', function (contentBox) {

                //初始化Switchery
                //var options = {
                //    color: $.colors("primary", 600),
                //    size: 'small',
                //    disabled: 'false'
                //};
                //$('[data-plugin="switchery"]').each(function () {
                //    new Switchery(this, options);
                //});

                $('#add-server', contentBox).on('click', function(){
                    _this.get('/settings/conferenceServer/addServer',function (contentBox) {
                        //...
                    });
                });
            });

        },
        ss: function (_this) {
            _this.get('/settings/servicesStatus', function (contentBox) {

                //初始化Switchery

                var options = {
                    color: $.colors("primary", 600),
                    size: 'small',
                    disabled: 'false'
                };
                $('[data-plugin="switchery"]').each(function () {
                    new Switchery(this, options);
                });

            });

        },
        nb: function (_this) {
            _this.get('/settings/numberBlacklist', function (contentBox) {


                $('#add-blacklist', contentBox).on('click', function() {
                    _this.get('/settings/numberBlacklist/addBlacklist', function(contentBox) {

                    });
                });
                ////初始化Switchery
                //
                //var options = {
                //    color: $.colors("primary", 600),
                //    size: 'small',
                //    disabled: 'false'
                //};
                //$('[data-plugin="switchery"]').each(function () {
                //    new Switchery(this, options);
                //});

            });

        }

    },
    resources: {}
});




















