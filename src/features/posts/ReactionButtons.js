import { useDispatch } from "react-redux";
import { selectPostByIds, useAddReactionMutation } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😲",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButton = ({ post }) => {
  console.log("reactionButtons");
  const [addReaction] = useAddReactionMutation();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="reactionButton"
      onClick={() => {
        const newValue = post.reactions[name] + 1;
        addReaction({
          ...post,
          postId: post.id,
          reactions: { ...post.reactions, [name]: newValue },
        });
      }}
    >
      {emoji} {post.reactions[name]}
    </button>
  ));
  return <div>{reactionButtons}</div>;
};

export default ReactionButton;
