import React from 'react';
import { SERVER_URL } from '../../constants';

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      isSubmitting: false
    }
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onSubmitSignIn = () => {
    this.setState({ isSubmitting: true });
    fetch(SERVER_URL + 'register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({ isSubmitting: false });
          throw new Error('HTTP response error. Cannot register.');
        }
      })
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
      .catch(console.log);;
  }

  render() {
    return (
      <div className="w-90 measure center br3 ba b--black-10 mv4 shadow-5">
        <main className="pa4 black-80">
          <div className="center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className={`
                  b ph3 pv2 input-reset ba bg-transparent f6 dib
                  ${this.state.isSubmitting ? 'b--gray' : 'b--black grow pointer'}
                `}
                type="submit"
                value="Register"
                onClick={this.onSubmitSignIn}
                disabled={this.state.isSubmitting}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Register;