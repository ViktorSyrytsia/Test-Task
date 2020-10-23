document.getElementById('submit').onclick = () => {
  const change =
    document.getElementById('sum').value -
    document.getElementById('price').value;
  const rest = change.toFixed(2);
  const centes = rest.split('.')[1];

  alert(
    `${rest.split('.')[0] <= 0 ? '' : rest.split('.')[0] + ' dollars,'} ${
      rest.split('.')[1] < 10
        ? rest.split('.')[1][1] + ' centes'
        : rest.split('.')[1] + ' centes'
    }`
  );
};

function nominals(centes) {
  const nom = { 50: 0, 25: 0, 10: 0, 5: 0, 1: 0 };
  if (centes >= 50) {
    nom[50]++;
    centes -= 50;
  }
  if (centes >= 25) {
    nom[25]++;
    centes -= 25;
  }
  if (centes >= 10) {
    const trace = (centes / 10).toFixed(0);
    let couter = trace;
    while (couter > 0) {
      nom[10]++;
      couter--;
    }
    centes = centes - trace * 10;
  }
  if (centes >= 5) {
    nom[5]++;
    centes -= 5;
  }
  if (vacenteslue < 5) {
    while (centes > 0) {
      nom[1]++;
      centes--;
    }
  }
  return nom;
}
