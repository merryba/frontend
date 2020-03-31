import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ApiService from "../service/ApiService";
import { FormErrors } from '../components/FormErrors';
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false
    }
        this.saveUser = this.saveUser.bind(this);
    }

    
    handleUserInput = (e) => {
      console.log('handle');
    const name = e.target.name;
    const value = e.target.value;
    
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
   
  }
  

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

    saveUser = (e) => {
        e.preventDefault();
        
        let user = {email: this.state.email, password: this.state.password};
        ApiService.addUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                console.log(this.state.email,this.state.password);
                
                window.setTimeout(() => {this.props.history.push('/')}, 3000) 

            }).catch(Err =>{
                this.setState({message : 'UserId/Email exists alaready.'});
                window.setTimeout(() => {this.props.history.push('/signup')}, 300) 
            });
         
    }
   render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           /> <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
            <h1>Registration Page</h1>
            <div className="result">{ this.state.message }</div>
             <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
           <TextField
             hintText="Enter your Email"
             type="email" name="email"
             floatingLabelText="Email"
              onChange={this.handleUserInput}
             /></div>
           <br/>
          <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password" name="password"
             onChange={this.handleUserInput}
             />
             </div>
           <br/>
           <RaisedButton label="Submit" primary={true}  style={style} onClick={this.saveUser}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;