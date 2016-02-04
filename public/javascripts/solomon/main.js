$.components.register("mMenu", {
  init: function () {

  },
  api: function () {
    var menuBox = $('#menu-box');
    var _this = this;


    var lis = $('li[data-role=menu]', menuBox);
    lis.each(function () {
      //var li = $(this);


      $($('a', this)[0]).on('click', function () {

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
  initialize: function (contentBox, option) {
    /**
     * 绑定Change事件，获取数据时只获取data-mark等于update的元素数据
     */
    $('[data-mark]', contentBox).on('change', function () {
      $(this).attr('data-mark', 'update');
    });

    if (option && typeof option.forEach == 'function') {
      console.log('initialize option');
      option.forEach(function (data) {
        initDetail(data);
      });
      function initDetail(type) {
        if (type == 'select') {
          /**
           * select选择项初始化
           */
          var selects = $('[data-selected]', contentBox);
          if (selects && selects.size() > 0) {
            for (var i = 0; i < selects.size(); i++) {
              var select = $(selects[i]);
              var options = $('option', select);
              if (options && options.size() > 0) {
                for (var j = 0; j < options.size(); j++) {
                  var option = $(options[j]);
                  if (option.val() == select.attr('data-selected')) {
                    option.attr('selected', 'selected');
                  }
                }
              }
            }
          }
        }
        if (type == 'checkboxs') {
          /**
           * checkbox 多个选中初始化
           */
          var checkboxs = $('[data-checkeds]', contentBox);
          var values = checkboxs.attr('data-checkeds');
          ;
          if (values && values.indexOf(',') > 0) {
            values = values.split(',');
            values.forEach(function (data) {
              $('[type=checkbox][value=' + data + ']').attr('checked', 'checked');
            });
          }
        }
        if (type == 'checkbox') {
          /**
           * checkbox 初始化
           */
          var checkboxs = $('[data-checked]', contentBox);
          if (checkboxs && checkboxs.size() > 0) {
            for (var i = 0; i < checkboxs.size(); i++) {
              var checkbox = $(checkboxs[i]);
              var type = checkbox.attr('type');
              if (type == 'checkbox') {
                console.log("************");
                console.log(checkbox.attr('data-checked'));
                if (checkbox.attr('data-checked')) {
                  checkbox.attr('checked', 'checked');
                  //是否添加触发事件判断
                }
              } else if (type == 'radio') {
                if (checkbox.attr('data-checked')) {

                  var name = checkbox.attr('name');
                  //console.log(name);
                  var checked = checkbox.attr('data-checked');
                  var checked_child = checkbox.attr('data-checked-child');

                  if (name) {
                    var radios = $('[name=' + name + ']', contentBox);

                    if (radios && radios.size() > 0) {
                      for (var j = 0; j < radios.size(); j++) {
                        var cbox = $(radios[j]);

                        var value = cbox.attr('value');
                        var associated = cbox.attr('data-associated');
                        var group = cbox.attr('data-group');

                        if (value == checked && !associated && !group) {
                          cbox.attr('checked', 'checked');
                          /**
                           * 触发当前元素上绑定的click事件
                           * 主要是解决一些元素上绑定了一些点击事件，但当页面加载为它赋值的时候
                           * 往往不会触发后续
                           * _data非正式方法
                           */
                          try {
                            if ($._data(cbox[0], 'events')['click']) {
                              cbox.trigger('click');
                            }
                          } catch (err) {
                            cbox.trigger('click');
                          }


                        }
                        if (value == checked && associated == 'default' && group) {
                          cbox.attr('checked', 'checked');

                          var associated_box = $('#' + group);

                          if (associated_box) {
                            var type = associated_box.attr('type');
                            if (!type) {
                              type = associated_box.attr('data-role');
                            }
                            if (type == 'select') {
                              var options = $('option', associated_box);
                              if (options && options.size() > 0) {
                                for (var k = 0; k < options.size(); k++) {
                                  var option = $(options[k]);
                                  if (option.val() == checked_child) {
                                    option.attr('selected', 'selected');
                                  }
                                }
                              }
                            } else if (type == 'text') {
                              associated_box.val(checked_child);
                            }
                            //...
                          }


                        }

                      }
                    }
                  }


                }

              }

            }
          }
        }
        if (type == 'listbox') {
          //var cur_box = $('[data-listbox]', contentBox);
          //var box_id = cur_box.attr('data-listbox');
          //var active_box = $('#' + box_id + '-active');
          //
          //// 绑定选中
          //$('a', cur_box).off('click').on('click', function () {
          //  var c_a = $(this);
          //  if (c_a.hasClass('active')) {
          //    c_a.removeClass('active');
          //  } else {
          //    c_a.addClass('active')
          //  }
          //});
          //$('#' + box_id + '-right', contentBox).off('click').on('click', function () {
          //
          //  //临时实现，还需要修改
          //  //...
          //  active_box.html($('a.active', cur_box).clone().removeClass('active')).attr('data-mark', 'update');
          //
          //});

          var cur_box = $('[data-listbox]', contentBox);
          if(cur_box && typeof cur_box.map == 'function') {
            cur_box.map(function(key,data) {
              var box = $(data);
              var box_id = box.attr('data-listbox');
              if(box_id != 'default') {
                var sourceList = box.attr('data-listbox-value');
                var sourceHTML = '';
                sourceList = Immutable.List(sourceList.split(','));
                var descBox = $('#'+box_id+'-active');
                var descActive = descBox.attr('data-listbox-value');
                var descList = Immutable.Map();
                if(descActive) {
                  descActive.split(',').map(function(data,key) {
                    descList = descList.set(data,'<a class="list-group-item" href="javascript:void(0)">'+data+'</a>');
                  });
                }


                sourceList.map(function(data,key) {
                  var className = 'list-group-item';
                  if(descActive && descActive.indexOf(data)>=0) {
                    className+=' disabled';
                  }
                  sourceHTML+= '<a class="'+className+'" href="javascript:void(0)" data-value="'+data+'">'+data+'</a>';
                });
                box.html(sourceHTML);

                $('a', box).off('click').on('click', function(){
                  var cur_a = $(this);
                  if(!cur_a.hasClass('disabled')) {
                    if(!cur_a.hasClass('active')) {
                      cur_a.addClass('active');
                    }else {
                      cur_a.removeClass('active');
                    }
                  }
                });

                $('#'+box_id+'-right').off('click').on('click', function() {
                  $('a.active', box).map(function(key,data) {
                    descList = descList.set($(data).html(),'<a class="list-group-item" href="javascript:void(0)">'+$(data).html()+'</a>');
                    $(data).removeClass('active');
                    $(data).addClass('disabled');
                  });
                  buildDesc();
                });
                $('#'+box_id+'-left').off('click').on('click', function() {
                  $('a.active', descBox).map(function(key,data) {
                    //console.log($(a).html());
                    //console.log($(data).html());
                    descList = descList.delete($(data).html());
                    $('a[data-value='+$(data).html()+']').removeClass('disabled');
                  });
                  buildDesc();
                });

                function buildDesc() {
                  if(descList && descList.size >0) {
                    var descHTML = '';
                    descList.map(function(data, key) {
                      descHTML+= data;
                    });
                    descBox.html(descHTML);
                  }else {
                    descBox.html('');
                  }
                  $('a', descBox).off('click').on('click', function(){
                    var cur_a = $(this);
                    if(!cur_a.hasClass('active')) {
                      cur_a.addClass('active');
                    }else {
                      cur_a.removeClass('active');
                    }
                  });

                }
              }else {

                var sourceList = box.attr('data-listbox-value');
                var sourceHTML = '';
                sourceList = Immutable.List(sourceList.split(','));
                sourceList.map(function(data,key) {
                  var className = 'list-group-item';
                  sourceHTML+= '<a class="'+className+'" href="javascript:void(0)" data-value="'+data+'">'+data+'</a>';
                });
                box.html(sourceHTML);
                $('a', box).off('click').on('click', function(){
                  var cur_a = $(this);
                  if(!cur_a.hasClass('disabled')) {
                    if(!cur_a.hasClass('active')) {
                      cur_a.addClass('active');
                    }else {
                      cur_a.removeClass('active');
                    }
                  }
                });
              }

            });
          }
        }
        if (type == 'file') {
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
              inpuText.attr('data-mark', 'update');
            });
          });
        }
      }
    }
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

      if (data && data.result == 'TIME_OUT') {
        window.location = data.url;
      }
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
  ready: function (marks, container) {
    /**
     * 参数列表构建
     */
    var obj = {};
    lookChildren(obj, marks);


    function lookChildren(obj, marks) {
      var o = obj;
      if (marks.name != "default") {
        obj[marks.name] = {};
        o = obj[marks.name];
      }
      if (marks.ids) {
        marks.ids.forEach(function (mark) {
          if (mark.describe) {
            //o[id.describe] = '666';
            //console.log(mark.id)
            if (mark.id) {
              //console.log(mark.id);
              var box = $("#" + mark.id, container);
              if (box.attr('data-mark') == 'update') {
                //console.log(mark.id);
                var type = box.attr('type');
                if (!type) {
                  type = box.attr('data-role');
                }
                if (type == 'text' || type == 'textarea' || type == 'hidden') {
                  if (mark.describe && box && box.val()) {
                    o[mark.describe] = box.val();
                    //console.log(o);
                  }
                }
                if (type == 'checkbox') {
                  o[mark.describe] = box.is(':checked');
                }
                if (type == 'select') {
                  if (box.val() !== '0') {
                    o[mark.describe] = box.val();
                  }
                }
                if (type == 'list') {
                  var childs = $('a', box);
                  if (childs && childs.size()) {
                    o[mark.describe] = [];
                  }
                  for (var i = 0; i < childs.size(); i++) {
                    var a = $(childs[i]);
                    o[mark.describe][i] = a.html()
                  }
                }
                if (type == 'listbox') {
                  var actives = [];
                  $('a', box).map(function (key, data) {
                    actives[key] = $(data).html();
                  });
                  if (actives && actives.length > 0) {
                    o[mark.describe] = actives;
                  }
                }
                //...
              }
            } else if (mark.name) {
              var box = $('input[name=' + mark.name + ']:checked', container);
              if (box && !box.attr('data-lot')) {
                if (box.attr('data-mark') == 'update') {
                  var type = box.attr('type');
                  if (type) {
                    if (type == 'radio') {
                      if (mark.type && mark.type == 'group') {
                        o[mark.describe[0]] = box.val();
                        //o[mark.describe[1]] =
                        if (box.attr('data-associated') == 'default') {
                          var child = $('#' + box.attr('data-group'), container);
                          /**
                           * 是否给子元素添加操作控制？
                           * && child.attr('data-mark') == 'update'
                           */
                          if (child) {
                            var type = child.attr('type');
                            if (!type) {
                              type = child.attr('data-role');
                            }
                            if (type == 'text' || type == 'select') {
                              o[mark.describe[1]] = child.val();
                            }
                          }
                        }
                      } else {
                        /**
                         * 获取非关联性 radio 值
                         */
                        o[mark.describe] = box.val();
                      }
                    } else if (type == 'update') {
                      console.log('update 5666666');
                    }
                  }
                }
              } else if (box && box.attr('data-lot') == 'default') {
                var box_values = [];
                var bool = false;
                for (var index = 0; index < box.size(); index++) {
                  var cur_box = $(box[index]);
                  //选中就不判断data-mark了吧 。。
                  var type = cur_box.attr('type');
                  //这里添加bool属性的目的是 当 多个checkbox的时候如果修改了其中一个，那么久需要提交所有的
                  //否则不提交
                  if (cur_box.attr('data-mark') == 'update') {
                    bool = true;
                  }
                  if (type == 'checkbox') {
                    box_values.push(cur_box.val());
                  }
                  //...
                }
                if (box_values && box_values.length > 0 && bool) {
                  o[mark.describe] = box_values;
                }
              }

              //$('input[name='+mark.name+'] [data-mark=update]')
            }
          }
        });
      }
      if (marks.children) {
        marks.children.forEach(function (child) {
          //console.log(child);
          lookChildren(o, child);
        });
      }
    }

    return obj;
  },
  toastr: function (type, msg) {
    toastr[type](msg, '', {
      showMethod: "slideDown",
      positionClass: "toast-top-full-width",
      containerId: "toast-topFullWidth"
    });

  },
  util: {
    parseJSON: function (str) {
      var result = '';

      if (str && typeof str == 'object' && Object.prototype.toString.call(str).toLowerCase() == '[object object]') {
        result = str;
      } else if (str && typeof str == 'string' && str.indexOf('{') == 0 && str.lastIndexOf('}') == str.length - 1) {
        result = JSON.parse(str);
      } else {
        var result = {
          err_code: '500',
          msg: 'Abnormal returns the result format -- ' + str
        }

      }

      return result;
    },
    parseURLGet: function (url, option) {
      var result = url;
      var token = $.cookie('token');
      if (token) {
        result += '?access_token=' + token;
      } else {
        //...
        console.log('no token ??????')
      }

      if (option && option.length > 0) {
        //if(result && result.substr(result.length-1,result.length) == '?') {
        //    result += '&'
        //}
        result += '&';
        if (typeof option.forEach == 'function') {
          var pars = '';
          option.forEach(function (obj) {
            pars += obj.key + '=' + obj.value + '&';
          });
          result += pars;
        }

        if (result && result.substr(result.length - 1, result.length)) {
          result = result.substr(0, result.length - 1);
        }

      }
      return result;
    },
    parseURLPost: function (data, option) {
      var token = $.cookie('token');
      if (data) {
        data.access_token = token;
      }

      return data;
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
      case 'co':
        _this.menuDescribe['co'](_this);
        break;
      case 'cs':
        _this.menuDescribe['cs'](_this);
        break;
      case 'vm':
        _this.menuDescribe['vm'](_this);
        break;
      //case 'ch':
      //    _this.menuDescribe['ch'](_this);
      //    break;
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
      case 'pf':
        _this.menuDescribe['pf'](_this);
        break;
    }


  },
  menuDescribe: {
    h: function (_this) {


      _this.resources.cmi = _this.resources.cmi || {};

      _this.resources.cmi.refreshTime = _this.resources.cmi.refreshTime || 1000 * 60;
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
    ex: function (_this) {


      var token = $.cookie('token');
      var url = '/callManager/extension?access_token=' + token + '&cursor=1';
      //console.log(url);

      var paras = {
        name: "default",
        ids: [
          {id: "eg-number", describe: "extension_number"},
          {id: "eg-password", describe: "password"},

          {id: "eo-extension-groups", describe: "belong_groups"}
        ],
        children: [
          {
            name: "extension_profile",
            ids: [
              {id: "eg-first-name", describe: "first_name"},
              {id: "eg-last-name", describe: "last_name"},
              {id: "eg-gender", describe: "gender"},
              {id: "eg-email", describe: "email"},
              {id: "eg-company-name", describe: "company_name"},
              {id: "eg-company-website", describe: "company_website"},
              {id: "eg-mobile-phone", describe: "mobile_phone"},
              {id: "eg-work-phone", describe: "work_phone"},
              {id: "eg-home-phone", describe: "home_phone"},
              {id: "eg-twitter", describe: "twitter"},
              {id: "eg-facebook", describe: "facebook"},
              {id: "eg-gender-linked", describe: "linkedin"},
              {id: "eg-instagram", describe: "instagram"},
              {id: "eg-description", describe: "description"}
            ]
          },
          {
            name: "voice_mail",
            ids: [
              {id: "evm-enable", describe: "enable_voicemail"},
              {id: "evm-prompt-language", describe: "prompt_language"},
              {id: "evm-pin-auth", describe: "enable_vm_pin_auth"},
              {id: "evm-pin-number", describe: "voicemail_pin"},
              {id: "evm-call-id", describe: "enable_play_caller_id"},
              {id: "evm-read-out", describe: "msg_read_out_datetime"}

              //{id: "", describe: "default_greeting_file"},
              //{id: "", describe: "greeting_files"}
            ]
          },
          {
            name: "forward_rules",
            children: [
              {
                name: "available",
                ids: [
                  {
                    name: "ea-radio-answer",
                    type: "group",
                    describe: ["no_answer_action", "no_answer_action_value"]
                  },
                  {
                    name: "ea-radio-busy",
                    type: "group",
                    describe: ["busy_action", "busy_action_value"]
                  }
                ]
              },
              {
                name: "offline",
                ids: [
                  {
                    name: "eo-radio-in-office",
                    type: "group",
                    describe: ["office_hours_action", "office_hours_action_value"]
                  },
                  {
                    name: "eo-radio-outside-office",
                    type: "group",
                    describe: ["outside_office_hours_action", "outside_office_hours_action_value"]
                  }
                ]
              },
              {
                name: "dnd",
                ids: [
                  {
                    name: "ed-radio-in-office",
                    type: "group",
                    describe: ["office_hours_action", "office_hours_action_value"]
                  },
                  {
                    name: "ed-radio-outside-office",
                    type: "group",
                    describe: ["outside_office_hours_action", "outside_office_hours_action_value"]
                  }
                ]
              },
              {
                name: "away",
                ids: [
                  {
                    name: "eaw-radio-in-office",
                    type: "group",
                    describe: ["office_hours_action", "office_hours_action_value"]
                  },
                  {
                    name: "eaw-radio-outside-office",
                    type: "group",
                    describe: ["outside_office_hours_action", "outside_office_hours_action_value"]
                  }
                ]
              }
            ]
          },
          {
            name: "options",
            ids: [
              {id: "eo-record-calls", describe: "record_all_calls"},
              {id: "eo-disable-extension", describe: "enable_extension"},
              {id: "eo-disable-extension-calls", describe: "enable_external_call"},
              {id: "eo-allow-paging-intercom", describe: "enable_paging_intercom"},
              {id: "eo-console-access", describe: "enable_management_console_access"},
            ]
          },
          {
            name: "office_hours",
            ids: [
              {name: "eoh-uses-time", describe: "office_hours_mode"},
              {id: "eoh-monday-begin", describe: "monday_from"},
              {id: "eoh-monday-end", describe: "monday_to"},
              {id: "eoh-tuesday-begin", describe: "tuesday_from"},
              {id: "eoh-tuesday-end", describe: "tuesday_to"},
              {id: "eoh-wednesday-begin", describe: "wednesday_from"},
              {id: "eoh-wednesday-end", describe: "wednesday_to"},
              {id: "eoh-thursday-begin", describe: "thursday _from"},
              {id: "eoh-thursday-end", describe: "thursday _to"},
              {id: "eoh-friday-begin", describe: "friday_from"},
              {id: "eoh-friday-end", describe: "friday_to"},
              {id: "eoh-saturday-begin", describe: "saturday_from"},
              {id: "eoh-saturday-end", describe: "saturday_to"},
              {id: "eoh-sunday-begin", describe: "sunday_from"},
              {id: "eoh-sunday-end", describe: "sunday_to"}
            ]
          },
          {
            name: "phone_provisioning",
            ids: [
              {id: "epp-phone-model", describe: "phone_model"},
              {id: "epp-mac-address", describe: "phone_mac_address"},
              {id: "epp-page-password", describe: "phone_webpage_password"},
              {id: "epp-time-zone", describe: "time_zone"},
              {id: "epp-display-language", describe: "phone_display_language"},
              {id: "epp-provisioning-method", describe: "phone_provisioning_method"},
              {id: "epp-networkd-interface", describe: "network_interface"},
              {id: "epp-codec-st", describe: "first_preferred_codec"},
              {id: "epp-codec-nd", describe: "second_preferred_codec"},
              {id: "epp-codec-rd", describe: "third_preferred_codec"},
              {id: "epp-codec-th", describe: "fourth_preferred_codec"}
            ]
          }
        ]
      };

      _this.get(url, function (contentBox) {


        function init(contentBox, type) {
          /*
           选项卡折叠事件暂不添加，待有需求时添加即可
           现在只有3个选项卡，手机屏幕现实没太大问题，如果将来要继续添加或者别的地方有使用到多个，可以参考这里的代码
           */
          //$.getScript('/javascripts/plugins/responsive-tabs.js', function () {
          //    //。。。
          //});


          $('#eoh-radio-time-global', contentBox).on('click', function () {
            //data-role="timepicker"
            $('[data-role=timepicker]', contentBox).attr('data-mark', 'default').val('').attr('readonly', 'readonly');
            $('[data-time-show=default]').val('');
          });
          /**
           * Office Hours 页签 时间控件初始化
           */
          $('#eoh-radio-time-specific', contentBox).on('click', function () {
            $('[data-role=timepicker]', contentBox).removeAttr('readonly');
          });
          /**
           * Office Hours 选项卡时间控件
           */
          $('[data-role=timepicker]', contentBox).timepicker({'scrollDefault': 'now', timeFormat: 'H:i'});
          $('[data-time-add]', contentBox).on('click', function () {
            var timeId = $(this).attr('data-time-add');

            var begin = $('#' + timeId + '-begin').val();
            var end = $('#' + timeId + '-end').val();

            $('#' + timeId).val(begin + ' - ' + end);
          });
          $('[data-time-remove]', contentBox).on('click', function () {
            var timeId = $(this).attr('data-time-remove');
            $('#' + timeId).val('');
            $('#' + timeId + '-begin').attr('data-mark', 'default').val('');
            $('#' + timeId + '-end').attr('data-mark', 'default').val('');

          });

          var form = $('#form-extension-add', contentBox);

          /**
           * 绑定Change事件，获取数据时只获取data-mark等于update的元素数据
           */
          $('[data-mark]', form).on('change', function () {
            $(this).attr('data-mark', 'update');
          });


          //-----
          /**
           * 区分update和add的初始化内容，减少不必要的dom操作
           */

          if (type == 'update') {

            /**
             * select选择项初始化
             */
            var selects = $('[data-selected]', form);
            if (selects && selects.size() > 0) {
              for (var i = 0; i < selects.size(); i++) {
                var select = $(selects[i]);
                var options = $('option', select);
                if (options && options.size() > 0) {
                  for (var j = 0; j < options.size(); j++) {
                    var option = $(options[j]);
                    if (option.val() == select.attr('data-selected')) {
                      option.attr('selected', 'selected');
                    }
                  }
                }
              }
            }
            /**
             * checkbox 初始化
             */
            var checkboxs = $('[data-checked]', form);
            if (checkboxs && checkboxs.size() > 0) {
              for (var i = 0; i < checkboxs.size(); i++) {
                var checkbox = $(checkboxs[i]);
                var type = checkbox.attr('type');
                if (type == 'checkbox') {
                  if (checkbox.attr('data-checked')) {
                    checkbox.attr('checked', 'checked');
                    //是否添加触发事件判断
                  }
                } else if (type == 'radio') {
                  if (checkbox.attr('data-checked')) {

                    var name = checkbox.attr('name');
                    //console.log(name);
                    var checked = checkbox.attr('data-checked');
                    var checked_child = checkbox.attr('data-checked-child');

                    if (name) {
                      var radios = $('[name=' + name + ']', form);

                      if (radios && radios.size() > 0) {
                        for (var j = 0; j < radios.size(); j++) {
                          var cbox = $(radios[j]);

                          var value = cbox.attr('value');
                          var associated = cbox.attr('data-associated');
                          var group = cbox.attr('data-group');

                          if (value == checked && !associated && !group) {
                            cbox.attr('checked', 'checked');
                            /**
                             * 触发当前元素上绑定的click事件
                             * 主要是解决一些元素上绑定了一些点击事件，但当页面加载为它赋值的时候
                             * 往往不会触发后续
                             * _data非正式方法
                             */
                            try {
                              if ($._data(cbox[0], 'events')['click']) {
                                cbox.trigger('click');
                              }
                            } catch (err) {
                              cbox.trigger('click');
                            }


                          }
                          if (value == checked && associated == 'default' && group) {
                            cbox.attr('checked', 'checked');

                            var associated_box = $('#' + group);

                            if (associated_box) {
                              var type = associated_box.attr('type');
                              if (!type) {
                                type = associated_box.attr('data-role');
                              }
                              if (type == 'select') {
                                var options = $('option', associated_box);
                                if (options && options.size() > 0) {
                                  for (var k = 0; k < options.size(); k++) {
                                    var option = $(options[k]);
                                    if (option.val() == checked_child) {
                                      option.attr('selected', 'selected');
                                    }
                                  }
                                }
                              } else if (type == 'text') {
                                associated_box.val(checked_child);
                              }
                              //...
                            }


                          }

                        }
                      }
                    }


                  }

                }

              }
            }

            /**
             * select 多选初始化
             */
            var select_multi = $('[data-selects]', form);

            if (select_multi && select_multi.size() > 0) {

              for (var i = 0; i < select_multi.size(); i++) {
                var select_box = $(select_multi[i]);
                var value = select_box.attr('data-selects');
                //$('#eo-extension-groups').selectpicker('val',['DEFAULT','SYSTEM'])
                //select_box.selectpicker('val',['DEFAULT','SYSTEM']);
                select_box.selectpicker({style: 'btn dropdown-toggle btn-select'});
                if (value) {
                  select_box.selectpicker('val', select_box.attr('data-selects').split(','))
                }
              }
            }

          }


        }


        //绑定add Extensions 事件
        $('#btn-add-extension', contentBox).on('click', function () {
          _this.get('/callManager/extension/create', function (contentBox) {


            /**
             * 调用初始化方法
             */
            init(contentBox, 'add');


            $('#extension-apply', contentBox).unbind('click').one('click', function () {
              console.log(66666666);
              /**
               * General
               */
              //var number = $('#form-extension-number', form).val();
              //var password = $('#form-extension-password', form).val();

              //_this.ready(["form-extension-number","form-extension-password"]);
              var reqJSON = _this.ready(paras, contentBox);
              reqJSON = _this.util.parseURLPost(reqJSON);

              console.log(reqJSON);
              //return;

              //var reqJSON = {
              //
              //    "extension_number": number,
              //    "password": password,
              //
              //};
              console.log('request begin');
              $.post('/callManager/extension/create', reqJSON).success(function (data) {
                if (!data) {
                  data = 'Creating a successful '
                } else {
                  data = _this.util.parseJSON(data);
                }
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $('#e-cancel', contentBox).trigger('click');
                }

              }).error(function (e) {
                console.log('error');
                console.log(e);
                _this.toastr('error', 'Create a failure');
              });


            });


          });
        });


        /**
         * 绑定update事件
         */
        var btns = $('[name=e-update-btn]', contentBox);
        if (btns && btns.size() > 0) {
          for (var i = 0; i < btns.size(); i++) {
            $(btns[i]).on('click', function () {
              var number = $(this).attr('data-en');
              var url = '/callManager/extension/update';
              url = _this.util.parseURLGet(url, [{key: 'extension_number', value: number}]);
              _this.get(url, function (contentBox) {

                /**
                 * 调用初始化方法
                 */
                init(contentBox, 'update');


                $('#extension-apply', contentBox).unbind('click').one('click', function () {
                  var reqJSON = _this.ready(paras, form);
                  console.log('request begin');
                  reqJSON = _this.util.parseURLPost(reqJSON);
                  console.log(reqJSON)
                  $.post('/callManager/extension/update', reqJSON).success(function (data) {
                    data = _this.util.parseJSON(data);
                    if (data && data.err_code) {
                      _this.toastr('warning', data.msg);
                    } else {
                      _this.toastr('success', 'Create is ok');

                      $('#e-cancel', contentBox).trigger('click');
                    }
                  }).error(function (e) {
                    console.log('error');
                    console.log(e);
                    _this.toastr('error', 'Create a failure');
                  });
                });
              });

            });
          }
        }

        //绑定delete事件
        $('[name=e-delete-btn]', contentBox).off('click').on('click', function() {
          var number = $(this).attr('data-en');


          var reqJSON = {extension_number: number}
          reqJSON = _this.util.parseURLPost(reqJSON);
          $.post('/callManager/extension/delete', reqJSON).success(function (data) {
            data = _this.util.parseJSON(data);
            if (data && data.err_code) {
              _this.toastr('warning', data.msg);
            } else {
              _this.toastr('success', 'Delete is ok');

              _this.menuDescribe['ex'](_this);
            }
          }).error(function (e) {
            console.log('error');
            console.log(e);
            _this.toastr('error', 'Create a failure');
          });


        });


      });
    },
    gm: function (_this) {
      var token = $.cookie('token');
      var url = '/callManager/extension/group?access_token=' + token + '&cursor=1';
      _this.get(url, function (contentBox) {


        var paras = {
          name: 'default',
          ids: [
            {id: 'egm-group-name', describe: 'group_name'},
            {id: 'egm-group-description', describe: 'group_description'},
            {id: 'egm-allow-intercom', describe: 'enable_intercom'},
            {id: 'egm-external-call', describe: 'enable_external_call'},
            {id: 'egm-console-access', describe: 'enable_management_console_access'},
            {id: 'egm-members', describe: 'members'}
          ]
        };


        function init(contentBox, option) {

          console.log('init 6666');

          _this.initialize(contentBox, option);

          /**
           * checkbox 初始化
           */
          var checkboxs = $('[data-checked]', contentBox);
          if (checkboxs && checkboxs.size() > 0) {
            for (var i = 0; i < checkboxs.size(); i++) {
              var checkbox = $(checkboxs[i]);
              var type = checkbox.attr('type');
              if (type == 'checkbox') {
                if (checkbox.attr('data-checked')) {
                  checkbox.attr('checked', 'checked');
                  //是否添加触发事件判断
                }
              }
              //次页面不考虑radio的情况checkbox是否添加在统一初始化还需考虑
            }
          }

        }

        /**
         * 新增
         */
        $('#btn-add-group', contentBox).on('click', function () {
          _this.get('/callManager/extension/group/create', function (contentBox) {

            init(contentBox,['listbox']);


            $('#egm-add', contentBox).on('click', function () {

              var reqJSON = _this.ready(paras, contentBox);
              reqJSON = _this.util.parseURLPost(reqJSON);

              $.post('/callManager/extension/group/create', reqJSON).success(function (data) {
                data = _this.util.parseJSON(data);
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $('#egm-cancel', contentBox).trigger('click');
                }
              });

            });


          });
        });

        /**
         * 修改
         */
        var btns = $('[name=egm-update-btn]', contentBox);
        if (btns && btns.size() > 0) {
          for (var i = 0; i < btns.size(); i++) {
            $(btns[i]).on('click', function () {
              var group_id = $(this).attr('data-egm-id');
              var url = '/callManager/extension/group/update';
              url = _this.util.parseURLGet(url, [{key: 'group_id', value: group_id}]);

              _this.get(url, function (contentBox) {

                init(contentBox, ['listbox']);

                $('#egm-add').off('click').on('click', function () {

                  var reqJSON = _this.ready(paras, contentBox);
                  reqJSON = _this.util.parseURLPost(reqJSON);

                  $.post('/callManager/extension/group/update', reqJSON).success(function (data) {
                    data = _this.util.parseJSON(data);
                    if (data && data.err_code) {
                      _this.toastr('warning', data.msg);
                    } else {
                      _this.toastr('success', 'Create is ok');

                      $('#egm-cancel', contentBox).trigger('click');
                    }
                  });

                });
              });


            });

          }
        }

        //绑定delete
        $('[name=egm-delete-btn]', contentBox).off('click').on('click', function() {
          var groupId = $(this).attr('data-egm-id');

          var reqJSON = {group_id: groupId};
          reqJSON = _this.util.parseURLPost(reqJSON);
          $.post('/callManager/extension/group/delete', reqJSON).success(function (data) {
            data = _this.util.parseJSON(data);
            if (data && data.err_code) {
              _this.toastr('warning', data.msg);
            } else {
              _this.toastr('success', 'Delete is ok');

              _this.menuDescribe['gm'](_this);
            }
          }).error(function (e) {
            console.log('error');
            console.log(e);
            _this.toastr('error', 'Create a failure');
          });


        });


      });
    },
    sex: function (_this) {

      _this.get('/callManager/systemExtensions');

    },
    dat: function (_this) {

      _this.get('/callManager/domain', function (contentBox) {

        _this.initialize(contentBox);

        /**
         * Add Main
         */
        $('#dat-add-domain', contentBox).on('click', function () {
          var pargs = {
            name: 'default',
            ids: [
              {id: 'dat-domain', describe: 'domain'}
            ]
          };
          var url = '/api/domain/create';
          var reqJSON = _this.ready(pargs, contentBox);
          reqJSON = _this.util.parseURLPost(reqJSON);
          $.post(url, reqJSON).success(function (data) {
            //console.log(data);
            if (!data) {
              data = 'Creating a successful '
            } else {
              data = _this.util.parseJSON(data);
            }
            if (data && data.err_code) {
              _this.toastr('warning', data.msg);
            } else {
              _this.toastr('success', 'Create is ok');

              $('#dat-add-domain-close', contentBox).trigger('click');
            }

          });


        });


        /**
         * Add Transports
         */
        $('#testLogBut', contentBox).on('click', function (contentBox) {


          _this.get('/callManager/domain/transports', function (contentBox) {

            _this.initialize(contentBox, ['file']);


            var pargs = {
              name: 'default',
              ids: [
                {id: 'dat-protocol', describe: 'protocol'},
                {id: 'dat-port', describe: 'port'},
                {id: 'dat-certificate-file', describe: 'certificate_file'},
                {id: 'dat-private-key-file', describe: 'private_key_file'},
                {id: 'dat-root-certificate-file', describe: 'root_certificate_file'},
                {id: 'dat-private-key', describe: 'password_for_private_key_file'},
                {id: 'dat-client-verification', describe: 'certificate_verification_method'}
              ]
            };

            $('#dat-apply', contentBox).on('click', function () {

              var url = '/api/transports/create';
              var reqJSON = _this.ready(pargs, contentBox);

              reqJSON = _this.util.parseURLPost(reqJSON);
              $.post(url, reqJSON).success(function (data) {
                //console.log(data);
                if (!data) {
                  data = 'Creating a successful '
                } else {
                  data = _this.util.parseJSON(data);
                }
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $($('[data-return=dat]')[0]).trigger('click');
                }
              });

            });


          });
        });
      });

    },
    vpt: function (_this) {

      _this.get('/callManager/voIp', function (contentBox) {

        var pargs = {
          name: 'default',
          ids: [
            {id: 'vpt-name', describe: 'name'},
            {id: 'dat-country', describe: 'country'},
            {id: 'dat-provider', describe: 'provider_brand'},

            {id: 'vpt-website', describe: 'website'},
            {id: 'vpt-hostname', describe: 'hostname'},
            {id: 'vpt-port', describe: 'port'},
            {id: 'vpt-outbound-server', describe: 'outbound_server'},
            {id: 'vpt-outbound-server-port', describe: 'outbound_server_port'},
            {id: 'vpt-reregister-interval', describe: 'reregister_interval'},

            {id: 'vpt-max-concurrent', describe: 'max_concurrent_calls'},
            {id: 'vpt-auth-id', describe: 'auth_id'},
            {id: 'vpt-password', describe: 'password'}
          ]
        };


        //依赖形Select初始化 包含update时有默认值情况
        //很扯淡的一段儿逻辑，希望以后有人看得懂吧
        function initSelect(contentBox) {
          var selectBox = $('#dat-country', contentBox);

          selectBox.on('change', function () {
            $('#country-provider').html('');
            $('#country-provider').html($('[data-provider=provers-' + $(this).val() + ']').clone());
            setValue(null);
            var cur_select = $('#country-provider select');
            cur_select.selectpicker({style: 'btn dropdown-toggle btn-select'});
            cur_select.on('change', providerChange);

          });

          if (selectBox.attr('data-selected')) {
            $('option[value=' + selectBox.attr('data-selected') + ']', selectBox)
              .attr('selected', true);
            //初始化子SELECT默选项
            var selectChildBox = $('[data-provider=provers-' + selectBox.attr('data-selected') + ']');
            $('option[value=' + selectBox.attr('data-selected-child') + ']', selectChildBox)
              .attr('selected', true);
            $('#country-provider').html('');
            $('#country-provider').html(selectChildBox.clone());
            $('#country-provider select').off('change').on('change', providerChange);
          }


          function setValue(data) {
            if (data) {
              $('#dat-provider', contentBox).val(data.attr('dat-provider-trim')).attr('data-mark', 'update');
              $('#vpt-website', contentBox).val(data.attr('data-website')).attr('data-mark', 'update');
              $('#vpt-hostname', contentBox).val(data.attr('data-hostname')).attr('data-mark', 'update');
              $('#vpt-port', contentBox).val(data.attr('data-port')).attr('data-mark', 'update');
              $('#vpt-outbound-server', contentBox).val(data.attr('data-outbound-server')).attr('data-mark', 'update');
              $('#vpt-outbound-server-port', contentBox).val(data.attr('data-outbound-server-port')).attr('data-mark', 'update');
              $('#vpt-reregister-interval', contentBox).val(data.attr('data-reregister-interval')).attr('data-mark', 'update');
            } else {
              $('#dat-provider', contentBox).val('').attr('data-mark', 'default');
              $('#vpt-website', contentBox).val('').attr('data-mark', 'default');
              $('#vpt-hostname', contentBox).val('').attr('data-mark', 'default');
              $('#vpt-port', contentBox).val('').attr('data-mark', 'default');
              $('#vpt-outbound-server', contentBox).val('').attr('data-mark', 'default');
              $('#vpt-outbound-server-port', contentBox).val('').attr('data-mark', 'default');
              $('#vpt-reregister-interval', contentBox).val('').attr('data-mark', 'default');
            }

          }

          function providerChange() {
            var select_value = $(this).val();
            if (select_value != '0') {
              $(this).attr('data-mark', 'update');
              var select_option = $('option[value=' + select_value + ']', $(this));
              $('#dat-provider', contentBox).val(select_option.attr('dat-provider-trim')).attr('data-mark', 'update');
              /**
               * "website": "http://www.netplanet.at",
               "hostname": "ms1.call.carrier66.net",
               "port": 5060,
               "outbound_server": "ms1.call.carrier66.net",
               "outbound_server_port": 5060,
               "reregister_interval": 60
               */

              setValue(select_option);
            } else {
              $(this).attr('data-mark', 'default');
              setValue(null);
            }
          }

        }


        //绑定Add事件
        $('#add-provider', contentBox).on('click', function () {
          _this.get('/callManager/voIp/provider', function (contentBox) {

            _this.initialize(contentBox);

            initSelect(contentBox);

            //提交
            $('#dat-providers-apply', contentBox).off('click').on('click', function () {
              var reqJSON = _this.ready(pargs, contentBox);
              reqJSON = _this.util.parseURLPost(reqJSON);

              //console.log(reqJSON);
              $.post('/callManager/voIp/provider', reqJSON).success(function (data) {
                data = _this.util.parseJSON(data);
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $('[data-return=vpt]', contentBox).trigger('click');
                }
              });
            });


          });

        });

        //绑定update事件
        var btns = $('[name=vpt-update-btn]');
        if (btns && btns.size() > 0) {
          btns.map(function (key, btn) {
            $(btn).on('click', function () {

              var id = $(this).attr('data-vpt');

              var url = '/callManager/voIp/provider/update';
              url = _this.util.parseURLGet(url, [{key: 'id', value: name}]);

              _this.get(url, function (contentBox) {

                _this.initialize(contentBox);

                initSelect(contentBox);

                $('#dat-providers-apply', contentBox).off('click').on('click', function () {

                  var reqJSON = _this.ready(pargs, contentBox);
                  reqJSON = _this.util.parseURLPost(reqJSON);

                  $.post('/callManager/voIp/provider/update', reqJSON).success(function (data) {
                    data = _this.util.parseJSON(data);
                    if (data && data.err_code) {
                      _this.toastr('warning', data.msg);
                    } else {
                      _this.toastr('success', 'Create is ok');

                      $('button[data-return]', contentBox).trigger('click');
                    }
                  });

                });
              });


            });
          });
        }


      });

    },
    ir: function (_this) {
      _this.get('/callManager/inbound', function (contentBox) {


        var pargs = {
          name: 'default',
          ids: [
            {id: 'ir-rule-name', describe: 'name'},
            {id: 'ir-rule-type', describe: 'type'},
            {id: 'ir-number-mask', describe: 'number_mask'},
            {name: 'ir-providers', describe: 'providers'},
            {
              name: 'ir-office',
              type: "group",
              describe: ["office_hours_action", "office_hours_action_value"]
            },
            {
              name: 'ir-outside',
              type: "group",
              describe: ["outside_office_hours_action", "outside_office_hours_action_value"]
            },
          ]
        };

        //绑定添加
        $('#add-inbound-rule', contentBox).off('click').on('click', function () {
          _this.get('/callManager/inbound/create', function (contentBox) {

            _this.initialize(contentBox);
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


              //提交
            $('#ir-add-apply', contentBox).off('click').on('click', function () {


              var reqJSON = _this.ready(pargs, contentBox);
              reqJSON = _this.util.parseURLPost(reqJSON);

              ///api/inbound_rules/create

              $.post('/callManager/inbound/create', reqJSON).success(function (data) {
                data = _this.util.parseJSON(data);
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $('#ir-cancel', contentBox).trigger('click');
                }
              });


            });


          });
        });


        /**
         * 绑定修改
         */
          //var btns =
        $('[name=ir-btn-update]', contentBox).off('click').on('click', function () {
          var name = $(this).attr('data-rn');
          var url = '/callManager/inbound/update';
          url = _this.util.parseURLGet(url, [{key: 'name', value: name}]);
          _this.get(url, function (contentBox) {

            _this.initialize(contentBox, ['select', 'checkboxs', 'checkbox']);


            //,,,

            $('#ir-add-apply', contentBox).off('click').on('click', function () {

              var reqJSON = _this.ready(pargs, contentBox);
              reqJSON = _this.util.parseURLPost(reqJSON);

              ///api/inbound_rules/create

              $.post('/callManager/inbound/update', reqJSON).success(function (data) {
                data = _this.util.parseJSON(data);
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $('#ir-cancel', contentBox).trigger('click');
                }
              });

            });


          })
        });


      });
    },
    or: function (_this) {
      _this.get('/callManager/outbound', function (contentBox) {

        var pargs = {
          name: 'default',
          ids: [
            {id: 'or-name', describe: 'name'},
            {id: 'or-number-prefix', describe: 'number_prefix'},
            {id: 'or-from-extension', describe: 'from_extension'},
            {id: 'or-number-length', describe: 'number_length'},
            {id: 'or-from-extension-groups', describe: 'from_extension_groups'},
            {id: 'or-route-provider-1', describe: 'route_provider_1'},
            {id: 'or-strip-digits-1', describe: 'strip_digits_1'},
            {id: 'or-prepend-1', describe: 'prepend_1'},
            {id: 'or-route-provider-2', describe: 'route_provider_2'},
            {id: 'or-strip-digits-2', describe: 'strip_digits_2'},
            {id: 'or-prepend-2', describe: 'prepend_2'},
            {id: 'or-route-provider-3', describe: 'route_provider_3'},
            {id: 'or-strip-digits-3', describe: 'strip_digits_3'},
            {id: 'or-prepend-3', describe: 'prepend_3'},
          ],
        };

        //新增事件
        $('#add-outbound-rule', contentBox).on('click', function () {
          _this.get('/callManager/outbound/rule', function (contentBox) {
            _this.initialize(contentBox);

            $('#or-apply').off('click').on('click', function () {
              var reqJSON = _this.ready(pargs, contentBox);
              reqJSON = _this.util.parseURLPost(reqJSON);
              //console.log(reqJSON);

              $.post('/callManager/outbound/rule', reqJSON).success(function (data) {
                data = _this.util.parseJSON(data);
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $('button[data-return]', contentBox).trigger('click');
                }
              });
            });

            //...
          });
        });

        //修改事件
        $('[name=or-edit]', contentBox).off('click').on('click', function () {

          var name = $(this).attr('data-or');
          var url = '/callManager/outbound/rule/update';
          url = _this.util.parseURLGet(url, [{key: 'name', value: name}]);

          _this.get(url, function (contentBox) {
            _this.initialize(contentBox, ['select']);

            $('#or-apply').off('click').on('click', function () {
              var reqJSON = _this.ready(pargs, contentBox);
              reqJSON = _this.util.parseURLPost(reqJSON);
              //console.log(reqJSON);

              $.post('/callManager/outbound/rule/update', reqJSON).success(function (data) {
                data = _this.util.parseJSON(data);
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $('button[data-return]', contentBox).trigger('click');
                }
              });
            });

            //...
          });

        });



      });
    },
    rg: function (_this) {
      _this.get('/callManager/ringGroups', function (contentBox) {


        var pargs = {
          name: 'default',
          ids: [
            {id: 'rg-number', describe: 'ring_group_number'},
            {id: 'rg-name', describe: 'ring_group_name'},
            {id: 'rg-ring-time', describe: 'ring_time'},
            {id: 'rg-ring-strategy', describe: 'ring_strategy'},
            {id: 'rg-members-active', describe: 'members'},
            {
              name: "rg-radio-answer",
              type: "group",
              describe: ["no_answer_action", "no_answer_action_value"]
            },
          ]
        };

        //新增
        $('#add-ring-group', contentBox).on('click', function () {
          _this.get('/callManager/ringGroups/ringGroup', function (contentBox) {
            _this.initialize(contentBox, ['listbox']);


            $('#rg-apply', contentBox).off('click').on('click', function () {

              console.log(pargs);
              var reqJSON = _this.ready(pargs, contentBox);
              reqJSON = _this.util.parseURLPost(reqJSON);
              ///api/ring_groups/create

              $.post('/callManager/ringGroups/ringGroup', reqJSON).success(function (data) {
                data = _this.util.parseJSON(data);
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $('button[data-return]', contentBox).trigger('click');
                }
              });

            });


          });

        });

        //修改
        $('[name=rg-edit]', contentBox).map(function (key, data) {
          $(data).off('click').on('click', function () {

            var name = $(this).attr('data-rg');
            var url = '/callManager/ringGroups/ringGroup/update';
            url = _this.util.parseURLGet(url, [{key: 'name', value: name}]);

            _this.get(url, function (contentBox) {
              _this.initialize(contentBox, ['select', 'checkbox', 'listbox']);


              $('#rg-apply', contentBox).off('click').on('click', function () {

                console.log(pargs);
                var reqJSON = _this.ready(pargs, contentBox);
                reqJSON = _this.util.parseURLPost(reqJSON);
                console.log(reqJSON);

                $.post('/callManager/ringGroups/ringGroup/update', reqJSON).success(function (data) {
                  data = _this.util.parseJSON(data);
                  if (data && data.err_code) {
                    _this.toastr('warning', data.msg);
                  } else {
                    _this.toastr('success', 'Create is ok');

                    $('button[data-return]', contentBox).trigger('click');
                  }
                });

              });


            });

          })
        });


      }, 'site-menubar-unfold');
    },
    vr: function (_this) {
      //Virtual Receptionist
      _this.get('/callManager/virtualReceptionist', function (contentBox) {

        var pargs = {
          name: 'default',
          ids: [
            {id: 'vr-number', describe: 'vr_number'},
            {id: 'vr-name', describe: 'name'},
            {id: 'vr-prompt', describe: 'prompt'},
          ]
        };
        //新增
        $('#add-virtual-receptionist', contentBox).on('click', function () {
          _this.get('/callManager/virtualReceptionist/create', function (contentBox) {
            _this.initialize(contentBox, ['file']);
            $('#vr-apply', contentBox).off('click').on('click', function() {
              var reqJSON = _this.ready(pargs, contentBox);
              reqJSON = _this.util.parseURLPost(reqJSON);
              console.log(reqJSON);
              /**
               * key[n]
               * 等待Extension Number选择页面完成后再完成这里的取值
               */

              $.post('/callManager/virtualReceptionist/create', reqJSON).success(function (data) {
                data = _this.util.parseJSON(data);
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $('button[data-return]', contentBox).trigger('click');
                }
              });

            });
          });
        });

        $('[name=vr-edit]', contentBox).off('click').on('click', function() {
          var name = $(this).attr('data-vr');
          var url = '/callManager/virtualReceptionist/update';
          url = _this.util.parseURLGet(url, [{key: 'vr_number', value: name}]);

          _this.get(url, function (contentBox) {
            //['select', 'checkbox']
            _this.initialize(contentBox);


            $('#vr-apply', contentBox).off('click').on('click', function () {

              console.log(pargs);
              var reqJSON = _this.ready(pargs, contentBox);
              reqJSON = _this.util.parseURLPost(reqJSON);
              console.log(reqJSON);

              $.post('/callManager/virtualReceptionist/update', reqJSON).success(function (data) {
                data = _this.util.parseJSON(data);
                if (data && data.err_code) {
                  _this.toastr('warning', data.msg);
                } else {
                  _this.toastr('success', 'Create is ok');

                  $('button[data-return]', contentBox).trigger('click');
                }
              });

            });


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
    co: function (_this) {
      _this.get('/callManager/conference', function (contentBox) {
        $('#add-room', contentBox).on('click', function () {
          _this.get('/callManager/conference/addRoom', function (contentBox) {
            //....
          });

        });
      });
    },
    vm: function (_this) {
      _this.get('/callManager/voiceMain', function (contentBox) {
        //...
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
    cs: function (_this) {
      _this.get('/callManager/callSessions', function (contentBox) {
        //...
      });
    },
    cr: function (_this) {
      _this.get('/callManager/callReports', function (contentBox) {
        $('#search', contentBox).on('click', function () {
          _this.get('/callManager/callReports/search', function (contentBox) {
            $('[data-role="datetime"]', contentBox).datetimepicker({format: 'yyyy-mm-dd hh:ii'});
          });
        });
        $('#download', contentBox).on('click', function () {
          _this.get('/callManager/callReports/download', function (contentBox) {
            //...
          });
        });
      });
    },
    st: function (_this) {
      _this.get('/settings', function (contentBox) {
        $('[data-role=timepicker]', contentBox).timepicker({'scrollDefault': 'now', timeFormat: 'H:i'});
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

        $('#add-server', contentBox).on('click', function () {
          _this.get('/settings/conferenceServer/addServer', function (contentBox) {
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


        $('#add-blacklist', contentBox).on('click', function () {
          _this.get('/settings/numberBlacklist/addBlacklist', function (contentBox) {

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

    },
    pf: function (_this) {
      _this.get('/profile', function (contentBox) {
        //...
      });
    }

  },
  resources: {}
});




















