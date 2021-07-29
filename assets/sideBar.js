// Adding side bar
document.body.innerHTML += '<div id="navBar"> <img src="assets/images/button_icon.png" id="navButton"> <a href="/index.html"><p id="name" style="font-size: 24px;">Kieran Brett</p></a> <a href="mailto:brett.kieran@hotmail.com"><p style="padding-right: 40px;">Contact</p></a> <!-- Padding accounts for the scroll bar --> </div>';

document.body.innerHTML += '<div id="sideBar"> <div id="links"> \
<a href="/Projects/Matrix">Matrix</a> <br> \
<a href="/Projects/Matrix2">Matrix 2</a> <br> \
<a href="/Projects/UnnamedGame/">Unnamed Game</a> <br> \
 </div> </div>'
console.log(document.body.innerHTML)

window.addEventListener('load', function () {
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
  })

