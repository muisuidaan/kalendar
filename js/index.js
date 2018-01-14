var box = document.getElementById("box");
var count = document.getElementById("count");
var countN = document.getElementById("countN");
var calHeader = document.getElementById("calHeader");
var as = calHeader.getElementsByTagName("a");
var p1 = calHeader.getElementsByTagName("p")[0];//2017年7月

var head = document.getElementById("head");
var p2 = head.getElementsByTagName("p")[0];//16:42:53
var span = head.getElementsByTagName("span")[0];//2017年7月19日,星期三
//console.log(p2);
var str = "";
for(var i=0;i<42;i++){
    str += "<li></li>"; 	
}
countN.innerHTML = count.innerHTML = str;



function addZero(n){
    return n<10? "0"+n:""+n;
}



var todayDate;
var todayMonth;
var todayYear;

change();
function change(){
    var nowTime = "";
    var t = new Date();
    todayDate = t.getDate();
    todayMonth = t.getMonth();
    todayYear= t.getFullYear();
    var hour = t.getHours();
    var minute = t.getMinutes();
    var second = t.getSeconds();
    nowTime = addZero(hour)+":"+addZero(minute)+":"+addZero(second);
    p2.innerHTML = nowTime;
    
    //2017年7月19日,星期三
    var a = "";
    if(t.getDay()==0){
        a="日";
    }
    if(t.getDay()==1){
        a="一";
    }
    if(t.getDay()==2){
        a="二";
    }
    if(t.getDay()==3){
        a="三";
    }
    if(t.getDay()==4){
        a="四";
    }
    if(t.getDay()==5){
        a="五";
    }
    if(t.getDay()==6){
        a="六";
    }
    span.innerHTML = t.getFullYear()+"年"+(t.getMonth()+1)+"月"+t.getDate()+"日"+",星期"+a;
    if(nowTime=="00:00:00"&&box.ismoving == false){
        tab(t,count);
        //alert(1);
    }

}
change();
setInterval(change,1000);
var t= new Date();//t为日历对应的时间 会跟着按钮的点击事件而改变
tab(t,count);
var col;
function move(obj, j, duration, fn,ease){
    var ease = ease || "linear"
    var oldTime = new Date().getTime();
    var d = duration;
    var s = {};
    for(var attr in j) {
        s[attr] = {};
        s[attr].b = parseFloat(getComputedStyle(obj)[attr]);
        s[attr].c = j[attr] - s[attr].b;
    }
    clearInterval(obj.timer);
    obj.ismoving = true;
    obj.timer = setInterval(function() {
        var t = new Date().getTime() - oldTime;
        if(t >= d) {
            t = d
        }
        for(var attr in s) {
            var c = s[attr].c;
            var b = s[attr].b;
            var v = Tween[ease](t, b, c, d);
            if(attr == "opacity") {
                obj.style[attr] = v;
            } else {
                obj.style[attr] = v + "px";
            }
        }
        if(t == d) {
            clearInterval(obj.timer);
            obj.ismoving = false;
            fn && fn();
        }
    }, 16)
}



//		function boxTab(dir){
//			if(dir=="left"){
//				countN.style.left = "270px";
//				var tabObj = {"left":-270}
//			}
//			if(dir=="right"){
//				countN.style.left = "-270px";
//				var tabObj = {"left":270}
//			}
//			if(dir=="top"){
//				countN.style.top = "180px";
//				var tabObj = {"top":-180}
//			}
//			if(dir=="bottom"){
//				countN.style.top="-180px";
//				var tabObj = {"top":180}
//			}
//			move(box,tabObj,3000, function(){
//				box.style.top="0px";
//				box.style.left="0px";
//				tab(t,count);
//			})
//			
//		}

as[0].onclick = function(){
    t.setMonth(t.getMonth()-1);
    tab(t,countN);
    var tar = col*30-180;
    countN.style.top = tar+"px";
    move(box, {"top":-tar},1000, function(){
        box.style.top = 0;
        count.innerHTML = countN.innerHTML;
    })
    
}
as[1].onclick = function(){
    t.setMonth(t.getMonth()+1);
    var tar = 180 - col*30;
    countN.style.top = tar+"px";
    tab(t,countN);
    move(box, {"top":-tar},1000, function(){
        box.style.top = 0;
        count.innerHTML = countN.innerHTML;
    })
    
}

function tab(t,obj){
    //var tDate = t.getDate();
    var tMonth = t.getMonth();
    var tYear= t.getFullYear();
    
    var lis = obj.getElementsByTagName("li");
    t.setDate(1);
    var firstDay = t.getDay();
    if(firstDay==0){
        firstDay=7;
    }
    t.setMonth(t.getMonth()+1);
    t.setDate(0);//此时t为当前日历的 当月的最后一天
    var Monlength = t.getDate();
     
    p1.innerHTML = t.getFullYear()+"年"+(t.getMonth()+1)+"月";
    
    //console.log(firstDay);
    for(var i=firstDay-1;i<firstDay+Monlength-1;i++){
        lis[i].innerHTML = "<p class = 'active'>"+(i-firstDay+2)+"</p>";
        //给当前的这一天加蓝色边框
        if(i==todayDate+firstDay-2){
            if(tMonth==todayMonth&&tYear==todayYear){
                lis[i].innerHTML = "<p class = 'active' id='today'>"+(i-firstDay+2)+"</p>";
            }

        }
    }
    for(var i=firstDay+Monlength-1;i<42;i++){
        lis[i].innerHTML = "<p>"+(i-firstDay-Monlength+2)+"</p>";
    }
    col = Math.ceil((42-firstDay-Monlength)/7);
    t.setDate(0);//此时 t为 当前日历 上个月的最后一天
    
    for(var i=firstDay-2;i>-1;i--){
        lis[i].innerHTML = "<p>"+(t.getDate()+i-(firstDay-2))+"</p>";
    }
    t.setDate(t.getDate()+1);//此时 t为 当前日历 本月的第一天
    //console.log(t);
}