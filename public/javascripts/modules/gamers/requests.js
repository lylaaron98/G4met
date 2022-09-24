const GAMERS_REQUESTS_API = "http://localhost:8080/gamers/requests/";

function Requests(){

    const cancelButtons = document.querySelectorAll('.cancel');

    this.start = () => {

        init();
    }

    function init(){

        initEventListeners();
    }

    function initEventListeners(){

        cancelButtons.forEach(cancelBtn => cancelBtn.addEventListener('click',handleCancelRequestAction));
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
}

const setupRequests = new Requests().start();