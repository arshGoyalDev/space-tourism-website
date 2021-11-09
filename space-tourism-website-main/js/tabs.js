
// ------------------- tabs --------------------- //

const tabList = document.querySelector("[role='tab-list']");
const tabs = document.querySelectorAll("[role='tab']");
let tabFocus = 0;


// event listeners
tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach(tab => {
  tab.addEventListener('click', () => {    
    for (let x of tabs) {
      x.classList.remove('active')
    }
    tab.classList.add('active');
    
    if (tab.parentElement.classList.contains('destination-btn')) {
      document.querySelector('.destination-img img').style.cssText = 'animation: rotation 0.7s linear infinite';
      setTimeout(() => {      
        document.querySelector('.destination-img img').style.cssText = '';
        content(tab.id, 'destination');
      }, 1500);
    } else if (tab.parentElement.classList.contains('crew-dots')) {
      tab.style.cssText = 'animation: size 2s ease-in-out;'
      setTimeout(() => {
        content(tab.id, 'crew');
      }, 1000);
      tab.addEventListener('animationend',() => { tab.style.cssText = ''; });
    } else if (tab.parentElement.classList.contains('tech-tabs')) {
      tab.style.cssText = 'animation: rotation 0.7s linear infinite';
      setTimeout(() => {
        content(tab.id, 'technology');
        tab.style.cssText = '';
      }, 1300)
    }
  })
})

// changing the content
function content(id, name) {
  fetch('../data.json')
  .then(response => response.json())
  .then(data => {
    if (name == 'destination') {
      
      data.destinations.forEach(destination => {
        if (id == destination.name) {
          document.querySelector('.destination-img source').setAttribute('srcset', `.${destination.images.webp}`);
          document.querySelector('.destination-img img').setAttribute('src', `.${destination.images.png}`);
          document.querySelector('.destination-img img').setAttribute('alt', `The ${destination.name}`);
          
          document.querySelector('.destination-content h2').innerHTML = destination.name;
          document.querySelector('.destination-content p').innerHTML = destination.description;
          
          document.querySelector('.distance p').innerHTML = destination.distance;
          document.querySelector('.time p').innerHTML = destination.travel;
        }
      })
    } else if (name == 'crew') {
      
      data.crew.forEach(crew => {
        if (id == crew.role) {
          document.querySelector('.crew-img source').setAttribute('srcset', `.${crew.images.webp}`);
          document.querySelector('.crew-img img').setAttribute('src', `.${crew.images.png}`);
          document.querySelector('.crew-img img').setAttribute('alt', `The ${crew.name}`);
          
          document.querySelector('.crew-details h2').innerHTML = crew.role;
          document.querySelector('.crew-details p').innerHTML = crew.name;
          document.querySelector('.crew-details .p-content').innerHTML = crew.bio;
        }
      })
    } else if (name == 'technology') {

      data.technology.forEach(tech => {
        if (id == tech.name) {
          document.querySelector('.portrait-img').setAttribute('src', `.${tech.images.portrait}`);
          document.querySelector('.landscape-img').setAttribute('src', `.${tech.images.landscape}`);
          document.querySelector('.portrait-img').setAttribute('alt', tech.name);
          document.querySelector('.landscape-img').setAttribute('alt', tech.name);

          document.querySelector('.vehicle-details div p').innerHTML = tech.name;
          document.querySelector('.vehicle-details > p').innerHTML = tech.description;
        }
      })
    }
  })
}


// keyboard control
function changeTabFocus(e) {
  if (e.keyCode === 37 || e.keyCode === 39) {
    tabs[tabFocus].setAttribute("tabindex", -1);
  }
      
  if (e.keyCode === 39) {
    tabFocus++;
    if (tabFocus >= tabs.length) {
        tabFocus = 0;
    }
  } else if (e.keyCode === 37) {
    tabFocus--;
    if (tabFocus < 0) {
      tabFocus = tabs.length - 1;
    }
  }

  if (tabList.classList.contains('tech-tabs')) {
    if (e.keyCode == 40) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
          tabFocus = 0;
      }
    } else if (e.keyCode == 38) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
  }

  tabs[tabFocus].focus();
}