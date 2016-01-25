# Node.js assignment 2

## TicTacToe Backend

Using Node.js, express, MongoDB and Mongoose do

1. implement the following endpoints:

|Method	|Route|	Action|Validation|	
|---|---|---|---|
|GET|	games/|	get a list of games on the server	|
|POST|	games/|	create a new game	| `type` field should equal 0, `password` should be a non-empty string
|GET	| games/:id	|get a game status	| 
|PUT	|games/:id	|make a turn	| 1. updates should be done in turns; 2. position should be within a ttt field; 3. a cell at position should be empty; 4. game state should be updated according to tic tac toe rules

2. implement game list filtering:
`GET /` should accept an URL param `group` (e.g. '?group=abc') and return a list of games filtered by the `password` field (see `POST /` example).

MongoDB connection string should be read from the `MONGO_URI` environment variable.

reference implementation:
```
https://rocky-sierra-3635.herokuapp.com/games
https://polar-waters-8630.herokuapp.com/games
https://aqueous-ocean-2864.herokuapp.com/games
```

### Request && Response examples

`GET /games` Response body:
```
[
    {
        "_id":"561f3f796ffb732b5c9835f2",
        "token":"46197528478235466981444888441595",
        "type":0,
        "field1":1,
        "field2":0,
        "state":"second-player-turn"
    },
    {
        "_id":"561f43306ffb732b5c9835f4",
        "state":"first-player-turn",
        "field2":0,
        "field1":0,
        "type":0,
        "token":"979483055887313553541444889392350"
    }
]
```
`POST /games` Request body:
```
{
    "type": 0,
    "password": "abc"
}
```
`POST /` Response body:
```
{
    "state":"first-player-turn",
    "field2":0,
    "field1":0,
    "type":0,
    "token":"46197528478235466981444888441595",
    "_id":"561f3f796ffb732b5c9835f2"
}
```       
`GET /games/46197528478235466981444888441595` Response body:
```
{
    "state":"first-player-turn",
    "field2":0,
    "field1":0,
    "type":0,
    "token":"46197528478235466981444888441595",
    "_id":"561f3f796ffb732b5c9835f2"
}
```              

`PUT /games/46197528478235466981444888441595` Request body:
```
{
    "player": 1,
    "position": 0
}
```
`PUT /games/46197528478235466981444888441595` Response body:
```
{
    "token":"46197528478235466981444888441595",
    "type":0,
    "field1":1,
    "field2":0,
    "state":"second-player-turn",
    "_id":"561f3f796ffb732b5c9835f2"
}
```
