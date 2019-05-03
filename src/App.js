import React, {Component} from 'react';
import './main.css';

class Form extends Component{
  constructor(props){
    super(props);
    this.state = {
        searchTerm : "",
        userName : "",
        email : "",
        location : "",
        phone : "",
        image : "",
        searchReturn : ""
    }
  }

  onSearch = (e) => {
    e.preventDefault();
    this.setState({
      searchTerm : e.target.querySelector('input').value,
      searchReturn : "please wait..."
    });
    fetch("https://randomuser.me/api/?seed="+this.state.searchTerm)
    .then(res => res.json())
    .then(
      (valueReturned) => {
        let val = valueReturned.results[0];

        this.setState({
          searchReturn : "Here is the result for "+this.state.searchTerm+": "+valueReturned.results[0].name.first,
          userName: val.name.title+" "+val.name.first+" "+val.name.last,
          location: val.location.street+", "+val.location.city+", "+val.location.state,
          email: val.email,
          phone: val.phone,
          image:val.picture.large
        });
      })
  }

  // componentDidMount() {
  //     fetch("https://randomuser.me/api/")
  //     .then(
  //         data => data.json()
  //       )
  //     .then(
  //         (valueReturned) => {
  //             console.log(valueReturned)
  //             let val = valueReturned.results[0];
  //             //Manipulate DOM
  //             this.setState({
  //               userName: val.name.title+" "+val.name.first+" "+val.name.last,
  //               location: val.location.street+", "+val.location.city+", "+val.location.state,
  //               email: val.email,
  //               phone: val.phone,
  //               image:val.picture.large
  //             });
  //         }
  //     );
  //}
  render(){
    return(
        <form class="Form" onSubmit={this.onSearch}>
          <input autcomplete="off" id="mike"/>
          <button>Go</button>
          <p>{this.state.searchReturn}</p>
          <div class="user">
              <img src={this.state.image}></img>
              <div class="userDets">
                <p><b>Name</b>: {this.state.userName.toUpperCase()}</p>
                <p><b>Location</b>: {this.state.location}</p>
                <p><b>Email</b>: {this.state.email}</p>
                <p><b>Phone</b>: {this.state.phone}</p>
              </div>
          </div>
        </form>
    )
  }
}


class App extends Component{
    render(){
      return (
        <div className="App">
            <Form/>
        </div>
      );
  }
}

export default App;
