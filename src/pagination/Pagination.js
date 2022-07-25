import {Component} from "react";

class Pagination extends Component {
    
    
    renderItem = (pages) => {
        let array = []
        for (let index = 1; index <= pages; index++) {
            array.push(index);
        }

        const items = array.map(item => {
            return this.props.page == item ? 
                                            <li key={item} style={{'cursor': 'pointer'}} onClick={(e) => this.props.selectPage(e)} className="page-item"><a style={{'backgroundColor': '#c5d4ff'}} className="page-link">{item}</a></li> :
                                            <li key={item} style={{'cursor': 'pointer'}} onClick={(e) => this.props.selectPage(e)} className="page-item"><a className="page-link">{item}</a></li>
        })
        return items
    }

    render () {
        const item = this.renderItem(this.props.pages)

        return(
            <>
            <nav aria-label="..." style={{"text-align": "center", "padding" : "15px 0"}}>
                <ul className="pagination" style={{"display": "inline-flex"}}>
                    <li style={{'cursor': 'pointer'}} className={this.props.page == 1? "page-item disabled" : "page-item"} onClick={() => this.props.minusPage()}>
                        <a className="page-link" tabIndex="1">Previous</a>
                    </li>

                    {item}

                    <li style={{'cursor': 'pointer'}} className={this.props.page == this.props.pages? "page-item disabled" : "page-item"} onClick={() => this.props.plusPage()}>
                        <a className="page-link">Next</a>
                    </li>
                </ul>
            </nav>
            </>
        )
    }
}

export default Pagination;