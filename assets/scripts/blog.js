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
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");


        tempTitle.innerHTML = titleArr[ind];
        tempDate.innerHTML = dateArr[ind];
        tempSummary.innerHTML = summaryArr[ind];
        editBtn.innerHTML = "edit";
        deleteBtn.innerHTML = "delete";
        deleteBtn.classList.add("deleteButtons");



        blog.appendChild(tempTitle);
        blog.appendChild(tempDate);
        blog.appendChild(tempSummary);
        blog.appendChild(editBtn);
        blog.appendChild(deleteBtn);
        blogSection.appendChild(blog);
    });


    const allDeleteButtons = document.getElementsByClassName('deleteButtons');
    console.log(allDeleteButtons);

    if (allDeleteButtons != null) {
        for (let i = 0; i < allDeleteButtons.length; i++) {
            allDeleteButtons[i].addEventListener('click', function openDeleteModal() {
                // console.log("OPEN DELETE MODAL with index: " + i);
                const confirmation = confirm("Are you sure you want to delete " + titleArr[i] + " ?");
                if (confirmation == true) {
                    titleArr.splice(i, 1);
                    dateArr.splice(i, 1);
                    summaryArr.splice(i, 1);
                    localStorage.setItem("titles", JSON.stringify(titleArr));
                    localStorage.setItem("dates", JSON.stringify(dateArr));
                    localStorage.setItem("summaries", JSON.stringify(summaryArr));
                    location.reload();
                }
            }
            );
        }
    }
}
showAllBlogs();