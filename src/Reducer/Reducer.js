import {createSlice} from '@reduxjs/toolkit';
export const postSlice = createSlice({
  name:'posts',
  initialState : [],
  reducers:{
    addPost:(state,action)=>{state.push(action.payload);},
    setPosts: (state,action)=>{return action.payload},
    updateLikes: (state,action)=>{
      const index=state.findIndex(post=>post.id===action.payload.id);
      if(index !== -1){
        state[index]=action.payload;
      }
    }
  },
});
export const {addPost,setPosts,updatePost}=postSlice.actions;
export default postSlice.reducer