// 📁 customdialog.js
const alertBtn = document.getElementById('alertBtn');
const alertDia = document.getElementById('diaAlert');
alertDia.returnValue = true;
const alertInner = document.getElementById('alertInner');
alertInner.innerHTML = "Alert Pressed"


// Update button opens a modal dialog
alertBtn.addEventListener('click', function () {
    if (alertDia.open != true) {
        alertDia.showModal();
    }
});

const confirmBtn = document.getElementById('comfirmBtn');
const confirmDia = document.getElementById('diaConfirm');
confirmDia.returnValue = true;
const confirmInner = document.getElementById('confirmInner');
confirmInner.innerHTML = "Do you confirm this?"

confirmBtn.addEventListener('click', function () {
    if (confirmDia.open != true) {
        confirmDia.showModal();
    }
});


const cancelConBtn = document.getElementById('cancel-confirm');
cancelConBtn.addEventListener('click', function () {
    document.getElementById("outputMsg").innerHTML = "Confirm result: ";
    document.getElementById("output").innerHTML = "false"
});


const okConBtn = document.getElementById('ok-confirm');
okConBtn.addEventListener('click', function () {
    document.getElementById("outputMsg").innerHTML = "Confirm result: ";
    document.getElementById("output").innerHTML = "true"
});





const promptBtn = document.getElementById('promptBtn');
const promptDia = document.getElementById('diaPrompt');
promptDia.returnValue = true;
const promptInner = document.getElementById('promptInner');
promptInner.innerHTML = "What is your name?"

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
    const input = document.getElementById('fname').value;
    let clean = DOMPurify.sanitize(input);
    document.getElementById("outputMsg").innerHTML = "Prompt result: ";
    document.getElementById("output").innerHTML = clean;
});







export function testFunction() {
    console.log("IMPORTED CUSTOM DIALOG");
}