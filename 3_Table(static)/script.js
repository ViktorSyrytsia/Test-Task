document.getElementById('add').onclick = (e) => {
  createModal(e.target.innerHTML);
};

function createModal(title) {
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
  modal.appendChild(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalDialog.appendChild(modalContent);

  const modalHeader = document.createElement('div');
  const header = document.createElement('h5');
  const closeCrossButton = document.createElement('button');
  closeCrossButton.type = 'button';
  closeCrossButton.className = 'close';
  closeCrossButton.innerText = 'x';
  closeCrossButton.onclick = () => {
    modal.style.backgroundColor = 'rgba(25,25,25,0.0)';
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  };
  modalHeader.className = 'modal-header';
  header.className = 'modal-title';
  header.innerHTML = title;
  modalHeader.appendChild(header);
  modalHeader.appendChild(closeCrossButton);
  modalContent.appendChild(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';

  const form = document.createElement('form');
  form.className = 'd-flex flex-column';
  form.name = 'row';

  const inputName = document.createElement('input');
  inputName.className = 'mb-3';
  inputName.type = 'text';
  inputName.required = true;
  const inputSurname = document.createElement('input');
  inputSurname.className = 'mb-3';
  inputSurname.type = 'text';
  inputSurname.required = true;
  const inputEmail = document.createElement('input');
  inputEmail.className = 'mb-3';
  inputEmail.type = 'email';
  inputEmail.required = true;

  const labelName = document.createElement('label');
  labelName.innerText = 'Name:';
  const labelSurname = document.createElement('label');
  labelSurname.innerText = 'Surname:';
  const labelEmail = document.createElement('label');
  labelEmail.innerText = 'Email:';

  form.append(
    labelName,
    inputName,
    labelSurname,
    inputSurname,
    labelEmail,
    inputEmail
  );
  modalBody.appendChild(form);

  modalContent.appendChild(modalBody);

  const modalFooter = document.createElement('div');
  const okButton = document.createElement('button');
  const closeButton = document.createElement('button');

  modalFooter.className = 'modal-footer';

  okButton.className = 'btn btn-success';
  okButton.innerText = 'OK';
  okButton.type = 'submit';

  closeButton.className = 'btn btn-danger mt-2';
  closeButton.innerText = 'Close';
  closeButton.type = 'button';
  closeButton.onclick = () => {
    modal.style.backgroundColor = 'rgba(25,25,25,0.0)';
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  };

  form.appendChild(okButton);
  form.appendChild(closeButton);

  form.onsubmit = (e) => {
    e.preventDefault();
    const inputValues = [];
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    for (const iterator of form) {
      if (iterator.value !== '') {
        inputValues.push(iterator.value);
      }
    }
    inputValues.push(date);
    rowCreator(inputValues);
    modal.style.backgroundColor = 'rgba(25,25,25,0.0)';
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  };

  modalContent.appendChild(modalFooter);

  document.body.appendChild(modal);
}

function rowCreator(values) {
  const row = document.createElement('tr');
  for (let i = 0; i < values.length; i++) {
    row.appendChild(document.createElement('td'));
    row.cells[i].appendChild(document.createTextNode(values[i]));
  }
  const tableBody = document.getElementById('body');
  tableBody.appendChild(row);
}
