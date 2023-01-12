let transactionsObj = [];
let amountSpent = 0;
showTransactions();

// Accessing URL
const url = document.location.href;

// Extracting cart name and date from parameters of url
let cartName = url.split("?")[1].split("&")[0].split("=")[1].replace(/\+/g, ' ');

// Extracting Date from url and converting into date object
let cartDate = new Date(url.split("?")[1].split("&")[1].split("=")[1]);

// Making Array of month names
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Extracting day month and year from date object
let month = months[cartDate.getUTCMonth()]; //months from 1-12
let day = cartDate.getUTCDate();
let year = cartDate.getUTCFullYear();

// Creating the date format which we want on the website
let wantedDateFormat = day + ' ' + month + ', ' + year;

// Updating the cart name and date in html
$(".cart-name")[0].innerHTML = cartName;
$(".date")[0].innerHTML = wantedDateFormat;

function addNewItem(event) {
    event.preventDefault();
    let itemName = $(".item-name-input").val();
    let itemAmount = parseInt($(".item-amount-input").val());

    $(".new-trans-form").each(function () {
        this.reset();
    })

    let item = {
        itemName: itemName,
        itemAmount: itemAmount
    };

    if (!itemName || !itemAmount) {
        alert("Purchasing air or what?");
        return;
    }

    let transactions = localStorage.getItem('transactions');
    if (transactions == null) {
        transactionsObj = [];
    }
    else {
        transactionsObj = JSON.parse(transactions);
    }
    transactionsObj.push(item);
    localStorage.setItem("transactions", JSON.stringify(transactionsObj));

    showTransactions();
}

function showTransactions() {
    let transactions = localStorage.getItem("transactions");
    if (transactions == null) {
        transactionsObj = [];
    }
    else {
        transactionsObj = JSON.parse(transactions);
    }
    let html = "";
    amountSpent = 0;
    transactionsObj.forEach(function (element, index) {
        amountSpent = amountSpent + element.itemAmount;

        html = html + `
                <div class="transaction">
                    <button id="${index}" onclick="deleteTransaction(this.id)" class="remove">X</button>
                    <div class="trans-name">${element.itemName}</div>
                    <span class="trans-amount">${element.itemAmount}</span>
                </div>`;
    });
    let transContainer = $(".transactions-container");
    if (transactionsObj.length != 0) {
        transContainer[0].innerHTML = html;
        $(".money-spent")[0].innerHTML = "&#8377; " + amountSpent;
    }
    else {
        amountSpent = 0;
        $(".money-spent")[0].innerHTML = "&#8377; " + amountSpent;
        transContainer[0].innerHTML = `<p>Nothing to show here! Added transactions will be displayed here</p>`
    }
}

function deleteTransaction(index) {
    let transactions = localStorage.getItem('transactions');
    if (transactions == null) {
        transactionsObj = [];
    }
    else {
        transactionsObj = JSON.parse(transactions);
    }
    transactionsObj.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactionsObj));
    showTransactions();
}

function discardCart() {
    localStorage.clear();
    location.href = 'index.html';
}

function saveScreenshot() {
    html2canvas($(".ss-container").get(0), {backgroundColor: "#ffc107"}).then(function(canvas) {
        $(".ss-result").append(canvas);
        $(".download-link").append('<a class="a">Download Image</a>');
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
        $(".a")[0].href = $("canvas")[0].toDataURL();
        $(".a")[0].download = cartName+'.png';
    })
}