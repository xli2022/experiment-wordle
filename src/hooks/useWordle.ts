import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { WORDS } from '../data/words'

export interface FormattedGuess {
    key: string
    color: 'grey' | 'yellow' | 'green'
}

export interface GuessChar {
    key: string
    id: string
}

const useWordle = (solution: string) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState<GuessChar[]>([])
    const [guesses, setGuesses] = useState<(FormattedGuess[] | undefined)[]>([...Array(6)]) // each guess is an array of formatted letters
    const [history, setHistory] = useState<string[]>([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [isInvalid, setIsInvalid] = useState(false)
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({})

    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray: (string | null)[] = [...solution]
        let formattedGuess: FormattedGuess[] = currentGuess.map((l) => {
            return { key: l.key, color: 'grey' }
        })

        // find any green letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        // find any yellow letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess: FormattedGuess[]) => {
        const currentGuessString = currentGuess.map(g => g.key).join('')
        if (currentGuessString === solution) {
            setIsCorrect(true)
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuessString]
        })

        setTurn((prevTurn) => {
            return prevTurn + 1
        })

        setUsedKeys((prevUsedKeys) => {
            let newKeys = { ...prevUsedKeys }

            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key]

                if (l.color === 'green') {
                    newKeys[l.key] = 'green'
                    return
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    newKeys[l.key] = 'yellow'
                    return
                }
                if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[l.key] = 'grey'
                    return
                }
            })

            return newKeys
        })

        setCurrentGuess([])
    }

    // handle keydown event & track current guess
    // if user presses enter, add the new guess
    const handleKeydown = (e: KeyboardEvent) => {
        const { key } = e
        const currentGuessString = currentGuess.map(g => g.key).join('')

        if (key === 'Enter') {
            // ... existing enter logic ...
            // We don't prevent default for Enter usually, but we can
            e.preventDefault()

            // only add guess if turn is less than 5
            if (turn > 5) {
                console.log('you used all your guesses')
                return
            }
            // do not allow duplicate words
            if (history.includes(currentGuessString)) {
                console.log('you already tried that word')
                setIsInvalid(true)
                setTimeout(() => setIsInvalid(false), 1000)
                return
            }
            // check word is 5 chars long
            if (currentGuess.length !== 5) {
                console.log('word must be 5 chars long')
                setIsInvalid(true)
                setTimeout(() => setIsInvalid(false), 1000)
                return
            }
            // check word is in dictionary
            if (!WORDS.includes(currentGuessString)) {
                console.log('word not in list')
                setIsInvalid(true)
                setTimeout(() => setIsInvalid(false), 1000)
                return
            }

            const formatted = formatGuess()
            addNewGuess(formatted)
            return
        }

        if (key === 'Backspace') {
            e.preventDefault() // Prevent browser back navigation
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if (/^[A-Za-z]$/.test(key)) {
            e.preventDefault() // Prevent default actions for letters if any
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return [...prev, { key: key.toLowerCase(), id: crypto.randomUUID() }]
                })
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, isInvalid, usedKeys, handleKeyup: handleKeydown }
}

export default useWordle
