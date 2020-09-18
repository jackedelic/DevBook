import React, { Fragment } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post.action";

const PostItem = ({
  auth,
  post: { _id, user, text, name, avatar, likes, comments, date },
  dispatch,
  showActions,
}) => {
  return (
    <Container className="border rounded my-1 py-2">
      <Row>
        <Col xs={2} className="text-center justify-content-center">
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </Col>
        <Col>
          <p className="my-1">{text}</p>
          <p className="small">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {showActions && (
            <Fragment>
              <Button
                onClick={(e) => dispatch(addLike(_id))}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-up"></i>{" "}
                {likes.length > 0 && <span>{likes.length}</span>}
              </Button>
              <Button
                onClick={(e) => dispatch(removeLike(_id))}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-down"></i>
              </Button>
              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion{" "}
                {comments.length > 0 && (
                  <span className="comment-count">{comments.length}</span>
                )}
              </Link>
              {!auth.loading && auth.user._id === user && (
                <Button
                  onClick={(e) => dispatch(deletePost(_id))}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i>
                </Button>
              )}
            </Fragment>
          )}
        </Col>
      </Row>
    </Container>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PostItem);
