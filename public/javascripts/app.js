function G4MetApplication() {

    const sideBarItems = document.querySelectorAll('.dashboard-sidebar .sidebar-item');

    this.start = () => {

        console.log("Application is up and running...");

        init();
    }

    function init(){

        initEventListeners();
    }

    function initEventListeners(){

        if(sideBarItems){

            sideBarItems.forEach(item => {
                    
                let link = item.querySelector('.sidebar-link');
                    
                if(window.location.href.includes(link.getAttribute('href'))){
                    
                    item.classList.add('selected-sidebar-item');
                    link.classList.add('selected-sidebar-item-link');
                }
            });   
        }
    }
}

const setup = () => {

    window.onload = () => {

        window.app = new G4MetApplication();
        window.app.start();
    }
};

setup();