var username = $("#userNAME").text();

$.ajax({
    url: "/article/queryInfo",
    dataType:"json",
    type: "post",
    data:{
        username:username
    },
    success: function (result) {
        if (result.code === 200){
            $("#blogAge").text(result.dates);
            $("#articleNum").text(result.articleNUM);
        }
    }
});
/*日历显示部分*/
var calendar_str='';
calendar_str+='<div class="Calendar">'
    +'<div id="idCalendarPre"><<</div>'
    +'<div id="idCalendarNext">>></div>'
    +'<span id="idCalendarYear">2017</span>年 <span id="idCalendarMonth">6</span>月'
    +'<table cellspacing="0">'
    +'<thead>'
    +'<tr>'
    +'<td>日</td>'
    +'<td>一</td>'
    +'<td>二</td>'
    +'<td>三</td>'
    +'<td>四</td>'
    +'<td>五</td>'
    +'<td>六</td>'
    +'</tr>'
    +'</thead>'
    +'<tbody id="idCalendar">'
    +'</tbody>'
    +'</table>'
    +'</div>';

$("#blogCalendar").html(calendar_str);

var cale = new Calendar("idCalendar", {
    SelectDay: new Date().setDate(),
    onSelectDay: function(o){ o.className = "onSelect"; },
    onToday: function(o){ o.className = "onToday"; },
    onFinish: function(){
        SP("idCalendarYear").innerHTML = this.Year;
        SP("idCalendarMonth").innerHTML = this.Month;
        queryDate(username, this.Year, this.Month,this.Days);
    }
});
/*日历前翻*/
SP("idCalendarPre").onclick = function(){
    cale.PreMonth();
};
/*日历后翻*/
SP("idCalendarNext").onclick = function(){
    cale.NextMonth();
};

/*查询对应用户、年、月有数据的日期，并做添加点击事件及红圈标注*/
function queryDate(username, year, month,Days) {

    $.ajax({
        url:"/article/queryDateByUsername",
        dataType:'json',
        type:'post',
        data:{
            username:username,
            year:year,
            month:month
        },
        success:function (result) {
            if (result.code === 200){
                if(result.resultdata){
                    var dated=result.resultdata;
                    for(var i = 0; i < dated.length; i++){
                        var dateStr = year+"/"+month+"/"+dated[i];
                        Days[dated[i]].innerHTML = "<a href='/article/getDateArticle?date="+dateStr+"' class='haveData'>" + dated[i] + "</a>";
                    }
                }
            }
        }

    });
}
