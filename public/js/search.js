fetch("/userinfo2")
  .then((response) => response.json()) // 서버에서 JSON 데이터 가져옴
  .then((data) => {
    let localdata = JSON.parse(localStorage.getItem("data") || "[]"); // 기존 localStorage 데이터 불러오기
    const sameName = localdata.filter((item) => item.username === data);
    // 검색 결과가 없을 경우 alert 띄우고 종료
    if (sameName.length === 0) {
      alert("검색된 회원이 없습니다.");
      window.history.back();
      return;
    }
    updateTable2(sameName);
  })
  .catch((e) => {
    console.error("에러 발생!", e);
  });

function updateTable2(sameName) {
  const searchTable = document.querySelector(".tableWrap");
  searchTable.innerHTML = `<table>
                          <thead>
                            <tr>
                              <th>이메일</th>
                              <th>비밀번호</th>
                              <th>이름</th>
                              <th>나이</th>
                            </tr>
                          </thead>
                          <tbody class="sametablebody">
                          </tbody>
                        </table>`;

  const sameTablebody = document.querySelector(".sametablebody");
  const sameData = sameName
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

  sameTablebody.innerHTML = sameData;
}
