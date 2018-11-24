import * as React from 'react';
import styled from 'styled-components';
import IRectangle from 'src/interfaces/IRectangle';

type ContainerProps = Pick<IBoardProps, 'height' | 'width'>;

const Container = styled.div<ContainerProps>`
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    border: 1px solid black; 
    margin: 10px;
`;

export interface IBoardProps {
    rectangles: IRectangle[];
    width: number;
    height: number;
}

export default class Board extends React.Component<IBoardProps> {
    private canvas: HTMLCanvasElement = null;

    public render() {
        const {
            width,
            height
        } = this.props;

        return (<Container width={width} height={height}>
            <canvas ref={ref => { this.canvas = ref; }} height={height} width={width} />
        </Container>);
    }

    public componentDidMount() {
        this.draw();
    }

    public componentDidUpdate(){
        this.draw();
    }

    private draw() {
        const {
            width,
            height
        } = this.props;

        if (this.canvas) {
            const ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, width, height);

            for (const rectangle of this.props.rectangles) {
                ctx.fillStyle = rectangle.color;
                ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            }
        }
    }
}