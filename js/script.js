const max = 326;

// window.addEventListener('DOMContentLoaded', ()=>{
//   $('#education').addClass('new againNew rohit');
// })

// new Waypoint({
//   element: document.getElementById("profile-img"),
//   handler: function () {
//     $("#profile-img").addClass("animated fadeIn");
//   },
//   offset: "50%",
// });


let skills = document.getElementsByClassName('skill');
for(let i=0; i< skills.length; i++){
  new Waypoint({
    element: skills[i],
    handler: function(){
      let progress = this.element.querySelector('svg').getAttribute('data-progress')/100;
      this.element.querySelector('.progress-ring__circle').setAttribute('style', 'stroke-dashoffset: ' + -(max + progress*max) + "px");
    },
    offset: '50%'
  })
}

/* Skill waypoint */
// new Waypoint({
//   element: document.getElementById()
// })



let domElement = function (selector) {
  this.selector = selector || null;
  this.element = null;
};

domElement.prototype.init = function () {
  // Return element or creaete element
  switch (this.selector[0]) {
    case "<": {
      // create element
      let matches = this.selector.match(/<([\w-]*)>/);
      if (matches == null || matches == undefined) {
        throw "Invaid selector / Node";
        return false;
      }
      let nodeName = matches[0].replace("<", "").replace(">", "");
      this.element = document.createElement(nodeName);
      break;
    }
    default:
      this.element = document.querySelector(this.selector);
  }
};
domElement.prototype.val = function (newVal) {
  return newVal !== undefined
    ? (this.element.value = newVal)
    : this.element.value;
};
domElement.prototype.append = function (html) {
  this.element.innerHTML = this.element.innerHTML + html;
};
domElement.prototype.prepend = function (html) {
  this.element.innerHTML = html + this.element.innerHTML;
};
domElement.prototype.html = function (html) {
  if (html === undefined) {
    return this.element.innerHTML;
  }
  this.element.innerHTML = html;
};
domElement.prototype.addClass = function(className){
  let classList = this.element.className.split(' ');
  if(classList.indexOf(className) == -1){
    classList.push(className);
  }
/*   let newList = className.split(' ');
  newList.forEach(element => {
    if(classList.indexOf(element) == -1){
      classList.push(element);
    }
  }); */
  this.element.className = classList.join(' ');
}
domElement.prototype.toggleClass = function(className){
  let classList = this.element.className.split(' ');
  if(classList.indexOf(className) == -1){
    classList.push(className);
  }else{
    classList[classList.indexOf(className)] = '';
  }
/* For multiple classes
  let newList = className.split(' ');
  newList.forEach(element => {
    let index = classList.indexOf(element);
    if(index == -1){
      classList.push(element);
    }else{
      classList[index] = '';
    }
  }); */
  TimeRanges.element.className = classList.join(' ');
}
domElement.prototype.removeClass = function(className) {
  let classList = this.element.className.split(' ');
  if(classList.indexOf(className) != -1){
    classList[classList.indexOf(className)] = '';
  }
  this.element.className = classList.join(' ');
}
$ = function(selector){
  var el = new domElement(selector); // new domElement
  el.init(); // initialize the domElement
  return el; //return the domELement
 }


