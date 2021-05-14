import React,{useState} from "react";
import { Multiselect } from "multiselect-react-dropdown";
import Select from "react-select";
function MultiselectD(props) {
  var options =
[
    { value: 1, label: "h" },
    { value: 2, label: "c" },
  ];

  var [displayValue,getValue]=useState();
  var handler=(e)=>{
   getValue(Array.isArray(e)?e.map(x=>x.label):[]);
  }
  return (
    <div>
      <Multiselect isMulti onChange={handler}
        options={options}
        //   selectedValues={this.state.producto}
        //   onSelect={this.onSelect}
        //   onRemove={this.onRemove}
        //   defaultValue={"gika"}
        //   displayValue="producto"
      />
      <center><b>saluda</b><h3 style={{color:'red'}}><row>{displayValue}</row></h3></center>
    </div>
  );
}
export default MultiselectD;
