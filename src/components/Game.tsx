import * as React from 'react';
import Board from './Board';
import Player from 'src/classes/Player';
import Barrier from 'src/classes/Barrier';
import styled from 'styled-components';

const BOARD_HEIGHT = 400;
const BOARD_WIDTH = 800;

const Score = styled.div`
    margin: 10px;
`;

export interface IGameState {
    player: Player;
    barriers: Barrier[];
    score: number;
}

export default class Game extends React.Component<{}, IGameState> {
    private spacePressed = false;
    private interval: NodeJS.Timeout = null;
    private roundCounter = 0;

    constructor(props) {
        super(props);

        this.state = {
            player: new Player(50, BOARD_HEIGHT / 2),
            barriers: [this.generateBarrier(BOARD_HEIGHT / 2)],
            score: 0
        };
    }

    public render() {
        return (<>
            <Board
                rectangles={[
                    this.state.player,
                    ...this.state.barriers.reduce((acc, barrier) => {
                        acc.push(...barrier.getRectangles());
                        return acc;
                    }, [])]}
                width={BOARD_WIDTH}
                height={BOARD_HEIGHT}
            />
            <Score>Score: {this.state.score}</Score>
        </>)
    }

    public componentDidMount() {
        document.body.addEventListener('keydown', this.spaceDown.bind(this));
        document.body.addEventListener('keyup', this.spaceUp.bind(this));

        this.interval = setInterval(() => {
            this.update();
        }, 10);
    }

    private spaceDown(ev: KeyboardEvent) {
        if (ev.keyCode === 32) {
            this.spacePressed = true;
        }
    }

    private spaceUp(ev: KeyboardEvent) {
        if (ev.keyCode === 32) {
            this.spacePressed = false;
        }
    }

    private update() {
        this.setState(({ player, barriers, score }) => {
            if ((!this.spacePressed && player.getBottom() === BOARD_HEIGHT) || (this.spacePressed && player.y === 0)) {
                player.acceleration = 0;
            } else {
                player.acceleration += 0.04 * (this.spacePressed ? -1 : 1);
            }
            player.y = Math.max(Math.min(player.y + player.acceleration, BOARD_HEIGHT - player.height), 0);
            barriers.forEach((b, idx) => {
                b.moveLeft(1);
            });
            barriers = barriers.filter(b => !b.isOutsideBoard());
            const lastBarrier = barriers[barriers.length - 1];
            if (lastBarrier.getX() + lastBarrier.width < BOARD_WIDTH - 200) barriers.push(this.generateBarrier(lastBarrier.passageY));

            this.roundCounter += 1;
            if (this.roundCounter % 120 === 0) score += 1;
            barriers.some(b => {
                if (b.hasCollided(player)) {
                    if (this.interval) {
                        clearInterval(this.interval);
                        this.interval = null;
                    }
                    return true;
                }

                return false;
            });

            return { player, barriers, score };
        });
    }

    private generateBarrier(prevPassageY: number, passageHeight = 100) {
        const passageY = Math.min(Math.max(prevPassageY + Math.ceil(Math.random() * BOARD_HEIGHT) - BOARD_HEIGHT / 2, 0 + passageHeight / 2 + 50), BOARD_HEIGHT - passageHeight / 2 - 50);

        return new Barrier(BOARD_WIDTH, BOARD_HEIGHT, passageHeight, passageY);
    }
}