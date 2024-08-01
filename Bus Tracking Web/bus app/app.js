const form=document.querySelector('#form')
const username=document.querySelector('#username');
const email=document.querySelector('#email');
const password=document.querySelector('#password');
const cpassword=document.querySelector('#cpassword');

form.addEventListener('submit',(e)=>{

e.preventDefault()
validateInputs()

if(!validateInputs())
{
    e.preventDefault();
}

})

function validateInputs(){
const usernameVal=username.value.trim()
const emailVal=username.value.trim();
const passwordVal=username.value.trim();
const cpasswordVal=username.value.trim();
const success=true

if(usernameVal===''){
 success=false;   
setError(username,'username is requied')
}
else{
setSuccess(username)
}


if(emailVal==='')
{
 success=false;   
setError(email,'Email is required')
}
else if(!validateEmail(emailVal))
{
setError(email,'please enter a valid email')
}
else{
setSuccess(email)
}


if(passwordVal==='')
{
 success=false;   
setError(password,'password is required')
}
else if(passwordVal.length<8){
setError(password,'password must be atleast 8 characters long')
}
else{
setSuccess(password)
}


if(cpasswordVal===''){
    success=false;
setError(cpassword,'Confirm password is required')
}
else if(cpasswordVal!==passwordVal){
setError(cpassword,'password does not match')
}
else{
setSuccess(cpassword)
}

}

function setError(element,message)
{
    const inputGroup=element.parentElement;
    const errorElement=inputGroup.querySelector('.error')

    errorElement.innerText=message;
    inputGroup.classList.add('error')
    inputGroup.classList.add('succes')

}

function setSuccess(element){
    const inputGroup=element.parentElement;
    const errorElement=inputGroup.querySelector('.error')

    errorElement.innerText='';
    inputGroup.classList.add('success')
    inputGroup.classList.add('error')
}