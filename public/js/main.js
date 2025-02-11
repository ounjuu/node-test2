fetch("/userinfo")
  .then((response) => response.json()) // 서버에서 JSON 데이터 가져옴
  .then((data) => {
    let base_data = JSON.parse(localStorage.getItem("data") || "[]"); // 기존 localStorage 데이터 불러오기
    base_data.push(data); // 새 데이터 추가
    localStorage.setItem("data", JSON.stringify(base_data)); // localStorage에 저장
    // 테이블 업데이트 함수 호출
    updateTable(base_data);
  })
  .catch((e) => {
    console.error("에러 발생!", e);
  });

// 테이블 업데이트 함수 생성
function updateTable(base_data) {
  const tablediv = document.querySelector(".userlistTable");
  tablediv.innerHTML = `<table>        
                          <thead>
                            <tr>
                              <th>이메일</th>
                              <th>비밀번호</th>
                              <th>이름</th>
                              <th>나이</th>
                            </tr>
                          </thead>
                          <tbody class="tablebody">
                          </tbody>
                        </table>`;

  const tablebody = document.querySelector(".tablebody");

  // 테이블 데이터 생성
  const tableData = base_data
    .map((x, i) => {
      return `<tr>
          <td>
            <div>${x.email}</div>
            <span></span>
            </td>
          <td>
            <div>${x.pw}</div>
            <span></span>
            </td>
          <td>
            <div>${x.username}</div>
            <span></span>
          </td>
          <td>
            <div>${x.age}</div>
            <span></span>
          </td>
        </tr>`;
    })
    .join(""); // 문자열로 변환해서 한 번에 추가

  tablebody.innerHTML = tableData;
}
