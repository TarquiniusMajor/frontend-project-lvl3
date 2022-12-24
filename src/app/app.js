//RSS успешно загружен, RSS уже существует, Не должно быть пустым, Ссылка должна быть валидным URL, Ресурс не содержит валидный RSS, Просмотр, Ошибка сети

import view from './view.js';
import * as yup from "yup";
import onChange from "on-change";
import i18next from "i18next";


const domObjects = {
    feedList: document.querySelector('.feeds'),
    postsList: document.querySelector('.posts'),
    form: document.querySelector('form'),
    statusBar: document.querySelector('.feedback'),
};
//state operations
const state = {
    feedList: [], // { feedId, name, url, }
    postsList: [], // { postId, feedId, postUrl }
    formState: {
        status: 'filling', //statuses: filling/pending/ready/error
        value: '',
        error: null,
    },
};
//i18next
i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
        ru: {
            translation: {
                "success": 'RSS успешно загружен',
                "urlError": 'Ссылка должна быть валидным URL',
                "noRssError": 'Ресурс не содержит валидный RSS',
                "alreadyAdded": 'RSS уже существует',
                "networkError": 'Ошибка сети',
                "emptyError": 'Не должно быть пустым',
                "view": 'Просмотр',
            }
        }
    }
});

yup.setLocale({
    string: {
        url: i18next.t('urlError'),
    },
    mixed: {
        notOneOf: i18next.t('alreadyAdded'),
    },
});

//State watcher
const watchedState = onChange(state, function (path, value, previousValue) {
    console.log(path)
    view(path, value, previousValue, this, domObjects)
});

//main elements


//Controllers
const addFeedController = (url, state, schema, event) => {
    state.formState.status = 'pending';
    return schema.validate(url)
        .then(() => {
            state.feedList.push(url)
        })
        .then(() => {
            event.target.reset();
            state.formState.status = 'ready';
            state.formState.value = '';
            state.formState.error = null;
        })
        .catch((err) => {
            state.formState.error = err.message;
            state.formState.status = 'error';
        })
};
//Validation
const schema = yup.lazy(() => yup.string().url().notOneOf(state.feedList));
//Mocks for client-server

//Client-server operations

//Controllers attachment
domObjects.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.formState.value = e.target['url-input'].value;
    return addFeedController(watchedState.formState.value, watchedState, schema, e);
});


