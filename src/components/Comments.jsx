import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getCommnetsByRecordId } from "../redux/modules/commentsSlice";
import AddCommentForm from "./AddCommentForm";
import {
  __deleteComment,
  __updateComment,
} from "../redux/modules/commentsSlice";
import {
  clearComment,
  globalEditModeToggle,
  __getComment,
} from "../redux/modules/commentSlice";

const Comments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isShow, setisShow] = useState(false);
  const { data } = useSelector((state) => state.comments.commentsByRecordId);

  useEffect(() => {
    if (isShow) {
      dispatch(__getCommnetsByRecordId(id));
    }
  }, [dispatch, id, isShow]);
  const onDeleteButtonHandler = (recordId, id) => {
    console.log(recordId, id);
    const result = window.confirm("삭제하시겠습니가?");
    if (result) {
      dispatch(__deleteComment({ recordId, commentId: id }));
    } else {
      return;
    }
  };
  return (
    <StContainer isShow={isShow}>
      <StToggleContainer
        onClick={() => {
          setisShow((pre) => !pre);
        }}
      >
        <div>{isShow ? "눌러서 댓글내리기 " : "눌러서 댓글보기  "}</div>
      </StToggleContainer>
      <AddCommentForm />
      <StCommentList>
        {data?.map((comment) => (
          <div key={comment.id}>
            <div>{comment.id}</div>
            {/* <div> 코멘트 아이디</div> */}
            <div>{comment.username}</div>
            <div>{comment.content}</div>
            <button onClick={() => onDeleteButtonHandler(id, comment.id)}>
              {" "}
              삭제
            </button>
          </div>
        ))}
      </StCommentList>
    </StContainer>
  );
};

export default Comments;

const StContainer = styled.div`
  height: ${({ isShow }) => (isShow ? "400px" : "50px")};
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #fff;
  transition: height 400ms ease-in-out;
`;

const StToggleContainer = styled.div`
  height: 50px;
  padding: 0 12px;
  border-top: 1px solid #eee;
`;

const StCommentList = styled.div`
  height: 350px;
  overflow: scroll;
`;
