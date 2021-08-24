import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `<h1>JavaScript HTML5 APIs</h1> 
<div class='uploader'> 
    <h1>  upload your files 🌟 <h1>
<div class='dropzone'> 📁 drag to upload </div> 
<div class='list'></div>
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
    const list = document.querySelector('.list');
    

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

    function allowedFiles(file) {
        return ['image/png','image/jpeg','image/svg+xml'].includes(file.type)
    }
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        console.log(i);
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    function previewFiles(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const size = file.size/1024
        reader.addEventListener('load',(e)=>{
            const div = document.createElement('div')
            div.innerHTML =`
            <div style="display:flex;">
                <img
                    src="${e.target.result}"
                    alt="${file.name}"
                    style="width: 30px;margin-right:10px; margin-top: 1rem  "
                    />
                    <p>${file.name}</p> <span> ${formatBytes(size)}</span>
            </div>
            `
            list.append(div)
        })
        
    }
    function fileUpload(file) {
        const formData = new FormData();
        [...file].forEach((file)=>formData.append(file.name,file))
        console.log([...formData.entries()]);
        
    }

    function fileHandler(file) {
        const files = [...file].filter(allowedFiles)
        console.log(files);
        files.forEach(previewFiles)
        fileUpload(files)
    }

    dropZone.addEventListener('drop',(e)=>{
        console.log('drop');
        e.target.classList.remove('active');
        e.preventDefault();
        e.stopPropagation();
        const { files } = e.dataTransfer;
        fileHandler(files)
    })

}

document.addEventListener('dragover',(e)=>e.preventDefault());
document.addEventListener('drop',(e)=>e.preventDefault());

if('draggable' in document.createElement('div')){
    init()
}
