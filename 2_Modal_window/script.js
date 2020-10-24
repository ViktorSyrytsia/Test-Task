document.getElementById('create_modal').onclick = () => {
  createModal();
};

document.getElementById('create_multi_modal').onclick = () => {
  const count = prompt('How many windows?', 0);
};

const createModal = (windowCount) => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'block';
  modal.style.opacity = '0';
  modal.style.transition = 'all 0.3s';
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.style.backgroundColor = 'rgba(25,25,25,0.8)';
  }, 30);
  if (windowCount > 1) {
  } else {
    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';
    modal.appendChild(modalDialog);
  }

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
  modalFooter.className = 'modal-footer';
  okButton.className = 'btn btn-success';
  okButton.innerHTML = 'OK';
  okButton.type = 'button';
  okButton.onclick = () => {
    alert('Hello from modal');
  };
  noButton.className = 'btn btn-danger';
  noButton.innerHTML = 'NO';
  noButton.type = 'button';
  noButton.onclick = () => {
    modal.style.backgroundColor = 'rgba(25,25,25,0.0)';
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  };
  modalFooter.appendChild(okButton);
  modalFooter.appendChild(noButton);
  modalContent.appendChild(modalFooter);

  document.body.appendChild(modal);
};
