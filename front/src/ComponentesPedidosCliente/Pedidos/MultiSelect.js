import React, { Component } from 'react'
import PropTypes from 'prop-types';
// import './styles.css';

export class Multiselect extends Component {
    constructor(props) {
        super(props);
        this.state ={
            checked: [],
            productos:[],
            producto:props.producto
          }
          this.checkBox = this.checkBox.bind(this);
    }
    componentWillMount() {
      this.listadoProductos()
        console.log("--productos lista",this.state.productos)
    }
    listadoProductos = () => {
        fetch(`http://localhost:8383/productos`)
          .then((res) => res.json())
          .then((pds) =>
            this.setState({
              productos: pds,
              producto: {},
            })
          );
        console.log("productos enviado__________", this.state.productos);
      };
    removeChip(value) {
        this.checkBox(value, false);
    }
    checkBox(value, condition) {
        let checkedValue = this.state.checked;
        if(condition) {
            checkedValue.push(value);
        } else {
            let index = checkedValue.indexOf(value);
            checkedValue.splice(index, 1);
        }
        this.setState({
            checked: checkedValue
        }, () => {
            this.props.onSelectOptions(this.state.checked); 
        });
    }
    searchFun(e) {
        if(e.target.value.length !== 0) {
            let enteredValue = e.target.value.toLowerCase();
            let presentValue = this.props.options.filter(function(data) {
                return data.name.indexOf(enteredValue) > -1;
            })
            this.setState({productos: presentValue})
        } else {
            this.setState({productos: this.state.productos})
        }
    }
    returnChip() {
        const chip = this.state.checked ? this.state.checked.map((data, index) =>
            <div className="chip-body" key={index}>
                <p className="chip-text">{data}</p>
                <button className="chip-close" onClick={e => this.removeChip(data)}>&times;</button>
            </div>
        ) : []
        return chip;
    }
    returnList() {
        const list = this.state.productos ? this.state.productos.map((data, index) =>
        <label className="container" key={index}>{data.name}
        <input type="checkbox" value={data.value} onChange={e => this.checkBox(e.target.value, e.target.checked)} checked = {this.state.checked.includes(data.value) ? true : false} />
        <span className="checkmark"></span>
    </label>
        ) : null;
        return list;
    }
    render() {
        return (
            <div className="multiSelect">
                <div className="chip">
                    {this.returnChip()}
                </div>
                <input type="text" name="Search" placeholder="Search Data" className="input-box" onChange={e => this.searchFun(e)}/>
                <div className="search-result">
                    <div className="list-result">
                        {this.returnList()}
                    </div>
                </div>
            </div>
        )
    }
}

Multiselect.defaultProps = {
    productos: []
}

/** define proptypes including fields which is required */
Multiselect.prototypes = {
    productos: PropTypes.array.isRequired,
    onSelectOptions: PropTypes.func
}

export default Multiselect;