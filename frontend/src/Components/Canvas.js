//IMPORTS

import React from 'react';
import '../App.css';
import {Button, Row, ButtonGroup, ToggleButton, Col} from 'react-bootstrap';

class Canvas extends React.Component { 

    constructor (props) {
        super (props);
        
        // INITIALIZING
        this.canvas = null;
        this.context = null;
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

        // Initializing State :
        this.state = {
            ctx: null
        };

        //Binding des fonctions
        this.mainLoop = this.mainLoop.bind(this);
        this.draw = this.draw.bind(this);
        this.clearLast = this.clearLast.bind(this);  
    
    }


    componentDidMount () {

        this.canvas = this.refs.canvas;
        this.setState({
            ctx: this.canvas.getContext('2d')
        })
        
        // Un peu de design :
        this.canvas.style.background = 'rgba(201,205,216,1)';
        this.canvas.style.border = "2px solid #000000";
        this.canvas.height = window.innerHeight*1/2;
        this.canvas.width = window.innerWidth*3/4;

        //Quand on est créateur, on dessine : on définit les fonctions liés sur le canvas :

        if (this.props.isCreator) {
            
            // On définit les fonctions de dessin :
            this.canvas.onmousedown = function (event){
                this.mouse.click = true;
            }.bind(this);

            this.canvas.onmouseup = function (event){
                this.mouse.click = false;
                this.props.socket.emit('draw', {
                    id_partie: this.props.id_partie,
                    lines: this.lines,
                    width: this.width,
                    color: this.color});
                this.lines = [];
            }.bind(this);

            this.canvas.onmousemove = function(event) {
                //position relative au canvas
                this.mouse.pos.x = (event.clientX-(this.canvas.offsetLeft-window.scrollX))/this.canvas.width;
                this.mouse.pos.y = (event.clientY-(this.canvas.offsetTop-window.scrollY))/this.canvas.height;
                this.mouse.move = true;
            }.bind(this);

            this.mainLoop();
        }

        // A la réception d'événement draw :
        this.props.socket.on('drawing', function (data) {
            if (this.mounted) {
                let { lines, width, color } = data;
                for (let line of lines){
                    this.draw(line, width, color);
                }
            }
        }.bind(this));
        
        // A la réception d'événement clear
        this.props.socket.on('clear', function (data) {
            if (this.mounted) {
                this.state.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }.bind(this));

        // On enregistre qu'on a fini de monter le component
        this.mounted = true;
    }

    draw(line, width, color) {
        this.state.ctx.strokeStyle = color;
        this.state.ctx.lineWidth = width;
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(line[0].x*this.canvas.width, line[0].y*this.canvas.height);
        this.state.ctx.lineTo(line[1].x*this.canvas.width, line[1].y*this.canvas.height);
        this.state.ctx.stroke();
    }

    clearLast() {
        this.props.socket.emit('clear last', { id_partie: this.props.id_partie });
    }

    mainLoop() {
		if (this.mouse.click && this.mouse.move && this.mouse.pos_prev) {
            const line = [
                {x: this.mouse.pos.x, y: this.mouse.pos.y},
                {x: this.mouse.pos_prev.x, y: this.mouse.pos_prev.y}
            ];
            this.lines = [...this.lines, line];
            this.mouse.move = false;
            this.draw(line, this.width, this.color);
        }
		this.mouse.pos_prev = {x: this.mouse.pos.x, y: this.mouse.pos.y};
        setTimeout(this.mainLoop, 25);
	}

     
    render () {
        return (
            <div>
                {this.props.isCreator &&
                <div>
                    <Row>
                        <Col/>
                        <Col>
                            <ButtonGroup toggle className="mt-3">
                                <ToggleButton variant="secondary" size="sm" type="radio" value="1" onClick={() => this.width = 8}>
                                Gros pinceau
                                </ToggleButton>
                                <ToggleButton variant="secondary" size="sm" type="radio" defaultChecked value="2" onClick={() => this.width = 4}>
                                Pinceau moyen
                                </ToggleButton>
                                <ToggleButton variant="secondary" size="sm" type="radio" value="3" onClick={() => this.width = 2}>
                                Pinceau fin
                                </ToggleButton>
                                <ToggleButton variant="dark" size="sm" type="radio" value="4" onClick={() => this.color = "#000000"}> Noir </ToggleButton>
                                <ToggleButton variant="primary" size="sm" type="radio" value="5" onClick={() => this.color = "#0000FF"}> Bleu </ToggleButton>
                                <ToggleButton variant="success" size="sm" type="radio" value="6" onClick={() => this.color = "#00ae1a"} > Vert </ToggleButton>
                                <ToggleButton variant="warning" size="sm" type="radio" value="7" onClick={() => this.color = "#ffe032"}> Jaune </ToggleButton>
                                <ToggleButton variant="danger" size="sm" type="radio" value="8" onClick={() => this.color = "#FF0000"}> Rouge </ToggleButton>
                            </ButtonGroup>
                        </Col>
                        <Col>
                            <Button variant="secondary" size="sm" onClick={this.clearLast}>Annuler le dernier coup de pinceau</Button>
                        </Col>
                    </Row>
                </div>
                }

                <canvas ref="canvas"/>
            </div>
        );
    }
}


export default Canvas;