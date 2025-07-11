// Updated to work with grid view
function showDirectory(data) {
    data = data['contents'];
    const grid = document.getElementById('files-grid');
    grid.innerHTML = '';
    const isTrash = getCurrentPath().startsWith('/trash');

    // Sort folders and files
    let entries = Object.entries(data);
    let folders = entries.filter(([key, value]) => value.type === 'folder');
    let files = entries.filter(([key, value]) => value.type === 'file');

    folders.sort((a, b) => new Date(b[1].upload_date) - new Date(a[1].upload_date));
    files.sort((a, b) => new Date(b[1].upload_date) - new Date(a[1].upload_date));

    // Add folders
    folders.forEach(([key, item]) => {
        const folderCard = document.createElement('div');
        folderCard.className = 'file-card';
        folderCard.setAttribute('data-id', item.id);
        folderCard.setAttribute('data-path', item.path);
        folderCard.innerHTML = `
            <div class="folder-icon">
                <i class="fas fa-folder"></i>
            </div>
            <div class="file-name">${item.name}</div>
            <div class="file-info">${formatDate(item.upload_date)}</div>
            <div class="file-badge">Folder</div>
        `;
        folderCard.addEventListener('dblclick', openFolder);
        grid.appendChild(folderCard);
    });

    // Add files
    files.forEach(([key, item]) => {
        const fileCard = document.createElement('div');
        fileCard.className = 'file-card';
        fileCard.setAttribute('data-id', item.id);
        fileCard.setAttribute('data-path', item.path);
        fileCard.setAttribute('data-name', item.name);
        
        const fileIcon = getFileIcon(item.name);
        const size = convertBytes(item.size);
        
        fileCard.innerHTML = `
            <div class="file-icon">
                <i class="${fileIcon}"></i>
            </div>
            <div class="file-name">${item.name}</div>
            <div class="file-info">${size} • ${formatDate(item.upload_date)}</div>
            ${item.size > 2000000000 ? '<div class="file-badge">Large</div>' : ''}
        `;
        fileCard.addEventListener('dblclick', openFile);
        grid.appendChild(fileCard);
    });
}

// Helper function to get file icon
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
        return 'fas fa-file-image';
    } else if (['mp4', 'mkv', 'mov', 'avi', 'flv'].includes(ext)) {
        return 'fas fa-file-video';
    } else if (['pdf'].includes(ext)) {
        return 'fas fa-file-pdf';
    } else if (['doc', 'docx'].includes(ext)) {
        return 'fas fa-file-word';
    } else if (['xls', 'xlsx'].includes(ext)) {
        return 'fas fa-file-excel';
    } else if (['ppt', 'pptx'].includes(ext)) {
        return 'fas fa-file-powerpoint';
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
        return 'fas fa-file-archive';
    } else if (['mp3', 'wav', 'flac', 'aac'].includes(ext)) {
        return 'fas fa-file-audio';
    } else {
        return 'fas fa-file';
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Search form
document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('file-search').value;
    if (query === '') return;
    window.location = '/?path=/search_' + encodeURI(query);
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    if (getPassword() === null && !getCurrentPath().includes('/share_')) {
        document.getElementById('bg-blur').style.opacity = '1';
        document.getElementById('get-password').style.opacity = '1';
        document.getElementById('get-password').style.pointerEvents = 'all';
    } else {
        getCurrentDirectory();
    }
});