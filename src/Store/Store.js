import {configureStore} from '@reduxjs/toolkit'
import postReducer from '../Reducer/Reducer'

export const store=configureStore({
  reducer:{
    posts:postReducer
  },
});
export default store;