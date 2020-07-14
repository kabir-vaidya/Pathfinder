import React, { useState } from 'react';

const Node = (props) => {

    const [node, setNode] = useState(props.node    );

    return (
        <div id={`node-${node.row}-${node.col}`} 
            className={`node ${node.isStart?"start":""} ${node.isFinish?"finish":""}`}>
            
        </div>
    );
}

export default Node;
