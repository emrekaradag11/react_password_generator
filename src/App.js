import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


export default class App extends Component {

  state = {
    passwordLength : 15,
    symbol : true,
    lowercase : true,
    uppercase : true,
    numbers : true,
    password : '',
    oldPasswords : localStorage.getItem('oldpasswords') ? JSON.parse(localStorage.getItem('oldpasswords')) : []
  }

  changeInput = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    })
  }


  generatePassword(e) {

    if(e)
      e.preventDefault()
    
    const {symbol,numbers,lowercase,uppercase,passwordLength,oldPasswords} = this.state;

    const symbolData = "()_-{}',.~=|+:[]\"<>\\/&@#^;%$*?!";
    const numberData = "0123456789";
    const upperCharsData = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    const lowerCharsData = "abcdefghiklmnopqrstuvwxyz";
    let generatePassword = "";
    if (symbol) {
      generatePassword += symbolData;
    }
    if (numbers) {
      generatePassword += numberData;
    }
    if (lowercase) {
      generatePassword += lowerCharsData;
    }
    if (uppercase) {
      generatePassword += upperCharsData;
    }
    var a = generatePassword.split("").sort(() => Math.random() - 0.5);
    for (var i = 0; i <= passwordLength; i++) {
      var k = Math.floor(Math.random() * (i + 1));
      var temp = a[i];
      a[i] = a[k];
      a[k] = temp;
    }
    this.counter++;
    oldPasswords.push({id : oldPasswords.length + 1 , password : a.join("").substr(0, passwordLength)});
    localStorage.setItem("oldpasswords",JSON.stringify(oldPasswords))
    this.setState({
      password : a.join("").substr(0, passwordLength),
      oldPasswords : JSON.parse(localStorage.getItem('oldpasswords'))
    })
  }

  copyText(password,e) {
      var copyText = password;
      navigator.clipboard.writeText(copyText);
      alert("copied text : " + copyText );
  }


  render() {
    const {symbol,numbers,lowercase,uppercase,passwordLength,password,oldPasswords} = this.state;
    return (
      <div className="App">
        <div className="container mt-5">
          <h1 className="mb-4">Welcome Password Generator</h1>
          <form className="text-start" onSubmit = {this.generatePassword.bind(this)}>
            <div className="col-lg-8 mx-auto">
              <div className="row justify-content-center">
                <div className="col-lg-auto text-start">
                  <input
                    type="number"
                    className="form-control mb-4"
                    name="passwordLength"
                    onChange={this.changeInput}
                    value = {passwordLength}
                    placeholder="password Length"
                  />
                  <label className="switch mb-4">
                    <span>Include Symbols ( @#$% etc. )</span>
                    <input 
                      name="symbol" 
                      type="checkbox"
                      checked={symbol === true ? "checked" : null}
                      value={symbol}
                      onChange={this.changeInput}
                      />
                    <span className="slider"></span>
                  </label>
                  <label className="switch mb-4">
                    <span>Include Numbers ( 123456 etc. )</span>
                    <input 
                      name="numbers" 
                      checked={numbers === true ? "checked" : null} 
                      onChange={this.changeInput}
                      type="checkbox"/>
                    <span className="slider"></span>
                  </label>
                  <label className="switch mb-4">
                    <span>Include Lowercase Characters ( abcdefgh etc. )</span>
                    <input 
                      name="lowercase" 
                      checked={lowercase === true ? "checked" : null} 
                      onChange={this.changeInput}
                      type="checkbox"/>
                    <span className="slider"></span>
                  </label>
                  <label className="switch mb-4">
                    <span>Include Uppercase Characters ( ABCDEFGH etc. )</span>
                    <input 
                      name="uppercase" 
                      checked={uppercase === true ? "checked" : null}
                      onChange={this.changeInput}
                      type="checkbox"/>
                    <span className="slider"></span>
                  </label>
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      value={password}
                      onChange={this.changeInput}
                      id="myInput"
                      className="form-control form-control-lg"
                      placeholder="Generated password"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.copyText.bind(this,password)}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Generate Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="col-lg-8 mx-auto mt-5 mb-5">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#index</th>
                  <th>#password</th>
                  <th>#action</th>
                </tr>
              </thead>
              <tbody>
              {
                oldPasswords.reverse().map((v,k) => {
                  return (
                    <tr key={k}>
                      <td>
                        {v.id}
                      </td>
                      <td className="text-end">
                        {v.password}
                      </td>
                      <td><button
                        onClick={this.copyText.bind(this,v.password)} 
                        className="btn btn-sm btn-success">Copy</button></td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    );
  }
  
} 
