import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __deleteRecord, __getRecords } from "../redux/modules/recordsSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RecommendContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin: 20px auto;
  /* background-color: green; */
  border: 1px solid black;
  border-radius: 8px;
`;
function RecommendList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, records } = useSelector((state) => state.records);
  const onDeleteHandler = (id) => {
    dispatch(__deleteRecord(id));
  };
  useEffect(() => {
    dispatch(__getRecords());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return (
      <div>
        {error.message}
        <div>에러가 떠버림요</div>
      </div>
    );
  }
  return (
    <div>
      <div color="red" onClick={() => navigate("/Write")}>
        추천하기{" "}
      </div>
      <div>추천목록입니다</div>

      <div>
        {records.map((record) => (
          <RecommendContainer key={record.id}>
            <div onClick={() => navigate(`/RecommendList/${record.id}`)}>
              <div>{record.id} </div> {/*todo : 나중에 지울듯*/}
              <div>{record.title} </div>
              <div>{record.writer} </div>
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                const result = window.confirm("진짜 지움?");
                if (result) {
                  return onDeleteHandler(record.id);
                } else {
                  return;
                }
              }}
            >
              삭제하기
            </button>
          </RecommendContainer>
        ))}
      </div>
    </div>
  );
}

export default RecommendList;
