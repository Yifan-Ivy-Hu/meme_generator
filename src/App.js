import React, {Component} from 'react';

import {SearchBox} from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      photos: [],
      total: 0,
      searchField: "",
      selected: false,
      selected_photo: {},
      text: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
  }

  // fetch recent photos if there is no input
  componentDidMount() {
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=42d52d1f23ee4fe17369b0648d96a8cb&per_page=10&format=json&nojsoncallback=1')
    .then(response =>response.json())
    .then(data=> this.setState({photos:data.photos.photo, total:data.total}))
  }

  // fetch photos according to the input
  handleChange = e => {
    this.setState({searchField: e.target.value})
    if (this.state.searchField) {
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=42d52d1f23ee4fe17369b0648d96a8cb&text=${this.state.searchField}&per_page=50&format=json&nojsoncallback=1`)
    .then(response =>response.json())
    .then(data=> this.setState({photos:data.photos.photo, total:data.total}))
    }
  }

  
  handleClick(e) {
    e.preventDefault();
    this.setState({selected: true});
  }

  handleText = e => {
    this.setState({text: e.target.value})
  }

  // generate meme when the user clicks on a button
  handleGenerate(e) {
    e.preventDefault();
  }

  render() {
    const {photos} = this.state;

    return (
      <div className="App">
        <h1> Meme Generator</h1>
        {/* <h3> Selected Photo</h3> */}
        <div className='selected'>
          <div>
            {this.state.selected ? (
                <div>
                  <h4> Photo selected. Give us text to generate meme!</h4>
                  <input 
                    className='text'
                    type='text' 
                    placeholder="text"
                    onChange={this.handleText}
                  />
                  <button  type="button" className="generate-button" onClick={this.handleGenerate}>Generate meme!</button>
                  <br/>
                  <br/>
                  ****************************************************************************************************************
                </div>
              ) : (
                <h4> No photo selected.</h4>
              )
            }
          </div>
        </div>

        <SearchBox
        placeholder='search images'
        handleChange={this.handleChange}
        />

        <div className = "photos">
        {photos.map((photo) => (
          <div key={photo.id}>
            <img alt='photo' src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
            <button  type="button" className="select-button" onClick={this.handleClick}>Select this</button>
          </div>
        ))}
        </div>
      </div>
    );
  }
}

export default App;
