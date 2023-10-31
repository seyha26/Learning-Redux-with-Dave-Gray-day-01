import PostsList from "./features/posts/PostsList";
import AddNewPost from "./features/posts/AddNewPost";

function App() {
  return (
    <main className="App">
      <AddNewPost />
      <PostsList />
    </main>
  );
}

export default App;
