npm i
npm start

------------------------
post adddata: 
http://localhost:3000/todos
method: post
body:{
    "title": "test",
    "description": "test",
    "status": "test",
    "due_date": "2020-01-01",
    "id":"56234"
}

----------------------------------------
get all data of todos
http://localhost:3000/todos
method: get

----------------------------------------
update data based on id
http://localhost:3000/todos/56234
method: put
body:{
    "title": "test",
    "description": "test",
    "status": "test",
    "due_date": "2020-01-01",
    "id":"56234"
}

----------------------------------------
delete data based on id
http://localhost:3000/todos/56234
method: delete
