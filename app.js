
// Get a database reference 
const databasepHvalue = database.ref('DoAn/pH');

const databasecheck = database.ref('DoAn/Check/check');

const databasepHstatus = database.ref('DoAn/pHstatus');

const databaserun = database.ref('DoAn/Run/run');


// Variables to save database current values
var pHValue;
var pHvalueReading;

var checkReading;

var pHstatusReading;

var runReading;

//////////////////////// nhận dữ liệu từ database //////////////////////////////
databasepHvalue.on('value', (snapshot) => {
    pHvalueReading = snapshot.val();
    pHValue = pHvalueReading;
    console.log(pHvalueReading);
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
    document.getElementById("square").style.backgroundColor = color;
    document.getElementById("reading-pHvalue").innerHTML = pHvalueReading.toFixed(2);
   }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
   });
//---------------------------------------------------------------------------//
databasecheck.on('value', (snapshot) => {
    checkReading = snapshot.val();
    console.log(checkReading);
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

////////////////////////// nhận Relay từ database //////////////////////////////

//////////////////////// Nhận giá trị từ slider///////////////////////////////

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
////////////////////////////// UpdateColor /////////////////////////////////////
