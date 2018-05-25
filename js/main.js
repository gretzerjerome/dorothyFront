/*
----------------------------------------------------------------------
VARIABLES DECLARATION
----------------------------------------------------------------------
*/

let dorothyBall = document.querySelector('.dorothy-ball'),
    menu = document.getElementsByClassName('ball-menu-item'),
    menuOpen = false, // used to tell whether menu was clicked or not (acts as switch)
    message = document.querySelector('.welcome-message-style'),
    welcomeMessageContainer = document.getElementById('welcomeMessageContainer'),
    messageClicked = false, // switch for whether welcome message was clicked or not
    terminal = document.getElementById('terminal'),
    menuTerminal = document.querySelector('.menu-terminal'),
    menuProfile = document.querySelector('.menu-profile'),
    menuInfo = document.querySelector('.menu-info'),
    menuCalendar = document.querySelector('.menu-calendar'),
    answerModal = document.getElementById('answerTemplate'),
    answerModalBody = document.querySelector('#answerTemplate .modal-body'),
    longAnswerBtn = document.getElementById('answer-modal-btn'),
    profileModal = document.getElementById('profilePage'),
    profileModalBtn = document.getElementById('profile-modal-btn'),
    hidingBgDiv = document.getElementById('hiding-bg-div'),
    menuProfileIsClicked = false,
    infoModal = document.getElementById('infoPage'),
    infoModalBtn = document.getElementById('info-modal-btn'),
    menuInfoIsClicked = false,
    formProfile = document.getElementById('profile-details'),
    messageModal = document.getElementById('messageModal'),
    messageModalCloseBtn = document.getElementById('messageModalClose');

/*
----------------------------------------------------------------------
BERTRAND
----------------------------------------------------------------------
*/


/*
INTRO ANIMATIONS (ball & menu)
_______________________________
*/

// function to show/hide menu (small balls)
function showMenu (value) {
  for(let i = 0; i < menu.length; i++){
    menu[i].style.display = value;
  }
}

// hide menu on page load
showMenu("none");

// intro animation [Anime JS], "breathing" ball effect
let breathingBall = anime({
  targets: '.dorothy-ball',
  delay: 1500,
  translateX: ['-50%', '-50%'],
  translateY: ['50%', '50%'],
  scale: [1, 1.05],
  direction: 'alternate',
  easing: 'easeInOutQuad',
  duration: 1600,
  loop: true,
  autoplay: false
});

// on page load first make ball appear [Anime JS]
anime({
  targets: '.dorothy-ball',
  translateX: '-50%',
  translateY: '50%',
  opacity: 1,
  scale: [0, 1],
  duration: 1000,
  easing: 'easeInOutBack',
  complete: breathingBall.play()
});

// When ball is clicked
dorothyBall.addEventListener('click', function() {
  // pause the breathing animation to avoid problems with its loop property [Anime JS]
  breathingBall.pause();
  // then move ball to the bottom [Anime JS]
  anime({
    targets: '.dorothy-ball',
    bottom: '-130px',
    translateX: '-50%',
    translateY: '0%',
    duration: 1200,
    easing: 'easeOutElastic'
  });
  // create a timeline [Anime JS] to chain more animations
  let myTimeline = anime.timeline();

  // if menu isn't open do following:
  if (menuOpen === false) {
    welcomeMessageContainer.style.opacity = 0;
    menuOpen = true;
    // show the menu (small balls)
    showMenu("block");
    // lay out the timeline [Anime JS]
    myTimeline
      .add({
        targets: '.menu-terminal',
        scale: [0, 1],
        offset: '+=500'
      })
      .add({
        targets: '.menu-profile',
        scale: [0, 1],
        offset: '-=950'
      })
      .add({
        targets: '.menu-info',
        scale: [0, 1],
        offset: '-=950'
      })
      .add({
        targets: '.menu-calendar',
        scale: [0, 1],
        offset: '-=950',
        complete: function(){
          if (messageClicked == false) {
            displayMessage();
            welcomeMessageContainer.style.opacity = 1;
          }
        }
      });

  // if menu is open do following:
  } else {
    menuOpen = false;
    // lay out the timeline [Anime JS]
    myTimeline
      .add({
        targets: '.menu-terminal',
        scale: 0.4
      })
      .add({
        targets: '.menu-profile',
        scale: 0.4,
        offset: '-=850'
      })
      .add({
        targets: '.menu-info',
        scale: 0.4,
        offset: '-=850'
      })
      .add({
        targets: '.menu-calendar',
        scale: 0.4,
        offset: '-=850'
      })
      .add({
        targets: '.menu-terminal',
        scale: 0.4,
        translateX: '150%',
        translateY: '400%',
        duration: 300,
        offset: '-=800',
        easing: 'easeInBack'
      })
      .add({
        targets: '.menu-profile',
        scale: 0.4,
        translateX: '100%',
        translateY: '400%',
        duration: 300,
        offset: '-=800',
        easing: 'easeInBack'
      })
      .add({
        targets: '.menu-info',
        scale: 0.4,
        translateX: '-100%',
        translateY: '400%',
        duration: 300,
        offset: '-=800',
        easing: 'easeInBack'
      })
      .add({
        targets: '.menu-calendar',
        scale: 0.4,
        translateX: '-150%',
        translateY: '400%',
        duration: 300,
        offset: '-=800',
        easing: 'easeInBack',
        complete: function(){ // once all of these animations are completed run the following:
          showMenu("none"); // hide the menu
          menuTerminal.style.transform = "translateX(0%) translateY(0%)"; // set translate X and Y of menu buttons back to 0%
          menuProfile.style.transform = "translateX(0%) translateY(0%)"; // set translate X and Y of menu buttons back to 0%
          menuInfo.style.transform = "translateX(0%) translateY(0%)"; // set translate X and Y of menu buttons back to 0%
          menuCalendar.style.transform = "translateX(0%) translateY(0%)"; // set translate X and Y of menu buttons back to 0%
        }
      })
  }
});

// When user clicks on welcome message launch showTerminal() function
welcomeMessageContainer.addEventListener('click', function(){
  showTerminal();
  hideProfile();
  hideInfo();
});

// When user clicks on terminal button in menu launch showTerminal() function
menuTerminal.addEventListener('click', showTerminal);

// When user clicks on profile button in menu ...
menuProfile.addEventListener('click', function(){
  // if profile button is not clicked
  if (menuProfileIsClicked == false) {
    menuProfileIsClicked = true; // set profile button as clicked
    showProfile(); // launch showProfile() function
  } else { // if profile button is clicked
    menuProfileIsClicked = false; // set profile button as unclicked
    hideProfile(); // launch hideProfile() function
  }
});

// When user clicks on flat button in profile modal hide the modal
profileModalBtn.addEventListener('click', function(){
  // launch hideProfile() function
  hideProfile();
  // launch hideInfo() function
  // create another timeline for the menu buttons [anime JS]
  let myTimeline = anime.timeline();
  // display:block on menu
  showMenu('block');
  // set menuOpen switch to true
  menuOpen = true;
  // show menu
  myTimeline
    .add({
      targets: '.menu-terminal',
      scale: [0, 1],
      offset: '+=500'
    })
    .add({
      targets: '.menu-profile',
      scale: [0, 1],
      offset: '-=950'
    })
    .add({
      targets: '.menu-info',
      scale: [0, 1],
      offset: '-=950'
    })
    .add({
      targets: '.menu-calendar',
      scale: [0, 1],
      offset: '-=950'
    });
});

// When user clicks on info button show info modal
menuInfo.addEventListener('click', function(){
  // if (menuInfoIsClicked == false) {
    showInfo();
  // } else {
    // hideInfo();
  // }
});

// When user clicks on info modal hide info modal
infoModalBtn.addEventListener('click', function(){
  hideInfo();
  // create another timeline for the menu buttons [anime JS]
  let myTimeline = anime.timeline();
  // display:block on menu
  showMenu('block');
  // set menuOpen switch to true
  menuOpen = true;
  // show menu
  myTimeline
    .add({
      targets: '.menu-terminal',
      scale: [0, 1],
      offset: '+=500'
    })
    .add({
      targets: '.menu-profile',
      scale: [0, 1],
      offset: '-=950'
    })
    .add({
      targets: '.menu-info',
      scale: [0, 1],
      offset: '-=950'
    })
    .add({
      targets: '.menu-calendar',
      scale: [0, 1],
      offset: '-=950'
    });
});


// function to show action message popup/modal (top right)
function showMessageModal () {
  messageModal.style.display = 'flex';
  anime({
    targets: '#messageModal',
    top: 30,
    opacity: 1
  });
}
// when user clicks on close button of action message popup/modal (top right)
messageModalCloseBtn.addEventListener('click', function(){
  anime({
    targets: '#messageModal',
    top: -60,
    opacity: 0,
    complete: function(){
      messageModal.style.display = 'none';
      messageModal.style.top = '90px';
    }
  });
})

function showTerminal() {
  // set switch back to false so that we can open it with one click
  menuOpen = false;
  // message will no longer appear, terminal is now shown as bg
  messageClicked = true;
  // create another timeline for the menu buttons [anime JS]
  let myTimeline = anime.timeline();
  // fade out effect on welcome message
  welcomeMessageContainer.style.opacity = 0;
  // below triggers animations (first one is the terminal popping up)
  anime({
    targets: '.terminal',
    bottom: 0,
    duration: 1000,
    begin: function(){
      myTimeline
      .add({
        targets: '.menu-terminal',
        scale: 0.4
      })
      .add({
        targets: '.menu-profile',
        scale: 0.4,
        offset: '-=850'
      })
      .add({
        targets: '.menu-info',
        scale: 0.4,
        offset: '-=850'
      })
      .add({
        targets: '.menu-calendar',
        scale: 0.4,
        offset: '-=850'
      })
      .add({
        targets: '.menu-terminal',
        scale: 0.4,
        translateX: '150%',
        translateY: '400%',
        duration: 300,
        offset: '-=800',
        easing: 'easeInBack'
      })
      .add({
        targets: '.menu-profile',
        scale: 0.4,
        translateX: '100%',
        translateY: '400%',
        duration: 300,
        offset: '-=800',
        easing: 'easeInBack'
      })
      .add({
        targets: '.menu-info',
        scale: 0.4,
        translateX: '-100%',
        translateY: '400%',
        duration: 300,
        offset: '-=800',
        easing: 'easeInBack'
      })
      .add({
        targets: '.menu-calendar',
        scale: 0.4,
        translateX: '-150%',
        translateY: '400%',
        duration: 300,
        offset: '-=800',
        easing: 'easeInBack',
        complete: function(){ // once all of these animations are completed run the following (same as earlier):
          welcomeMessageContainer.style.display = "none"; // hides welcome message for good
          showMenu("none");
          menuTerminal.style.transform = "translateX(0%) translateY(0%)";
          menuProfile.style.transform = "translateX(0%) translateY(0%)";
          menuInfo.style.transform = "translateX(0%) translateY(0%)";
          menuCalendar.style.transform = "translateX(0%) translateY(0%)";
        }
      })
    }
  });
}

function showProfile () {
  // hide info modal if opened
  hideInfo();
  // change the status of visibility for the modal
  terminal.setAttribute('data-visibility','false');
  // change the status of visibility for the modal
  profileModal.setAttribute('data-visibility','true');
  fillProfile();
  // show close button (arrow) after modal is fully stretched
  anime({
    targets: '#profile-modal-btn',
    top: 0,
    delay: 800
  });
  menuProfileIsClicked = false;
  // set switch back to false so that we can open it with one click
  menuOpen = false;
  // show hiding background div so user can't click on background
  hidingBgDiv.style.display = "block";
  // create another timeline for the menu buttons [anime JS]
  let myTimeline = anime.timeline();
  // below triggers animations (first one is the terminal popping up)
  profileModal.style.top = 0;
  myTimeline
    .add({
      targets: '.menu-terminal',
      scale: 0.4
    })
    .add({
      targets: '.menu-profile',
      scale: 0.4,
      offset: '-=850'
    })
    .add({
      targets: '.menu-info',
      scale: 0.4,
      offset: '-=850'
    })
    .add({
      targets: '.menu-calendar',
      scale: 0.4,
      offset: '-=850'
    })
    .add({
      targets: '.menu-terminal',
      scale: 0.4,
      translateX: '150%',
      translateY: '400%',
      duration: 300,
      offset: '-=800',
      easing: 'easeInBack'
    })
    .add({
      targets: '.menu-profile',
      scale: 0.4,
      translateX: '100%',
      translateY: '400%',
      duration: 300,
      offset: '-=800',
      easing: 'easeInBack'
    })
    .add({
      targets: '.menu-info',
      scale: 0.4,
      translateX: '-100%',
      translateY: '400%',
      duration: 300,
      offset: '-=800',
      easing: 'easeInBack'
    })
    .add({
      targets: '.menu-calendar',
      scale: 0.4,
      translateX: '-150%',
      translateY: '400%',
      duration: 300,
      offset: '-=800',
      easing: 'easeInBack',
      complete: function(){ // once all of these animations are completed run the following (same as earlier):
        showMenu("none");
        menuTerminal.style.transform = "translateX(0%) translateY(0%)";
        menuProfile.style.transform = "translateX(0%) translateY(0%)";
        menuInfo.style.transform = "translateX(0%) translateY(0%)";
        menuCalendar.style.transform = "translateX(0%) translateY(0%)";
      }
    })
}

// when click on any menu buttons other than profile or on close button of profile modal, launch hideProfile()
function hideProfile () {
  terminal.setAttribute('data-visibility','true'); // change the status of visibility for the modal
  profileModal.setAttribute('data-visibility','false'); // change the status of visibility for the modal
  // hide close button (up arrow) again
  profileModalBtn.style.top = '60px';
  // hide profile modal
  profileModal.style.top = '-120%';
  // hide hiding background div so user can click on background
  hidingBgDiv.style.display = 'none';
  // create another timeline for the menu buttons [anime JS]
  let myTimeline = anime.timeline();
  if (menuOpen == true) {
    // show menu
    myTimeline
        .add({
          targets: '.menu-terminal',
          scale: [0, 1],
          offset: '+=500'
        })
        .add({
          targets: '.menu-profile',
          scale: [0, 1],
          offset: '-=950'
        })
        .add({
          targets: '.menu-info',
          scale: [0, 1],
          offset: '-=950'
        })
        .add({
          targets: '.menu-calendar',
          scale: [0, 1],
          offset: '-=950'
          // complete: function(){
          //   if (messageClicked == false) {
          //     displayMessage();
          //     welcomeMessageContainer.style.opacity = 1;
          //   }
          // }
        });
  }
}

function showInfo () {
  terminal.setAttribute('data-visibility','true');
  // show close button (arrow left) after modal is fully stretched
  anime({
    targets: '#info-modal-btn',
    right: 0,
    delay: 800
  });
  menuInfoIsClicked = true;
  // set switch back to false so that we can open it with one click
  menuOpen = false;
  // show hiding background div so user can't click on background
  // hidingBgDiv.style.display = "block";
  // create another timeline for the menu buttons [anime JS]
  let myTimeline = anime.timeline();
  // below triggers animations (first one is the terminal popping up)
  infoModal.style.left = 0;
  myTimeline
    .add({
      targets: '.menu-terminal',
      scale: 0.4
    })
    .add({
      targets: '.menu-profile',
      scale: 0.4,
      offset: '-=850'
    })
    .add({
      targets: '.menu-info',
      scale: 0.4,
      offset: '-=850'
    })
    .add({
      targets: '.menu-calendar',
      scale: 0.4,
      offset: '-=850'
    })
    .add({
      targets: '.menu-terminal',
      scale: 0.4,
      translateX: '150%',
      translateY: '400%',
      duration: 300,
      offset: '-=800',
      easing: 'easeInBack'
    })
    .add({
      targets: '.menu-profile',
      scale: 0.4,
      translateX: '100%',
      translateY: '400%',
      duration: 300,
      offset: '-=800',
      easing: 'easeInBack'
    })
    .add({
      targets: '.menu-info',
      scale: 0.4,
      translateX: '-100%',
      translateY: '400%',
      duration: 300,
      offset: '-=800',
      easing: 'easeInBack'
    })
    .add({
      targets: '.menu-calendar',
      scale: 0.4,
      translateX: '-150%',
      translateY: '400%',
      duration: 300,
      offset: '-=800',
      easing: 'easeInBack',
      complete: function(){ // once all of these animations are completed run the following (same as earlier):
        showMenu("none");
        menuTerminal.style.transform = "translateX(0%) translateY(0%)";
        menuProfile.style.transform = "translateX(0%) translateY(0%)";
        menuInfo.style.transform = "translateX(0%) translateY(0%)";
        menuCalendar.style.transform = "translateX(0%) translateY(0%)";
      }
    })
}

function hideInfo () {
  terminal.setAttribute('data-visibility','true');
  // hide close button (left arrow) again
  infoModalBtn.style.right = '-60px';
  menuInfoIsClicked = false;
  // hide info modal
  infoModal.style.left = '-120%';
  // hide hiding background div so user can click on background
  // hidingBgDiv.style.display = 'none';
  // create another timeline for the menu buttons [anime JS]
  let myTimeline = anime.timeline();
  if (menuOpen == true) {
  // show menu
  myTimeline
    .add({
      targets: '.menu-terminal',
      scale: [0, 1],
      offset: '+=500'
    })
    .add({
      targets: '.menu-profile',
      scale: [0, 1],
      offset: '-=950'
    })
    .add({
      targets: '.menu-info',
      scale: [0, 1],
      offset: '-=950'
    })
    .add({
      targets: '.menu-calendar',
      scale: [0, 1],
      offset: '-=950'
    });
  }
}


// !!! ADD LINE BELOW TO OPEN LONG ANSWER MODAL WHEN USER CLICKS ON TEXT WITH LINK PROVIDED BY DOROTHY
// [LINKTOCLICK].addEventListener('click', function(){
//   answerModal.style.right = "-20px";
// });

// !!! ADD LINE BELOW TO CLOSE LONG ANSWER MODAL WHEN USER CLICKS ON TEXT WITH LINK PROVIDED BY DOROTHY
longAnswerBtn.addEventListener('click', function(){
  answerModal.style.right = "-120%";
  hidingBgDiv.style.display = "none";
  terminal.setAttribute('data-visibility','true');
});



/*
TERMINAL SCROLL BAR: scroll down automatically when scroll bar appears
_______________________________
*/

let scrollContainer = document.querySelector('.terminal-content');

function scrollDown() {
  // when user presses 'enter' scrollbar scrolls down automatically
  scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

/*
MOUSE TRACKING ANIMATION [OPTIONAL]
_______________________________
*/



/*
WELCOME MESSAGE CENTRE PAGE
_______________________________
*/
function displayMessage () {
  let welcomeMessageSpan = document.querySelector('#welcomeMessageContainer h1 span');
  // array of different messages
  let messageArray = ["wanna talk?", "ask me anything.", "wanna chat?", "can I help you with anything?", "what's up?", "how's it going?"];
  // fetch message from messageArray at random
  let randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
  // what will be displayed once user updated their profile
  // let messageGeneral = 'Hey fellow becoder,' + ' ' + randomMessage;
  // what will be displayed if user hasn't updated their profile
  let messageNoName = 'Hello stranger, I would love to know your name! You can do this by updating your profile page in the menu below.';
  // let messageWithName = 'Hello <span>FETCH NAME IN DB</span>, wanna talk?'; // Use this with DB (check with backend guys) and associate with this an array of more messages like 'it's good to see you again' or 'long time no see'

  // add random message as content in the h1
  welcomeMessageSpan.innerHTML = randomMessage;


  /* TO IMPLEMENT LATER:

  if (USER HAS UPDATED PROFILE) {
    welcomeMessageH1.innerHTML = messageGeneral;
  } else if(USER HAS NOT UPDATED PROFILE) {
    welcomeMessageH1.innerHTML = messageNoName;
  }
  */
}


/*
IDLE MESSAGE CENTRE PAGE [OPTIONAL]
_______________________________
*/

// When user is idle for too long, launch function below:
/*let inactivityTime = function () {
    let t;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer; // catches touchscreen presses
    window.onclick = resetTimer; // catches touchpad clicks
    window.onscroll = resetTimer; // catches scrolling with arrow keys
    window.onkeypress = resetTimer;

    function display() {

    }

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(displayMessage, 3000);
    }
};*/


/*
Particles animation
_______________________________
*/

let resizeReset = function() {
  w = canvasBody.width = window.innerWidth;
  h = canvasBody.height = window.innerHeight;
}

const opts = {
  particleColor: "white",
  lineColor: "white",
  particleAmount: 30,
  defaultSpeed: 0.01,
  variantSpeed: 0.3,
  defaultRadius: 0.5,
  variantRadius: 0.5,
  linkRadius: 200,
};

window.addEventListener("resize", function(){
  deBouncer();
});

let deBouncer = function() {
    clearTimeout(tid);
    tid = setTimeout(function() {
        resizeReset();
    }, delay);
};

let checkDistance = function(x1, y1, x2, y2){
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

Particle = function(xPos, yPos){
  this.x = Math.random() * w;
  this.y = Math.random() * h;
  this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
  this.directionAngle = Math.floor(Math.random() * 360);
  this.color = opts.particleColor;
  this.radius = opts.defaultRadius + Math.random() * opts. variantRadius;
  this.vector = {
    x: Math.cos(this.directionAngle) * this.speed,
    y: Math.sin(this.directionAngle) * this.speed
  };
  this.update = function(){
    this.border();
    this.x += this.vector.x;
    this.y += this.vector.y;
  };
  this.border = function(){
    if (this.x >= w || this.x <= 0) {
      this.vector.x *= -1;
    }
    if (this.y >= h || this.y <= 0) {
      this.vector.y *= -1;
    }
    if (this.x > w) this.x = w;
    if (this.y > h) this.y = h;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  };
  this.draw = function(){
    drawArea.beginPath();
    drawArea.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    drawArea.closePath();
    drawArea.fillStyle = this.color;
    drawArea.fill();
  };
};

function setup(){
  particles = [];
  resizeReset();
  for (let i = 0; i < opts.particleAmount; i++){
    particles.push( new Particle() );
  }
  window.requestAnimationFrame(loop);
}

function loop(){
  window.requestAnimationFrame(loop);
  drawArea.clearRect(0,0,w,h);
  for (let i = 0; i < particles.length; i++){
    particles[i].update();
    particles[i].draw();
  }
}

const canvasBody = document.getElementById("canvas"),
drawArea = canvasBody.getContext("2d");
let delay = 200, tid;
resizeReset();
setup();

/*
----------------------------------------------------------------------
Laurent
----------------------------------------------------------------------
*/

function nl2br(str) {
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
}

function addFirstZero(i) {
  if (i < 10) {
      i = '0' + i;
  }
  return i;
}

function date_time(selector) {
  let date = new Date();
  result = addFirstZero(date.getHours()) + ':' + addFirstZero(date.getMinutes()) + ':' + addFirstZero(date.getSeconds()) + '<br>';
  result += addFirstZero(date.getDate()) + '/' + addFirstZero(date.getMonth() + 1) + '/' + date.getFullYear();
  document.querySelector(selector).innerHTML = result;
  setTimeout('date_time("' + selector + '");', '1000');
  return true;
}

function validateEmail(email) {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

function validateURL(url) {
  let regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
  return regex.test(url);
}

function fillProfile() {

  let inputs = document.querySelectorAll('input');
  let selects = document.querySelectorAll('select');
  let random = Math.round((Math.random() * 100000));

  const axiosAjax = axios.create({
    baseURL: '/',
    timeout: 10000, // 10 sec
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    maxContentLength: 500000, // 500ko
  });

  axiosAjax.get('ajax/?type=getProfile&v=' + random)

  .then( function (response) {

    for (let keyLoop in response.data) { // we loop the main value

      if (typeof response.data[keyLoop] == 'object' && keyLoop == 'meta') { // we check if it's an object (for meta value)

        for (let keyLoopBis in response.data[keyLoop]) { // we loop the meta value
          if (document.querySelector('input[name=' + response.data[keyLoop][keyLoopBis].key + ']') != null) { // we check if an input with the same key exists
            document.querySelector('input[name=' + response.data[keyLoop][keyLoopBis].key + ']').value = response.data[keyLoop][keyLoopBis].value; // we display the value
          }
        }

      } else { // else it's a main value

        if (document.querySelector('input[name=' + keyLoop + ']') != null) { // we check if an input with the same key exists
          document.querySelector('input[name=' + keyLoop + ']').value = response.data[keyLoop]; // we display the value
        }

      }

    };

  })

  .catch( function (error) {
    console.log(error);
  });

}


formProfile.addEventListener('submit', function(e) {

  e.preventDefault();
  let inputs = document.querySelectorAll('input');
  let selects = document.querySelectorAll('select');
  let json = {};
  json.user = {};

  inputs.forEach( function(item) {

    item.classList.remove('error'); // on retire toutes les classes error
    item.setAttribute('data-error-message','');

    if (item.getAttribute('required') != null && item.value == '') {
      item.classList.add('error');
      item.setAttribute('data-error-message','This field is required.')
    }
    if (item.getAttribute('type') === 'text' && item.value.length <= 3) {
      item.classList.add('error');
      item.setAttribute('data-error-message','Your entry is a bit too short')
    }
    if (item.getAttribute('type') === 'url' && item.value.length > 0) {
      if (validateURL(item.value) == false && item.value != '') {
        item.classList.add('error');
        item.setAttribute('data-error-message','This url is not valid.')
      }
    }

    json.user[item.name] = item.value;

  })

  if (document.querySelectorAll('#profile-details .error').length == 0) {

    json.type = 'updateProfile';

    //console.log('No error');
    //console.log(json);
    const axiosAjax = axios.create({
      baseURL: '/',
      timeout: 10000, // 10 sec
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      maxContentLength: 1000000, // 1Mo
    });

    axiosAjax.post('ajax/', {
      formAnswer: JSON.stringify(json)
    })
    .then(function (response) {
      hideProfile();
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  } else {
    console.log('error');
  }

});

/*
----------------------------------------------------------------------
Service workers
----------------------------------------------------------------------
*/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service.workers.js', { scope : '/' }).then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
