import React, {Component} from 'react';

import {SearchBox} from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      photos:[],
      total:0,
      searchField: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // fetch recent photos if there is no input
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=42d52d1f23ee4fe17369b0648d96a8cb&per_page=10&format=json&nojsoncallback=1')
    .then(response =>response.json())
    .then(data=> this.setState({photos:data.photos.photo, total:data.total}))
  }

  handleChange = e => {
    // fetch photos according to the input
    this.setState({searchField: e.target.value})
    if (this.state.searchField) {
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=42d52d1f23ee4fe17369b0648d96a8cb&text=${this.state.searchField}&per_page=50&format=json&nojsoncallback=1`)
    .then(response =>response.json())
    .then(data=> this.setState({photos:data.photos.photo, total:data.total}))
    }
  }

  render() {
    const {photos} = this.state;

    return (
      <div className="App">
        <h1> Meme Generator</h1>
        <SearchBox
        placeholder='search images'
        handleChange={this.handleChange}
        />

        <div className = "photos">
        {photos.map((photo) => (
          <div key={photo.id}>
            <img alt='photo' src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
          </div>
        ))}
        </div>
      </div>
    );
  }
}

export default App;
