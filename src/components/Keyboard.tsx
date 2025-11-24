

interface KeyboardProps {
    usedKeys: { [key: string]: string }
    handleKeyup: (e: KeyboardEvent) => void
}

export default function Keyboard({ usedKeys, handleKeyup }: KeyboardProps) {
    const letters = [
        { key: 'q' }, { key: 'w' }, { key: 'e' }, { key: 'r' }, { key: 't' }, { key: 'y' }, { key: 'u' }, { key: 'i' }, { key: 'o' }, { key: 'p' },
        { key: 'a' }, { key: 's' }, { key: 'd' }, { key: 'f' }, { key: 'g' }, { key: 'h' }, { key: 'j' }, { key: 'k' }, { key: 'l' },
        { key: 'Enter' }, { key: 'z' }, { key: 'x' }, { key: 'c' }, { key: 'v' }, { key: 'b' }, { key: 'n' }, { key: 'm' }, { key: 'Backspace' }
    ]

    const handleClick = (key: string) => {
        const mockEvent: Partial<KeyboardEvent> = {
            key,
            preventDefault: () => {},
            stopPropagation: () => {},
            bubbles: true,
            cancelable: true,
            composed: false,
            defaultPrevented: false,
            eventPhase: 0,
            isTrusted: false,
            returnValue: true,
            timeStamp: Date.now(),
            type: 'keydown'
        }
        handleKeyup(mockEvent as KeyboardEvent)
    }

    return (
        <div className="keypad">
            <div>
                {letters.slice(0, 10).map((l) => (
                    <div key={l.key} className={usedKeys[l.key]} onClick={() => handleClick(l.key)}>{l.key}</div>
                ))}
            </div>
            <div>
                {letters.slice(10, 19).map((l) => (
                    <div key={l.key} className={usedKeys[l.key]} onClick={() => handleClick(l.key)}>{l.key}</div>
                ))}
            </div>
            <div>
                {letters.slice(19).map((l) => (
                    <div key={l.key} className={usedKeys[l.key]} onClick={() => handleClick(l.key)}>
                        {l.key === 'Backspace' ? '⌫' : l.key === 'Enter' ? '↵' : l.key}
                    </div>
                ))}
            </div>
        </div>
    )
}
