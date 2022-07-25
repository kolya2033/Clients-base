import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import ArrowUp from "../arrow/ArrowUp";
import ArrowDown from "../arrow/ArrowDown";
import './ClientsList.css';

class ClientsList extends Component {
    state = {
        clientsList: this.props.smallClientsList,
        clientsListMod: this.props.smallClientsList,
        loading: this.props.loading,
        error: this.props.error,
        search: '',
        filter: true,
        filterName: ''
    }

    componentDidUpdate(prevProps) {
        if (this.props.client !== prevProps.client) {
            this.setState(({clientsListMod}) => ({
                clientsList: [this.props.client, ...clientsListMod],
                clientsListMod: [this.props.client, ...clientsListMod]
            }))
        }
    }
 

    sortClientsList = (filter) => {
        const newClientsList = this.state.clientsListMod.concat();
        // const sortNewClientsList = this.state.filter ? 
        //                                                 newClientsList.sort((a, b) => a[filter] > b[filter] ? 1 : -1) : 
        //                                                 newClientsList.sort((a, b) => b[filter] > a[filter] ? 1 : -1);
        let sortNewClientsList = newClientsList;
        if(filter === 'id') {
            if(filter !== this.state.filterName) {
                sortNewClientsList =  newClientsList.sort((a, b) => a[filter] > b[filter] ? 1 : -1)
                this.setState({
                    filter: true
                })
            } else  {
                sortNewClientsList = this.state.filter ? 
                                                            newClientsList.sort((a, b) => a[filter] > b[filter] ? 1 : -1) : 
                                                            newClientsList.sort((a, b) => b[filter] > a[filter] ? 1 : -1);
            }
        } else {
            if(filter !== this.state.filterName) {
                sortNewClientsList =  newClientsList.sort((a, b) => a[filter].toLowerCase() > b[filter].toLowerCase() ? 1 : -1)
                this.setState({
                    filter: true
                })
            } else  {
                sortNewClientsList = this.state.filter ? 
                                                            newClientsList.sort((a, b) => a[filter].toLowerCase() > b[filter].toLowerCase() ? 1 : -1) : 
                                                            newClientsList.sort((a, b) => b[filter].toLowerCase() > a[filter].toLowerCase() ? 1 : -1);
            }
        }

        
        this.setState(({filter}) => ({
            filter: !filter
        }))
        
        this.setState({
            clientsListMod: sortNewClientsList,
            filterName: filter
        })
    }

    onClientSelected = (client) => {
        this.props.clientSelected(client)
    }

    searchClients = (e) => {
        const search = e.target.value;
        this.setState({search})
    }

    serchEmp = (items, search) => {
        if (search.length === 0) {
            this.setState({
                clientsListMod: this.state.clientsList
            })
            return items;
        }

        const arr = items.filter(item => {
            const str = `${item.id} ${item.firstName} ${item.lastName} ${item.email} ${item.phone}`;
            if(str.indexOf(search) > -1){
                return item
            }
        })
        this.setState({
            clientsListMod: arr
        })
    }

    itemRender = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <tr className="cleint" key={i} onClick={() => this.onClientSelected(item)}>
                    <td className="form_item">{item.id}</td>
                    <td className="form_item">{item.firstName}</td>
                    <td className="form_item">{item.lastName}</td>
                    <td className="form_item">{item.email}</td>
                    <td className="form_item">{item.phone}</td>
                </tr>
            )
        })
        
        return items;
    }

    arrow = () => {
        return this.state.filter ? <ArrowDown/> : <ArrowUp/>;
    }

    render() {
        const {error, loading, clientsListMod, clientsList, search, filterName} = this.state
        const items =  this.itemRender(clientsListMod)

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <>
                <div>
                    <div className="searhPanel">
                        <input 
                            className="search" 
                            type="text"
                            placeholder="Найти сотрудника"
                            value={search}
                            onChange={this.searchClients}/>
                        <button className="button" onClick={() => this.serchEmp(clientsList, search)}>Поиск</button>
                    </div>
                    

                    <table className="form_clients">
                        <tr >
                            <td onClick={() => this.sortClientsList('id')} className="form_base">id{filterName === 'id' ? this.arrow() : null}</td>
                            <td onClick={() => this.sortClientsList('firstName')} className="form_base">first name{filterName === 'firstName' ? this.arrow() : null}</td>
                            <td onClick={() => this.sortClientsList('lastName')} className="form_base">last name{filterName === 'lastName' ? this.arrow() : null}</td>
                            <td onClick={() => this.sortClientsList('email')} className="form_base">email{filterName === 'email' ? this.arrow() : null}</td>
                            <td onClick={() => this.sortClientsList('phone')} className="form_base">phone{filterName === 'phone' ? this.arrow() : null}</td>
                        </tr>
                        {errorMessage}
                        {spinner}
                        {content}
                    </table>
                </div>
                
            </>
        )
    }

}

export default ClientsList;