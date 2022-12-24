import _ from 'lodash';
/*
const state = {
    feedList: [], // { feedId, name, feedUrl, }
    postsList: [], // { postId, feedId, postUrl, isLoaded }
    formState: {
        status: 'filling', //statuses: filling/pending/ready/error
        value: '',
        errorsList: [],
    },
};
*/

const postsHandler = (postsList, domPostsElement) => {

};
const feedlistHandler = (feedList, domFeedsElement) => {

};
const statusHandler = (value, state, { statusBar }) => {
    const dispatcher = {
        'ready': () => {
            statusBar.className = 'text-success';
            statusBar.textContent = 'RSS успешно загружен';
        },
        'pending': () => {},
        'error': () => {
            statusBar.className = 'text-danger';
            statusBar.textContent = state.formState.error;
        },
    }
    return dispatcher[value]();
};

export default function (path, value, previousValue, state, domObjects) {
    const dispatcher = {
        'formState.status': statusHandler,
    }
    return dispatcher[path] ? dispatcher[path](value, state, domObjects) : console.log('none');
};
