//IMPORTS
import React from 'react';


class CanvasComponent extends React.Component {

    constructor(props) {
        super(props);
        // Initializing
        this.canvas = null;
        this.context = null;
        this.state = { ctx: null }
        this.mounted = false;
        this.mouse = {
            click: false,
            move: false,
            pos: {x:0, y:0},
            pos_prev: false
        };
        this.width = 4;
        this.color = "#000000";
        this.lines = [];
        this.mainLoop = this.mainLoop.bind(this);
        this.draw = this.draw.bind(this);
        this.clearLast = this.clearLast.bind(this);


        // Binding des fonctions
    }


    render() {

        return(
            <div/>
        )
    }

}

export default CanvasComponent;