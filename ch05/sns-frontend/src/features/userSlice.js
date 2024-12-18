import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const userSlice = createSlice({
   name: 'user',
   initialState: {
      user: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {},
})

export default userSlice.reducer
