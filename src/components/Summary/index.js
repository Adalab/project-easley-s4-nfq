import React, { Component } from 'react';
import countBy from 'lodash.countby';


class Summary extends Component {
  componentDidMount() {
      this.props.getRepository(null, "OPEN","summary");
      this.props.getRepository(null, "MERGED","summary");
      this.props.getRepository(null, "DECLINED","summary");
      this.props.getToken();

  }

  getDataforChart(status){
    let data="";
    if(status === "open"){
      data = this.props.openData.flat()
    }
    else if(status === "merged"){
      data = this.props.mergedData.flat()
    }
    else if(status === "declined"){
      console.log('data declined',this.props.data)
      data = this.props.declinedData.flat()
    }

    const namesData = data.map(user =>{
      if(user !== ""){
        return user.author.display_name
      }
      else{
        return ""
      }

    })
    console.log('data',data)
    console.log('reducebyname',namesData)
    const countedName = countBy(namesData);
    console.log('counted',countedName)
    return countedName
  }

  render() {
    const openForChart = this.getDataforChart("open")
    const mergedForChart = this.getDataforChart("merged")
    return (
      <div>
        <p>Summary</p>
      </div>
    );
  }
}

export default Summary;
