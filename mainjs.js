const wrapper=document.querySelector(".wrapper");
const registerLink=document.querySelector(".register-link");
const loginLink=document.querySelector(".login-link");
registerLink.onclick=()=>{
    wrapper.classList.add('active');
    alertMessageL.style.display='none';
};
loginLink.onclick = () => {
  wrapper.classList.remove("active");
   alertMessage.style.display='none';
};

// js Sign Up
//variables
let userNameInput = document.getElementById("userNameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let signUpBtn = document.getElementById("signUpBtn");
let alertMessage = document.getElementById("alertMessage");
let userContainer = [];

// function sign up onclick()
function signUP(){
  let data = {
    userName:userNameInput.value,
    email:emailInput.value,
    password:passwordInput.value,
        }
  if (checkInputEmpty()== true)
  {
    getAlertMessage("Required!", "red",alertMessage);
    console.log('hello')
  } 
  else 
  {
    if(checkEmailExist()== true)
         {
           getAlertMessage('Email Already Exist','red',alertMessage);
         
         }
    else
     {
      
        userContainer.push(data);
        localStorage.setItem("Users", JSON.stringify(userContainer));
        clrForm();
        getAlertMessage('" Successfully Completed"', "#0ef",alertMessage);
     }     
  
  }
 
}
// to put localstoragecontent into array [user container]
if (localStorage.getItem("Users") != null) {
  userContainer = JSON.parse(localStorage.getItem("Users"));
}

//get alert message
function getAlertMessage(text, color,alert) {
  alert.innerHTML = text;
 alert.style.display = "block";
  alert.style.color = color;
}
  

function clrForm() {
  userNameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}
//check function empty
function checkInputEmpty() {
  if ( userNameInput.value == "" ||emailInput.value == "" ||passwordInput.value == "") 
        {
            return true;
        }
 else {
           return false;
       }
}
function checkEmailExist() {
  for (let i = 0; i < userContainer.length; i++) {
    if (userContainer[i].email == emailInput.value) 
      {return true;}
  }
}
signUpBtn.addEventListener("click", signUP);

                             /*************     Login js  ***************/ 
                             let emailInputLogin=document.getElementById('emailInputLogin') ;
                             let passwordInputLogin=document.getElementById('passwordInputLogin');
                             let loginBtn =document.getElementById('loginBtn');    
                             let alertMessageL=document.getElementById('alertMessageL');
                              
                               if(localStorage.getItem('Users')!=null){
                                 userContainer=JSON.parse(localStorage.getItem('Users'))
                              }
                             function logIn(){
                               if(checkInputEmptyL()==true){
                                   getAlertMessage('field is empty!',"yellow",alertMessageL)
                               }else{
                                 if(checkEmailAndPassword()== true)
                                  { 
                                     //loginBtnA.setAttribute('href','home.html')
                                 window.location.href="http://127.0.0.1:5501/homee.html";
                                   //  setTimeout(function(){document.location.href='home.html'},100)
                                 }
                                  else{
                                   
                                     getAlertMessage('Email Or Password Not Correct','red',alertMessageL);
                                 }
                             }  }
                             function checkEmailAndPassword(){
                                 for (let i = 0; i < userContainer.length; i++) {
                                    if(userContainer[i].email == emailInputLogin.value && userContainer[i].password==passwordInputLogin.value)
                                     { 
                                        localStorage.setItem('userName',userContainer[i].userName)
                                         return true;
                                       
                         
                                     }
                                     
                                 }
                             }
                           
                             function checkInputEmptyL() {
                               if ( emailInputLogin.value == "" ||passwordInputLogin.value == "") 
                                     {
                                         return true;
                                     }
                              else {
                                        return false;
                                    }
                             }
                           
                             loginBtn.addEventListener('click',logIn)                   
                         