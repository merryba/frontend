import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ApiService from "../service/ApiService";
import UserProfile from '../service/UserProfile';
class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {email: this.state.email, password: this.state.password};
        ApiService.loginUser(user)
            .then(res => {console.log('response: ', res.data.error)
  
              if (!res.data.error &&res.data.message) {
				        UserProfile.setEmail(res.data.message);
				        console.log('Email'+res.data.message);
                console.log('Email'+UserProfile.getEmail());
                
                window.setTimeout(() => {
					
                this.props.history.push({pathname: '/welcome',state: { email: res.data.message }})
               // history is available by design in this.props when using react-router
              }, 3000) // 3000 means 3 seconds
            }else console.log(res.data.message);
            });
    }


  
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
            <h1>Login Page</h1>
            <div className="result">{ this.state.message }</div>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={this.saveUser}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Login;