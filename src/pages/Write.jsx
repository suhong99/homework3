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
    console.log(record);
    console.log("record");
    const { data } = await axios.post("http://localhost:3001/records", record);
    console.log(data);
    console.log("data");
    console.log("records");
    console.log(records);
    //성공을 했을 때 response.data로 날라옴.. 리스폰스안의 데이터만 가져오겠다. 안 쓰면 response.data로 들어옴
    setRecords([...records, data]);
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
        {" "}
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
