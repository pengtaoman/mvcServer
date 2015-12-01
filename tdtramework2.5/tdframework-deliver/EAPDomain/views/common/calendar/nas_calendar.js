function showCalendar(obj, path){
    var prop = "dialogWidth:280px;dialogHeight:245px;scroll:no;status:no;help:no";
    var url = path + "/views/common/calendar/calendar.html";
    
    showModelessDialog(url, obj, prop);
}