import confetti from 'canvas-confetti'
import { useEffect } from 'react'

interface ModalProps {
    isCorrect: boolean
    turn: number
    solution: string
}

export default function Modal({ isCorrect, turn, solution }: ModalProps) {
    useEffect(() => {
        if (isCorrect) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6aaa64', '#c9b458', '#ffffff']
            })
        }
    }, [isCorrect])

    return (
        <div className="modal">
            {isCorrect && (
                <div className="modal-content win">
                    <h1>You Win! 🎉</h1>
                    <p className="solution">{solution}</p>
                    <p>You found the solution in {turn} guesses :)</p>
                    <button onClick={() => window.location.reload()} className="play-again">Play Again</button>
                </div>
            )}
            {!isCorrect && (
                <div className="modal-content lose">
                    <h1>Game Over 😔</h1>
                    <p className="solution">{solution}</p>
                    <p>Better luck next time!</p>
                    <button onClick={() => window.location.reload()} className="play-again">Try Again</button>
                </div>
            )}
        </div>
    )
}
