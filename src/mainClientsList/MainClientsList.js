import { Component } from "react";
import Spinner from "../spinner/Spinner";
import Services from '../services/Services';
import ClientsList from "../clientsList/ClientsList";
import BigClientsList from "../bigClientsList/BigClientsList";
import './MainClientsList.css';

class MainClientsList extends Component {

    state = {
        smallClientsList: [],
        bigClientsList: [],
        loadingSmallClientsList: true,
        errorSmallClientsList: false,
        loadingBigClientsList: true,
        errorBigClientsList: false,
        bigClientsListVisible: false,
        smallClientsListVisible: false,
        render: false
    }

    services = new Services();

    onSmallClientsLoaded = (clientsList) => {
        if(this.props.client) {
            this.setState({
                smallClientsList: [this.props.client, ...clientsList],
                loadingSmallClientsList: false,
                errorSmallClientsList: false,
            }) 
        } else {
            this.setState({
                smallClientsList: clientsList,
                loadingSmallClientsList: false,
                errorSmallClientsList: false,
            }) 
        }
        
    }

    onBigClientsLoaded = (clientsList) => {
        if(this.props.client) {
            this.setState({
                bigClientsList: [this.props.client, ...clientsList],
                loadingBigClientsList: false,
                errorBigClientsList: false,
            }) 
        } else {
            this.setState({
                bigClientsList: clientsList,
                loadingBigClientsList: false,
                errorBigClientsList: false,
            }) 
        }
    }

    onNewClientsLoading = () => {
        this.setState(({smallClientsList, bigClientsList}) => ({
            smallClientsList: [this.props.client, ...smallClientsList],
            bigClientsList: [this.props.client, ...bigClientsList],
        })) 
    }

    componentDidUpdate(prevProps) {
        if (this.props.client !== prevProps.client) {
            this.onNewClientsLoading()
        }
    }

    onSmallError = () => {
        this.setState({
            errorSmallClientsList: true,
            loadingSmallClientsList: false,
        })
    }

    onBigError = () => {
        this.setState({
            errorBigClientsList: true,
            loadingBigClientsList: false,
        })
    }

    

    componentDidMount() {
        this.services
            .getBigClientsList()
            .then(this.onBigClientsLoaded)
            .catch(this.onBigError)
        this.services
            .getSmallClientsList()
            .then(this.onSmallClientsLoaded)
            .catch(this.onSmallError)
        
    }  

    onBigClientsList = () => {
        this.setState(({render}) => ({
            bigClientsListVisible: true,
            smallClientsListVisible: false,
            render: !render
        }))
    }

    onSmallClientsList = () => {
        this.setState(({render}) => ({
            bigClientsListVisible: false,
            smallClientsListVisible: true,
            render: !render
        }))
    }

    render() {
        const {bigClientsListVisible, smallClientsListVisible, smallClientsList, bigClientsList, loadingBigClientsList, errorBigClientsList, loadingSmallClientsList, errorSmallClientsList} = this.state;

        const spinner = loadingBigClientsList || loadingSmallClientsList ? <Spinner/> : null;

        const plug =  !bigClientsListVisible && !smallClientsListVisible  && !(loadingBigClientsList || loadingSmallClientsList) ? <h2 className="plug">select the desired list</h2> : null;

        const smallList = !bigClientsListVisible && smallClientsListVisible  ? <ClientsList client={this.props.client} clientSelected={this.props.clientSelected} smallClientsList={smallClientsList} loading={loadingSmallClientsList} error={errorSmallClientsList}/> : null;

        const bigList = bigClientsListVisible && !smallClientsListVisible  ? <BigClientsList client={this.props.client} clientSelected={this.props.clientSelected} bigClientsList={bigClientsList} loading={loadingBigClientsList} error={errorBigClientsList}/> : null;

        return (
            <>
                <div >
                    <div className="btn_list">
                        <button 
                            style={{'background': bigClientsListVisible ? '#fd5050': '#efefef'}}
                            className="btn_clients_list" 
                            disabled={loadingBigClientsList}
                            onClick={this.onBigClientsList}
                            >show big list</button>
                        <button 
                            style={{'background': smallClientsListVisible ? '#fd5050': '#efefef'}}
                            className="btn_clients_list" 
                            disabled={loadingSmallClientsList}
                            onClick={this.onSmallClientsList}
                            >show small list</button>
                    </div>
                   
                </div>
                <div>
                    {spinner}
                    {plug}
                    {smallList}
                    {bigList}
                </div>
            </>
        )
    }
}

export default MainClientsList;