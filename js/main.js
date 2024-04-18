/*Структура каждого объекта должна быть следующей:
1)
id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
2)
url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
3)
description, строка — описание фотографии. Описание придумайте самостоятельно.
4)
likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
5)
comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

{
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}

a) id — любое число. Идентификаторы не должны повторяться.

b)Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

c)Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
d)
Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.*/
const PHOTO_COUNT = 25;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const AVATARS_COUNT = 6;
const PHOTO_DESCRIPTIONS = [
  'Весна',
  'Лето на море',
  'Осень в Пушкине',
  'Русская зима',
  'Новогодний праздник',
  'Огни большого города',
  'Выставка художников-передвижников',
  'Соревнования по лыжам',
  'Любимые котики',
  'Русские святки',
  'Северное сияние за городом',
  'Банкет в ресторане',
  'Последний звонок в школе',
  'Парк развлечений',
  'Аквапарк',
  'Мягкие лапки',
  'Восход на Ладоге',
  'Закат на Фонтанке',
  'Михайловский замок',
  'Сирень на Марсовом поле',
  'Нева и белые ночи',
  'Ансамбль Смольного монастыря',
  'Стрелка Васильевского острова',
  'Парк в Приютино',
  'Плотина на Пороховых'
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Сергей',
  'Андрей',
  'Алексей',
  'Максим',
  'Евгений',
  'Иван',
  'София',
  'Анна',
  'Мария',
  'Ева',
  'Виктория',
  'Алиса'
];

//Получение случайного целого числа в заданном интервале, включительно
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Поиск случайного элемента в переданном массиве.
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getIdGenerator = () => {
  let lastCreatedId = 0;

  return () => {
    lastCreatedId += 1;
    return lastCreatedId;
  };
};

const creatCommentId = getIdGenerator();

const creatMessage = () =>
  Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(COMMENTS)).join(' ');

//Создание комментария
const creatComment = () => ({
  id: creatCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: creatMessage(),
  name: getRandomArrayElement(NAMES),
});

//const getCountComments = getRandomInteger(1, 10);

const getListComments = () => {
  const getCountComments = getRandomInteger(1, 10);
  const comments = Array.from({length: getCountComments}, creatComment);
  return comments;
};

