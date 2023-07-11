import React, { useState, useEffect } from "react";

import classes from "./index.module.css";

import Posts from "../../Posts/index";
import Button from "../../Button/index";
import Input from "../../Input";

const state = {
  posts: [],
  allPosts: [],
  page: 0,
  postPerPage: 4,
  searchValue: "",
};

function Home() {
  const [postsObj, setPostList] = useState(state);

  const loadPosts = async () => {
    const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url };
    });

    const { page, postPerPage } = state;

    setPostList({
      posts: postAndPhotos.slice(page, postPerPage),
      allPosts: postAndPhotos,
      page: page,
      postPerPage: postPerPage,
      searchValue: "",
    });
  };

  // Call posts
  useEffect(() => {
    loadPosts();
  }, []);

  const loadNavigationPosts = (event) => {
    event.preventDefault();

    const { posts, allPosts, page, postPerPage } = postsObj;

    let nextPage = page + postPerPage;

    let nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    let tempPostPerPage = postPerPage;

    posts.push(...nextPosts);

    setPostList((prevState) => ({
      posts: posts,
      page: nextPage,
      allPosts: prevState.allPosts,
      postPerPage: tempPostPerPage,
    }));
  };

  const searchEventsByTitleHandler = (event) => {
    // Load posts
    const { value } = event.target;

    setPostList((prevState) => ({
      posts: prevState.posts,
      page: prevState.page,
      allPosts: prevState.allPosts,
      postPerPage: prevState.postPerPage,
      searchValue: value,
    }));
  };

  const { posts, allPosts, searchValue } = postsObj;

  let buttonDisable = posts.length >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;
  /*
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((postsRes) => setPostList(postsRes));
  */

  return (
    <section className={classes.container}>
      <Input
        type="text"
        value={searchValue}
        onChangeHandler={searchEventsByTitleHandler}
      />

      {filteredPosts.length !== 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && (
        <p className={classes.emptyPosts}>Não existem Posts!!!</p>
      )}

      {!searchValue && (
        <Button
          disabled={buttonDisable}
          onClickHandler={loadNavigationPosts}
          text="Load More Posts"
        />
      )}
    </section>
  );
}

export default Home;
