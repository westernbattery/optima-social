import React, {Component} from "react";
import Nav from "./interface/navbar";
import Login from "./interface/login";
import Wall from "./interface/wall";

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      credentials: {},
      isLoggedIn: false
    }
  }

  componentDidMount() {
    const credentials  = localStorage.getItem('credentials');
    if(credentials) {
      this.setState({
        credentials: JSON.parse(credentials),
        isLoggedIn: true
      });
    }
  }

  login({name, email}) {
    localStorage.setItem('credentials', JSON.stringify({name: name, email: email}));
    this.setState({
      isLoggedIn: true,
      credentials: {name: name, email: email}
    })
  }

  logout() {
    localStorage.removeItem('credentials');
    this.setState({
      isLoggedIn: false
    });
  }

  render() {
    const {isLoggedIn, credentials} = this.state;
    return (
      <div>
        <Nav isLoggedIn={this.state.isLoggedIn} onLogout={this.logout}/>
        {
          !isLoggedIn ? <Login onSubmit={this.login}/> : 
          <Wall name={credentials.name} email={credentials.email}/>
        }
      </div>
    );
  }
}

export default App;
