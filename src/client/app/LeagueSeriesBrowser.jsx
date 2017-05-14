import React from 'react';
import Search from 'league-series-search'

class LeagueSeriesBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.search = new Search('API_KEY','UCQJT7rpynlR7SSdn3OyuI_Q');
    this.state = {
        results : []
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);

    this.search.load(this.update());
  }

  selectMatches(series, e){
    console.log(series);
  }

  handleNext() {
    this.search.next(this.update());
  }

  handlePrev() {
    this.search.prev(this.update());
  }

  update() {
    var _this = this;
    return (err,data) => {
        if(err){
            console.log(err);
        }else{
            _this.setState({
                results: data
            });
        }
    };
  }

  render() {
    const results = this.state.results.map((r,idx) => {
        let boundClick = this.selectMatches.bind(this, r.matchVideoIds);

        return <li key={idx} onClick={boundClick}>
            <b>{r.meta.team1}</b> vs <b>{r.meta.team2}</b> - <i>{r.meta.description}</i>  
        </li>
    });

    return (
      <div className='main'>
        <div className='searchControls'>
            {this.search.hasPrev() && <button onClick={this.handlePrev}>Prev</button>}
            {this.search.hasNext() && <button onClick={this.handleNext}>Next</button>}
        </div>
        <ul className='results'>{results}</ul>
      </div>
    );
  }

}

export default LeagueSeriesBrowser;