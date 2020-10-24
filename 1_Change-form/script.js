document.forms.change_form.onsubmit = (e) => {
  e.preventDefault();
  const sum = +document.getElementById('sum').value;
  const price = +document.getElementById('price').value;
  if (price > sum) {
    alert("You don't have enough money");
  }
  const change = (sum - price).toFixed(2);
  const dollars = change.split('.')[0];
  const cents = change.split('.')[1];
  const centsNominal = nominals(cents);

  const changeOutput = document.getElementById('change');
  changeOutput.innerHTML = 'Your change is: ';
  changeOutput.innerHTML += `${
    change.split('.')[0] <= 0 ? '' : change.split('.')[0] + ' dollars,'
  } ${
    change.split('.')[1] < 10
      ? change.split('.')[1][1] + ' cents'
      : change.split('.')[1] + ' cents'
  }`;

  const nominalsOutput = document.getElementById('nominals');
  nominalsOutput.innerHTML = 'By nominal value: ';
  nominalsOutput.innerHTML += `${dollars <= 0 ? '' : dollars + ' dollars'}
    ${nominalString(centsNominal, 50)} 
    ${nominalString(centsNominal, 25)} 
    ${nominalString(centsNominal, 10)} 
    ${nominalString(centsNominal, 5)} 
    ${nominalString(centsNominal, 1)}  `;

  document.getElementById('sum').value = 0;
  document.getElementById('price').value = 0;
};

function nominals(cents) {
  let value = cents;
  const nom = { 50: 0, 25: 0, 10: 0, 5: 0, 1: 0 };
  if (value >= 50) {
    nom[50]++;
    value -= 50;
  }
  if (value >= 25) {
    nom[25]++;
    value -= 25;
  }
  if (value >= 10) {
    let trace = value / 10;
    while (trace >= 1) {
      nom[10]++;
      trace--;
    }
    value = value - nom[10] * 10;
  }
  if (value >= 5) {
    nom[5]++;
    value -= 5;
  }
  if (value < 5) {
    while (value > 0) {
      nom[1]++;
      value--;
    }
  }
  return nom;
}

function nominalString(centsNominal, value) {
  return `${
    centsNominal[value] > 0 ? centsNominal[value] + 'x' + value + 'cent' : ''
  } `;
}
