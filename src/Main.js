/**
 * Created by Rychou on 2018/4/19.
 */
import React, { Component } from 'react'
import $ from 'jquery'
import url from './audio/gbqq.mp3' // 引入背景音乐文件


class Main extends Component {
    state = {
        date: {},
    }
    componentDidMount() {
        this.print();
        setInterval(() => {
            this.time(2016, 3, 19) // 你们的纪念日
        }, 1000
        )
        var audio = document.getElementById("audio");
        setTimeout(() => audio.play(), 8500) // 背景音乐在页面加载后，延迟播放的时长，单位：毫秒。
    }
    print = () => {
        $.fn.autotype = function () {
            var _this = $(this);
            var str = _this.html();
            // 正则替换代码行之间添加的多个空格，不去除换行输出会有明显的停顿：实际是在输出多个空格
            str = str.replace(/(\s){2,}/g, "$1");
            var index = 0;
            $(this).html('');
            var timer = function fn() {
                var args = arguments;
                var current = str.slice(index, index + 1);
                // html标签完整输出,如：<p>
                if (current == '<') {
                    index = str.indexOf('>', index) + 1;
                }
                else {
                    index++;
                }
                //位运算符: 根据setInterval运行奇偶次来判断是否加入下划线字符“_”，使输入效果更逼真
                if (index < str.length - 1) { //打印字符倒数第2个字符开始，不加下划线字符，以防止结束符可能会多输出一下划线字符
                    _this.html(str.substring(0, index) + (index & 1 ? '_' : ''));
                } else {
                    _this.html(str.substring(0, index));
                    clearTimeout(timer);
                };
                setTimeout(fn, 200)
            };
            // 延迟1s开始
            setTimeout(timer, 1000);
        };
        $("#autotype").autotype();
    }
    time = (year, month, day) => {
        var dateNow = new Date();
        var dateJNR = new Date(year, month - 1, day);
        // var anniversary = parseInt((dateNow - dateJNR) / (365*24*3600*1000))
        var d = parseInt((dateNow - dateJNR) / (24 * 3600 * 1000));
        var hour = parseInt(((dateNow - dateJNR) / (3600 * 1000)) % 24);
        var minute = parseInt((dateNow - dateJNR) / (1000 * 60) % 60);
        var second = parseInt((dateNow - dateJNR) / 1000 % 60);
        this.setState({ date: { d: d, hour: hour, minute: minute, second: second } });
    };
    render() {
        const date = () => {
            if (this.state.date.d !== undefined) {
                const { d, hour, minute, second } = this.state.date
                return (<p>我们已经一起走过了: <span className="date-text">{d}</span> 天 <span className="date-text">{hour}</span> 小时 <span className="date-text">{minute}</span> 分 <span className="date-text">{second}</span> 秒 </p>
                )
            }
        }
        return (
            <div className="App animated bounceInLeft">
                <div className="date">{date()}</div>
                <div id="autotype">
                    <h1 style={{ fontWeight: 900 }}>哈喽！亲爱的婷婷！</h1>
                    <p >在本篇之前，想给你唱一首歌，但鉴于我唱的实在难听，所以还是放原版吧！Music!</p>
                    <p>今天是我们4周年的纪念日，从2016年3月19日到现在，我们一起经历了许许多多的事情，
                    有欢笑也有争吵，也曾因为一些事情闹过分手，但是我们都走过来了。</p>
                    <p>如果两个人的相遇经理可以写成一本书，那我们的故事一定是个传奇，谁都复制不了，没错，这是仅属于我们的故事
                        有的时候，我总是回想我刚认识你，你大二时候的样子，从你开始喂我第一口饭，我就属于你啦
                        我也不知道为什么就喜欢上你，就爱上你，后来我想明白了，你就是我期望的样子，一切都是我喜欢的，还超级可爱
                        你肯定想不到，我们去看电影的那个晚上，开心的合不拢嘴，起飞，这波就开心的起飞喽！
                </p>
                    <p>在和你在一起的日子里，我们在大理看过日出，在丽江吃过腊排骨火锅，在玉龙雪山俯瞰天际，在南京走过金陵河畔，在西安驻足秦始皇陵，在重庆半夜吃到超级好吃的大虎火锅
                        在重庆半夜吃到超级好吃的大虎火锅，在杭州吃过烤肉，在上海走过外滩，吃过各种小吃，当然还有在南昌，你陪我度过的日日夜夜
                        没有你，我可能四年不会去过外地，没有你，我的人生可能在黑暗中没有亮光，真心的感谢你陪我度过的那些时光。
                </p>
                    <p>千山万水，我想和你一起去看，你在国外，生活的很不容易，要一个人照顾自己，等你回来，你就是我的小公主，让你洗个碗都改被踩到土里的那种，我们没有结婚，
					   但是我会陪你走完一生，愿世间春秋与天地，天涯海角皆随你
                </p>
                    <p>我不善于文字表达，写这一个网页和说那么多话也就想表达“我爱你”这简单的三个字而已，人生当苦无妨，良人当归即好
                        好期待以后结束异地后的同居生活啊，希望那一天早点到来。
                </p>
                    <p>最后我们四周年纪念日快乐哦！</p>
                    <div style={{ textAlign: 'right' }}>
                        <p>爱你的马达</p>
                        <p>2020年3月19日</p>
                    </div>
                </div>
                <audio id="audio" src={url}></audio>
            </div>

        )
    }
}
export default Main