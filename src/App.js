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
    newBookModal: false
  }

  componentDidMount() {
    axios.get("http://localhost:3000/books")
      .then(response => {
        this.setState({ books: response.data })
      })
  }

  toggleNewBookModal = () => {
    this.setState({ newBookModal: !this.state.newBookModal })
  }

  addBook = () => {
    axios.post("http://localhost:3000/books", this.state.newBookData)
      .then(response => {
        console.log(response.data)
        let { books } = this.state;
        books.push(response.data);
        this.setState({
          books: books,
          newBookModal: false,
          newBookData: {
            Title: "",
            Rating: ""
          }
        })
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
            <button className="btn-success">Edit</button>
            <button className="btn-danger">Delete</button>
          </td>
        </tr>
      )
    })

    return (
      <div className="container">
        <Button color="info" onClick={this.toggleNewBookModal}>Add Book</Button>
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
