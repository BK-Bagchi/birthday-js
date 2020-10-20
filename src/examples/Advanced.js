import React, { useState, useMemo } from 'react'
import TinderCard from 'react-tinder-card'
import Timer from './Timer'

const db = [
  {
    name: 'Richard Hendricks',
    url: 'dinesh.jpg'
  },
  {
    name: 'Erlich Bachman',
    url: 'erlich.jpg'
  },
  {
    name: 'Monica Hall',
    url: 'jared.jpg'
  },
  {
    name: 'Jared Dunn',
    url: 'monica.jpg'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'richard.jpg'
  }
]

const alredyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Advanced() {
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()
  const [lengtH, setLength] = useState(charactersState.length)

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    // console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alredyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name, character) => {
    // console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setLength(charactersState.length)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alredyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alredyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }
  console.log(lengtH);

  return (
    <div>
      {
        lengtH ?
          <>
            <h1 style={{ fontSize: '50px' }}>Happy Birthday</h1>
            <div className='cardContainer'>
              {
                characters.map((character, index) => {
                  return (
                    <TinderCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name, character)}>
                      <div className='card'>
                        <img src={require(`./img/${character.url}`)} alt="" />
                      </div>
                    </TinderCard>
                  )
                }
                )
              }
            </div>
            <h1 className='buttons'>
              Swipe 360 to see more photos
      </h1>
          </> :
          <Timer />
      }
    </div>
  )
}

export default Advanced
