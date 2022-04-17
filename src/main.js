import $ from 'jquery'
import './style.scss'

$(function() {

    $('body').show()
    // $('.page4 button:last -child').click() // 页面四让轮播居中的
    // 初始化页面
    function initPage() {
        const w = window.innerWidth
        $('html').css('fontSize', w / 1920 * 100)
        $('body').css('font-size', '12px')
        
        // if( w >= 1628 ||  w <= 1368) {
        //     $('footer').addClass('fixed')
        //     $('.jq-wrap').addClass('padding-b')
        // }
    }
    initPage()
   
    $(window).on('resize', function() { // 重新计算
        initPage()
    })

    // 模拟点击
    // $('.nav-ul li').eq(3).click()
    // $('#foot div').eq(1).click()
})
// 点击导航
$('.nav-ul li').click(function() {
    const w = window.innerWidth
    const index = $(this).index()
    $(this).addClass('active').siblings().removeClass('active')
    $(`.page${index + 1}`).show().siblings().hide()
    if (index === 1) { // 默认选中
        $('ol li').eq(0).click()
    }
    // if (w >= 1628 || w <= 1368) {
    //     console.log(index)
    //     if (index === 0) { // page1
    //         $('footer').addClass('fixed')
    //         $('.jq-wrap').addClass('padding-b')
    //     } else {
    //         $('footer').removeClass('fixed')
    //         $('.jq-wrap').removeClass('padding-b')
    //     }
    // }
    
})

// 联系客服立即领取
$('header>div .hover-out button').click(function() {
     // 联系客服
    //  const now = new Date();
    //  const h = now.getUTCHours();
    //  const BJHour = h + 8;
     let contactURL = "http://g1.halan7.live";
    //  if (BJHour % 24 >= 0 && BJHour % 24 < 10) {
    //      // 夜班00:00 - 10:00
    //      contactURL = "http://g1.halan6.live";
    //  }
     open(contactURL);
})

// 点击轮播图
$('ol li').click(function() {
    const index =  $(this).index()
    $(this).addClass('active').siblings().removeClass('active')
    $('.page2 ul.swipe li').eq(index).show().siblings().hide()
    $(`.text${index + 1}`).show().siblings('div').hide()
    $('ul.dot li').eq(index).addClass('active').siblings().removeClass('active')
    $('.page2 .bg').eq(index).show().siblings('.bg').hide()
})
// 点击下方小点
$('ul.dot li').click(function() {
    const index = $(this).index()
    $(this).addClass('active').siblings().removeClass('active')
    $('.page2 ul.swipe li').eq(index).show().siblings().hide()
    $('ol li').eq(index).addClass('active').siblings().removeClass('active')
    $(`.text${index + 1}`).show().siblings('div').hide()
    $('.page2 .bg').eq(index).show().siblings('.bg').hide()
})

// page4轮播
let current = 0;
let clickable = true; // 修复点击移动距离不对的问题
$('.page4 button').click(function(){
    if (!clickable) {
        return
    }
    clickable = false
    const ul = $(this).siblings('.content').find('ul')
    let left = ul.position().left
    const liWidth = ul.find('li').eq(0).width()
    if ($(this).hasClass('left')) { // 左箭头
        if (current === 0) {
            return
        } else {
            ul.animate({'left': left + liWidth + 'px'}, function() {
                clickable = true
            })
            ul.attr('index', )
            $(this).siblings('button').show()
            current--
            ul.attr('index', current)
        }
        if (current === 0) {
            $(this).hide()
        }
    } else { // 右箭头
        if (current === 2) {
           return
        } else {
            ul.animate({'left': left - liWidth + 'px'}, function() {
                clickable = true
            })
            $(this).siblings('button').show()
            current++
            ul.attr('index', current)
        }
        if (current === 2) {
            $(this).hide()
        }
    }
    $('.page4 .top').text(ul.find('li').eq(current).attr('data-title'))
})


// hover底部下载按钮
$('#foot div').mouseenter(function() {
    $(this).css('zIndex', 6)
    $('.curtion').show()
    $(this).find('p').show()
})

$('#foot div').mouseleave(function() {
    $(this).css('zIndex', 1)
    $('.curtion').hide()
    $(this).find('p').hide()
})

$('#foot div p').mouseenter(function(){
    $(this).show()
    $('.curtion').show()
    // $(this).find('p').show()
})
$('#foot div p').mouseleave(function() {
    $(this).hide()
    $('.curtion').hide()
})

// 点击弹出层
$('.curtion').click(function() {
    $(this).hide()
    $('#foot div').find('p').hide()
})

// 点击复制
$('.download button').click(function() {
    let copyText =  $(this).siblings('strong').text()
    let input = document.createElement('input') // 创建一个input
    const protocol = window.location.protocol + '//'
    copyText = protocol + copyText
    input.value = copyText // 赋值需要复制的内容
    document.body.appendChild(input) // 插入dom
    input.select()  // 选择对象
    document.execCommand('Copy') // 执行浏览器复制命令
    input.style.display = 'none' // 隐藏
    document.body.removeChild(input) // 移除创建的input
    alert('复制成功')
})


//跳转方法封装
function open(url) {
    const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) { // ios
        window.location.href = url
    } else { // andriod
        window.open(url)
    } 
}