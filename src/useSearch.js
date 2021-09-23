import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearch(query, page) {
  const URL = 'http://openlibrary.org/search.json'

  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [query])


  useEffect(()=> {
    setIsLoading(true);
    axios({
      method: 'GET',
      url: URL,
      params: {q: query, page}
    }).then( res => {
      console.log(res.data)
      setBooks(prev => { return [...prev, ...res.data.docs.map(b => b.title)]})
      setIsLoading(false)
      setLoadMore( res.data.docs.legth > 0)

    })
  }, [query, page]);

  return {isLoading, books, loadMore}
}