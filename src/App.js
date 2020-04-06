import React, { Component } from 'react';
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";

import './App.css';

class App extends Component {
  state = {
    books: [],
    newBookData: {
      Title: "",
      Rating: ""
    },
    editBookData: {
      id: "",
      Title: "",
      Rating: ""
    },
    newBookModal: false,
    editBookModal: false
  }

  componentDidMount() {
    this._refreshBooks()
  }

  toggleNewBookModal = () => {
    this.setState({ newBookModal: !this.state.newBookModal })
  }

  toggleEditBookModal = () => {
    this.setState({editBookModal: !this.state.editBookModal})
  }

  addBook = () => {
    axios.post("http://localhost:3000/books", this.state.newBookData)
      .then(response => {
        let { books } = this.state;
        books.push(response.data);
        this.setState({
          books: books,
          newBookModal: false,
          newBookData: {
            Title: "",
            Rcating: ""
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  updateBook = () => {
    let {Title, Rating} = this.state.editBookData;
    axios.put("http://localhost:3000/books/" + this.state.editBookData.id, {Title, Rating})
      .then(response => {
        this._refreshBooks();
        
        this.setState({editBookModal: false, editBookData: {id: "", Title: "", Rating: ""}})
      })
      .catch(error => {
        console.log(error)
      })
  }

  editBook = (id, Title, Rating, ) => {
    this.setState({
      editBookData: {id, Title, Rating}, editBookModal: !this.state.editBookModal
    })
  }

  deleteBook = (id) => {
    axios.delete("http://localhost:3000/books/" + id)
    .then(response => {
      this._refreshBooks()
    })
    .catch(error => {
      console.log(error)
    })
  }

  _refreshBooks() {
    axios.get("http://localhost:3000/books")
    .then(response => {
      this.setState({ books: response.data })
    })
    .catch(error => {
      console.log(error)
    })
  }



    


  render() {
    let mapBooks = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.Title}</td>
          <td>{book.Rating}</td>
          <td style={{ display: "flex" }}>
            <button className="btn-success" onClick={this.editBook.bind(this, book.id, book.Title, book.Rating)}>Edit</button>
            <button className="btn-danger" onClick={this.deleteBook.bind(this, book.id)}>Delete</button>
          </td>
        </tr>
      )
    })

    return (
      <div className="container mt-4">
        <h3>BOOKS ADDING</h3>
        <Button color="info" onClick={this.toggleNewBookModal} className="mb-3">Add Book</Button>
        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal}>
          <ModalHeader toggle={this.toggleNewBookModal}>Add a New Book</ModalHeader>
          <ModalBody>

            <FormGroup>
              <Label for="title">Title</Label>
              <Input id="title" value={this.state.newBookData.Title} onChange={(e) => {
                let { newBookData } = this.state;
                newBookData.Title = e.target.value;
                this.setState({ newBookData })
              }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input id="rating" value={this.state.newBookData.Rating} onChange={(e) => {
                let { newBookData } = this.state;
                newBookData.Rating = e.target.value;
                this.setState({ newBookData })
              }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook}>Add Book</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewBookModal}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal}>
          <ModalHeader toggle={this.toggleEditBookModal}>Edit Book</ModalHeader>
          <ModalBody>

            <FormGroup>
              <Label for="title">Title</Label>
              <Input id="title" value={this.state.editBookData.Title} onChange={(e) => {
                let { editBookData } = this.state;
                editBookData.Title = e.target.value;
                this.setState({ editBookData })
              }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input id="rating" value={this.state.editBookData.Rating} onChange={(e) => {
                let { editBookData } = this.state;
                editBookData.Rating = e.target.value;
                this.setState({ editBookData })
              }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook}>Update Book</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditBookModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mapBooks}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
