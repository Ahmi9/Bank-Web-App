const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loggedIn = document.getElementById("loggedin");
const signedUp = document.getElementById("signedUp");
const welcome = document.getElementById("welcome");
const loginPageError = document.getElementById("loginPageError");
const signupPageError = document.getElementById("signupPageError");
const logout = document.getElementById("logout");
const deleteUser = document.getElementById("delete");
const editUser = document.getElementById("edit");
const editCard = document.getElementById("editCard");

let oldUsername;
let oldPin;
let newUsername;
let newPin;
const changeUsername = document.getElementById("changeUsername");
const changePin = document.getElementById("changePin");
const close = document.getElementById("close");
const usernameEditError = document.getElementById("usernameEditError");
const pinEditError = document.getElementById("pinEditError");

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




editCard.style.display = "none";



if (loginPageActive === false || signupPageActive === false) {
    card.style.height = "100px";
    loginPage.style.display = "none";
    signupPage.style.display = "none";
    main.style.display = "none";
    logout.style.display = "none";
}
else {
    alert("error");
}

loginBtn.onclick = function () {
    loginBtn.style.borderBottom = "1px solid #313131";
    signupBtn.style.borderBottom = "1px solid #fff";
    loginPageError.classList.remove("loginPageErrorAnimation");



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

            loginPageError.classList.remove("loginPageErrorAnimation");
            void loginPageError.offsetWidth;



            let oldUser = users.find(function (u) {
                return u.username === loginUsername && u.pin == loginPin;
            });
            if (loginUsername === "" || loginPin === "") {
                loginPageError.textContent = "⚠️ | Fill the fields!";
                loginPageError.classList.add("loginPageErrorAnimation");
            }
            else if (oldUser) {
                card.style.display = "none";
                main.style.display = "flex";
                depoWith.classList.add("depoWithAnimation");
                depoWith.style.width = "55%";
                welcome.textContent = `Welcome ${oldUser.username}!`;
                welcome.style.display = "flex";
                welcome.classList.add("opacityAnimation");
                welcome.style.opacity = "1";



                logout.style.display = "flex";
                logout.classList.add("opacityAnimation");
                logout.style.opacity = "1";

                deleteUser.style.display = "flex";
                deleteUser.classList.add("opacityAnimation");
                deleteUser.style.opacity = "1";

                editUser.style.display = "flex";
                editUser.classList.add("opacityAnimation");
                editUser.style.opacity = "1";

                logout.onclick = function () {
                    card.style.display = "flex";
                    card.style.height = "100px";
                    main.style.display = "none";
                    logout.style.display = "none";
                    welcome.style.opacity = "0";
                    loginPage.style.display = "none";
                    signupPage.style.display = "none";
                    loginBtn.style.borderBottom = "none";
                    signupBtn.style.borderBottom = "none";
                }

                deleteUser.onclick = function () {
                    alert("Are you sure?");
                    users = users.filter(function (d) {
                        return d.username !== oldUser.username;
                    });

                    card.style.display = "flex";
                    card.style.height = "100px";
                    main.style.display = "none";
                    logout.style.display = "none";
                    welcome.style.opacity = "0";
                    loginPage.style.display = "none";
                    signupPage.style.display = "none";
                    loginBtn.style.borderBottom = "none";
                    signupBtn.style.borderBottom = "none";
                }

                editUser.onclick = function () {
                    main.style.display = "none";
                    editCard.classList.add("editCardAnimation");
                    editCard.style.display = "flex";
                    
                    changeUsername.onclick = function () {
                        oldUsername = document.getElementById("oldUsername").value;
                        newUsername = document.getElementById("newUsername").value;
                        usernameEditError.classList.remove("loginPageErrorAnimation");
                        void usernameEditError.offsetWidth;


                        let oldUserEdit = users.find(function (oldU) {
                            return oldU.username === oldUsername;
                        });
                        if (oldUserEdit) {
                            let newUserEdit = users.find(function (newU) {
                                return newU.username === newUsername;
                            });
                            if (newUsername === ""){
                                
                                usernameEditError.textContent = "Enter a valid username!";
                                usernameEditError.classList.add("loginPageErrorAnimation");
                                usernameEditError.style.opacity = "0";
                            }
                            else if (newUserEdit){
                                usernameEditError.textContent = "Username already exists!";
                                usernameEditError.classList.add("loginPageErrorAnimation");
                                usernameEditError.style.opacity = "0";
                            }
                            else if (!newUserEdit) {
                                oldUserEdit.username = newUsername;
                                localStorage.setItem("users", JSON.stringify(users));
                                usernameEditError.textContent = "Updated!";
                                usernameEditError.classList.add("loginPageErrorAnimation");
                                usernameEditError.style.opacity = "0";
                                
                            } 
                            else {
                                usernameEditError.textContent = "Error!";
                                usernameEditError.classList.add("loginPageErrorAnimation");
                                usernameEditError.style.opacity = "0";
                            }
                        } 
                        else {
                            usernameEditError.textContent = "Enter your current username!";
                            usernameEditError.classList.add("loginPageErrorAnimation");
                            usernameEditError.style.opacity = "0";
                        }
                    }


                    changePin.onclick = function () {
                        oldPin = document.getElementById("oldPin").value;
                        newPin = document.getElementById("newPin").value;
                        pinEditError.classList.remove("loginPageErrorAnimation");
                        void pinEditError.offsetWidth;
    
    
                        let oldPinEdit = users.find(function (oldP) {
                            return oldP.pin === oldPin && oldP.username === loginUsername;
                        });
                        if (newPin === ""){
                            pinEditError.textContent = "Enter a valid pin!";
                            pinEditError.classList.add("loginPageErrorAnimation");
                            pinEditError.style.opacity = "0";
                        }
                        else if (oldPinEdit) {
                            oldPinEdit.pin = newPin;
                            localStorage.setItem("users", JSON.stringify(users));
                            pinEditError.textContent = "Updated!";
                            pinEditError.classList.add("loginPageErrorAnimation");
                            pinEditError.style.opacity = "0";
                        }
                        else {
                            pinEditError.textContent = "Error!";
                            pinEditError.classList.add("loginPageErrorAnimation");
                            pinEditError.style.opacity = "0";
                        }
                    }

                    close.onclick = function() {
                        main.style.display = "flex";
                        editCard.style.display = "none";
                    }
                }

                
                







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
                loginPageError.textContent = "⚠️ | Wrong Credentials!";
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
    signupPageError.classList.remove("loginPageErrorAnimation");
    signupPageError.style.opacity = "0";

    loginPageActive = false;
    signupPageActive = true;
    if (loginPageActive === false && signupPageActive === true) {
        card.style.transition = "all 0.3s ease-in-out";
        card.style.height = "400px";
        loginPage.style.display = "none";
        signupPage.style.display = "flex";
        signupPageError.classList.remove("loginPageErrorAnimation");
        signupPageError.style.opacity = "0";

        signedUp.onclick = function () {
            signupUsername = document.getElementById("signupUsername").value;
            signupPin = document.getElementById("signupPin").value;

            signupPageError.classList.remove("loginPageErrorAnimation");
            void signupPageError.offsetWidth;


            let existingUser = users.find(function (u) {
                return u.username === signupUsername;
            });
            if (signupUsername === "" || signupPin === "") {
                signupPageError.textContent = "⚠️ | Fill the fields!";
                signupPageError.classList.add("loginPageErrorAnimation");
            }
            else if (existingUser) {
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



