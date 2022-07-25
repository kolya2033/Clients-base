import { Component } from 'react';
import Form from './form/Form';
import MainClientsList from './mainClientsList/MainClientsList';
import './App.css';
import SelectedClient from './selectedClient/SelectedClient';

class App extends Component {

    state = {
        client: null,
        clientSelected: null,
        modalActive: false,
    }

    onModalChange = (bool) => {
        this.setState({
            modalActive: bool
        })
    }

    onChangeClient = (id, firstName, lastName, email, phone) => {
        this.setState({
            client: {
                id,
                firstName,
                lastName,
                email,
                phone
            }
        })
    }

    clientSelected = (client) => {
        this.setState({
            clientSelected: client
        })
    }

    render() {
        return (
            <>
                <button className='button_app' onClick={() => this.onModalChange(true)}>MODAL</button>
                <Form onChangeClient={this.onChangeClient} onModalChange={this.onModalChange} modalActive={this.state.modalActive}/>
                <MainClientsList client={this.state.client} clientSelected={this.clientSelected}/>
                <SelectedClient clientSelected={this.state.clientSelected}/>
                
            </>
        );
    }
}

export default App;
