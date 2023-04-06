console.log("HELLO WORLD")


// Input Elements
var inAmount = document.getElementById("inAmount");
var inInterest = document.getElementById("inInterest");
var inLoanDuration = document.getElementById("inLoanDuration");

// Display/Output Elements
var outEmiAmount = document.getElementById("emiAmount");
var outInterestAmount = document.getElementById("interestAmount");
var outTotalAmount = document.getElementById("totalAmount");

// Buttons
var submitButton = document.getElementById("submitButton");
var themeToggle = document.getElementById("theme-toggle");

function calculateEMI(){
    var isLoanDurationMonth = document.getElementById("loanDurationMonth").checked;
    var isLoanDurationYear = document.getElementById("loanDurationYear").checked;
    var noOfMonth = 0;

    if(inAmount.value == "" || inAmount.value == undefined || !inAmount.validity.valid){
        alertPopup('error', 'Please enter amount(Rs.)', 'e')
    }else if(inInterest.value == "" || inInterest.value == undefined || !inInterest.validity.valid){
        alertPopup('error', 'Please enter interest(%)', 'e')
    }else if(inLoanDuration.value == "" || inLoanDuration.value == undefined || !inLoanDuration.validity.valid){
        alertPopup('error', 'Please enter loan duration', 'e')
    }else if(isLoanDurationMonth == "" && isLoanDurationYear == ""){
        alertPopup('error', 'Please select loan duration Month or Year', 'e')
    }else{
        if(isLoanDurationYear == true){
            noOfMonth = inLoanDuration.value * 12;
        }else{
            noOfMonth = inLoanDuration.value;
        }

        let r = parseFloat(inInterest.value)/12/100;
        let p = inAmount.value;
        let n = noOfMonth;

        let EMI = (p*r*Math.pow((1+r), n)) / (Math.pow((1+r),n)-1);
        let totalInterest = (EMI * n) - p;
        let totalAmount = totalInterest + parseFloat(p);

        outEmiAmount.textContent = Math.round(EMI);
        outInterestAmount.textContent = Math.round(totalInterest);
        outTotalAmount.textContent = Math.round(totalAmount);
    }
}


// i - information, e - error, w - warning, 
function alertPopup(title, message, type){
    var id = 0;
    var divParent = document.createElement('div');
    divParent.className = "custom-alert"
    var div = document.createElement('div');
    div.className = "custom-alert-box";
    div.id = `alert-${id}`;

    var color = "skyblue";
    if(type == 'e')
        color = "red"
    else if(type == 'w')
        color = "orange"

    var template = `<h3 id="alertTitle-${id}" style="color: ${color}">${String(title).toUpperCase()}</h3>
    <hr /><p id="alertMessage-${id}">${message}</p><hr />`

    var dismiss = document.createElement('a');
    dismiss.href = "javascript:void(0)";
    dismiss.className = "alert-btn";
    dismiss.onclick = function(){
        // document.getElementById(`alert-${id}`).remove();
        divParent.remove();
    }
    dismiss.textContent = "Close";

    div.innerHTML = template;
    div.append(dismiss);
    divParent.append(div);
    document.body.append(divParent);
}

function switchTheme(e) {
    if (document.body.classList.contains("light")) {
      document.body.className = "dark";
      e.firstElementChild.style.display = "none";
      e.lastElementChild.style.display = "block";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.className = "light";
      e.lastElementChild.style.display = "none";
      e.firstElementChild.style.display = "block";
      localStorage.setItem("theme", "light");
    }
}

submitButton.addEventListener('click', function(e){
    console.log(document.getElementsByName('loanDuration'))
    console.log(inAmount, inInterest, inLoanDuration, loanDurationMonth, loanDurationYear)
    calculateEMI();
})

themeToggle.addEventListener('click',function(){
    switchTheme(this);
} )

window.onload = function(){
    if(localStorage.getItem("theme") != null){
        var theme = localStorage.getItem("theme");
        if(theme == "light"){
            themeToggle.lastElementChild.style.display = "none";
            themeToggle.firstElementChild.style.display = "block";
        }else{
            themeToggle.firstElementChild.style.display = "none";
            themeToggle.lastElementChild.style.display = "block";
        }
        document.body.className = theme;
    }
}