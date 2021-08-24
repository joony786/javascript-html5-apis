
import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `<h1>JavaScript HTML5 APIs</h1> 
<div class='uploader'> 
<div id='source' class='dragme' draggable='true'></div>
<div class='dropzone'> drag here!</div> 
</div>

<style>
.uploader{
    box-sizing: border-box;
    max-width: 90%;
    border-radius: 10px;
    border-bottom: 3px solid #d2d5da;
    margin: 25px auto;
    padding: 25px;
    background : #fff
}

.dragme {
    background: #ce1f;
    border-radius: 5px;
    width: 50px;
    height: 50px;
}
.dropzone {
    border-radius: 5px;
    margin-top: 25px;
    padding: 25px;
    border: 2px dashed #d2d;
    background: #f1f2f5
}
.active {
    background: #ebfff6;
    border: 2px dashed #24b373;
}
</style>
`;

const init = () => {
    const dropZone = document.querySelector('.dropzone');
    const dragme = document.querySelector('.dragme');

    dragme.addEventListener('dragstart',(e)=>{
        e.dataTransfer.setData('text/plain',e.target.id);
    })

    dropZone.addEventListener('dragenter',(e)=>{    
        e.target.classList.add('active');
        console.log('DragEnter: ',e);
    })
    dropZone.addEventListener('dragleave',(e)=>{
        e.target.classList.remove('active');
        console.log('DragLeave: ',e);
    })

    dropZone.addEventListener('dragover',(e)=>{
        console.log(e.dataTransfer);
        e.dataTransfer.dropEffect = 'move';
        console.log('dragging....');
        e.preventDefault();

    })

    dropZone.addEventListener('drop',(e)=>{
        console.log('drop');
        e.target.classList.remove('active');
        const id = e.dataTransfer.getData('text/plain');
        const element = document.getElementById(id);
        dropZone.append(element);
        e.preventDefault();
        e.stopPropagation();
    })

}



if('draggable' in document.createElement('div')){
    init()
}




