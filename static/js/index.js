$(function() {
    //友情链接

    $(".dailai-list li").on("mouseover", function() {
        let eleAnimate = $($(this).find('[data-class*="animated"]'));
        eleAnimate.each(function(i, ele) {
            // console.log($(ele));
            $(ele).attr("class", $(ele).attr("data-class"));
        })
        console.log(eleAnimate.length)
    }).on("mouseout", function() {
        // console.log("出发了out")
        $($(this).find('[data-class*="animated"]')).removeAttr('class')
    })
    $(".mode-list li").on("mouseover", function() {
        $(this).addClass('active').siblings('.active').removeClass("active");
    });
    $(".close-btn").on("click", function() {
        $(".side-spread").hide();
    })
    window.setTimeout(function() {
        if ($.cookie("isClose") != 'yes') {
            $(".side-modal").addClass("opened");
            $(".side-spread,.side-mark").show();
            $(".hide-btn").click(function() {
                $(".side-modal").removeClass("opened");
                $(".side-spread,.side-mark").hide();
                $.cookie("isClose", 'yes', {
                    expires: 7
                }); //测试十秒
                //$.cookie("isClose",'yes',{ expires:1});        一天
            });
        }
    }, 3000)
    $('[data-after]').not("i").countUp({
        delay: 10,
        time: 1000
    });

    function changeCount() {
        $(".home-duibi").toggleClass('before');
        $(".home-duibi .tab a").toggleClass('active');
        var arrEle = $(".home-duibi [data-after]");
        arrEle.each(function(index, ele) {
            var before, after;

            after = $(ele).attr("data-after");
            before = $(ele).attr("data-before");
            if ($(ele).hasClass("icon")) {
                ele.className = "icon";
                $(ele).addClass("icon-" + before)
            }
            //console.log(before,after)
            $(ele).attr("data-after", before)
            $(ele).attr("data-before", after)

        })
        $(".home-duibi [data-after]").not("i").countUp({
            delay: 10,
            time: 1000
        });
        window.setTimeout(function() {
            changeCount()
        }, 5000)
    }

    changeCount();
    $('[data-animate]').scrolla();

    (function() {
        // pc端canvas
        var totalWidth = $(window).width();
        var totalHeight = $(window).height();
        var width = totalWidth,
            height = totalHeight;
        if (totalWidth > 1000) {
            var canvas = document.createElement('canvas');
            canvas.id = "circle";
            canvas.width = totalWidth;
            canvas.height = totalHeight;
            canvas.style.zIndex = 8;
            var arr = [{
                x: totalWidth / 2,
                y: totalHeight
            }];
            $("#screenBg").append(canvas);
            context = canvas.getContext('2d');
            // var arrRadius=[100,200,300,400,500,600,700,800];
            // var arrRadius=[40,100,170,250,340,440,550,670,820];
            // var arrRadius=[30,100,180,270,370,480,600,730,870];
            var arrRadius = [30 + 30, 75 + 30, 130 + 30, 195 + 30, 270 + 30, 365 + 30, 485 + 30, 645 + 60];
            var maxRadius = 190;

            var radial = context.createRadialGradient(width / 2, height, 0, width / 2, height, height);
            radial.addColorStop(0, 'rgba(234,242,96,1)');
            radial.addColorStop(0.2, 'rgba(234,242,96,0.15)');
            // radial.addColorStop(0.5,'rgba(234,242,96,0)');
            radial.addColorStop(1, 'rgba(234,242,96,0.1)');

        } else {
            // 移动端canvas
            var canvas = document.getElementById('mcanvas');
            //     var canvas = document.createElement('canvas');
            //     canvasList.appendChild(canvas);
            canvas.width = $(window).width(); //
            canvas.height = 320;

            var context = canvas.getContext("2d");
            var width = $(window).width(),
                height = 320;
            var arr = [{
                x: width / 2,
                y: 320
            }];
            var arrRadius = [20, 70, 120, 170];
            var maxRadius = 60;
            var radial = context.createRadialGradient(width / 2, height, 50, width / 2, height, height);
            radial.addColorStop(0, 'rgba(234,242,96,0.1)');
            // radial.addColorStop(0.5,'rgba(234,242,96,0)');
            radial.addColorStop(1, 'rgba(234,242,96,0)');


        }



        var radius = 10;
        //创建构造函数Circle
        function Circle(x, y, radius) {
            this.xx = x; //在画布内随机生成x值
            this.yy = y;
            this.radius = radius;
        };
        Circle.prototype.radiu = function() {
            radius += 1; //每一帧半径增加0.5
            // console.log(this.radius)

            if (this.radius >= maxRadius) {
                radius = 10;
            };
        };
        // 绘制圆形的方法
        Circle.prototype.paint = function() {
            context.beginPath();
            context.arc(this.xx, this.yy, 10, 0, Math.PI * 2);
            context.fillStyle = "rgba(250,250,50,1)"; //填充颜色,默认是黑色
            context.fill(); //画实心圆
            context.closePath();
            context.lineWidth = 2; //线条宽度
            context.strokeStyle = 'rgba(250,250,50,1)'; //颜色
            //         context.stroke();  
            this.paintkong();
            for (var j = 0; j < arrRadius.length; j++) {
                this.paintkong(arrRadius[j]);
            }

            //         this.paintkong(70);
            //         this.paintkong(120);
            //         this.paintkong(170);            
        };
        Circle.prototype.paintkong = function(num) {
            context.beginPath();
            // console.log("我在圆形对象里面");
            // console.log(this.radius);
            context.arc(this.xx, this.yy, this.radius + num, 0, Math.PI * 2);
            context.closePath();
            context.lineWidth = 1; //线条宽度
            context.fillStyle = radial;
            context.fill();

            context.strokeStyle = 'rgba(250,250,250,0.1)'; //颜色
            context.stroke();
        };
        //  创建
        var newfun = null;

        function createCircles() {
            for (var j = 0; j < arr.length; j++) {
                newfun = new Circle(arr[j].x, arr[j].y, radius); //调用构造函数
                newfun.paint();
            };
            newfun.radiu();
        };
        createCircles()
        // 创建临时canvas 

        var render = function() {
            //先将主canvas的图像缓存到临时canvas中
            //         backCtx.drawImage(canvas, 0, 0, width, height);        
            //清除主canvas上的图像
            context.clearRect(0, 0, width, height);
            //在主canvas上画新圆
            createCircles();
            //新圆画完后，再把临时canvas的图像绘制回主canvas中
            //         context.drawImage(backCanvas, 0, 0, width, height);
        };
        setInterval(render, 30);
    })()

})