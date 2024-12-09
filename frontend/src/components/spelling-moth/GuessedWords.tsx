
export default function GuessedWords(props) {
    const { words } = props

    console.log('guessed!', words)

    function getStringContent() {
        if (words.length < 1) {
            return "Your words..."
        }
        return words.join(', ')
    }

    return (
        <div className="guessed-words">
            {getStringContent()}
        </div>
    )
}