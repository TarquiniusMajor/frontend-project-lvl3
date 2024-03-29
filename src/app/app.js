import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import view from './view.js';

const domObjects = {
  feedList: document.querySelector('.feeds'),
  postsList: document.querySelector('.posts'),
  form: document.querySelector('form'),
  statusBar: document.querySelector('.feedback'),
};
// state operations
const state = {
  feedList: [], // { feedId, name, url, }
  postsList: [], // { postId, feedId, postUrl }
  formState: {
    status: 'filling', // statuses: filling/pending/ready/error
    value: '',
    error: null,
  },
};
// i18next
i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: {
        success: 'RSS успешно загружен',
        urlError: 'Ссылка должна быть валидным URL',
        noRssError: 'Ресурс не содержит валидный RSS',
        alreadyAdded: 'RSS уже существует',
        networkError: 'Ошибка сети',
        emptyError: 'Не должно быть пустым',
        view: 'Просмотр',
      },
    },
  },
});

yup.setLocale({
  string: {
    url: i18next.t('urlError'),
  },
  mixed: {
    notOneOf: i18next.t('alreadyAdded'),
  },
});

// State watcher
function stateCallBack(path, value, previousValue) {
  console.log(path);
  view(path, value, previousValue, this, domObjects);
}
const watchedState = onChange(state, stateCallBack);

// main elements

// Controllers
const addFeedController = (url, currentState, schema, event) => {
  currentState.formState.status = 'pending';
  return schema.validate(url)
    .then(() => {
      currentState.feedList.push(url);
    })
    .then(() => {
      event.target.reset();
      currentState.formState.status = 'ready';
      currentState.formState.value = '';
      currentState.formState.error = null;
    })
    .catch((err) => {
      currentState.formState.error = err.message;
      currentState.formState.status = 'error';
    });
};
// Validation
const schema = yup.lazy(() => yup.string().url().notOneOf(state.feedList));
// Mocks for client-server

// Client-server operations

// Controllers attachment
domObjects.form.addEventListener('submit', (e) => {
  e.preventDefault();
  watchedState.formState.value = e.target['url-input'].value;
  return addFeedController(watchedState.formState.value, watchedState, schema, e);
});
