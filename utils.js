export function joinTemplate(arr, templateFn, join = false) {
  const newArr = arr.map(el => templateFn(el));

  if (join) return newArr.join('');
  return newArr;
}

export function renderHTML(parentEl, HTML, position, clear = false) {
  clear ? (parentEl.innerHTML = '') : false;
  return parentEl.insertAdjacentHTML(position, HTML);
}

export function getData(url) {
  return new Promise((res, rej) => {
    fetch(url)
      .then(res => res.json())
      .then(data => res(data));
  });
}

export function findUsingId(arr, condition) {
  let found;

  for (let i = 0; i < arr.length; i++) {
    if (condition(arr[i])) {
      found = arr[i];
      break;
    }
  }

  return found;
}

export function deleteById(arr, condition) {
  const newArr = [...arr];
  for (let i = 0; i < newArr.length; i++) {
    if (condition(arr[i])) {
      newArr.splice(i, 1);
      break;
    }
  }
  return newArr;
}
