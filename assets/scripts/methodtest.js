// myHeaders = new Headers([
//     ['Content-Type', 'text/xml']
// ]);



// function methodTestFunc() {
//     console.log("METHOD TEST FUNC CALLED");

//     fetch('http://example.com/movies.json')
//         .then(response => response.json())
//         .then(data => console.log(data));
// }
// methodTestFunc();



function reqListener() {
    console.log(this.responseText);
    const output = document.getElementById("response");
    output.innerText = this.responseText;

}




var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://httpbin.org/get");
oReq.send();




var oReq2 = new XMLHttpRequest();
// oReq2.addEventListener("load", reqListener);
oReq2.open("POST", "https://httpbin.org/post");
oReq2.send("idk");


var oReq3 = new XMLHttpRequest();
// oReq3.addEventListener("load", reqListener);
oReq3.open("PUT", "https://httpbin.org/put");
oReq3.send();


var oReq3 = new XMLHttpRequest();
// oReq3.addEventListener("load", reqListener);
oReq3.open("DELETE", "https://httpbin.org/delete");
oReq3.send();
