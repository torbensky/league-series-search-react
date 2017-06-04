import * as React from 'react';
import * as Search from 'league-search';
import YoutubePlayer from 'react-youtube-player';
import * as _ from "lodash";

export interface PlayerProps {
    match: Search.Match;
}

export class Player extends React.Component<PlayerProps, PlayerState>{
    constructor(props: PlayerProps){
        super(props);
        this.state = {};
        this.playNextGame = this.playNextGame.bind(this);
        this.playPrevGame = this.playPrevGame.bind(this);
    }
    componentWillReceiveProps(props: PlayerProps){
        if(!_.isEqual(props.match, this.state.match)){
            this.setState({
                match: props.match,
                nowPlayingIndex: 0,
                finishedMatch: false
            });
        }
    }
    playNextGame(){
        if(this._hasNextGame()){
            this.setState({
                nowPlayingIndex: this.state.nowPlayingIndex + 1
            })
        }else{
            this.setState({
                finishedMatch: true
            })
        }
    }
    playPrevGame(){
        if(this._hasPrevGame()){
            this.setState({
                nowPlayingIndex: this.state.nowPlayingIndex - 1
            })
        }
    }
    _hasNextGame() : boolean {
        return this.state.nowPlayingIndex < this.state.match.gameCount - 1;
    }
    _hasPrevGame() : boolean {
        return this.state.nowPlayingIndex > 0;
    }
    render() {
        if(this.state.match){
            return <div style={{height: '94vh'}}>
                <YoutubePlayer
                    videoId={this.state.match.matchVideoIds[this.state.nowPlayingIndex]}
                    playbackState='playing'
                    height={90}
                    configuration={{
                            showinfo: 0,
                            controls: 1
                    }}
                />
                <nav className='nav' style={{backgroundColor: 'black'}}>
                    <div className='nav-left'>
                        <div className='nav-item'>
                            <a className='button' disabled={!this._hasPrevGame()} onClick={this.playPrevGame}>Previous Game</a>
                        </div>
                    </div>
                    <div className='nav-right'>
                        <div className='nav-item'>
                            <a className='button' onClick={this.playNextGame}>Next Game</a>
                        </div>
                    </div>
                </nav>
            </div>;
        }else{
            return <br/>;
        }
    }
}

interface PlayerState {
    match?: Search.Match;
    nowPlayingIndex?: number;
    finishedMatch?: boolean;
}