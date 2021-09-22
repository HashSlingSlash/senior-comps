import React from 'react'
import { supabase } from '../../supabaseClient'
import {withRouter} from "react-router";

class SignUp extends React.Component{
    constructor(){
        super();
        this._handleSignUp = this._handleSignUp.bind(this);
        this._setLoading = this._setLoading.bind(this);
        this._setEmail = this._setEmail.bind(this);
        this._setPassword = this._setPassword.bind(this);
        this.state={
            loading: false,
            email: '',
            password: ''
        }
    }

    _setLoading(val){
        this.setState({
            loading: val
        });
    }

    _setEmail(val){
        this.setState({
            email: val
        });
    }

    _setPassword(val){
        this.setState({
            password: val
        });
    }

    _handleSignUp = async (email, password) => {
        try {
          this._setLoading(true)
          const { error } = await supabase.auth.signUp({ email, password })
          if (error) throw error
          alert('Check your email for the login link!')
        } catch (error) {
          alert(error.error_description || error.message)
        } finally {
          this._setLoading(false)
          window.location.href = "/Account"
        }
      }

    render(){
        return(
            <div className="row flex flex-center">
            <div className="col-6 form-widget">
              <h1 className="header">Supabase + React</h1>
              <p className="description">Sign up via with your email and password</p>
              <div>
                <input
                  className="inputField"
                  type="email"
                  placeholder="Your email"
                  value={this.state.email}
                  onChange={(e) => this._setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  className="inputField"
                  type="password"
                  placeholder="password"
                  onChange={(e) => this._setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    this._handleSignUp(this.state.email, this.state.password)
                  }}
                  className={'button block'}
                  disabled={this.state.loading}
                >
                  {this.state.loading ? <span>Loading</span> : <span>Send magic link</span>}
                </button>
              </div>
            </div>
          </div>
        )
    }
}
export default withRouter(SignUp);
