
// Get a database reference 
const databasepHvalue = database.ref('DoAn/pH');
const databasepHvalue1 = database.ref('DoAn/pH1');
const databasepHvalue2 = database.ref('DoAn/pH2');
const databasepHvalue3 = database.ref('DoAn/pH3');
const databasepHvalue4 = database.ref('DoAn/pH4');

const databasecheck = database.ref('DoAn/Check/check');

const databasepHstatus = database.ref('DoAn/pHstatus');
const databasepHstatus1 = database.ref('DoAn/pHstatus1');
const databasepHstatus2 = database.ref('DoAn/pHstatus2');
const databasepHstatus3 = database.ref('DoAn/pHstatus3');
const databasepHstatus4 = database.ref('DoAn/pHstatus4');

const databaserun = database.ref('DoAn/Run/run');


// Variables to save database current values
var pHValue;
var checkpH;
var pHvalueReading;
var pHvalueReading1;
var pHvalueReading2;
var pHvalueReading3;
var pHvalueReading4;

var checkReading;

var pHstatusReading;
var pHstatusReading1;
var pHstatusReading2;
var pHstatusReading3;
var pHstatusReading4;

var runReading;

//////////////////////// nhận dữ liệu từ database //////////////////////////////
databasepHvalue.on('value', (snapshot) => {
    pHvalueReading = snapshot.val();
    pHValue = pHvalueReading;
    let color;
    if (pHValue < 1) {
        color = "#cc0000"; // 1
    } else if (pHValue >= 1 && pHValue < 1.5) {
        color = "#ee0000"; // 2
    } else if (pHValue >= 1.5 && pHValue < 4.2){
        color = "#ff6600"; // 3
    } else if (pHValue >= 4.2 && pHValue < 5) {
        color = "#ff9900"; // 4
    } else if (pHValue >=5 && pHValue < 6.5) {
        color = "#ffff00"; // 5
    } else if (pHValue >= 6.5 && pHValue < 7) {
        color = "#99cc33"; // 6
    } else if (pHValue >= 7 && pHValue < 7.5) {
        color = "#339933"; // 7
    } else if (pHValue >= 7.5  && pHValue < 8.4){
        color = "#19cdff"; // 8
    } else if (pHValue >= 8.4 && pHValue < 11.5) {
        color = "#3333ff"; // 9
    } else if (pHValue >= 11.5 && pHValue < 12.5) {
        color = "#330099"; // 10
    } else {
        color = "#330066"; // 11
    }
    checkpH = pHvalueReading;
    if (checkpH >= 6.5 && checkpH <= 8.5) {
        document.getElementById("check").innerHTML = "AN TOÀN";
        document.getElementById("check").style.color = "green";
    } else {
        document.getElementById("check").innerHTML = "CẨN THẬN";
        document.getElementById("check").style.color = "red";}
    document.getElementById("square").style.backgroundColor = color;
    document.getElementById("reading-pHvalue").innerHTML = pHvalueReading.toFixed(2);
   }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
   });
//---------------------------------------------------------------------------//
databasecheck.on('value', (snapshot) => {
    checkReading = snapshot.val();
    document.getElementById("reading-check").innerHTML = checkReading;
   }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
   });
//---------------------------------------------------------------------------//
databasepHstatus.on('value', (snapshot) => {
    pHstatusReading = snapshot.val();
    console.log(pHstatusReading);
    document.getElementById("reading-pHstatus").textContent = pHstatusReading;
   }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
   });
//---------------------------------------------------------------------------//


/////////////////////////// hiển thị thời gian ////////////////////////////////
setInterval(myTimer, 1000);
function myTimer() {
  const d = new Date();
  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
//////////////////////////// gửi dữ liệu đến relay ////////////////////////////
    function newData(uid) {
        var updates = {};
        switch (uid) {
            case 1:
            updates['Doan/relay1'] = {relay1: true};
                break;
            case 2:
            updates['Doan/relay2'] = {relay2: true};
                break;
            case 3:
            updates['Doan/relay3'] = {relay3: true};
                break;
            case 4:
            updates['Doan/relay4'] = {relay4: true};
                break;
            default:
                break;
        }
        return firebase.database().ref().update(updates);
    }

//////////////////////////// gửi dữ liệu đến relay ////////////////////////////
function SetRelay(relayid) {
    var updates = {};
    switch (relayid) {
        case 1:
        updates['DoAn/Check'] = {check: true};
            break;
        case 2:
        updates['DoAn/Run'] = {run: true};
            break;
        default:
            break;
    }
    return firebase.database().ref().update(updates);
}
////////////////////////////// Nhận history /////////////////////////////////////
databasepHvalue1.on('value', (snapshot) => {pHvalueReading1 = snapshot.val();
document.getElementById("reading-pHvalue1").innerHTML = pHvalueReading1.toFixed(2);});
databasepHvalue2.on('value', (snapshot) => {pHvalueReading2 = snapshot.val();
document.getElementById("reading-pHvalue2").innerHTML = pHvalueReading2.toFixed(2);});
databasepHvalue3.on('value', (snapshot) => {pHvalueReading3 = snapshot.val();
document.getElementById("reading-pHvalue3").innerHTML = pHvalueReading3.toFixed(2);});
databasepHvalue4.on('value', (snapshot) => {pHvalueReading4 = snapshot.val();
document.getElementById("reading-pHvalue4").innerHTML = pHvalueReading4.toFixed(2);});

databasepHstatus1.on('value', (snapshot) => {pHstatusReading1 = snapshot.val();
document.getElementById("reading-pHstatus1").innerHTML = pHstatusReading1;});
databasepHstatus2.on('value', (snapshot) => {pHstatusReading2 = snapshot.val();
document.getElementById("reading-pHstatus2").innerHTML = pHstatusReading2;});
databasepHstatus3.on('value', (snapshot) => {pHstatusReading3 = snapshot.val();
document.getElementById("reading-pHstatus3").innerHTML = pHstatusReading3;});
databasepHstatus4.on('value', (snapshot) => {pHstatusReading4 = snapshot.val();
document.getElementById("reading-pHstatus4").innerHTML = pHstatusReading4;});
