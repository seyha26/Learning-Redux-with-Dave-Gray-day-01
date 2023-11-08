import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPostsError,
  fetchPosts,
  getPostsStatus,
  selectPostIds,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from "./postsSlice";

const PostsList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  const orderedPostIds = useSelector(selectPostIds);
  // useEffect(() => {
  //   if (postsStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postsStatus, dispatch]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
    console.log(orderedPostIds);
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return <section>{content}</section>;
};

export default PostsList;
