import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios';
import { RootState } from '../../store';
import { NewPost, Post, UpdatePost } from '../../definitions';

const POSTS_URL = '/posts';

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedPost: Post | null;
  selectedStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
  selectedPost: null,
  selectedStatus: 'idle',
};

// --- ASYNC THUNKS ---

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axiosInstance.get(POSTS_URL);
  return response.data;
});

export const fetchPostBySlug = createAsyncThunk('posts/fetchPostBySlug', async (slug: string) => {
  const response = await axiosInstance.get(`${POSTS_URL}/${slug}`);
  return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (values: Omit<NewPost, 'slug'>, { dispatch }) => {
  await axiosInstance.post(POSTS_URL, values);
  await dispatch(fetchPosts());
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ slug, values }: { slug: string; values: Omit<UpdatePost, 'slug'> }, { dispatch }) => {
  const response = await axiosInstance.put(`${POSTS_URL}/${slug}`, values);
  await dispatch(fetchPosts());
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (slug: string, { dispatch }) => {
  await axiosInstance.delete(`${POSTS_URL}/${slug}`);
  await dispatch(fetchPosts());
});

// --- SLICE ---

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSelectedPost(state) {
      state.selectedPost = null;
      state.selectedStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch posts';
      })

      // Fetch single post by slug
      .addCase(fetchPostBySlug.pending, (state) => {
        state.selectedStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        state.selectedStatus = 'succeeded';
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostBySlug.rejected, (state, action) => {
        state.selectedStatus = 'failed';
        state.error = action.error.message ?? 'Failed to fetch post';
      })

      // Add new post
      .addCase(addNewPost.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to add post';
      })

      // Update post
      .addCase(updatePost.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
        state.selectedStatus = 'succeeded';
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.selectedStatus = 'failed';
        state.error = action.error.message ?? 'Failed to update post';
      })

      // Delete post
      .addCase(deletePost.fulfilled, (state) => {
        state.selectedPost = null;
        state.selectedStatus = 'idle';
        state.status = 'succeeded';
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to delete post';
      });
  },
});

// --- SELECTORS ---
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;
export const selectSelectedPost = (state: RootState) => state.posts.selectedPost;
export const getSelectedStatus = (state: RootState) => state.posts.selectedStatus;

export const { clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
