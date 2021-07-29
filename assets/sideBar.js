let sideBar = document.getElementById('sideBar');
let contentPane = document.getElementById('contentPane');
let navButton = document.getElementById('navButton');

function minimizeBar() {
    if (window.screen.width > 1000){
        sideBar.style.left = '-18%'; // Gives smooth transition effect to move entire div off screen than set hidden
        contentPane.style.marginLeft = '0px';
        contentPane.style.paddingLeft = '10%';
        contentPane.style.paddingRight = '10%'
        sideBar.style.visibility = 'hidden';
    }
    else{
        sideBar.style.left = '-100%'
    }
    sideBar.style.visibility = 'hidden'
}

function expandBar() { 
    
    if (window.screen.width > 1000){
        contentPane.style.marginLeft = '15%'; // Setting margin for content pane
        contentPane.style.paddingLeft = '2.5%';
        contentPane.style.paddingRight = '2.5%';
    }
    sideBar.style.left = '0px'; // Setting div to be on screen
    sideBar.style.visibility = 'visible'; // Displaying div
}

navButton.onclick = () => {
    if (sideBar.style.left == '0px'){ // If the div is on the screen
        minimizeBar();                   // Minimize It
    }
    else{
        expandBar();                  // Expand it
    }
}