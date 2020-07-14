import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import { particlesProperties } from './particlesProperties';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      urlInput: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        email: '',
        id: '',
        name: '',
        entries: 0,
        joined: ''
      },
      error: ""
    };
  }

  loadUser = (data) => {
    this.setState({
      imageUrl: '',
      user: {
        email: data.email,
        id: data.id,
        name: data.name,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.region_info.bounding_box;
    const image = document.getElementById('imageInput');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.right_col * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState(prevState => ({
      box: [...prevState.box, box]
    }));
  }

  onInputChange = (event) => {
    this.setState({
      urlInput: event.target.value,
    });
  }

  onPictureSubmit = () => {
    this.setState({
      imageUrl: this.state.urlInput,
      box: []
    }, this.apiCall)
  }

  apiCall = () => {
    this.setState({
      urlInput: '',
      error: ''
    });
    fetch('https://conservative-leaf-51298.herokuapp.com/imageurl', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.imageUrl
      })
    })
      .then(response =>  response.json())
      .then(response => {
        if (response.outputs) {
          let dataLength = response.outputs[0].data.regions.length;
          for (let i = 0; i < dataLength; i++) {
            fetch('https://conservative-leaf-51298.herokuapp.com/image', {
              method: 'put',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
              id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.displayFaceBox(this.calculateFaceLocation(response.outputs[0].data.regions[i]));
                this.setState(Object.assign(this.state.user, {entries: count}));
            })
              .catch(console.log)
          }
        
        }
      })
      .catch(err => this.setState({
        imageUrl: '',
        box: [],
        error: "Please enter a valid url!"
      }));
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({
        isSignedIn: true
      });
    } else {
      this.setState({
        isSignedIn: false
      });
    }
    this.setState({
      route: route
    });
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesProperties}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'signin' 
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : this.state.route === 'register'
            ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <div>
                <Logo/>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm  
                  onPictureSubmit={this.onPictureSubmit} 
                  onInputChange={this.onInputChange} 
                  urlInput={this.state.urlInput}
                />
                <FaceRecognition box={this.state.box} error={this.state.error} imageUrl={this.state.imageUrl}/>
              </div>
        }
      </div>
    );
  }
}

export default App;
