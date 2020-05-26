import React, { Component } from 'react'

 class QuantityList extends Component {

     constructor(props) {
         super(props)
     
         this.state = {
            quantityType: '',
            quantityList: [],
            quantityUnitsList: [],
            unitType: '',
            OutputUnitType: '',
            path: '',
            outputValue: [],
            values: ''
         }
     }

      componentDidMount() {
        fetch('http://localhost:8080/quantity')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    quantityList: json
                })
            })
            fetch('http://localhost:8080/quantity/LENGTH')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    quantityUnitsList: json,
                    quantityType: 'LENGTH'
                })
            })
    }
     
handleChangeUnit = (event) =>{
    fetch(`http://localhost:8080/quantity/${event.target.value}`)
   .then(res => res.json())
            .then(json => {
                this.setState({
                    quantityUnitsList: json
                })
            })
}

handleChangeinput = async(event) => {
        const val = event.target.value
        await this.setState({
            values: val
        })
        fetch("http://localhost:8080/quantity/" + this.state.OutputUnitType, {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({ "unit": this.state.unitType, "value": this.state.values})
        }).then(res => res.json())
            .then(json => {
                console.log(json)
                    this.setState({
                        outputValue: json
                    })
                })   
    }

handleChangeInUnits = (event) => {
        this.setState({
                unitType: event.target.value
        })
} 

handleChangeOnUnit = (event) => {
    this.setState({
                OutputUnitType: event.target.value
        })
}

    render() {
        const {quantityList, quantityUnitsList, outputValue} = this.state;
        return (
        <div className="flex">
             <div>
                <select style={{ width:'275%', height:'30px', background: 'whiteSmoke' }}
                 onChange={this.handleChangeUnit}>
                {quantityList.map(element => <option>{element}</option>)}
                </select>
             </div>
                <br/>

            <div>
                 <div className="flex" style={{ flexDirection:'row' }}>
                    <div className="flex" style={{ flexDirection:'column', width:'370%', height:'50px' }}>
                        <input style={{ height:'15px', padding: '1px 6px' }} type="text" onChangeCapture={this.handleChangeinput}/>
                            <select  style={{ width:'100%', height:'20px', background: 'whiteSmoke' }} 
                            onChange ={this.handleChangeInUnits}>
                            {quantityUnitsList.map(units => <option>{units}</option>)}
                            </select>
                    </div>

                    <text style={{ fontSize:'30px', color: '#878787' }}> = </text>
                    
                    <div className="flex" style={{ flexDirection:'column', width:'370%', height:'50px' }}>
                        <input style={{ height:'15px', padding: '1px 6px' }} type="text" value={JSON.stringify(outputValue)} />
                            <select style={{ width:'100%', height:'20px', background: 'whiteSmoke' }}
                            onChange={this.handleChangeOnUnit}>
                            {quantityUnitsList.map(units => <option>{units}</option>)}
                            </select>
                    </div>
                </div>
            </div>  
        </div>
        );
    }
}

export default QuantityList
