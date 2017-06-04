import * as React from "react";
import * as Search from "league-search";
import {MatchDetails} from "./MatchDetails";
import * as _ from "lodash";

export interface SearchResultsProps {
    /*
    * a list of the search results
    */
    matches: Search.Match[];
    /*
    * match selection callback
    */
    onMatchSelect: (match: Search.Match) => void;
}

/*
This component displays a list of matches
*/
export class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
    constructor(props: SearchResultsProps){
        super(props);
        this.matchSelected = this.matchSelected.bind(this);
    }

    matchSelected(match: Search.Match) {
        // Update state for selected match
        this.setState({
            selectedMatch: match
        });
        // Invoke callback
        return this.props.onMatchSelect(match);
    }

    componentWillReceiveProps(nextProps: SearchResultsProps){
        // clear out previous match selection
        if(!_.isEqual(this.props, nextProps)){
            this.setState({});
        }
    }

    /*
    * Check whether the argument is the selected match
    */
    isSelected(match: Search.Match){
        return _.isEqual(match, this.state.selectedMatch);
    }

    render (){
        const props = this.props;

        let matchesFound;
        if(props.matches){
            matchesFound = props.matches.map((m,idx) => {
                return <MatchDetails key={idx} selected={this.isSelected(m)} match={m} onSelect={this.matchSelected} />;
            });
        }else{
            matchesFound = <h1>No matches</h1>;
        }

        const resultsStyle : React.CSSProperties = {
            overflowY: 'auto',
            minHeight: '50vh',
            maxHeight: '80vh'
        }

        return <div style={resultsStyle}>
            {matchesFound}
        </div>;
    }
}

interface SearchResultsState {
    /*
    * The currently selected match
    */
    selectedMatch?: Search.Match;
}