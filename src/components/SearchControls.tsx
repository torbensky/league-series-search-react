import * as React from "react";
import {Match} from "league-search";

export interface SearchControlsProps {
    hasNextResult: boolean;
    hasPrevResult: boolean;
    onSearch?: (event: SearchRequest) => void;
    onNext: () => void;
    onPrevious: () => void;
}

export interface SearchRequest {
    teamQuery?: string;
    keywordQuery?: string;
}

/*
* Component for rendering the various search controls
*/
export class SearchControls extends React.Component<SearchControlsProps, SearchControlState> {
    constructor(props: SearchControlsProps){
        super(props);
        this.requestSearch = this.requestSearch.bind(this);
        this.onTeamChange = this.onTeamChange.bind(this);
        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.state = {teamQuery: '', keywordQuery: ''};
    }

    requestSearch() {
        if(this.props.onSearch){
            this.props.onSearch(this.state);
        }
    }

    onTeamChange(event: React.FormEvent<HTMLInputElement>){
        this.setState({
            teamQuery: event.currentTarget.value
        });
    }

    onKeywordChange(event: React.FormEvent<HTMLInputElement>){
        this.setState({
            keywordQuery: event.currentTarget.value
        });
    }

    render() {
        return <div>
            <div className='field'>
                <label className='label'>Team</label>
                <input className='input' type="text" size={10} name="teamQuery" onChange={this.onTeamChange}/>
            </div>
            <div className='field'>
                <label className='label'>Keywords</label>
                <input className='input' type="text" size={10} name="keywordQuery" onChange={this.onKeywordChange}/>
            </div>
            <div className='field'>
                <p className="control">
                    <button className="button is-primary" onClick={this.requestSearch}>Search</button>
                </p>
            </div>
            <nav className='pagination'>
                <a className='pagination-previous' disabled={!this.props.hasPrevResult} onClick={this.props.onPrevious}>Previous</a>
                <a className='pagination-next' disabled={!this.props.hasNextResult} onClick={this.props.onNext}>Next</a>
            </nav>
        </div>;
    }
}

export interface SearchControlState {
    teamQuery?: string;
    keywordQuery?: string;
}