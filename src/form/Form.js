import { Component } from "react";
import './Form.css';

class Form extends Component {

    state = {
        formComplit: 'Заполните форму полностью',
        id: '',
        idDirty: false,
        idError: 'id не может быть пустым',
        firstName: '',
        firstNameDirty: false,
        firstNameError: 'first name не может быть пустым',
        lastName: '',
        lastNameDirty: false,
        lastNameError: 'last name не может быть пустым',
        email: '',
        emailDirty: false,
        emailError: 'email не может быть пустым',
        phone: '',
        phoneDirty: false,
        phoneError: 'phone не может быть пустым',
    }

    componentDidUpdate() {
        window.addEventListener('keydown', this.onkeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onkeyDown)
    }

    onIdchange = (e) => {
        this.setState({
            id: e.target.value,
        })
        if (e.target.value) {
            this.setState({
                idError: ''
            })
        } else  {
            this.setState({
                idError: 'id не может быть пустым'
            })
        }
    }

    onNamechange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        const res = /^[a-z]+$/;
        if (!res.test(String(e.target.value).toLowerCase())) {
            this.setState({
                [`${e.target.name}Error`]: 'некоректное имя'
            })
        } else {
            this.setState({
                [`${e.target.name}Error`]: ''
            })
        }
    }

    onEmailchange = (e) => {
        this.setState({
            email: e.target.value,
        })
        const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.test(String(e.target.value).toLowerCase())) {
            this.setState({
                emailError: 'некоректный email'
            })
        } else {
            this.setState({
                emailError: ''
            })
        }
    }

    onPhonechange = (e) => {
        this.setState({
            phone: e.target.value,
        })
        const phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!phone.test(String(e.target.value).toLowerCase())) {
            this.setState({
                phoneError: 'некоректный телефон'
            })
        } else {
            this.setState({
                phoneError: ''
            })
        }
    }

    onDirtyChange = (e) => {
        this.setState({
            [`${e.target.name}Dirty`]: true,
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.id && this.state.firstName && this.state.lastName && this.state.email && this.state.phone && !this.state.idError && !this.state.firstNameError && !this.state.lastNameError && !this.state.emailError && !this.state.phoneError) {
            this.props.onChangeClient(this.state.id, this.state.firstName, this.state.lastName, this.state.email, this.state.phone);
            this.props.onModalChange(false);
        } 
    }

    onkeyDown = (e) => {
        if (e.keyCode === 27) {
            this.props.onModalChange(false)
        }
    }


    render() {
        const {id, firstName, lastName, email, phone} = this.state
        return (
            <>  
                <div  className={this.props.modalActive ? "formm active" : "formm"} onClick={() => this.props.onModalChange(false)}>
                    <form 
                        onClick={e => e.stopPropagation()}
                        className="formm_content"
                        onSubmit={this.onSubmit}>
                        <h4>{this.state.formComplit}</h4>
                        <h3 style={{'fontSize': '23px', "marginBottom" : 5}}>id</h3>
                        {(this.state.idDirty && this.state.idError) && <div style={{color: 'red'}}>{this.state.idError}</div>}
                        <input 
                            onBlur={e => this.onDirtyChange(e)}
                            className="form_inputt"
                            type="number" 
                            name="id"
                            value={id}
                            onChange={this.onIdchange}/>

                        <h3 style={{'fontSize': '23px', "marginBottom" : 5}}>first name</h3>
                        {(this.state.firstNameDirty && this.state.firstNameError) && <div style={{color: 'red'}}>{this.state.firstNameError}</div>}
                        <input 
                            onBlur={e => this.onDirtyChange(e)}
                            className="form_inputt"
                            type="text" 
                            name="firstName"
                            value={firstName}
                            onChange={this.onNamechange}/>

                        <h3 style={{'fontSize': '23px', "marginBottom" : 5}}>last name</h3>
                        {(this.state.lastNameDirty && this.state.lastNameError) && <div style={{color: 'red'}}>{this.state.lastNameError}</div>}
                        <input 
                            onBlur={e => this.onDirtyChange(e)}
                            className="form_inputt"
                            type="text" 
                            name="lastName"
                            value={lastName}
                            onChange={this.onNamechange}/>

                        <h3 style={{'fontSize': '23px', "marginBottom" : 5}}>email</h3>
                        {(this.state.emailDirty && this.state.emailError) && <div style={{color: 'red'}}>{this.state.emailError}</div>}
                        <input 
                            onBlur={e => this.onDirtyChange(e)}
                            className="form_inputt"
                            type="email" 
                            name="email"
                            value={email}
                            onChange={this.onEmailchange}/>

                        <h3 style={{'fontSize': '23px', "marginBottom" : 5}}>phone</h3>
                        {(this.state.phoneDirty && this.state.phoneError) && <div style={{color: 'red'}}>{this.state.phoneError}</div>}
                        <input 
                            onBlur={e => this.onDirtyChange(e)}
                            className="form_inputt"
                            type="phone" 
                            name="phone"
                            value={phone}
                            onChange={this.onPhonechange}/>
                        
                        <button 
                            type="submit"
                            className="button_form">Subscribe</button>
                    </form>
                </div>
                
                
            </>
        )
    }

}

export default Form;