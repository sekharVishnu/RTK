import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const users = useSelector(selectAllUsers);
  const onDataChange = (e) => {
    switch (e.target.name) {
      case "postTitle":
        setState((state) => ({ ...state, title: e.target.value }));
        break;
      case "postContent":
        setState((state) => ({ ...state, content: e.target.value }));
        break;
      case "postAuthor":
        setState((state) => ({ ...state, userId: e.target.value }));
        break;
      default:
        return state;
    }
  };
  const canSave =
    Boolean(state.title) && Boolean(state.content) && Boolean(state.userId);
  const savePost = (e) => {
    e.preventDefault();
    if (state.title && state.content && state.userId) {
      dispatch(postAdded(state.title, state.content, state.userId));
      setState({
        title: "",
        content: "",
        userId: "",
      });
    }
  };
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>Add a new Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={state.title}
          onChange={onDataChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={state.userId}
          name="postAuthor"
          onChange={onDataChange}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={state.content}
          onChange={onDataChange}
        />
        <button onClick={savePost} type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
