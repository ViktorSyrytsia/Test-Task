//Here we ask user, how much cells he/she wants in each row, and how this cells will name
//Then we run tableGenerator func. and pass cellsArray as argument
document.getElementById('create_table').onclick = () => {
  //I push # like a firs cell, cos its default cell for every table
  const cellsArray = ['#'];
  const count = prompt('How many cells, you want to add?', 0);
  for (let index = 0; index < count; index++) {
    cellsArray.push(prompt(`Name of ${index + 1} cell`));
  }
  if (cellsArray.length === 1) {
    return null;
  }
  // I push this two empty value to create addition cells for edit and delete button
  cellsArray.push('');
  cellsArray.push('');
  tableGenerator(cellsArray);
};

//In this func. we create table and mount it to the root element in out template
//To create table header we use headerCreator func.
//In the end of table we add button to add new rows to the table;
//By clicking on this button you can call modal window, were you can create new row
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
  addRowButton.className = 'btn btn-info mt-2 mb-5';
  addRowButton.innerHTML = 'Add new row';
  addRowButton.onclick = () => {
    addNewRowModal(cellsArray, body);
  };
  const deleteTableButton = document.createElement('button');
  deleteTableButton.className = 'btn btn-danger mt-2 mb-5 ml-2';
  deleteTableButton.innerHTML = 'Delete table';
  deleteTableButton.onclick = () => {
    container.remove();
  };

  container.appendChild(addRowButton);
  container.appendChild(deleteTableButton);

  document.getElementById('root').appendChild(container);
}

//This func we use in tableGenerator func. to create table header
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
//This func we call to add a new rows to the table
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
  form.action = '#';
  //Here we create all inputs for our form. Base on our cells which we tap before
  cellsArray.forEach((element, index) => {
    if (index > 0 && element !== '') {
      const label = document.createElement('label');
      label.htmlFor = element;
      label.innerHTML = element + ' :';
      label.className = 'mt-3';
      const input = document.createElement('input');
      input.id = element;
      input.minLength = '2';
      input.maxLength = '25';
      input.required = true;
      if (input.id === 'email') {
        input.type = 'email';
        input.name = 'email';
        input.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$';
      }
      if (input.id === 'date') {
        const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        input.value = date;
        input.style.display = 'none';
      }
      if (label.htmlFor === 'date') {
        label.style.display = 'none';
      }
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
  okButton.className = 'btn btn-success mt-3';
  okButton.innerHTML = 'OK';
  okButton.type = 'submit';
  form.onsubmit = (e) => {
    e.preventDefault();
    //Create new row, base on all inputs, by calling rowCreator func.
    const cells = [body.childElementCount + 1];
    for (const iterator of form) {
      if (iterator.value !== '') {
        cells.push(iterator.value);
      }
    }
    cells.push('edit');
    cells.push('delete');
    rowCreator(cells, body);
    modal.style.backgroundColor = 'rgba(25,25,25,0.0)';
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  };
  noButton.className = 'btn btn-danger';
  noButton.innerHTML = 'NO';
  noButton.type = 'button';
  noButton.onclick = () => {
    modal.style.backgroundColor = 'rgba(25,25,25,0.0)';
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  };
  form.appendChild(okButton);
  modalFooter.appendChild(noButton);
  modalContent.appendChild(modalFooter);

  document.body.appendChild(modal);
}

//Here we create row with two additional button: edit and delete
function rowCreator(cells, body) {
  const row = document.createElement('tr');
  for (let i = 0; i < cells.length; ++i) {
    row.appendChild(document.createElement('td'));
    if (cells[i] === 'edit') {
      const editButton = document.createElement('button');
      editButton.innerHTML = 'edit';
      editButton.className = 'btn btn-warning btn-sm';
      editButton.onclick = (e) => {
        editRow(e);
      };
      row.cells[i].appendChild(editButton);
    } else if (cells[i] === 'delete') {
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'delete';
      deleteButton.className = 'btn btn-danger btn-sm';
      deleteButton.onclick = (e) => {
        deleteRow(e);
      };
      row.cells[i].appendChild(deleteButton);
    } else {
      row.cells[i].appendChild(document.createTextNode(cells[i]));
    }
  }
  body.appendChild(row);
}

//This func we use on deleteRow button
function deleteRow(e) {
  const target = e.target.parentNode;
  target.parentNode.remove();
}

//This func we use on editRow button
function editRow(e) {
  const target = e.target.parentNode;
  const row = target.parentNode;
  const rowCells = row.children;
  for (let i = 1; i < rowCells.length; i++) {
    if (
      rowCells[i].innerText !== 'edit' &&
      rowCells[i].innerText !== 'delete'
    ) {
      rowCells[i].innerText = prompt(
        `Put a new value for ${rowCells[i].innerText}`,
        rowCells[i].innerText
      );
    }
  }
}
