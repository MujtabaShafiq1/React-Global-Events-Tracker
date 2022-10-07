import { useState, useEffect, useCallback } from 'react'
import Loader from './components/UI/Loader'
import Header from './components/Header/Header';
import Home from './pages/Home';
import { fetchEvents } from './api';

const App = () => {

  const [loading, setLoading] = useState(false)
  const [eventData, setEventData] = useState([])

  const fetchData = useCallback(async (id) => {
    setLoading(true)
    const response = await fetchEvents(id);
    setEventData(response)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div className='App'>
      <Header />
      {loading ? <Loader /> : <Home eventData={eventData} />}
    </div>
  );

};

export default App;
