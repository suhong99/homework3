import { useEffect, useState } from "react";
// import axios from "axios";
import {
  // __getRecords,
  __addRecord,
  clearRecord,
} from "../redux/modules/recordsSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const GoBack = styled.button`
  border: 1px solid rgb(221, 221, 221);
  height: 40px;
  width: 120px;
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  cursor: pointer;
`;
function Write() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSuccess = useSelector((state) => state.records.isSuccess);
  const { isLoading, error } = useSelector((state) => state.records);

  const [record, setRecord] = useState({
    title: "",
    content: "",
    writer: "",
  }); //editable로 주려고 했었는데, 그냥 toolkit isSuccess로 처리함
  const goBack = () => {
    navigate(-1);
  };
  // const onSubmitHandler = async (record) => {
  //   await axios.post("http://localhost:3001/records", record);
  // };

  useEffect(() => {
    if (!isSuccess) return;
    if (isSuccess) navigate("/RecommendList");
    return () => dispatch(clearRecord());
  }, [dispatch, isSuccess, navigate]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setRecord({
      ...record,
      [name]: value, //[name]이 문법이 잘 이해가 안됨
    });
  };

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <GoBack onClick={goBack}> 이전으로 </GoBack>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            record.content.trim() === "" ||
            record.title.trim() === "" ||
            record.writer.trim() === ""
          ) {
            return alert("모든 항목 입력해주셈~");
          }

          dispatch(__addRecord(record));
        }}
      >
        <div>
          <h2>작성자</h2>
          <input
            type="text"
            name="writer"
            onChange={onChangeHandler}
            placeholder="작성자 이름 5내로"
            maxLength={5}
          />
        </div>
        <div>
          <h2> 제목 </h2>
          <textarea
            type="text"
            placeholder="제목은 20글자까지지~"
            maxLength={20}
            onChange={(ev) => {
              const { value } = ev.target;
              setRecord({
                ...record,
                title: value,
              });
            }}
          />
        </div>

        <div>
          <h2>내용</h2>
          <textarea
            type="text"
            placeholder="내용은 200글자까지지~"
            rows="20"
            maxLength={200}
            onChange={(ev) => {
              const { value } = ev.target;
              setRecord({
                ...record,
                content: value,
              });
            }}
          />
          <button>추가하기</button>
        </div>
      </form>
    </div>
  );
}

export default Write;
