import React from 'react';
import { SERVER_URL } from '../../constants';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      isSubmitting: false
    }
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  }

  onSubmitSignIn = () => {
    this.setState({ isSubmitting: true });
    fetch(SERVER_URL + 'signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({ isSubmitting: false });
          throw new Error('HTTP response error. Cannot sign in.');
        }
      })
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
      .catch(console.log);
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="w-90 measure center br3 ba b--black-10 mv4 shadow-5">
        <main className="pa4 black-80">
          <div className="center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Sign In</legend>
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
                value="Sign in"
                onClick={this.onSubmitSignIn}
                disabled={this.state.isSubmitting}
              />
            </div>
            <div className="lh-copy tr">
              <p className="f6 mb0 mt2 black db">{'No Account? '}
                <span
                  className="underline link dim pointer"
                  onClick={() => onRouteChange('register')}
                >
                  {'Register'}
                </span>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default SignIn;