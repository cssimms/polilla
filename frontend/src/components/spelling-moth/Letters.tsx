
export default function Letters({ letters, handleLetterClick, centerLetter }) {

    function getLetterElement(letter, clickCallback, index, isCenter = false) {
        const className = isCenter ? 'center-letter letter-container' : 'letter-container'

        return (
            <div key={index} className={className} onClick={clickCallback} value={letter}>
                {letter}
            </div>
        )
    }

    function getLetterComponents() {
        if (letters.length < 1) {
            return 'letters empty'
        }

        // Include center letter, but arrange so it's in the middle of the list. This way for rendering we can lay out in the
        // flex box without floating things around
        const firstHalf = letters.slice(0, 3)
        const secondHalf = letters.slice(3)
        const lettersWithCenter = [...firstHalf, centerLetter, ...secondHalf]

        const firstRowLetters = []
        const secondRowLetters = []
        const thirdRowLetters = []

        // Pretty crude, but should setup our rows for easy rendering
        lettersWithCenter.forEach((letter, index) => {
            const isCenterLetter = letter === centerLetter
            const listLetterListItem = getLetterElement(letter, handleLetterClick, index, isCenterLetter)

            if (firstRowLetters.length < 2) {
                firstRowLetters.push(listLetterListItem)
            } else if (secondRowLetters.length < 3) {
                secondRowLetters.push(listLetterListItem)
            } else if (thirdRowLetters.length < 2) {
                thirdRowLetters.push(listLetterListItem)
            }
        })

        const firstRow = <div id="first-row" key={1} className="letter-row">{firstRowLetters}</div>
        const secondRow = <div id="second-row" key={2} className="letter-row">{secondRowLetters}</div>
        const thirdRow = <div id="third-row" key={3} className="letter-row">{thirdRowLetters}</div>

        return [firstRow, secondRow, thirdRow]
    }

    return (
        <div className='letter-list'>
            {getLetterComponents()}
        </div>
    )
}