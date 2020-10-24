document.getElementById('create_modal').onclick = () => {
  createModal();
};
document.getElementById('create_multi').onclick = () => {
  for (let index = 0; index < 3; index++) {
    createModal({
      top: `${Math.random() * 500}px`,
      left: `${Math.random() * 500}px`,
      right: `${Math.random() * 500}px`,
      bottom: `${Math.random() * 500}px`,
    });
  }
};

function createModal(position) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'block';
  modal.style.opacity = '0';
  modal.style.transition = 'all 0.3s';
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.style.backgroundColor = 'rgba(25,25,25,0.6)';
  }, 30);

  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog';
  modalDialog.style.position = 'absolute';
  modalDialog.style.width = '175rem';
  if (position) {
    modalDialog.style.top = position.top;
    modalDialog.style.left = position.left;
    modalDialog.style.right = position.right;
    modalDialog.style.bottom = position.bottom;
  } else {
    modalDialog.style.top = '50%';
    modalDialog.style.left = '50%';
    modalDialog.style.transform = 'translate(-50%,-50%)';
  }
  modal.appendChild(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalDialog.appendChild(modalContent);

  const modalHeader = document.createElement('div');
  const header = document.createElement('h5');
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'close';
  closeButton.innerHTML = 'x';
  closeButton.onclick = () => {
    modal.style.backgroundColor = 'rgba(25,25,25,0.0)';
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  };
  modalHeader.className = 'modal-header';
  header.className = 'modal-title';
  header.innerHTML = 'Modal title';
  modalHeader.appendChild(header);
  modalHeader.appendChild(closeButton);
  modalContent.appendChild(modalHeader);

  const modalBody = document.createElement('div');
  const text = document.createElement('p');
  modalBody.className = 'modal-body';
  text.innerHTML = 'Modal body text...';
  modalBody.appendChild(text);
  modalContent.appendChild(modalBody);

  const modalFooter = document.createElement('div');
  const okButton = document.createElement('button');
  const noButton = document.createElement('button');
  const closeAllButton = document.createElement('button');
  modalFooter.className = 'modal-footer';
  okButton.className = 'btn btn-success';
  okButton.innerHTML = 'OK';
  okButton.type = 'button';
  okButton.onclick = () => {
    createModal();
  };
  noButton.className = 'btn btn-danger';
  noButton.innerHTML = 'Close';
  noButton.type = 'button';
  noButton.onclick = () => {
    modal.style.backgroundColor = 'rgba(25,25,25,0.0)';
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  };
  closeAllButton.className = 'btn btn-warning';
  closeAllButton.innerHTML = 'Close all';
  closeAllButton.type = 'button';
  closeAllButton.onclick = () => {
    const allModal = document.querySelectorAll('.modal');
    for (const iterator of allModal) {
      iterator.style.backgroundColor = 'rgba(25,25,25,0.0)';
      iterator.style.opacity = '0';
      setTimeout(() => iterator.remove(), 300);
    }
  };
  modalFooter.appendChild(okButton);
  modalFooter.appendChild(noButton);
  modalFooter.appendChild(closeAllButton);
  modalContent.appendChild(modalFooter);

  document.body.appendChild(modal);
}
