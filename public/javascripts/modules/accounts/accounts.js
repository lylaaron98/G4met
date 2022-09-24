import {GamesListObj} from '../../constants/gamesData.js'; 

const SIGN_APP_API_URL = 'http://localhost:8080/signup';

function Accounts() {

    /**
     * @type {HTMLSelectElement} gamesListSelect
     */
    const gamesListSelect = document.getElementById('gamesList');

    const accountInfoInputs = document.querySelectorAll('.account-info-side input');

    const gamerInfoArea = document.querySelector('.gamer-info-side');
    const gamerRolesWrapper = document.querySelector('.gameRolesWrapper');
    const gamerRolesArea = document.querySelector('.gamer-roles');

    const selectedGamesArea = document.querySelector('.selected-games');

    const signUpBtn = document.getElementById('signup');

    let gamesData = {};
    gamesData.games = [];
    
    let accountData = {};
    accountData.role = "gamer";

    this.start = () => {

        init();
    }

    function init(){

        initSelectElement();
        initEventListeners();
    }

    function initSelectElement(){

        let names = GamesListObj.names;

        names.forEach(name => {

            let option = document.createElement('option');

            option.value = name;
            option.innerHTML = name;

            gamesListSelect.appendChild(option);
        });
    }

    function removeOption(option){

        gamesListSelect.removeChild(option);
    }

    function addOption(option){

        gamesListSelect.appendChild(option);
    }

    function initEventListeners(){

        gamesListSelect.addEventListener('change',handleGameSelect);
        accountInfoInputs.forEach(input => input.addEventListener('change',handleInputChange));
        signUpBtn.addEventListener('click',handleSignUpSubmit);
    }

    /**
     * 
     * @param {Event} e 
     */
    function handleGameSelect(e){

        gamerRolesArea.innerHTML = "";

        if(gamesListSelect.value === ""){
                
            gamerRolesWrapper.classList.add('hide');
            return;
        }

        let gameData = {

            name:gamesListSelect.value,
            roles:[]
        };

        gamesData.games.push(gameData);

        let game = document.createElement('div');
        game.classList.add('selected-game')
        game.innerHTML= gamesListSelect.value;

        game.addEventListener('click',handleGameRemove);

        selectedGamesArea.appendChild(game);

        let gameRoles = GamesListObj.roles[GamesListObj.names.indexOf(gamesListSelect.value)];

        let rolesColumn = document.createElement('div');

        let roleLebel = null;
        let roleCheckBox = null;
        let rolesBlock = null;

        gameRoles.forEach((role,index) => {

            roleCheckBox = document.createElement('input');
            roleCheckBox.type = 'checkbox';
            roleCheckBox.id = role;
            roleCheckBox.value = role;
            roleCheckBox.name = 'roles';

            roleCheckBox.addEventListener('change',handleRolesCheck);
                
            roleLebel = document.createElement('p');
            roleLebel.innerHTML = role;

            rolesBlock = document.createElement('div');
            rolesBlock.classList.add('block','flex-left');

            rolesBlock.appendChild(roleCheckBox);
            rolesBlock.appendChild(roleLebel);

            rolesColumn.appendChild(rolesBlock);

            if((index+1)%3 == 0){

                gamerRolesArea.appendChild(rolesColumn);

                rolesColumn = document.createElement('div');
            }

            if(index == gameRoles.length-1){

                gamerRolesArea.appendChild(rolesColumn);
            }
                
        });

        removeOption(gamesListSelect.selectedOptions.item(0));

        gamerRolesWrapper.classList.remove('hide');
    }

    /**
     * 
     * @param {Event} e 
     */
    function handleGameRemove(e){
        
        let target = e.target;

        let option = document.createElement('option');
        option.value = target.innerHTML;
        option.innerHTML = target.innerHTML;

        addOption(option);

        target.style.display = 'none';

        target.removeEventListener('click',handleGameRemove);

        gamesData.games = gamesData.games.filter(game => game.name !== target.innerHTML);

        gamerRolesArea.innerHTML = "";
        gamerRolesWrapper.classList.add('hide');
    }

    /**
     * 
     * @param {Event} e 
     */
    function handleRolesCheck(e){

        let target = e.target;
        let game = gamesData.games[gamesData.games.length-1];
        let isExisted = false;

        for(let role of game.roles){

            if(role == target.value){

                game.roles.splice(game.roles.indexOf(role),1);
                isExisted = true;
                break;
            }
        }

        if(!isExisted)
            game.roles.push(target.value);
    }

    /**
     * 
     * @param {Event} e 
     */
    function handleInputChange(e){

        let target = e.target;
        let valid = true;

        let emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(target.value.length === 0){
            valid = false;
        }

        if(target.type === 'email'){
            
            if(!emailRegx.test(target.value)){

                valid = false;
            }
        }

        if(target.name === 'confirmed_pwd'){

            if(target.value !== accountInfoInputs[accountInfoInputs.length-2].value){

                valid = false;
            }
        }

        if(!valid){

            target.classList.add('input-error');
            signUpBtn.disabled = true;
            return;
        }else{

            target.classList.remove('input-error');
        }

        
        if(valid && target.name === 'confirmed_pwd'){
        
            signUpBtn.disabled = false;
        }
        
        if(target.name !== 'confirmed_pwd'){
            
            accountData[target.name] = target.value;
        }
    }

    /**
     * 
     * @param {Event} e 
     */
    async function handleSignUpSubmit(e){

        e.preventDefault();

        if(gamesData.games.length)
        {   
            await fetch(SIGN_APP_API_URL,{

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    gamesData: gamesData,
                    accountData: accountData
                })

            }).then(response => {

                return response.json();

            }).then(message => {

                if(!message.error){

                    alert(message.message);

                    window.location.href = 'http://localhost:8080/signin';

                }else{

                    alert(message.message);
                }
            
            }).catch(error => console.error('Error:', error))

        }else{

            alert("You need to select at least one game !");
            return;
        }
    }
}

const setupAccounts = (() => { new Accounts().start(); })();