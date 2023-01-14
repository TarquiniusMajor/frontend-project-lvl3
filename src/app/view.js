/* const postsHandler = (postsList, domPostsElement) => {

};
const feedlistHandler = (feedList, domFeedsElement) => {

}; */
const statusHandler = (value, state, { statusBar }) => {
  const dispatcher = {
    ready: () => {
      statusBar.classList.remove('text-danger');
      statusBar.classList.add('text-success');
      statusBar.textContent = 'RSS успешно загружен';
    },
    pending: () => {},
    error: () => {
      statusBar.classList.add('text-danger');
      statusBar.textContent = state.formState.error;
    },
  };
  return dispatcher[value]();
};

export default (path, value, previousValue, state, domObjects) => {
  const dispatcher = {
    'formState.status': statusHandler,
  };
  return dispatcher[path] ? dispatcher[path](value, state, domObjects) : console.log('none');
};
