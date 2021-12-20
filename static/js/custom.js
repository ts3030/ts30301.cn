var app = new Vue({
    el: '.content-wrap',
    data: {
        pcWebsite: 720,
        screenWidth: 300,
        curUrl: window.location.pathname,
        timeId: null,
    },
    <
    !--created() {
        -- >
        <
        !--console.log($($(".ll-form .ll-form>div").eq(0)).find(".ll-right").length) -- >
            <
            !--this.$nextTick(function() {
                -- >
                <
                !--console.log("111");
                -- >

                <
                !--
                if (this.curUrl.indexOf("login.html") != -1) {
                    -- >
                    <
                    !--console.log($($(".ll-form .ll-form>div").eq(0)).find(".ll-right").length) -- >
                        <
                        !--$($(".ll-form .ll-form>div").eq(0)).find(".ll-right").prepend("<span style='float:left'>还没账号？<a href='/login.html' style='color:red'>立即注册</a></span>");
                    -- >
                    <
                    !--
                }-- >

                <
                !--
            }) -- >
            <
            !--
    },
    -- >
    mounted() {
        this.screenWidth = document.body.clientWidth;
        var _this = this;
        if (this.curUrl.indexOf("login.html") != -1) {
            _this.timeId = setInterval(function() {
                if ($($(".ll-form .ll-form>div").eq(0)).find(".ll-right a").length != 2) {
                    console.log("组件还没加载完毕");
                    $($(".ll-form .ll-form>div").eq(0)).find(".ll-right").prepend("<span style='float:left'>还没账号？<a href='/regist.html' style='color:red'>立即注册</a></span>");
                } else {
                    console.log("组件加载完毕");
                    clearInterval(_this.timeId)
                }

            }, 100)

        }



    },

})


// 点雇视频
$(function() {
    try {
        videojs.options.flash.swf = "video-js.swf";
        var myPlayer = videojs('example_video_1', {

            controlBar: {
                volumePanel: {
                    inline: false
                }
            }
        });

        myPlayer.on("timeupdate", function() {
            var currenttime = sec_to_time(Math.floor(myPlayer.currentTime()));
            var alltime = sec_to_time(Math.floor(myPlayer.duration()));
            $(".vjs-remaining-time").text(currenttime + "/" + alltime);
        });
        myPlayer.on("ended", function() {
            myPlayer.readyState();
        });
        myPlayer.on("pause", function() {});
    } catch (err) {
        console.error(err)
    }



    // 修改微信客服二维码
    var wxQrcodeHttpElement = $("img[src='http://yun.zx350zx.com/1102/2020030210003525.jpg']");
    wxQrcodeHttpElement.each(function() {
        $(this).attr('src', 'https://yun.zx350zx.com/1102/20201010174055610.jpg')
    })
    var wxQrcodeHttpsElement = $("img[src='https://yun.zx350zx.com/1102/2020030210003525.jpg']");
    wxQrcodeHttpsElement.each(function() {
        $(this).attr('src', 'https://yun.zx350zx.com/1102/20201010174055610.jpg')
    })

    // 点雇视频
    $('#recommendclose').on('click', function() {
        myPlayer.pause();
        $('#recommendclose').fadeOut();
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var left = w - 200
        $('.index-video-right').fadeIn();
        var img = $(this).next();
        img.animate({
            'width': 160 + 'px',
            'height': 90 + 'px',
            'left': left,
            'opacity': 0,
        })
        $('#diangu_mask, .recommendclose').fadeOut(1500);
    })
    // 获取点故事片位置
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var left = w / 2 + 410;
    var height = h / 2 - 260;
    $("#recommendclose").css("left", left);
    $("#recommendclose").css("top", height);
    // 关闭视频

    $(".sem-close").on("click", function() {
        $(".fix-bottom").hide();
    })

})


function videoshow(videoUrl, videoImg) {
    $(".diangu-dialog").css({
        'width': 780 + 'px',
        'height': 438.75 + 'px',
        'left': 50 + '%',
        'opacity': 1,
    })
    $('#recommendclose').fadeIn();
    $('#diangu_mask').fadeIn(500);
    $(".index-video-right").fadeOut();
    $("video").attr("src", videoUrl);
    $(".video-js source").attr("src", videoUrl);
    console.log(videoImg)
    $(".vjs-poster").css("background", "url(" + videoImg + ")");


}

function sec_to_time(s) {
    var t = "";
    if (s > -1) {
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;

        if (min < 10) {
            t += "0";
        }
        t += min + ":";
        if (sec < 10) {
            t += "0";
        }
        t += sec;
    }
    return t;
}