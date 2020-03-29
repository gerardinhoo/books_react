import React, { Component } from 'react';
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import './App.css';

class App extends Component {
  state = {
    books: [],
    newBookModal: false
  }

  componentDidMount() {
    axios.get("http://localhost:3000/books")
      .then(response => {
        this.setState({ books: response.data })
      })
  }


  toggleNewBookModal = () => {
    this.setState({ newBookModal: true })
  }

  render() {
    let mapBooks = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.Rank}</td>
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
        <Button color="primary" onClick={this.toggleNewBookModal}>Add Bookkkk</Button>
        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal}>
          <ModalHeader toggle={this.toggleNewBookModal}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleNewBookModal}>Do Something</Button>{' '}
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
