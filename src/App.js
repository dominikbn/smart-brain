import React from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';
import Footer from './components/footer/Footer';
import Credits from './components/credits/Credits';
import ImageContent from './imagecontent/ImageContent';

/* Images:
https://i0.web.de/image/688/33679688,pd=3/donald-trump-luegen-falschbehauptungen-usa-praesid.jpg
https://www.welt.de/img/bildergalerien/mobile185211106/7042504707-ci102l-w1024/FC-Schalke-04-Borussia-Dortmund.jpg
https://e6.365dm.de/19/07/768x432/skysport_de-kroos-real-madrid_4709687.jpg?20190704132724
https://cdn1.spiegel.de/images/image-964935-860_poster_16x9-vfta-964935.jpg
*/

const initialState = {
  input: '',  // content of URL input field
  imageUrl: '',  // last URL used for face detection
  faceLocations: [],  // positions of faces in the image
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

// options for particles.js
const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    size: {
      value: 3
    },
    line_linked: {
      distance: 200
    },
    move: {
      speed: .5
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (userData) => {
    this.setState({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined
      }
    });
    this.setState({ isSignedIn: true });
  }

  calculateFaceLocations = (apiData) => {
    const regions = apiData.outputs[0].data.regions;
    if (regions === undefined) {
      // no faces found
      return [];
    }

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    const faceLocations = regions.map(region => {
      const box = region.region_info.bounding_box;
      return {
        // calculate distance to borders of the image
        top: box.top_row * height,
        left: box.left_col * width,
        bottom: height - (box.bottom_row * height),
        right: width - (box.right_col * width)
      };
    });

    return faceLocations;
  }

  setfaceLocations = (faceLocations) => {
    this.setState({ faceLocations });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onImageSubmit = () => {
    // save URL of the image
    this.setState({ imageUrl: this.state.input });
    // start face detection
    fetch('https://lit-brook-23362.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        // update entries counter on server db
        if (response) {
          fetch('https://lit-brook-23362.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {
                entries: count
              }))
            })
            .catch(console.log);
        }
        // save locations of detected faces
        this.setfaceLocations(this.calculateFaceLocations(response));
      })
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if (route === ('signin' || 'register')) {
      this.setState(initialState);
    }
    this.setState({ route: route });
  }

  render() {
    const { imageUrl, faceLocations, route, isSignedIn } = this.state;

    const particles = <Particles
      className='particles'
      params={particlesOptions}
    />;

    const navigation = <Navigation
      isSignedIn={isSignedIn}
      onRouteChange={this.onRouteChange}
    />;

    const imageLinkForm = <ImageLinkForm
      onInputChange={this.onInputChange}
      onImageSubmit={this.onImageSubmit}
    />;

    const faceRecognition = <FaceRecognition
      imageUrl={imageUrl}
      faceLocations={faceLocations}
    />;

    const imageContent = <ImageContent
      faceLocations={faceLocations}
      imageUrl={imageUrl}
    />;

    const signin = <SignIn
      onRouteChange={this.onRouteChange}
      loadUser={this.loadUser}
    />;

    const register = <Register
      onRouteChange={this.onRouteChange}
      loadUser={this.loadUser}
    />;

    let appContent = <div></div>;
    switch (route) {
      case 'home':
        appContent = <div className='app-content'>
          <Logo />
          <Rank
            name={this.state.user.name}
            entries={this.state.user.entries}
          />
          {imageLinkForm}
          {faceRecognition}
          {imageContent}
        </div>;
        break;
      case 'signin':
        appContent = <div className='app-content'>
          {signin}
        </div>;
        break;
      case 'register':
        appContent = <div className='app-content'>
          {register}
        </div>;
        break;
      case 'credits':
        appContent = <div className='app-content'>
          <Credits
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
          />
        </div>;
        break;
      default:
        appContent = <p>This page does not exist.</p>
    }

    return (
      <div className='app'>
        {particles}
        {navigation}
        {appContent}
        <Footer
          onRouteChange={this.onRouteChange}
        />
      </div>
    );
  }
}

export default App;