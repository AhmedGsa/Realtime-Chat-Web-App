const loginForm = document.querySelector('.login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const errorDiv = document.querySelector('.error');

loginForm.onsubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("/api/v1/auth/login", {
            email: email.value,
            password: password.value
        })
        window.location.href = "/";
    } catch (error) {
        const { data: {
            msg
        } } = error.response;
        errorDiv.innerText = msg;
    }
    
}