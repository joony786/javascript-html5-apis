import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `<h1>JavaScript HTML5 APIs</h1> 
<div draggable></div> 
<div class='dropZone'> drop here</div>`;

const init = () => {}

console.dir(document.createElement('div'))

if('draggable' in document.createElement('div')){
    init()
}

