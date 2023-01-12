import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState[""];
  const handler = (e) => {
    setValue(e.target.value);
    // setRecord 레코드에 값을 줄려면 setRecord가 이 훅안에 있어야하지 않나요?
  };
  return [value, handler];
};

export default useInput;
