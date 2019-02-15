import React, { Component } from 'react';

class Summary extends Component {
  componentDidMount() {
      this.props.getRepository(null, "OPEN","summary");
      this.props.getRepository(null, "MERGED","summary");
      this.props.getRepository(null, "DECLINED","summary");
      this.props.getToken();
  }


  render() {
    const {summaryData} = this.props;
    console.log (summaryData)

    return (
      <div>
        <p>Summary</p>
      </div>
    );
  }
}

export default Summary;
