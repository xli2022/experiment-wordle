import Row from './Row'
import type { FormattedGuess, GuessChar } from '../hooks/useWordle'

interface GridProps {
    currentGuess: GuessChar[]
    guesses: (FormattedGuess[] | undefined)[]
    turn: number
    isInvalid: boolean
}

export default function Grid({ currentGuess, guesses, turn, isInvalid }: GridProps) {
    return (
        <div>
            {guesses.map((g, i) => {
                if (turn === i) {
                    return <Row key={`row-${i}`} currentGuess={currentGuess} isInvalid={isInvalid} />
                }
                return <Row key={`row-${i}`} guess={g} />
            })}
        </div>
    )
}
