let logOutBtn=document.getElementById('logOutBtn');
function logOut(){
    // navigat login page;
    window.location.href='index.html';
    //remove username from local storage 
    localStorage.removeItem('userName')
}
logOutBtn.addEventListener('click',logOut)