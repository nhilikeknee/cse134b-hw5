const recordID = document.getElementById('record_id');
const articleName = document.getElementById('article_name');
const articleBody = document.getElementById('article_body');

const output = document.getElementById("response");
const missInfoMessage = "Please enter a value for Record ID, Article Name, and Article Body so we have something to send :)"
var params;

function reqListener() {
    // console.log(this.responseText);
    const output = document.getElementById("response");
    output.innerText = this.responseText;

}

function generateParams() {
    params = {
        "recordID": recordID.value,
        "articleName": articleName.value,
        "articleBody": articleBody.value,
        "date": new Date(),

    }
}

const POSTBtn = document.getElementById("postBtn");
POSTBtn.addEventListener("click", function () {
    if (recordID.value != null && recordID.value != "" && articleName.value != null && articleName.value != "" && articleBody.value != null && articleBody.value != "") {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("POST", "https://httpbin.org/post");
        generateParams();
        oReq.send(JSON.stringify(params));
    }
    else {
        output.innerText = missInfoMessage;
    }
});




const GETBtn = document.getElementById("getBtn");
GETBtn.addEventListener("click", function () {
    if (recordID.value != null && recordID.value != "" && articleName.value != null && articleName.value != "" && articleBody.value != null && articleBody.value != "") {
        console.log(recordID.value);
        var oReq2 = new XMLHttpRequest();
        oReq2.addEventListener("load", reqListener);
        oReq2.open("GET", "https://httpbin.org/get");
        generateParams();
        oReq2.send(JSON.stringify(params));

    }
    else {
        output.innerText = missInfoMessage;
    }


});



const PUTBtn = document.getElementById("putBtn");
PUTBtn.addEventListener("click", function () {
    if (recordID.value != null && recordID.value != "" && articleName.value != null && articleName.value != "" && articleBody.value != null && articleBody.value != "") {

        var oReq3 = new XMLHttpRequest();
        oReq3.addEventListener("load", reqListener);
        oReq3.open("PUT", "https://httpbin.org/put");
        generateParams();

        oReq3.send(JSON.stringify(params));
    }
    else {
        output.innerText = missInfoMessage;

    }
});



const DELETEBtn = document.getElementById("deleteBtn");
DELETEBtn.addEventListener("click", function () {
    if (recordID.value != null && recordID.value != "" && articleName.value != null && articleName.value != "" && articleBody.value != null && articleBody.value != "") {

        var oReq3 = new XMLHttpRequest();
        oReq3.addEventListener("load", reqListener);
        oReq3.open("DELETE", "https://httpbin.org/delete");
        generateParams();
        oReq3.send(JSON.stringify(params));
    }
    else {
        output.innerText = missInfoMessage;

    }
});


