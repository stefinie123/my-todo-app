1. To get all todos:
todos

```
curl -X GET http://localhost:3000/todos
```

2. To create a new todo (replace your_todo with your actual todo data in JSON format):
todos

```
curl -X POST -H "Content-Type: application/json" -d 'your_todo' http://localhost:3000/todos
```

3. To update a todo with a specific id (replace id with the actual id and updated_todo with your updated todo data in JSON format):
id

```
curl -X PUT -H "Content-Type: application/json" -d 'updated_todo' http://localhost:3000/todos/id
```
4. To delete a todo with a specific id (replace id with the actual id):
id

```
curl -X DELETE http://localhost:3000/todos/id
```

Please replace your_todo, updated_todo, and id with actual values.