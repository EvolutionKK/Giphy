import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

export default function Home() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('')
  const [Input, setInput] = useState([{
    text: "Hello there, This is blah blah.",
    img: "https://media1.giphy.com/media/IfxBjGrbIK3vwkODkA/200w.webp?cid=ecf05e47rzltx6od7jwgt7s9y9vwflloy96ade9dgkdrd6oa&rid=200w.webp&ct=g"
  }]);
  const [test, setTest] = useState("");
  const [show1, setShow1] = useState(false);
  const [data, setData] = useState([])
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "hvkWVnnXY6fGVVsjUo80YFCEyyz97cZi"
          }
        });
        console.log(results)
        setData(results.data.data);
      } catch (err) {
        setIsError(true)
        console.log(err)
      }
    };
    fetchData();
  }, []);

  const renderGif = () => {
    return data.map(eL => {
      const imageSelect = () => {
        setImage(eL.images.fixed_height.url)
        handleClose1(false)
        console.log(image)
      }
      return (
        <div key={eL.id} className='gif'>
          <img src={eL.images.fixed_height.url} alt="" value={image} onClick={imageSelect} />
        </div>
      )
    })
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault();
    setIsError(false)
    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "hvkWVnnXY6fGVVsjUo80YFCEyyz97cZi",
          q: search,
          limit: 2000
        }
      });
      setData(results.data.data);
    } catch (err) {
      setIsError(true)
    }
  };

  const handleInput = (event) => {
    setTest(event.target.value)
  }
  const handlePost = () => {
    setShow(false)
    setInput(Input => [{text:test, img:image}, ...Input]);

  }

  return (
    <div>
      <Navbar />
      <div className='card'>
        <ul>
          <li><button className='home-button'>Find Friends</button></li>
          <li><button style={{ marginTop: "6rem" }} className='home-button'>Group</button></li>
          <li><button style={{ marginTop: "12rem" }} className='home-button'>Watch</button></li>
          <li><button style={{ marginTop: "18rem" }} className='home-button'>Memories</button></li>
          <li><button style={{ marginTop: "24rem" }} className='home-button'>Events</button></li>
          <li><button style={{ marginTop: "30rem" }} className='home-button'>Favourite</button></li>
        </ul>
        <div className='post-text'>
          {Input.map(val => {
            return (
              <div style={{marginTop: "7rem", backgroundColor:"darkgray" , width:"50rem", height: "16rem", borderRadius:"2rem"}}>
                <h3 style={{marginLeft:"3rem", fontFamily:"serif"}}>{val.text}</h3>
                <img className='post-img' style={{ marginLeft: "1rem" }} src={val.img} alt="" />
              </div>
            )
          })}
        </div>
      </div>
      <div className='home-input'>
        <Button onClick={handleShow} className='post-home'>What's on Your Mind ?</Button>
      </div>
      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton className='modal-title'>
          <Modal.Title  >
            <button className='modal-title-button'>Compose post</button>
            <button className='modal-title-button'>Live Video</button>
            <button style={{ border: "none" }} className='modal-title-button'>Photo / Video Album</button>
          </Modal.Title>
        </Modal.Header>
        <input type="text" value={test} onChange={handleInput} className="modal-input" placeholder='Type here...'></input>
        <img src={image} alt="" />
        <Modal.Footer>
          <Button variant="secondary" style={{ marginRight: "8.5rem", width: "6rem", borderRadius: '1rem', position: "absolute" }}>
            Check In
          </Button>
          <Button variant="secondary" style={{ marginRight: "16rem", width: "8rem", borderRadius: '1rem', position: "absolute" }}>
            Tag Friends
          </Button>
          <Button variant="secondary" onClick={handleShow1} style={{ marginRight: "25rem", width: "4rem", borderRadius: '1rem', position: "absolute" }}>
            GIF

          </Button>
          <Button variant="secondary" style={{ marginleft: "", width: "7rem", borderRadius: '1rem' }}>
            Tag Event
          </Button>
        </Modal.Footer>
        <Button variant="primary" style={{ marginLeft: "25rem", marginBottom: "1rem", width: "5rem" }} onClick={handlePost}>
          Post
        </Button>
      </Modal>
      <Modal className="modale" show={show1} onHide={handleClose1}>
        <Modal.Title style={{ textAlign: "center" }} >
          GIF
        </Modal.Title>
        <Modal.Header>
          <form className='form'>
            <input type="text" value={search} onChange={handleSearch} placeholder='Search...'></input>
            <button onClick={handleSubmit} type="submit" className='btn btn-primary' style={{ marginLeft: "9rem" }} >Go</button>
            <Button onClick={handleClose1} style={{ marginLeft: "1rem" }}>Close</Button>
          </form>
        </Modal.Header>
        <div style={{ alignSelf: "center" }} className='gif-container'>
          {renderGif()}
        </div>
        <Modal.Footer>
          <Button onClick={handleClose1} style={{ marginLeft: "1rem" }}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
