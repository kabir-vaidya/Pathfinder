import React, {useState} from 'react';
import Node from './Node';
import {dijkstra, nodesInShortestOrder} from '../algorithm/dijkstra';

const Grid = () => {
    const createNode = (row, col) => {
        return {
            row,
            col,
            distance: Infinity,
            isVisited: false,
            isStart: false,
            isFinish: false,
            isWall: false,
            previousNode: null
        }
    }

    const initGrid = () => {
        const nodes = [];
        for(let row=0; row<20; row++){
            const rows = [];
            for(let col = 0; col<50; col++){
                rows.push(createNode(row, col))}
            nodes.push(rows)
        }
        return nodes;
    }

    const [grid, setGrid] = useState(initGrid());
    const [original, setOriginal] = useState([...grid]);

    console.log('reset');

 
    const START_NODE = grid[9][23];
    const FINISH_NODE = grid[14][40];
    // const tempGrid = grid.slice();

    START_NODE.isStart = true;
    FINISH_NODE.isFinish = true;

    const reset = () => {
        setGrid(initGrid());
        console.log(original);
    }

    const animateNodes = () => {
        const visitedNodes = dijkstra(START_NODE, FINISH_NODE, [...grid])
        const nodesInOrder = nodesInShortestOrder(FINISH_NODE);
        // console.log(tempGrid);
        for(let i=0; i<visitedNodes.length+1; i++){
            if(i == visitedNodes.length){
                setTimeout(() => {
                    for(let j=0; j<nodesInOrder.length; j++){
                        setTimeout(() => {
                            let node = nodesInOrder[j];
                            // console.log(`node-${node.row}-${node.col}`)
                            document.getElementById(`node-${node.row}-${node.col}`).className="node shortest";
                        }, 50*j);
                    }
                }, 10*i);
            } else {
            setTimeout(() => {
                let node = visitedNodes[i];
                // console.log(`node-${node.row}-${node.col}`)
                document.getElementById(`node-${node.row}-${node.col}`).className="node visited";
            }, 10*i);
        }
    }
        
        
    }
    
    // console.log(grid);
    return (
        <div>
            <button onClick={animateNodes}>Visualise pathfinding</button>
            <button onClick={reset}>Reset</button>
            <div className="grid">
                {tempGrid.map((rows, row) => 
                    <div key={row}>
                        {rows.map((node, col) => <Node node={node} key={`${row}${col}`} />)}
                    </div>   
                )}
            </div>
        </div>
        
    );
}

export default Grid;
