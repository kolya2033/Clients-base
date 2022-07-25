import { Component } from "react";
import Skeleton from "./Skeleton";
import './SelectedClient.css';

class SelectedClient extends Component {

    clientSelectedRender = () => {
        const {firstName, lastName, email, phone, address, description} = this.props.clientSelected
        return (
            <>
                <h2 className="title">Выбраный пользователь <b>{firstName} {lastName}</b></h2>
                <h3 className="title">Описание:</h3>
                <textarea value={description ? description : 'описание отсутствует'} className="description">
                    {description ? description : 'описание отсутствует'}
                </textarea>
                <h3 className="title">Адрес проживани: <b>{address ? address.streetAddress : 'ардес отсутствует'}</b></h3>
                <h3 className="title">Город: <b>{address ? address.city : 'Город отсутствует'}</b></h3>
                <h3 className="title">Провинция/штат: <b>{address ? address.state : 'Штат отсутствует'}</b></h3>
                <h3 className="title">Индекс: <b>{address ? address.zip : 'Индекс отсутствует'}</b></h3>
            </>
        )
    }
    
    render() {
        
        return(
            <>  
                <div className="clientSelected">
                    {this.props.clientSelected ? this.clientSelectedRender() : <Skeleton/>}
                </div>
            </>
        )
    }
}



export default SelectedClient