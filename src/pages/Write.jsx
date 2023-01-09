import { useEffect, useState } from "react";
import axios from "axios";
function Write() {
  const [record, setRecord] = useState({
    title: "",
    content: "",
    writer: "",
  });
  const [records, setRecords] = useState(null);
  const fetchRecords = async () => {
    const { data } = await axios.get("http://localhost:3001/records");
    setRecords(data);
  };
  const onSubmitHandler = async (record) => {
    const { data } = await axios.post("http://localhost:3001/records", record);

    setRecords([...records, data]); //값을 set에 저장해야지 보낼 수 있음
  };

  useEffect(() => {
    fetchRecords();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler(record);
      }}
    >
      <div>
        <h2>작성자</h2>
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setRecord({
              ...record,
              writer: value,
            });
          }}
        />
      </div>
      <div>
        <h2> 제목 </h2>
        <input
          type="text"
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
        {" "}
        <h2>내용</h2>
        <input
          type="text"
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
  );
}

export default Write;
