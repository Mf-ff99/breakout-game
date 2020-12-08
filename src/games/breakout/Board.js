import React, { useEffect, useRef } from 'react'
import { BallMovement } from './BallMovement';
import data from '../../data'
import WallCollision from './utils/WallCollision';
import Paddle from './Paddle';
import Brick from './Brick';
import BrickCollision from './utils/BrickCollision';
import PaddleCollision from './utils/PaddleCollision'
import PlayerStats from './PlayerStats';
import AllBroken from './utils/AllBroke';
import ResetBall from './utils/ResetBall';

let { ballObj, paddleProps, brickObj, player } = data
let bricks = []

export default function Board() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            
            paddleProps.y = canvas.height - 30

            // assign bricks

            let newBrickSet = Brick(player.level, bricks, canvas, brickObj)

            if(newBrickSet && newBrickSet.length > 0) {
                bricks = newBrickSet
            }
            
            
            
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            // player stats
            PlayerStats(ctx, player, canvas)
            
            if(player.lives === 0) {
                alert('Game over! Press OK to restart')
                bricks.length = 0
                player.lives = 5
                player.level = 1
                player.score = 0
                ResetBall(ballObj, canvas, paddleProps)
            }

            // display bricks
            bricks.map((brick) => {
                return brick.draw(ctx)
            })
            
            // handling ball movement
            BallMovement(ctx, ballObj)

            // check all are broken
            AllBroken(bricks, player, canvas, ballObj)

            // handling ball collision 
            WallCollision(ballObj, canvas, player, paddleProps)

            // handle brick collisions
            let brickCollision;
            for (let i = 0; i < bricks.length; i++) {
                brickCollision = BrickCollision(ballObj, bricks[i]);
        
                if (brickCollision.hit && !bricks[i].broke) {
                  // console.log(brickCollision);
                  if (brickCollision.axis === "X") {
                    ballObj.dx *= -1;
                    bricks[i].broke = true;
                  } else if (brickCollision.axis === "Y") {
                    ballObj.dy *= -1;
                    bricks[i].broke = true;
                  }
                  player.score += 10;
                }
              }

            Paddle(ctx, canvas, paddleProps, 30)

            // paddle + ball collision
            PaddleCollision(ballObj, paddleProps)

            requestAnimationFrame(render)
        }
        render()
    }, [])


    return <canvas 
    id="canvas" 
    ref={canvasRef} 
    height="500px"
    onMouseMove={(e) => paddleProps.x = e.clientX - paddleProps.width / 2 - 5} 
    width={window.innerWidth - 20} />;
}
