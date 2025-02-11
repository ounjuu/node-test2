const express = require("express"); //express 모듈 셋팅
const app = express();
const port = 3000;
const path = require("path"); // path 모듈

// body-parser
// x-www-form-urlencoded 방식, 객체 형태로 결과가 나옴
app.use(express.urlencoded({ extended: true }));
// json 형식으로 받을 것임
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// set이 get 위에 와야 함
app.set("view engine", "ejs"); // ejs 파일 html로 변경해줌
app.set("views", "./views"); // ejs 파일 위치 설정
app.set("views", path.join(__dirname, "/views"));

let data = "";
let query = "";

app.get("/", (req, res) => {
  res.render("main");
});

// get 요청은 req.query
app.get("/search", (req, res) => {
  query = req.query.user.toLowerCase(); // 검색어
  res.render("search", { query }); // search.ejs에 검색 결과 전달
});

app.get("/userinfo2", (req, res) => {
  res.json(query);
});

// post 요청은 req.body
app.post("/userlist", (req, res) => {
  data = req.body;
  res.render("userlist");
});

app.get("/userinfo", (req, res) => {
  res.json(data);
});

// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
