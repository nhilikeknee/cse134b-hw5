// 📁 blog.js
const promptBtn = document.getElementById('promptBtn');
const promptDia = document.getElementById('diaPrompt');
promptDia.returnValue = true;
const promptInner = document.getElementById('promptInner');
promptInner.innerHTML = "Write a blog post"

promptBtn.addEventListener('click', function () {
    if (promptDia.open != true) {
        promptDia.showModal();
    }
});

const cancelPromptBtn = document.getElementById('cancel-prompt');
cancelPromptBtn.addEventListener('click', function () {
    document.getElementById("outputMsg").innerHTML = "Prompt result: ";
    document.getElementById("output").innerHTML = "you canceled";

});

const okPromptBtn = document.getElementById('ok-prompt');
okPromptBtn.addEventListener('click', function () {
    const input = document.getElementById('ptitle').value;
    let clean = DOMPurify.sanitize(input);
    document.getElementById("outputMsg").innerHTML = "Prompt result: ";
    document.getElementById("output").innerHTML = clean;



    let titleArr = JSON.parse(localStorage.getItem("titles"));
    let dateArr = JSON.parse(localStorage.getItem("dates"));
    let summaryArr = JSON.parse(localStorage.getItem("summaries"));


    if (titleArr == null) {
        titleArr = [];
    }
    if (dateArr == null) {
        dateArr = [];
    }
    if (summaryArr == null) {
        summaryArr = [];
    }


    const newTitle = prompt("New member name?");
    const newDate = prompt("Date");
    const newSummary = prompt("Summary");


    titleArr.push(newTitle);
    dateArr.push(newDate);
    summaryArr.push(newSummary);


    localStorage.setItem("titles", JSON.stringify(titleArr));
    localStorage.setItem("dates", JSON.stringify(dateArr));
    localStorage.setItem("summaries", JSON.stringify(summaryArr));

});






function showAllBlogs() {

    let titleArr = JSON.parse(localStorage.getItem("titles"));
    let dateArr = JSON.parse(localStorage.getItem("dates"));
    let summaryArr = JSON.parse(localStorage.getItem("summaries"));


    if (titleArr == null) {
        titleArr = [];
    }
    if (dateArr == null) {
        dateArr = [];
    }
    if (summaryArr == null) {
        summaryArr = [];
    }



    const allBlogs = titleArr.map(title => {
        let ind = titleArr.indexOf(title);
        let blogSection = document.getElementById("blog-section");
        let blog = document.createElement("div");
        let tempTitle = document.createElement("h3");
        let tempDate = document.createElement("p");
        let tempSummary = document.createElement("p");


        tempTitle.innerHTML = titleArr[ind];
        tempDate.innerHTML = dateArr[ind];
        tempSummary.innerText = summaryArr[ind];


        blog.appendChild(tempTitle);
        blog.appendChild(tempDate);
        blog.appendChild(tempSummary);
        blogSection.appendChild(blog);
    });



}
showAllBlogs();