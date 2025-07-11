// Updated to work with new UI elements
document.getElementById('new-button').addEventListener('click', () => {
    document.getElementById('new-upload').style.zIndex = '1';
    document.getElementById('new-upload').style.opacity = '1';
});

// Close new upload when clicking outside
document.addEventListener('click', (e) => {
    const newUpload = document.getElementById('new-upload');
    if (!e.target.closest('#new-button') && !e.target.closest('#new-upload')) {
        newUpload.style.opacity = '0';
        setTimeout(() => {
            newUpload.style.zIndex = '-1';
        }, 300);
    }
});

// File upload button
document.getElementById('file-upload-btn').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

// Folder creation
document.getElementById('new-folder-btn').addEventListener('click', () => {
    document.getElementById('new-folder-name').value = '';
    document.getElementById('bg-blur').style.opacity = '1';
    document.getElementById('create-new-folder').style.opacity = '1';
    document.getElementById('create-new-folder').style.pointerEvents = 'all';
    setTimeout(() => {
        document.getElementById('new-folder-name').focus();
    }, 100);
});

// URL upload
document.getElementById('url-upload-btn').addEventListener('click', () => {
    document.getElementById('remote-url').value = '';
    document.getElementById('bg-blur').style.opacity = '1';
    document.getElementById('new-url-upload').style.opacity = '1';
    document.getElementById('new-url-upload').style.pointerEvents = 'all';
    setTimeout(() => {
        document.getElementById('remote-url').focus();
    }, 100);
});

// Modal close functions
function closeModal(modalId) {
    document.getElementById('bg-blur').style.opacity = '0';
    document.getElementById(modalId).style.opacity = '0';
    setTimeout(() => {
        document.getElementById(modalId).style.pointerEvents = 'none';
        document.getElementById('bg-blur').style.pointerEvents = 'none';
    }, 300);
}

// Close modals when clicking on background
document.getElementById('bg-blur').addEventListener('click', () => {
    closeModal('create-new-folder');
    closeModal('rename-file-folder');
    closeModal('new-url-upload');
    closeModal('get-password');
    closeModal('file-uploader');
});

// Add close handlers to all cancel buttons
document.querySelectorAll('[id$="-cancel"]').forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.closest('.modal').id;
        closeModal(modalId);
    });
});