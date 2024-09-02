var curComic = null;
var nextComic = null;
var prevComic = null;
var derp = null;

function setComic(elem) {
  var imgElem = document.querySelector('img#comic');
  var videoElem = document.querySelector('video#animation');
  if (curComic) {
    curComic.classList.remove('active'); 
  }
  elem.classList.add('active');
  
  if (!elem.href.includes('.mp4')) {
    // image file
    videoElem.style.display = 'none';
    imgElem.style.display = 'block';
    imgElem.src = elem.href;    
    videoElem.innerHTML = '';
    videoElem.load();
  } else {
    // video file
    imgElem.style.display = 'none';
    videoElem.style.display = 'block';
    videoElem.innerHTML = '';
    var source = document.createElement('source');
    source.src = elem.href;
    videoElem.appendChild(source);
    videoElem.load();
    videoElem.play();
    // videoElem.querySelector('source').src = elem.href;
  }
  
  curComic = elem;
  prevComic = getComic(elem.parentElement.previousElementSibling);
  nextComic = getComic(elem.parentElement.nextElementSibling);
}

function getComic(elem) {
  if (elem) {
    return elem.querySelector('a');
  }
  return null;
}

function gotoPrev() {
  setComic(prevComic);
}

function gotoNext() {
  setComic(nextComic);
}

document.querySelectorAll('#comics a').forEach((elem) => {
  elem.addEventListener('click', e => {
    e.preventDefault();
    setComic(elem); 
  })
});

document.addEventListener('DOMContentLoaded', () => {
  setComic(document.querySelector('#comics a'));
  
  document.querySelector('img#comic').addEventListener('click', (event) => {    
    derp = event;
    var x = event.pageX - event.target.offsetLeft;
    var area = (x < event.target.width / 2 ? 'Left' : 'Right');
    
    if (area == 'Left') {
      if (prevComic) {
        gotoPrev(); 
      }
    } else {
      if (nextComic) {
        gotoNext(); 
      }
    }
  });
  
  document.querySelector('a#prev').addEventListener('click', (e) => {
    e.preventDefault();
    gotoPrev();
  });

 document.querySelector('a#next').addEventListener('click', (e) => {
    e.preventDefault();
    gotoNext();
  });
})