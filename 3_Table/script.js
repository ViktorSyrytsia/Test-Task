function tableGenerator(cellsArray) {
  const container = document.createElement('div');

  const table = document.createElement('table');
  table.className = 'table';

  const header = document.createElement('thead');
  header.appendChild(headerCreator(cellsArray));
  table.appendChild(header);

  const body = document.createElement('tbody');
  table.appendChild(body);

  container.appendChild(table);

  const addRowButton = document.createElement('button');
  addRowButton.className = 'btn btn-info';
  addRowButton.innerHTML = 'Add new row';
  addRowButton.onclick = () => {
    addNewRowModal(cellsArray, body);
  };

  container.appendChild(addRowButton);

  document.getElementById('root').appendChild(container);
}

function headerCreator(arr) {
  const headerRow = document.createElement('tr');
  arr.forEach((element) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.innerHTML = element;
    headerRow.appendChild(th);
  });
  return headerRow;
}

function addNewRowModal(cellsArray, body) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'block';
  modal.style.opacity = '0';
  modal.style.transition = 'all 0.3s';
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.style.backgroundColor = 'rgba(25,25,25,0.8)';
  }, 30);

  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog';
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
  header.innerHTML = 'Add new row';
  modalHeader.appendChild(header);
  modalHeader.appendChild(closeButton);
  modalContent.appendChild(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  const form = document.createElement('form');
  form.className = 'd-flex flex-column';
  form.name = 'new_row';
  cellsArray.forEach((element, index) => {
    if (index > 0) {
      const label = document.createElement('label');
      label.htmlFor = element;
      label.innerHTML = element.toUpperCase() + ':';
      label.className = 'mt-3';
      const input = document.createElement('input');
      input.id = element;
      form.appendChild(label);
      form.appendChild(input);
    }
  });
  modalBody.appendChild(form);
  modalContent.appendChild(modalBody);

  const modalFooter = document.createElement('div');
  const okButton = document.createElement('button');
  const noButton = document.createElement('button');
  modalFooter.className = 'modal-footer';
  okButton.className = 'btn btn-success';
  okButton.innerHTML = 'OK';
  okButton.type = 'button';
  okButton.onclick = () => {
    const cells = ['#'];
    const form = document.forms.new_row;
    for (const iterator of form) {
      cells.push(iterator.value);
    }
    rowCreator(cells, body);
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
}

document.getElementById('create_table').onclick = () => {
  const cellsArray = ['#'];
  const count = prompt('How many cells, you want to add?', 0);
  for (let index = 0; index < count; index++) {
    cellsArray.push(prompt(`Name of ${index + 1} cell`));
  }
  tableGenerator(cellsArray);
};

function rowCreator(cells, body) {
  const row = document.createElement('tr');
  for (let i = 0; i < cells.length; ++i) {
    row.appendChild(document.createElement('td'));
    row.cells[i].appendChild(document.createTextNode(cells[i]));
  }
  body.appendChild(row);
}
