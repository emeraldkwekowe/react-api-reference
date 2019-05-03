import React, {Component} from 'react';
import './main.css';
import axios from "axios";



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
        searchReturn : "Please wait, your results for are loading via axios.."
      });
      axios.get('https://randomuser.me/api/', { 
            params: { seed: "foobar" }
        })
        .then(response => {
           let val = response.data.results[0];
           this.setState({
                userName: val.name.title+" "+val.name.first+" "+val.name.last,
                location: val.location.street+", "+val.location.city+", "+val.location.state,
                email: val.email,
                phone: val.phone,
                image:val.picture.large
           });
        })
        .catch(
            function(error){
                alert(error);
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