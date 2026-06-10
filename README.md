rafce : 화살표 함수
서버 띄우기 : npm run dev

[라이브러리 설치] : npm install react-router-dom

node_modules 다시 설치 : npm install

[-LIB 정리-]
[CSS(스타일)] : npm install styled-components
[아이콘 라이브러리 받는법] : npm install react-icons
[redux 라이브러리] : npm install react-redux @reduxjs/toolkit
json-server(RestfulAPI) : npm install -g json-server
api 라이브러리 : npm install axios
query 라이브러리 : npm install @tanstack/react-query
antd 라이브러리 : npm install antd  ag-grid-react ag-grid-community
chart 라이브러리 : npm install chart.js react-chartjs-2


git add .
git commit -m ""
git push -u origin main

[reducer]
dispatch : 함수를 실행하는 함수
action : 전체 object 인수
action.type : 함수의 타입
action.payload : state 변화시킬 수 있는 인수


useSate => useReducer => useContext => redux(slice, query)

context : state, 내부함수(reducers)
redux : state, 내부함수(reducer), 외부함수(extraReducers === API)   

{암기사항}
Restful API
get 전체_방식 : url => return : 테이블(json구조)
get 한개 데이터_방식: url+id => return : 오브젝트(row)
post 방식 : url, object => return : object //잘 집어넣었다고 object를 리턴함
put 방식 : url+id, object => return : object
delete 방식 : url+id => return : id // id를 잘 지웠다고 id를 리턴해줌
