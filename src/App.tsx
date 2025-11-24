import { useEffect, useState } from 'react'
import useWordle from './hooks/useWordle'
import Grid from './components/Grid'
import Keyboard from './components/Keyboard'
import Modal from './components/Modal'
import { WORDS } from './data/words'

function App() {
  const [solution, setSolution] = useState<string | null>(null)
  const { currentGuess, guesses, turn, isCorrect, isInvalid, usedKeys, handleKeyup } = useWordle(solution || '')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setSolution(randomWord)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyup)

    return () => window.removeEventListener('keydown', handleKeyup)
  }, [handleKeyup])

  useEffect(() => {
    let timeoutId: number | undefined

    if (isCorrect || turn > 5) {
      timeoutId = setTimeout(() => setShowModal(true), 2000)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isCorrect, turn])

  return (
    <div className="App">
      <header style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1px solid var(--color-border)',
        height: '50px'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, letterSpacing: '2px' }}>WORDLE</h1>
      </header>
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {solution && (
          <>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} isInvalid={isInvalid} />
            <Keyboard usedKeys={usedKeys} handleKeyup={handleKeyup} />
          </>
        )}
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution || ''} />}
      </main>
    </div>
  )
}

export default App
