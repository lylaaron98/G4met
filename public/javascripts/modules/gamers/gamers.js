const GAMERS_REQUESTS_API = "http://localhost:8080/gamers/requests/";

function Gamers(){

    const usersCards = document.querySelectorAll('.user-card .card-actions');

    const likeButtons = document.querySelectorAll('.like');
    const dislikeButtons = document.querySelectorAll('.dislike');

    this.start = () => {

        init();
    }

    function init(){

        initEventListeners();
    }

    function initEventListeners(){

        likeButtons.forEach(likeBtn => likeBtn.addEventListener('click',handleGamerLikeAction));
        dislikeButtons.forEach(dislikeBtn => dislikeBtn.addEventListener('click',handleGamerDislikeAction));
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
    async function handleGamerLikeAction(e){

        let target = e.target;

        let userCard = (target.parentElement).parentElement;

        let targetUserId = parseInt(((target.parentElement).parentElement).getAttribute('data-target-user-id'));
        
        window.setTimeout(async function(){

            await fetch(GAMERS_REQUESTS_API+'create',{

                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    receiverId: targetUserId
                })

            }).then(response => {

                return response.json();

            }).then(message => {

                alert(message.message);

                fadeOut(userCard,'top');

            }).catch(error => {

                alert(error);
            });

        },500);
    }

    /**
     * 
     * @param {Event} e 
     */
    async function handleGamerDislikeAction(e){

        let target = e.target;

        let userCard = (target.parentElement).parentElement;

        fadeOut(userCard,'top');
    }
}

const setupGamers = new Gamers().start();