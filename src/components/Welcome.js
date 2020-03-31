import React, { Component } from 'react';
import UserProfile from '../service/UserProfile';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ApiService from "../service/ApiService";
import { FormErrors } from '../components/FormErrors';

class Welcome extends Component {
  constructor(props){
    super(props);
    this.state={
      
      tree:'',
      formErrors: {tree: ''},
    }
        this.saveUser = this.saveUser.bind(this);
    }

    handleUserInput = (e) => {
      
    const name = e.target.name;
    const value = e.target.value;
    //console.log('handle'+'name'+name+'value'+value);
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
                   this.setState({message : ''});
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let treeValid = this.state.treeValid;
    
  

    switch(fieldName) {
      case 'tree':
       localStorage.setItem("arr", JSON.stringify(value));
       var arrValue = JSON.parse(localStorage.getItem("arr"));
        //console.log('val'+value+'valid'+Array.isArray(arrValue)+typeof(value));
        //treeValid = !arrValue.some(i => !Number.isInteger(i))
        
        fieldValidationErrors.tree = treeValid ? '' : ' is invalid';
        
        break;
      
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    treeValid: treeValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.treeValid});
   
  }
  

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

    saveUser = (e) => {
        e.preventDefault();
        
        let value = this.state.tree;
        //value='[1,2,3,4]';
        //value="'" +value+"'";
        console.log('val---'+value);
        let json=JSON.stringify(value);
        let post_data={json_data:json};
        //console.log('json---'+json);
        //console.log('postdata ---'+post_data);
        
        ApiService.getSum(value)
            .then(res => {
                this.setState({message : res.data});
                console.log('res'+res.data);
                
                

            });
        
    }
  render() {
	  
	  const email = UserProfile.getEmail();
    return (
       <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Welcome"
           /> <div className="panel panel-default">
          
        </div>
            <h1>Welcome Page</h1>
            <div>Please enter the binary tree as int arrays.(e.x) [1,2,3]</div>
            
           <TextField
             hintText="Enter your Binary tree as arrayList"
             type="text" name="tree" 
             floatingLabelText="Binary Tree"
               onChange={this.handleUserInput}
             />
           <br/>
        <div className="result">{ this.state.message }</div>
           
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
export default Welcome;