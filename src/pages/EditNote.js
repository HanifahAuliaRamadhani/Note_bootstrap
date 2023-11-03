import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {Button, Container, Row, Col, Card, FloatingLabel, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function EditNote () {
    const {id} = useParams();
    const navigation = useNavigate();
      const [post, setPost] = useState({
        id: 0,
        title: '',
        description: ''
      });

    useEffect(() => {
      console.log(id);
      axios.get(`http://localhost:1000/notes/${id}`)
      .then((res) => {
        console.log(res.data)
        setPost(res.data)
      })
    }, )

    const handleInput = (e) => {
      setPost({...post, [e.target.name]: e.target.value})
    }

    // function handleSubmit(e) {
    //   e.preventDefault()
    //   console.log(post)
    //   axios.put('https://note-be-blush.vercel.app/api/v1/note/44', post)
    //   .then(result => {
    //     console.log('data API', result);
    //     alert("Note has update");
    //     navigation('/')
    //   })
    //   .catch(err => {
    //     alert(err.response.data.error)
    //   })
    // }

    function handleSubmit(e) {
      e.preventDefault()
      console.log(post)
      axios
      .put(`http://localhost:1000/notes/${post.id}`, {
        title: post.title,
        description: post.description,
      })
      .then((result) => {
        console.log("data API", result);
        alert("Note has update");
        navigation("/");
      })
      .catch((err) => {
        alert(err.response.data.error);
      })
    }

    return(
      <>
      {/* <div className="addNote">
        <h1>Update your note...</h1>
        <hr/>
        <div>
        <form onSubmit={handleSubmit}>
          <label for="fname">Title :</label><br/>
          <input value={post.title} type="text" onChange={handleInput} name="title" placeholder="type..."/><br/>
          <br/>
          <br/>
          <label for="lname">Description :</label><br/>
          <input value={post.description} type="text" onChange={handleInput} name="description" placeholder="type..."/><br/><br/>
          <br/>
          <input className="submit" type="submit" value="Submit"/>
        </form> 
        </div>
      </div> */}

      <Container className= "my-5">
        <Row>
          <Col>
          <Card>
            <Card.Header as="h3">Update Note</Card.Header>
            <Card.Body>

              <Card.Title>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Title..."
                  className="mb-3"
                >
                  <Form.Control value={post.title} onChange={handleInput} name="title" type="text" placeholder="Title..." />
                </FloatingLabel>
              </Card.Title>

              <Card.Text>
                <FloatingLabel ny
                controlId="floatingPassword" 
                label="Description..."
                >
                  <Form.Control value={post.description} onChange={handleInput} name="description" type="text" placeholder="Description..." />
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


export default EditNote;