const registerForm = document.querySelector('.register-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const username = document.querySelector('#username');
const errorDiv = document.querySelector('.error');

registerForm.onsubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("/api/v1/auth/register", {
            email: email.value,
            password: password.value,
            username: username.value
        })
        window.location.href = "/";
    } catch (error) {
        const { data: {msg} } = error.response;
        console.log(error.response);
        errorDiv.innerText = msg;
    }
    
}