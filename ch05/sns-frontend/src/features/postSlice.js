import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, updatePost, deletePost, getPostById, getPosts } from '../api/snsApi'

export const createPostThunk = createAsyncThunk(
   'posts/createPost',
   async (postData, { rejectWithValue }) => {
      try {
         const response = await createPost(postData)
         return response.data.post
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
      }
   }
)
export const updatePostThunk = createAsyncThunk(
   'post/updatePost',
   async (data, { rejectWithValue }) => {
      const { id, postData } = data
      try {
         const response = await updatePost(id, postData)
         return response.data.post
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 수정 실패')
      }
   }
)
export const deletePostThunk = createAsyncThunk(
   'posts/deletePost',
   async (id, { rejectWithValue }) => {
      try {
         await deletePost(id)
         return id
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
      }
   }
)
export const fetchPostByIdThunk = createAsyncThunk(
   'posts/getPostById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await getPostById(id)
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
      }
   }
)
export const fetchPostsThunk = createAsyncThunk(
   'posts/getPosts',
   async (page, { rejectWithValue }) => {
      try {
         const response = await getPosts(page)
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
      }
   }
)
const postSlice = createSlice({
   name: 'posts',
   initialState: {
      posts: [],
      post: null,
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(updatePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updatePostThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updatePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deletePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deletePostThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deletePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(fetchPostByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload.post
         })
         .addCase(fetchPostByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(fetchPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.pagination = action.payload.pagination
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
