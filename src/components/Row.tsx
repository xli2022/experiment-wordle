import type { FormattedGuess, GuessChar } from '../hooks/useWordle'

interface RowProps {
    guess?: FormattedGuess[]
    currentGuess?: GuessChar[]
    isInvalid?: boolean
}

export default function Row({ guess, currentGuess, isInvalid }: RowProps) {
    if (guess) {
        return (
            <div className="row past">
                {guess.map((l, i) => (
                    <div key={`${l.key}-${i}`} className={l.color}>{l.key}</div>
                ))}
            </div>
        )
    }

    if (currentGuess) {
        const cells = [...Array(5)].map((_, i) => currentGuess[i])
        return (
            <div className={`row current ${isInvalid ? 'shake' : ''}`}>
                <div className={cells[0] ? 'filled' : ''}>{cells[0] ? cells[0].key : ''}</div>
                <div className={cells[1] ? 'filled' : ''}>{cells[1] ? cells[1].key : ''}</div>
                <div className={cells[2] ? 'filled' : ''}>{cells[2] ? cells[2].key : ''}</div>
                <div className={cells[3] ? 'filled' : ''}>{cells[3] ? cells[3].key : ''}</div>
                <div className={cells[4] ? 'filled' : ''}>{cells[4] ? cells[4].key : ''}</div>
            </div>
        )
    }

    return (
        <div className="row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
