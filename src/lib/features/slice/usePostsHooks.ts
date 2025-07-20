import { useAppSelector } from '../../hooks';
import { selectAllPosts, getPostsStatus, getPostsError, selectSelectedPost, getSelectedStatus } from './postsSlice';

export const usePostsState = () => {
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  return { posts, status, error };
};

export const useSelectedPostState = () => {
  const selectedPost = useAppSelector(selectSelectedPost);
  const selectedStatus = useAppSelector(getSelectedStatus);

  return { selectedPost, selectedStatus };
};
