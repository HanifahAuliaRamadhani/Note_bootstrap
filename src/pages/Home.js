import "../css/home.css";
import { React, useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Container, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {BiSearchAlt} from "react-icons/bi";

export default function Home() {
  const [noteData, setNoteData] = useState([])
  
 
  useEffect(() => {
    axios.get('http://localhost:1000/notes')
    .then(result => {
        console.log('data API', result);
        setNoteData(result.data)
    })
    .catch(err => {
        console.log('error: ', err);
    })
  }, [])

  // function deleteRecord() {
  //       axios.delete('https://note-be-blush.vercel.app/api/v1/note/7')
  //       .then(() => {
  //           alert("data has deleted")
  //       })
  //   }

  // const editById = id => {
  //   const newNote = noteData.map((note) => {

  //     if (note.id === id) {
  //       return {...note, 
  //         title: prompt ("title Baru : ", note.title),
  //         description: prompt ("Description Baru : ", note.description)
        
  //       }
  //     }

  //     return note;

  //   });

  //   setNoteData(newNote);
  // };


  // const deleteById = id => {
  //   setNoteData(oldData => {
  //     return oldData.filter(note => note.id !== id)
      
  //   })
  //   alert("Note Has Deleted")
  // }

  const deleteById = id => {
    axios.delete(`http://localhost:1000/notes/${id}`)
    .then(() => {
      alert("Note Has Deleted")
      const newNote = noteData.filter((note) => {
        return note.id !== id;
      });
      setNoteData(newNote);
    })
    .catch(err => {
      console.log('error: ', err);
      alert("error: ", err)
    })
  }

const [search, setSearch] = useState("");

    return( 

      <>
      <div className="bs">
        
          {/* <Form className="d-flex">
            <Button variant="outline-primary" disabled>
              <BsSearch />
            </Button>

            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2"
              aria-label="Search"
              onChange={(event) =>{
                setSearch(event.target.value);
              }}
            />   
          </Form> */}

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <BiSearchAlt/>
        </InputGroup.Text>
        <Form.Control
          placeholder="Search Note..."
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={(event) => {
            setSearch(event.target.value);
          }}

        />
      </InputGroup>

        
        <br/>
        <Container>
          <Row xs={1} md={3} className="g-4">
            {noteData.filter((val) => {
              if (search == "") {
                return val
              } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                return val
              }
            }).map((note, index) => {
            return (
            <>

            {/* <div className="note">
              <h3>{note.title}</h3>
              <hr/>
              <p>{note.description}</p>
              <div className="note__footer" style={{ justifyContent: "flex-end" }}>
                <Link to={`/editnote/${note.id}`}><button className="note__delete">Edit</button></Link>
                <a><button className="note__delete" onClick={() => deleteById(note.id)}>Delete</button></a>
              </div>
            </div> */}

                <Col>
                  <Card>
                    <Card.Header as="h5">{note.title}</Card.Header>
                    <Card.Body>
                      <Card.Title>{note.description}</Card.Title>
                      <Card.Text>
                        
                        {note.createdat}
                      </Card.Text>
                      <Link to={`/editnote/${note.id}`}><Button variant="outline-primary">
                        Edit 
                        </Button></Link>{' '}
                      <Button variant="outline-danger" onClick={() => deleteById(note.id)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
        <br/>
        <br/>
        </>
        )})}
          </Row>
        </Container>
      </div>
      </>
    )
  };
