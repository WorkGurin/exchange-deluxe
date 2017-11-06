import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: '',
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit(e) {
        e.preventDefault();
        this.setState({errors: {}, isLoading: true});
        this.props.userSignupRequest(this.state)
            .then(() => {
            })
            .catch((error) => {
                this.setState({errors: error.response.data, isLoading: false})
            });
    }

    render() {
        const {errors} = this.state;
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>
                <div className={classnames("form-group", {'has-error': errors.username})}>
                    <label htmlFor="username" className="control-label">Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"/>
                    {errors.username && <span className="help-block">{errors.username}</span>}
                </div>

                <div className={classnames("form-group", {'has-error': errors.email})}>
                    <label htmlFor="email" className="control-label">E-mail</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"/>
                    {errors.email && <span className="help-block">{errors.email}</span>}
                </div>

                <div className={classnames("form-group", {'has-error': errors.password})}>
                    <label htmlFor="password" className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className="form-control"/>
                    {errors.password && <span className="help-block">{errors.password}</span>}
                </div>

                <div className={classnames("form-group", {'has-error': errors.passwordConfirmation})}>
                    <label htmlFor="passwordConfirmation" className="control-label">Password Confirmation</label>
                    <input
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirmation"
                        className="form-control"/>
                    {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
                </div>

                <div className={classnames("form-group", {'has-error': errors.timezone})}>
                    <label htmlFor="timezone" className="control-label">Timezone</label>
                    <select
                        value={this.state.timezone}
                        onChange={this.onChange}
                        name="timezone"
                        className="form-control">
                        <option value="" disabled>Choose Your Timezone</option>
                        {options}
                    </select>
                    {errors.timezone && <span className="help-block">{errors.timezone}</span>}
                </div>

                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

export default SignupForm;