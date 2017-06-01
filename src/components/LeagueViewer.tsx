import * as React from "react";
import * as Search from "league-search";

interface LeagueViewerProps {
    apiKey: string,
    channelId: string
}

interface LeagueViewerState {
    results: Search.Match[];
    hasNextResult: boolean;
    hasPrevResult: boolean;
    selectedMatch: Search.Match;
}

export class LeagueViewer extends React.Component<LeagueViewerProps, LeagueViewerState> {
    search: Search.LeagueSearch;

    constructor(props: LeagueViewerProps){
        super(props);
        this.search = new Search.LeagueSearch(props.apiKey, props.channelId);

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.update = this.update.bind(this);

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
                hasPrevResult: this.search.hasPrev(),
            });
        }
    }

    render() {
        return <div>
            
        </div>;
    }
}
