import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, checkAuthStatus } from '../api/snsApi'

// 회원가입 thunk
export const registerUserThunk = createAsyncThunk(
   'auth/registerUser',
   async (userData, { rejectWithValue }) => {
      try {
         const response = await registerUser(userData)
         return response.data.user
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '회원가입 실패')
      }
   }
)

/* rejectWithValue : 에러 메세지를 rejected에 action.payload로 전달할때 사용 
rejectWithValue 사용시 에러에 더 구체적인 내용을 담을 수 있음 */

export const loginUserThunk = createAsyncThunk(
   'auth/loginUser',
   async (credentials, { rejectWithValue }) => {
      try {
         const response = await loginUser(credentials)
         return response.data.user
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '로그인 실패')
      }
   }
)

export const logoutUserThunk = createAsyncThunk(
   'auth/logoutUser',
   async (_, { rejectWithValue }) => {
      try {
         const response = await logoutUser()
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '로그아웃 실패')
      }
   }
)

export const checkAuthStatusThunk = createAsyncThunk(
   'auth/checkAuthStatus',
   async (_, { rejectWithValue }) => {
      try {
         const response = await checkAuthStatus()
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || '상태 확인 실패')
      }
   }
)

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      // 서버에서 가져오는 데이터가 배열일때만 []로 초기값을 주고 나머지는 null로 준다
      // null은 주로 문자열, json 객체 데이터 일때 사용
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 회원가입
      builder
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(registerUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(loginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isAuthenticated = true
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(logoutUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = null
            state.isAuthenticated = false
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user || null
            state.isAuthenticated = action.payload.isAuthenticated
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
            state.isAuthenticated = false
         })
   },
})

export default authSlice.reducer
