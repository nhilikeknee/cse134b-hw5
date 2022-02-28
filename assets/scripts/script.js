// import { customDialog } from './customdialog';



const alertEl = document.getElementById("alertBtn");
alertEl.addEventListener("click", () => alert("Alert pressed!!"));

const confirmEl = document.getElementById("confirmBtn");
confirmEl.addEventListener("click", checkConfirm);


function checkConfirm() {
    customDialog();
    document.getElementById("outputMsg").innerHTML = "The value returned by the confirm method is : ";
    document.getElementById("output").innerHTML = confirm("Do you confirm this?");

}


const promptEl = document.getElementById("promptBtn");
promptEl.addEventListener("click", displayPrompt);

function displayPrompt() {
    const promptResponse = prompt("What is your name?", "");
    if (promptResponse != "") {
        document.getElementById("outputMsg").innerHTML = "Prompt result: ";

        document.getElementById("output").innerHTML = promptResponse;

    }
    else if (promptResponse == "") {
        document.getElementById("outputMsg").innerHTML = "User didn’t enter anything";
        document.getElementById("output").innerHTML = promptResponse;//why doesn't this work??


    }

}



const saferPromptEl = document.getElementById("saferPromptBtn");
saferPromptEl.addEventListener("click", displaySaferPrompt);
function displaySaferPrompt() {
    const promptResponse = prompt("What is your name?", "");
    console.log('dirty: ' + promptResponse);
    let clean = DOMPurify.sanitize(promptResponse);

    console.log('clean: ' + clean);
    if (clean != "") {
        document.getElementById("outputMsg").innerHTML = "Prompt result: ";
        document.getElementById("output").innerHTML = clean;
    }
    else if (clean == "") {
        document.getElementById("outputMsg").innerHTML = "User didn’t enter anything";
        document.getElementById("output").innerHTML = clean;
    }

}

