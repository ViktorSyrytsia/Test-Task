document.forms.change_form.onsubmit = (e) => {
  e.preventDefault();
  const change =
    document.getElementById('sum').value -
    document.getElementById('price').value;
  const rest = change.toFixed(2);
  const cents = rest.split('.')[1];
  const nom = nominals(cents);
  console.log(nom);

  alert(
    `${rest.split('.')[0] <= 0 ? '' : rest.split('.')[0] + ' dollars,'} ${
      rest.split('.')[1] < 10
        ? rest.split('.')[1][1] + ' cents'
        : rest.split('.')[1] + ' cents'
    }`
  );
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
    const trace = (value / 10).toFixed(0);
    let couter = trace;
    while (couter > 0) {
      nom[10]++;
      couter--;
    }
    value = value - trace * 10;
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
