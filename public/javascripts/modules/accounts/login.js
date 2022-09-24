const LOGIN_API_URL = 'http://localhost:8080/login';

function Login(){

    const loginInputs = document.querySelectorAll('.login-form input');

    const signInBtn = document.getElementById('login');

    let loginData = {

        username:'',
        // email:'',
        pwd:''
    };

    this.start = function(){

        init();
    }

    function init(){

        initEventListeners();
    }

    function initEventListeners(){

        loginInputs.forEach(input => input.addEventListener('input',handleInputChange));
        signInBtn.addEventListener('click',handleLoginSubmit);
    }

    /**
     * @param {Event} e
     */
    function handleInputChange(e){

        let target = e.target;
        let valid = true;

        if(target.value.length ===  0){

            valid = false;
        }

        if(!valid){

            target.classList.add('input-error');
            target.classList.remove('input-valid');
            signInBtn.disabled = true;
            return;

        }else{

            target.classList.remove('input-error');
            target.classList.add('input-valid');
        }

        if(valid && target.name === 'pwd'){

            signInBtn.disabled = false;
        }

        loginData[target.name] = target.value;
    }

    /**
     * @param {Event} e
     */
    async function handleLoginSubmit(e){

        e.preventDefault();

        await fetch(LOGIN_API_URL,{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                loginData: loginData
            })

        }).then(response => response.json())
        .then(message => {

            alert(message.message);

            if(!message.error){

                window.location.href = 'http://localhost:8080/gamers/dashboard';
            }

        }).catch(error => alert("Error while sign in to your account : "+error));
    }
}

const setupLogin = new Login().start();