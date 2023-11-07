import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, selectPostById, updatePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const users = useSelector(selectAllUsers);

  const [requestState, setRequestStatus] = useState("idle");
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);
  const [userId, setUserId] = useState(post.userId);

  const usersOptions = users.map((user) => (
    <option value={user.id}>{user.name}</option>
  ));

  const canSave =
    [title, content, userId].every(Boolean) && requestState === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: Number(postId),
            title,
            body: content,
            reactions: post.reactions,
            userId,
          })
        );
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (error) {
        console.log(error.message);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = () => {
    dispatch(deletePost({ id: Number(postId) }));
    navigate("/");
  };

  const onAuthorChange = (e) => setUserId(e.target.value);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" defaultValue={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content: </label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button type="button" onClick={onDeletePostClicked}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;