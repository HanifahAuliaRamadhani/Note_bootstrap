import { useState } from "react";
import "../css/addNote.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Button, Container, Row, Col, Card, FloatingLabel, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Addnote () {

    const navigation = useNavigate();
      const [post, setPost] = useState({
        title: '',
        description: ''
      })

    // useEffect(() => {
    //   axios.get('https://note-be-blush.vercel.app/api/v1/note/7').then(res => console.log(res.data.data))
    // }, [])

    const handleInput = (e) => {
      setPost({...post, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
      e.preventDefault()
      console.log(post)
      axios.post('http://localhost:1000/notes', post)
      .then(result => {
        console.log('data API', result);
        alert("Note has Post");
        navigation('/')
      })
      .catch(err => {
        alert(err.response.data.error)
      })
    }

    return(
      <>
      {/* <div className="addNote">
        <h1>Add new note...</h1>
        <hr/>
        <div>
        <form onSubmit={handleSubmit}>
          <label for="fname">Title :</label><br/>
          <input type="text" onChange={handleInput} name="title" placeholder="type..."/><br/>
          <br/>
          <br/>
          <label for="lname">Description :</label><br/>
          <input type="text" onChange={handleInput} name="description" placeholder="type..."/><br/><br/>
          <br/>
          <input className="submit" type="submit" value="Submit"/>
        </form> 
        </div>
      </div> */}

      <Container className= "my-5">
        <Row>
          <Col>
          <Card>
            <Card.Header as="h3">Add Note</Card.Header>
            <Card.Body>

              <Card.Title>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Title..."
                  className="mb-3"
                >
                  <Form.Control  onChange={handleInput} name="title" type="text" placeholder="Title..." />
                </FloatingLabel>
              </Card.Title>

              <Card.Text>
                <FloatingLabel 
                controlId="floatingPassword" 
                label="Description..."
                >
                  <Form.Control onChange={handleInput} name="description" type="text" placeholder="Description..." />
                </FloatingLabel>
              </Card.Text>

              <Button onClick={handleSubmit} variant="outline-primary" value="submit">Save</Button>
              {' '}
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
      </>
    );
  }
  
  export default Addnote;