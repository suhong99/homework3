import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  __getRecord,
  clearRecord,
  __updateRecord,
} from "../redux/modules/recordsSlice";
import Comments from "../components/Comments";

// import axios from "axios";
// const DtBox = styled.div`
//   margin: 20px auto;
//   padding: 0 24px;
//   width: 600px;
//   /* height: 400px; */
//   border: 1px solid rgb(238, 238, 238);
//   display: flex;
//   flex-direction: column;
//   -webkit-box-pack: justify;
//   justify-content: flex-start;
//   flex-wrap: nowrap;
//   gap: 20px;
// `;

// const DtConHead = styled.div`
//   display: flex;
//   height: 80px;
//   -webkit-box-pack: justify;
//   justify-content: space-between;
//   -webkit-box-align: center;
//   align-items: center;
// `;

// const GoBack = styled.button`
//   border: 1px solid rgb(221, 221, 221);
//   height: 40px;
//   width: 120px;
//   background-color: rgb(255, 255, 255);
//   border-radius: 12px;
//   cursor: pointer;
// `;
// const DetailTitle = styled.div`
//   display: block;
//   font-size: 2em;
//   margin-block-start: 0.67em;
//   margin-block-end: 0.67em;
//   margin-inline-start: 0px;
//   margin-inline-end: 0px;
//   font-weight: bold;
// `;

function Detail() {
  const dispatch = useDispatch();

  const param = useParams();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.records);
  // const records = useSelector((state) => state.records.records);
  // const detail = records.find((detail) => detail.id === parseInt(param.id)); //새로고침 시에는 바로 뜨지 않음. 그래서 옵셔널 체이닝 써야함.
  const [isEditMode, setIsEditMode] = useState(false);
  // console.log(records.content);
  const [updatedRecord, setUpdatedRecord] = useState("");
  const record = useSelector((state) => state.records.record);
  useEffect(() => {
    dispatch(__getRecord(param.id));
    return () => dispatch(clearRecord());
  }, [dispatch, param.id]);
  useEffect(() => {
    setUpdatedRecord(record.content);
  }, [record]);

  const onEditdableHandler = async (detail) => {
    if (updatedRecord.trim() === "") {
      return alert("입력 내용 없습니다.");
    }
    dispatch(__updateRecord({ ...record, content: updatedRecord }));
    setIsEditMode(false);
  };

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {!isEditMode && (
        <StTodoHeader>
          <div>id: ({record?.id})</div>
          <div
            size="24"
            onClick={() => {
              navigate(-1);
            }}
          >
            이전으로
          </div>
        </StTodoHeader>
      )}

      <div size="32" fw="700">
        {record?.title}
      </div>
      <StBody>
        {isEditMode ? (
          <>
            <Textarea
              name="content"
              rows="10"
              maxLength={200}
              value={updatedRecord}
              onChange={(event) => {
                setUpdatedRecord(event.target.value);
              }}
            />
          </>
        ) : (
          <div>{record?.content}</div>
        )}

        <StButtonGroup>
          {isEditMode ? (
            <div>
              <button onClick={onEditdableHandler}>저장</button>
              <button
                onClick={() => {
                  setIsEditMode(false);
                }}
              >
                취소
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsEditMode(true);
              }}
            >
              수정
            </button>
          )}
        </StButtonGroup>
      </StBody>
      {!isEditMode && <Comments />}
    </div>
  );
}

export default Detail;

const StTodoHeader = styled.div`
  div:nth-child(2) {
    text-decoration: underline;
    color: teal;
    cursor: pointer;
  }
  margin-bottom: 32px;
`;

const StBody = styled.div`
  margin-top: 50px;
  min-height: 550px;
  div {
    line-height: 1.5;
  }
`;

const StButtonGroup = styled.div`
  width: 100%;
  gap: 12px;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
`;
