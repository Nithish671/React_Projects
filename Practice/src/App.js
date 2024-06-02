import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Footer from './Footer';
import {Routes, Route} from 'react-router-dom';
import EditPost from './EditPost';
import {useEffect} from 'react';
import {useStoreActions} from 'easy-peasy';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  /* useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if(err.response) {
        //Not in the response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers)
      } else {
        console.log(`Error : ${err.message}`);
      }
      }
    }

    fetchPosts();
  }, []); */

  return (
      <div className="App">
        <Header title="React JS Blog" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home 
            isLoading={isLoading}
            fetchError={fetchError}
          />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer /> 
      </div>
  );
}

export default App;
