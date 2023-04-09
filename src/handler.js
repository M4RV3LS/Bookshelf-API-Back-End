//import nanoid and books module
const { nanoid } = require("nanoid");
const books = require("./books");

//

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  if (name) {
    filteredBooks = books.filter((bn) => bn.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading) {
    filteredBooks = books.filter((book) => Number(book.reading) === Number(reading));
  }

  if (finished) {
    filteredBooks = books.filter((book) => Number(book.finished) === Number(finished));
  }

  const response = h.response({
    status: "success",
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  response.code(200);
  return response;
};

// //handler untuk mendapatkan menampilkan buku berdasarkan parameter ID nya
// const getBookDetailByIdHandler = (request, h) => {
//   //id parameter is extracted from request.params
//   const { id } = request.params;
//   //books array is outputed to the console for debugging purposes.
//   console.log(books);
//   //filter() method is used to search for a book object in the books array that matches the id parameter
//   // If found, the first matching object is returned and assigned to book.
//   //If not found, book will be undefined.
//   const filteredBook = books.filter((book) => book.id === id)[0];

//   //if book is found
//   if (filteredBook !== undefined) {
//     const response = h.response({
//       status: "success",
//       data: {
//         filteredBook,
//       },
//     });
//     //success status response code
//     response.code(200);
//     return response;
//   }

//   //if book is not found
//   const response = h.response({
//     status: "fail",
//     message: "Buku tidak ditemukan",
//   });
//   //not found status response code
//   response.code(404);
//   return response;
// };

//handler untuk mendapatkan menampilkan buku berdasarkan parameter ID nya
const getBookDetailByIdHandler = (request, h) => {
    //id parameter is extracted from request.params
  const { id } = request.params;
    //filter() method is used to search for a book object in the books array that matches the id parameter
  // If found, the first matching object is returned and assigned to book.
  //If not found, book will be undefined.
  const filteredBook = books.filter((n) => n.id === id)[0];

//if book is found
  if (filteredBook) {
    const response = h.response({
      status: "success",
      data: {
        filteredBook
      }
    });
    //success status response code
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  response.code(404);
  return response;
};

// //handler untuk menambahkan buku
// const addBookHandler = (request, h) => {
//   const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

//   //Memvalidasi bahwa nama buku harus ada
//   if (!name) {
//     const response = h.response({
//       status: "fail",
//       message: "Gagal menambahkan buku. Pastikan nama buku tidak kosong",
//     });
//     //invalid request message
//     response.code(400);
//     return response;
//   }

//   //Memvalidasi bahwa jumlah halaman yang telah dibaca tidak boleh melebih jumlah halaman buku tersebut
//   if (!(readPage <= pageCount)) {
//     const response = h.response({
//       status: "fail",
//       message: "Gagal menambahkan buku. Pastikan readPage tidak lebih besar dari pageCount",
//     });
//     //invalid request message
//     response.code(400);
//     return response;
//   }

//   const id = nanoid(16);
//   const updatedAt = insertedAt;
//   const insertedAt = new Date().toISOString();
//   let finished;
//   if (pageCount !== readPage) {
//     finished = false;
//   } else {
//     finished = true;
//   }

//   const newBook = {
//     id,
//     name,
//     year,
//     author,
//     summary,
//     publisher,
//     pageCount,
//     readPage,
//     finished,
//     reading,
//     insertedAt,
//     updatedAt,
//   };
//   //Memasukkan buku baru ke dalam rak
//   books.push(newBook);

//   //Memvalidasi apakah buku sudah berhasil ditambahkan kedalam rak
//   const isAddedSuccess = books.filter((book) => book.id === id).length > 0;

//   //Respon jika buku berhasil ditambahkan kedalam rak
//   if (isAddedSuccess) {
//     const response = h.response({
//       status: "success",
//       message: "Buku berhasil ditambahkan",
//       data: {
//         bookId: id,
//       },
//     });
//     //Created success status response code
//     response.code(201);
//     return response;
//   }

//   //Respon jika buku gagal ditambahkan kedalam rak
//   const response = h.response({
//     status: "fail",
//     message: "Buku gagal ditambahkan",
//   });
//   //unexpected condition that prevented it from fulfilling the request.
//   response.code(500);
//   return response;
// };

//handler untuk menambahkan buku
const addBookHandler = (request, h) => {
  
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  //Memvalidasi bahwa nama buku harus ada
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    //invalid request message
    response.code(400);
    return response;
  }


  //Memvalidasi bahwa jumlah halaman yang telah dibaca tidak boleh melebih jumlah halaman buku tersebut
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    //invalid request message
    response.code(400);
    return response;
  }


  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

   //Memasukkan buku baru ke dalam rak
  books.push(newBook);
   //Memvalidasi apakah buku sudah berhasil ditambahkan kedalam rak
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  //Respon jika buku berhasil ditambahkan kedalam rak
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    //Created success status response code
    response.code(201);
    return response;
  }

    //Respon jika buku gagal ditambahkan kedalam rak
  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  //unexpected condition that prevented it from fulfilling the request.
  response.code(500);
  return response;
};

// //updates the details of a book with a specified id parameter.
// const editBookByIdHandler = (request, h) => {
//   //id parameter is extracted from request.params
//   const { id } = request.params;
//   //The name, year, author, summary, publisher, pageCount, readPage, and reading properties are extracted from request.payload
//   const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
//   //findIndex() method is used to get the index of the book object in the books array that matches the id parameter.
//   //If found, the index is assigned to index. If not found, index will be -1.
//   const index = books.findIndex((book) => book.id === id);

//   //if book is found
//   if (index > -1) {
//     //if book name is empty
//     if (!name) {
//       const response = h.response({
//         status: "fail",
//         message: "Gagal memperbarui buku. Mohon isi nama buku",
//       });
//       //Bad Request response
//       response.code(400);
//       return response;
//     }

//     //If readPage is greater than pageCount the function returns a fail response
//     if (readPage > pageCount) {
//       const response = h.response({
//         status: "fail",
//         message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
//       });
//       //Bad Request response
//       response.code(400);
//       return response;
//     }

//     //The finished property is set to true if pageCount equals readPage, and false otherwise.
//     const finished = pageCount == readPage ? true : false;
//     //updatedAt property is set to the current date and time in ISO format.
//     const updatedAt = new Date().toISOString();
//     //If the book is found and the name is not empty, the book object is updated with the new details.
//     books[index] = {
//       ...books[index],
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       finished,
//       reading,
//       updatedAt,
//     };
//     const response = h.response({
//       status: "success",
//       message: "Buku berhasil diperbarui",
//     });
//     //success status response code
//     response.code(200);
//     return response;
//   }

//   //If index is -1
//   const response = h.response({
//     status: "fail",
//     message: "Gagal memperbarui buku. Id tidak ditemukan",
//   });
//   //not found status response code
//   response.code(404);
//   return response;
// };

//updates the details of a book with a specified id parameter.
const editBookByIdHandler = (req, h) => {
  //id parameter is extracted from request.params
  const { id } = req.params;
  //The name, year, author, summary, publisher, pageCount, readPage, and reading properties are extracted from request.payload
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;

   //if book name is empty
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    //Bad Request response
    response.code(400);
    return response;
  }

    //If readPage is greater than pageCount the function returns a fail response
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  //findIndex() method is used to get the index of the book object in the books array that matches the id parameter.
  const index = books.findIndex((book) => book.id === id);

  //If index below zero
  if (index < 0) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    //not found status response code
    response.code(404);
    return response;
  }

  //The finished property is set to true if pageCount equals readPage, and false otherwise.
  const finished = pageCount === readPage;

  //updatedAt property is set to the current date and time in ISO format.
  const updatedAt = new Date().toISOString();

  //If the book is found and the name is not empty, the book object is updated with the new details.
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    updatedAt,
  };


  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  //success status response code
  response.code(200);
  return response;
};

//delete book with a specified id parameter.
const deleteBookByIdHandler = (request, h) => {
  //id parameter is extracted from request.params
  const { id } = request.params;
  //findIndex() method is used to get the index of the book object in the books array that matches the id parameter.
  //The findIndex method returns the index of the first element in the array that satisfies the provided testing function
  //or -1 if no element satisfies it.
  const index = books.findIndex((book) => book.id === id);

  //if book is found
  if (index !== -1) {
    //splice method is used to remove the book from the array
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    //OK success status response
    response.code(200);
    return response;
  }

  //if book is not found or index === -1
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  //not found status response code
  response.code(404);
  return response;
};

//Export all handler in tis module so that can be used by the other module
module.exports = {
  getAllBooksHandler,
  getBookDetailByIdHandler,
  addBookHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
