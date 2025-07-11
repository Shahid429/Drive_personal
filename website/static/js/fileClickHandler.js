// Updated for grid view
function openFolder() {
    let path = (getCurrentPath() + '/' + this.getAttribute('data-id') + '/').replaceAll('//', '/');
    const auth = getFolderAuthFromPath();
    if (auth) path += '&auth=' + auth;
    window.location.href = '/?path=' + path;
}

function openFile() {
    const fileName = this.getAttribute('data-name').toLowerCase();
    let path = '/file?path=' + this.getAttribute('data-path') + '/' + this.getAttribute('data-id');
    
    if (fileName.endsWith('.mp4') || fileName.endsWith('.mkv') || 
        fileName.endsWith('.webm') || fileName.endsWith('.mov') || 
        fileName.endsWith('.avi') || fileName.endsWith('.ts') || 
        fileName.endsWith('.ogv')) {
        path = '/stream?url=' + getRootUrl() + path;
    }
    
    window.open(path, '_blank');
}

// Add context menu functionality
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.file-card')) {
        e.preventDefault();
        const fileCard = e.target.closest('.file-card');
        const id = fileCard.getAttribute('data-id');
        const isFolder = fileCard.querySelector('.folder-icon') !== null;
        
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.top = `${e.pageY}px`;
        menu.style.left = `${e.pageX}px`;
        
        menu.innerHTML = `
            <div class="menu-item" id="rename-${id}"><i class="fas fa-edit"></i> Rename</div>
            <div class="menu-item" id="download-${id}"><i class="fas fa-download"></i> Download</div>
            ${isFolder ? 
                `<div class="menu-item" id="share-${id}"><i class="fas fa-share-alt"></i> Share</div>` : 
                `<div class="menu-item" id="share-${id}"><i class="fas fa-share-alt"></i> Get Link</div>`}
            <div class="menu-item" id="trash-${id}"><i class="fas fa-trash"></i> Move to Trash</div>
        `;
        
        document.body.appendChild(menu);
        
        // Add event listeners
        document.getElementById(`rename-${id}`).addEventListener('click', renameFileFolder);
        document.getElementById(`trash-${id}`).addEventListener('click', trashFileFolder);
        document.getElementById(`share-${id}`).addEventListener('click', isFolder ? shareFolder : shareFile);
        
        // Close menu when clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', closeContextMenu);
        }, 10);
    }
});

function closeContextMenu() {
    const menu = document.querySelector('.context-menu');
    if (menu) menu.remove();
    document.removeEventListener('click', closeContextMenu);
}

// Rename function
function renameFileFolder() {
    const id = this.id.split('-')[1];
    const fileCard = document.querySelector(`.file-card[data-id="${id}"]`);
    const currentName = fileCard.querySelector('.file-name').textContent;
    
    document.getElementById('rename-name').value = currentName;
    document.getElementById('bg-blur').style.opacity = '1';
    document.getElementById('rename-file-folder').style.opacity = '1';
    document.getElementById('rename-file-folder').style.pointerEvents = 'all';
    document.getElementById('rename-file-folder').setAttribute('data-id', id);
    
    setTimeout(() => {
        document.getElementById('rename-name').focus();
    }, 100);
}

// Other functions remain the same with minor adjustments for new UI