import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from "../common/TextFieldGroup";

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

    isValid() {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.userSignupRequest(this.state)
                .then(() => {
                })
                .catch((error) => {
                    this.setState({errors: error.response.data, isLoading: false})
                });
        }
    }

    render() {
        const {errors} = this.state;
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>

                <TextFieldGroup
                    error={errors.username}
                    field="username"
                    value={this.state.username}
                    label="Username"
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    error={errors.email}
                    field="email"
                    value={this.state.email}
                    label="Email"
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    error={errors.password}
                    field="password"
                    type="password"
                    value={this.state.password}
                    label="Password"
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    error={errors.passwordConfirmation}
                    field="passwordConfirmation"
                    type="password"
                    value={this.state.passwordConfirmation}
                    label="Password Confirmation"
                    onChange={this.onChange}
                />

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