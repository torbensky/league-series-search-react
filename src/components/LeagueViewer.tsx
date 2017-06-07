import * as React from "react";
import * as Search from "league-search";
import {SearchResults} from "./SearchResults";
import {SearchControls, SearchRequest} from "./SearchControls";
import {Player} from "./Player";
import "bulma";

interface LeagueViewerProps {
    /*
    * a Google API key for accessing Youtube
    */
    apiKey: string,
    /*
    * The channel ID from which we search for league matches
    */
    channelId: string
}

interface LeagueViewerState {
    /*
    * The current search's results
    */
    results: Search.Match[];
    /*
    * Whether there are further paginated results
    */
    hasNextResult: boolean;
    /*
    * Whether there are previous paginated results
    */
    hasPrevResult: boolean;
    /*
    * The currently selected match
    */
    selectedMatch?: Search.Match;
}

export class LeagueViewer extends React.Component<LeagueViewerProps, LeagueViewerState> {
    search: Search.LeagueSearch;

    constructor(props: LeagueViewerProps){
        super(props);
        this.search = new Search.LeagueSearch(props.apiKey, props.channelId);

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.update = this.update.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.matchSelected = this.matchSelected.bind(this);
        this.state = {
            results: [],
            hasNextResult: false,
            hasPrevResult: false,
        };
        this.search.load(this.update);
    }

    handleNext() {
        this.search.next(this.update);
    }

    handlePrev() {
        this.search.prev(this.update);
    }

    update(err: Error, data: Search.Match[]) {
        if(err){
            console.log(err);
        }else{
            this.setState({
                results: data,
                hasNextResult: this.search.hasNext(),
                hasPrevResult: this.search.hasPrev()
            });
        }
    }

    matchSelected(match: Search.Match) {
        this.setState({
            selectedMatch: match
        });
    }

    handleSearch(searchRequest : SearchRequest){
        this.search.team = searchRequest.teamQuery;
        this.search.keywords = searchRequest.keywordQuery;
        this.search.load(this.update);
    }

    render() {
        let controlProps = {
            hasNextResult: this.search.hasNext(),
            hasPrevResult: this.search.hasPrev(),
            onSearch: this.handleSearch,
            onNext: this.handleNext,
            onPrevious: this.handlePrev
        };

        return <div style={{height: '100vh', marginLeft: '10px'}}>
            <div className="tile is-ancestor is-gapless">
                <div className="tile is-5 is-vertical is-parent is-gapless" style={{marginTop: '10px'}}>
                    <div className="tile is-child box">
                        <SearchControls {...controlProps}/>
                    </div>
                    <div className='tile is-child box' >
                        <SearchResults matches={this.state.results} onMatchSelect={this.matchSelected}/>   
                    </div>
                </div>
                <div className="tile is-parent is-gapless">
                    <div className='tile is-child '>
                        <Player match={this.state.selectedMatch} />
                    </div>
                </div>            
            </div>
        </div>;
    }
}
