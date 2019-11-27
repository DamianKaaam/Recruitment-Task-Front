import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './users/reducers';
import postsReducer from './posts/reducers';
import commentsReducer from './comments/reducers';

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppState = ReturnType<typeof rootReducer>
