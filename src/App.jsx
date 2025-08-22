import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // Sample data for cards
  const sampleCards = [
    { id: 1, category: 'Technology', title: 'React', description: 'A JavaScript library for building user interfaces' },
    { id: 2, category: 'Technology', title: 'Vite', description: 'Next generation frontend tooling' },
    { id: 3, category: 'Design', title: 'CSS', description: 'Cascading Style Sheets for styling web pages' },
    { id: 4, category: 'Design', title: 'Flexbox', description: 'A CSS layout model for arranging elements' },
    { id: 5, category: 'Development', title: 'JavaScript', description: 'A programming language for the web' },
    { id: 6, category: 'Development', title: 'Node.js', description: 'A JavaScript runtime built on Chrome\'s V8 engine' }
  ];

  const [searchKey, setSearchKey] = useState('');
  const [selectedcard, setSelectedcard] = useState(null);
  const [filteredcards, setFilteredcards] = useState(sampleCards);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchKey(value);
    
    // Filter cards based on search key
    const filtered = sampleCards.filter(card =>
      card.title.toLowerCase().includes(value.toLowerCase()) ||
      card.description.toLowerCase().includes(value.toLowerCase()) ||
      card.category.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredcards(filtered);
  };

  const showPanel = (card) => {
    setSelectedcard(card);
  };

  const closePanel = () => {
    setSelectedcard(null);
  };

  return (
    <>
      <header>
        <div className='logo'>Searchbar & Sliding Panel</div>
      </header>
      <section>
        <div className='searchbar'>
          <input type='text' placeholder='Search cards...' name='searchkey' value={searchKey} onChange={handleSearch} />
        </div>
        <div className='grid'>
          {filteredcards.map((card)=>(
            <div className='card' key={card.id} onClick={()=>showPanel(card)}>
              <span>{card.category}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
        {selectedcard && (
          <div className='overlay'>
            <div className='slidingpanel'>
              <button onClick={closePanel}>x</button>
              <h1>{selectedcard.title}</h1>
              <p>{selectedcard.description}</p>
            </div>
          </div>
        )}
      </section>
      <footer>
        Copyright@2025. All rights reserves.-Gnana Sai Kiran
      </footer>
    </>
  )
}

export default App