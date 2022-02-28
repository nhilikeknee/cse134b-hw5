// 📁 blog.js
const promptBtn = document.getElementById('promptBtn');
const promptDia = document.getElementById('diaPrompt');
promptDia.returnValue = true;
const promptInner = document.getElementById('promptInner');
promptInner.innerHTML = "Write a blog post"
let editMode = false;
let editIndex = null;

promptBtn.addEventListener('click', function () {
    if (promptDia.open != true) {
        promptDia.showModal();
    }
});

const cancelPromptBtn = document.getElementById('cancel-prompt');
cancelPromptBtn.addEventListener('click', function () {
    // document.getElementById("outputMsg").innerHTML = "Prompt result: ";
    // document.getElementById("output").innerHTML = "you canceled";

});

const okPromptBtn = document.getElementById('ok-prompt');

// create a new post
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


    const newTitle = document.getElementById('ptitle').value;
    const newDate = document.getElementById('pdate').value;
    const newSummary = document.getElementById('psummary').value;

    if (editMode == false) {
        titleArr.push(newTitle);
        dateArr.push(newDate);
        summaryArr.push(newSummary);
    }
    else {
        titleArr[editIndex] = newTitle;
        dateArr[editIndex] = newDate;
        summaryArr[editIndex] = newSummary;
        editIndex = null;
        editMode = false;
    }


    localStorage.setItem("titles", JSON.stringify(titleArr));
    localStorage.setItem("dates", JSON.stringify(dateArr));
    localStorage.setItem("summaries", JSON.stringify(summaryArr));
    location.reload();


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


        blog.setAttribute("class", "blogPost");
        tempTitle.innerHTML = titleArr[ind];
        tempDate.innerHTML = dateArr[ind];
        tempSummary.innerHTML = summaryArr[ind];
        editBtn.innerHTML = "edit";
        deleteBtn.innerHTML = "delete";
        editBtn.classList.add("editButtons")
        deleteBtn.classList.add("deleteButtons");




        blog.appendChild(tempTitle);
        blog.appendChild(tempDate);
        blog.appendChild(tempSummary);
        blog.appendChild(editBtn);
        blog.appendChild(deleteBtn);
        blogSection.appendChild(blog);
    });


    const allDeleteButtons = document.getElementsByClassName('deleteButtons');
    // console.log(allDeleteButtons);

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

    const allEditButtons = document.getElementsByClassName('editButtons');
    console.log(allEditButtons);

    if (allEditButtons != null) {
        for (let i = 0; i < allEditButtons.length; i++) {
            allEditButtons[i].addEventListener('click', function openEditModal() {
                editMode = true;
                editIndex = i;
                promptBtn.click();
                // populate with old info
                document.getElementById('ptitle').value = titleArr[i];
                document.getElementById('pdate').value = dateArr[i];
                document.getElementById('psummary').value = summaryArr[i];
            }
            );
        }

    }


}
showAllBlogs();