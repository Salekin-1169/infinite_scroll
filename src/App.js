import './App.css';
import { useState, useRef, useCallback } from 'react';
import useSearch from './useSearch';

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const {isLoading, books, loadMore} = useSearch(query, page)
  const observer = useRef()

  const lastElementRef = useCallback((node) => {
    if (isLoading) {
      return null;
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(elements => {
      if (elements[0].isIntersecting && loadMore) {
        console.log("visible")
        setPage(prevPage => prevPage + 1)
      }
    })

    if (node) {
      observer.current.observe(node)
    }
  }, [isLoading])

  const handleSearch = (e) => {
    if (e.target.value === '') {
      return null;
    }

    setQuery(e.target.value)
    setPage(1)
  }


  const renderBooks = () => {
    return books.map((book, index) => {
      if (books.length === index+1) {
        return (<p ref={lastElementRef} key={index}>{book}</p>)
      }
      return (<p key={index}>{book}</p>)
    })
  }

  return (
    <div className="App">
      <input onChange={handleSearch} placeholder="search"></input>

      <div className="results">
        {renderBooks()}
      </div>
    </div>
  );
}

export default App;
