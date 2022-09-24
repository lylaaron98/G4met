const GAMERS_MATCHES_API = "http://localhost:8080/gamers/matches/";
const GAMERS_REQUESTS_API = "http://localhost:8080/gamers/requests/";

function Matches(){

    const cancelButtons = document.querySelectorAll('.cancel');
    const approveButtons = document.querySelectorAll('.approve');
    const unmatchButtons = document.querySelectorAll('.unmatch');
    const chatPopUpButtons = document.querySelectorAll('.chat');

    const chatPanel = document.querySelector('.chat-panel');

    this.start = () => {

        init();
    }

    function init(){

        initEventListeners();
    }

    function initEventListeners(){

        if(cancelButtons)
            cancelButtons.forEach(cancelBtn => cancelBtn.addEventListener('click',handleCancelRequestAction));

        if(approveButtons)
            approveButtons.forEach(approveBtn => approveBtn.addEventListener('click',handleApproveRequestAction));

        if(unmatchButtons)
            unmatchButtons.forEach(unmatchBtn => unmatchBtn.addEventListener('click',handleUnmatchingAction));
        
        if(chatPopUpButtons)
            chatPopUpButtons.forEach(chatPopUpBtn => chatPopUpBtn.addEventListener('click',handleChatPopUpAction));
    }

    function fadeOut(target,orientation){

        target.classList.add('fadeout'+orientation);

        window.setTimeout(function(){  

            target.classList.add('hide');

        },750);
    }

    /**
     * 
     * @param {Event} e 
     */
    async function handleCancelRequestAction(e){

        let target = e.target;

        let requestCard = (target.parentElement).parentElement;

        let targetrequestId = parseInt(((target.parentElement).parentElement).getAttribute('data-request-id'));
        
        window.setTimeout(async function(){

            await fetch(GAMERS_REQUESTS_API+'delete',{

                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    requestId: targetrequestId
                })

            }).then(response => {

                return response.json();

            }).then(message => {

                alert(message.message);

                fadeOut(requestCard,'top');

            }).catch(error => {

                alert(error);
            });

        },500);
    }

    /**
     * 
     * @param {Event} e 
     */
    async function handleApproveRequestAction(e){

        let target = e.target;

        let requestCard = (target.parentElement).parentElement;

        let requestId = parseInt(((target.parentElement).parentElement).getAttribute('data-request-id'));
        let senderId = parseInt(((target.parentElement).parentElement).getAttribute('data-sender-id'));
        
        window.setTimeout(async function(){

            await fetch(GAMERS_MATCHES_API+'create',{

                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    requestId: requestId,
                    senderId: senderId
                })

            }).then(response => {

                return response.json();

            }).then(message => {

                alert(message.message);

                fadeOut(requestCard,'top');

            }).catch(error => {

                alert(error);
            });

        },500);
    }

    /**
     * 
     * @param {Event} e 
     */
    async function handleUnmatchingAction(e){

        let target = e.target;

        let matchCard = (target.parentElement).parentElement;

        let matchId = parseInt(((target.parentElement).parentElement).getAttribute('data-match-id'));
        
        window.setTimeout(async function(){

            await fetch(GAMERS_MATCHES_API+'delete',{

                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    matchId: matchId
                })

            }).then(response => {

                return response.json();

            }).then(message => {

                alert(message.message);

                fadeOut(matchCard,'top');

            }).catch(error => {

                alert(error);
            });

        },500);
    }

    /**
     * 
     * @param {Event} e 
     */
    function handleChatPopUpAction(e){

        let target = e.target;

        if(chatPanel.classList.contains('hide')){

            chatPanel.classList.remove('hide');

            window.setTimeout(()=>{
  
                chatPanel.classList.add('fadeIn');
            },400);
        
        }else{

            chatPanel.classList.remove('fadeIn');

            window.setTimeout(()=>{
  
                chatPanel.classList.add('hide');
            },0);
        }

        let gamerId = parseInt(((target.parentElement).parentElement).getAttribute('data-matched-gamer-id'));
        document.getElementById('reciever-avatar').src = "/images/avatars/"+ gamerId +".jpg";
            
        let gamerName = ((target.parentElement).parentElement).getAttribute('data-matched-gamer-name');   
        document.querySelector('.username-block').innerHTML = gamerName;

    }
}

const setupMatches = new Matches().start();