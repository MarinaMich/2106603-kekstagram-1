const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

async function load (route, errorText, method = Method.GET, body = null, onSuccess, onError) {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {method, body});
    if (!response.ok) {
      onError();
      //throw new Error();
    }
    //return response.json();
    onSuccess(response.json());
  } catch {
    //throw new Error(errorText);
    onError(errorText);
  }
}

const getData = (onSuccess, onError) => load(Route.GET_DATA, ErrorText.GET_DATA, onSuccess, onError);

const sendData = (body, onSuccess, onError) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body, onSuccess, onError);

export {getData, sendData};
