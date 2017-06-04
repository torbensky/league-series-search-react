import * as React from "react";
import * as Search from "league-search";

export interface MatchDetailsProps {
    /*
    * The match which this component displays
    */
    match: Search.Match;
    /*
    * Whether this component is selected
    */
    selected: boolean;
    /*
    * callback for when this match is selected
    */
    onSelect: (match: Search.Match) => void;
}

/*
* transforms the parent callback into a click handler
*/
export const handleClicked = (props: MatchDetailsProps) => () => {
    props.onSelect(props.match);
}

/*
* This component is for displaying the details of a particular match
*/
export const MatchDetails = (props: MatchDetailsProps) => {
    const divClassName = props.selected ? 'card selected' : 'card';

    return <div className={divClassName} onClick={handleClicked(props)}>        
        <div className='card-content'>
            <div className='media'>
                <div className='media-left'>
                    <figure className='image is-96x96'>
                        <img src={props.match.thumbnail.url} alt="Image"/>
                    </figure>
                </div>
                <div className='media-content'>
                    <p className='title is-4'>{props.match.meta.team1} vs {props.match.meta.team2}</p>
                    {props.match.description}
                </div>
            </div>
        </div>
    </div>;
}