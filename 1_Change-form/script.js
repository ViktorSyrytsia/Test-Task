document.forms.change_form.onsubmit = (e) => {
  e.preventDefault();
  const sum = document.getElementById('sum').value;
  const price = document.getElementById('price').value;
  if (price > sum) {
    alert("You don't have enough money");
  }
  const change = (sum - price).toFixed(2);
  const cents = change.split('.')[1];
  const centsNominal = nominals(cents);
  console.log(centsNominal);
  const dollars = change.split('.')[0];

  const changeOutput = document.getElementById('change');
  changeOutput.innerHTML = 'Your change is: ';
  changeOutput.innerHTML += `${
    change.split('.')[0] <= 0 ? '' : change.split('.')[0] + ' dollars,'
  } ${
    change.split('.')[1] < 10
      ? change.split('.')[1][1] + ' cents'
      : change.split('.')[1] + ' cents'
  }`;

  nominalsOutput = document.getElementById('nominals');
  nominalsOutput.innerHTML = 'By nominal value: ';
  nominalsOutput.innerHTML += `${dollars <= 0 ? '' : dollars + ' dollars'}
    ${centsNominal[50] > 0 ? centsNominal[50] + 'x50cent' : ''} 
    ${centsNominal[25] > 0 ? centsNominal[25] + 'x25cent' : ''} 
    ${centsNominal[10] > 0 ? centsNominal[10] + 'x10cent' : ''} 
    ${centsNominal[5] > 0 ? centsNominal[5] + 'x5cent' : ''} 
    ${centsNominal[1] > 0 ? centsNominal[1] + 'x1cent' : ''} `;

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
