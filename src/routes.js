/*imports handler functions from the handler.js module and 
assigns them to separate variables using object destructuring*/
const { 
getAllBooksHandler,
  getBookDetailByIdHandler,
  addBookHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
} = require('./handler');

/*array of route objects is used by the server to 
register each endpoint with the corresponding handler function. */


//method: used to access the endpoint .
//path: the URL path for the endpoint.
//handler:used to execute when the endpoint is accessed, which is defined in the handler.js module.

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookDetailByIdHandler
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler
    }
];

//Export this routes module so that can be used in the other modules
module.exports = routes;
