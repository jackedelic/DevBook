import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getPost } from "../../actions/post.action";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";

// This component is wrapped directly in a Router, so it's got match prop. We need it to get the :id from url.
const Post = ({ dispatch, post: { post, loading }, match }) => {
  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [dispatch]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to all posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ post: state.post });
export default connect(mapStateToProps)(Post);
