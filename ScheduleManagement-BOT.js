const CALENDAR_ID = '*******@group.calendar.google.com'; //カレンダーIDを入れてください
const WEBHOOK_URL = 'https://discord.com/api/webhooks/******';//ウェブフックのURLをいれてね
var weekday = ["日", "月", "火", "水", "木", "金", "土"];

function notifyWeekly() {

var dt = new Date()
// <@&****>はメンション用。特定のロールにメンションするには、IDをコピーして貼り付けてください。
var message = "<@&*******> \n来週の予定だよ！また、来週以降の予定も記載しておいてね☆\n\n";

for ( var i = 0; i < 7; i++ ) {

dt.setDate(dt.getDate() + 1);
message += Utilities.formatDate(dt, 'JST', '★ MM/dd(' + weekday[dt.getDay()] + ')') + "\n";
var dayText = "";
var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
var events = calendar.getEventsForDay(dt);

var calendarName = calendar.getId()
if ( calendarName == undefined ) {
message +="予定はありません\n\n";
continue;
}

var events = calendar.getEventsForDay(dt);
if( events.length == 0 ) {
message +="予定はありません\n\n";
continue;
}

dayText +="-----------------------" + "\n";

for ( var j = 0; j < events.length; j++ ) {
dayText += String(events[j].getTitle()+'\n');
}

　dayText += "\n"
message += dayText;
}


const payload = {
username: "締め切り通知bot(改良版)",
content: message,
};

UrlFetchApp.fetch(WEBHOOK_URL, {
method: "post",
contentType: "application/json",
payload: JSON.stringify(payload),
});
}
