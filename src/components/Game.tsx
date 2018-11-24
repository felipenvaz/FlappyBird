import * as React from 'react';
import Board from './Board';
import Player from 'src/classes/Player';

const BOARD_HEIGHT = 800;
const BOARD_WIDTH = 1600;

export interface IGameState {
    player: Player;
    
}

export default class Game extends React.Component<{}, IGameState> {
    constructor(props) {
        super(props);

        this.state = {
            player: new Player(50, BOARD_HEIGHT / 2)
        };
    }

    public render() {
        return <Board
            rectangles={[this.state.player]}
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
        />
    }

    private update() {
        const {
            player
        } = this.state;

        if (player.getBottom() === BOARD_HEIGHT) player.acceleration = 0;

    }
}