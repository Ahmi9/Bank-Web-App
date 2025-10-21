const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loggedIn = document.getElementById("loggedin");
const signedUp = document.getElementById("signedUp");
const welcome = document.getElementById("welcome");
const loginPageError = document.getElementById("loginPageError");
const signupPageError = document.getElementById("signupPageError");

const card = document.getElementById("card");

const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const formSignup = document.getElementById("formSignup");
const main = document.getElementById("main");
const depoWith = document.getElementById("depoWith");

let loginUsername;
let loginPin;
let signupUsername;
let signupPin;

let loginPageActive = false;
let signupPageActive = false;
let confirmLoggedin = false;
let confirmSignedin = false;

let userData;
let json;
let objsOfUserData;


const username = "Ahmed";
const pin = "1234";

const balanceText = document.getElementById("balanceText");
const withdrawText = document.getElementById("withdrawText");
const depositText = document.getElementById("depositText");

const depositAmount = document.getElementById("depositAmount");
const depositBtn = document.getElementById("depositBtn");

const withdrawAmount = document.getElementById("withdrawAmount");
const withdrawBtn = document.getElementById("withdrawBtn");

const depoError = document.getElementById("depoError");
const withError = document.getElementById("withError");

let totalDepo = 0;
let totalWith = 0;
let totalbal = 0;
let bal = 0;
let withdraw = 0;
let deposit = 0;

// login System
let users = JSON.parse(localStorage.getItem("users")) || [];



if (loginPageActive === false || signupPageActive === false) {
    card.style.height = "100px";
    loginPage.style.display = "none";
    signupPage.style.display = "none";
    main.style.display = "none";
}
else {
    alert("error");
}

loginBtn.onclick = function () {
    loginBtn.style.borderBottom = "1px solid #313131";
    signupBtn.style.borderBottom = "1px solid #fff";


    loginPageActive = true;
    signupPageActive = false;
    if (loginPageActive === true && signupPageActive === false) {
        card.style.transition = "all 0.3s ease-in-out";
        card.style.height = "400px";
        loginPage.style.display = "flex";
        signupPage.style.display = "none";
        loginPageError.style.opacity = "0";

        loggedIn.onclick = function () {
            loginUsername = document.getElementById("loginUsername").value;
            loginPin = document.getElementById("loginPin").value;

            

            let oldUser = users.find(function (u) {
                return u.username === loginUsername && u.pin == loginPin;
            });
            if (oldUser) {
                card.style.display = "none";
                main.style.display = "flex";
                depoWith.classList.add("depoWithAnimation");
                depoWith.style.width = "55%";
                welcome.textContent = `Welcome ${oldUser.username}!`;
                welcome.style.display = "flex";
                welcome.classList.add("opacityAnimation");
                welcome.style.opacity = "1";

                bal = oldUser.balance;
                deposit = oldUser.deposit
                withdraw = oldUser.withdraw
                balanceText.textContent = `$${bal}`;
                depositText.textContent = `$${deposit}`;
                withdrawText.textContent = `$${withdraw}`;

                depositBtn.onclick = function () {
                    if (depositAmount.value === "") {
                        depoError.textContent = "⚠️ | Enter an amount!"
                        withError.textContent = "";
                        // depositText.textContent = depositText + depositAmount;
                    }
                    else {
                        withError.textContent = "";
                        depoError.textContent = "";
                        const amount = parseFloat(depositAmount.value);
                        deposit += amount;
                        bal += amount;
                        oldUser.balance = bal;
                        oldUser.deposit = deposit;
                        localStorage.setItem("users", JSON.stringify(users));
                        depositText.textContent = "$" + deposit;
                        balanceText.textContent = "$" + bal;
                        depositAmount.value = "";
                    }
                }

                withdrawBtn.onclick = function () {
                    if (withdrawAmount.value === "") {
                        withError.textContent = "⚠️ | Enter an amount!"
                        depoError.textContent = "";
                    }
                    else {
                        withError.textContent = "";
                        depoError.textContent = "";
                        const amount = parseFloat(withdrawAmount.value);
                        if (bal < withdrawAmount.value) {
                            withError.textContent = "⚠️ | Insuficent Funds!"
                        }
                        else {
                            withError.textContent = "";
                            depoError.textContent = "";
                            withdraw += amount;
                            bal -= amount;
                            oldUser.balance = bal;
                            oldUser.withdraw = withdraw;
                            localStorage.setItem("users", JSON.stringify(users));
                            withdrawText.textContent = "$" + withdraw;
                            balanceText.textContent = "$" + bal;
                            withdrawAmount.value = "";
                        }
                    }
                }
            }
            else {
                loginPageError.classList.add("loginPageErrorAnimation");
            }
            
        }
    }
    else {
        alert("error!");
    }
}

signupBtn.onclick = function () {
    signupBtn.style.borderBottom = "1px solid #313131";
    loginBtn.style.borderBottom = "1px solid #fff";
    loginPageActive = false;
    signupPageActive = true;
    if (loginPageActive === false && signupPageActive === true) {
        card.style.transition = "all 0.3s ease-in-out";
        card.style.height = "400px";
        loginPage.style.display = "none";
        signupPage.style.display = "flex";

        signedUp.onclick = function () {
            signupUsername = document.getElementById("signupUsername").value;
            signupPin = document.getElementById("signupPin").value;
            let existingUser = users.find(function (u) {
                return u.username === signupUsername;
            });
            if (existingUser) {
                signupPageError.textContent = "⚠️ | Username already exists.";
                signupPageError.classList.add("loginPageErrorAnimation");
            }
            else {

            users.push({ username: `${signupUsername}`, pin: `${signupPin}`, balance: 0, deposit: 0, withdraw: 0 });
            localStorage.setItem("users", JSON.stringify(users));
            signupPageError.textContent = "Account Created! Now Login.";
            signupPageError.classList.add("loginPageErrorAnimation");
            }
        }
    }
    else {
        alert("error");
    }
}

