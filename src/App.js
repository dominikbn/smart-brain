import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';

/* Images:
https://www.interregemr.eu/IManager/Media/65321/1599724/DE/add_tablet/people-to-people.jpg
https://i0.web.de/image/688/33679688,pd=3/donald-trump-luegen-falschbehauptungen-usa-praesid.jpg
*/

const app = new Clarifai.App({
  apiKey: 'ca1c72aa19f8471da18fbda80cd8fafc'
});

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
    this.state = {
      imput: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    // app.models
    //   .predict(
    //     Clarifai.FACE_DETECT_MODEL,
    //     this.state.input)
    //   .then(
    //     function (response) {
    //       // do something with response
    //       console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    //     },
    //     function (err) {
    //       // there was an error
    //     }
    //   );
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
        <Particles className='particles'
          params={particlesOptions}
        />
      </div>
    );
  }
}

export default App;

// Credits:
// <div>
//   Icons made by <a
//     href="https://www.flaticon.com/authors/becris"
//     title="Becris">Becris</a> from <a
//       href="https://www.flaticon.com/"
//       title="Flaticon">www.flaticon.com</a> is licensed by <a
//         href="http://creativecommons.org/licenses/by/3.0/"
//         title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
// </div>