import { useState, useRef, useEffect, useCallback } from 'react'

import { fetchEvents } from './api';
import Map from './components/Main/Map';
import Loader from './components/UI/Loader'
import Header from './components/Main/Header';
import EventTable from './components/Main/EventTable';

import { Container, NativeSelect, TextField } from '@material-ui/core';

const App = () => {

  const ref = useRef(null);
  const [eventData, setEventData] = useState([])
  const [selectedEvent, setSelectedEvent] = useState('')
  const [textSearch, setTextSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [singleEvent, setSingleEvent] = useState(null);

  const fetchData = useCallback(async (id) => {
    setLoading(true)
    const response = await fetchEvents(id);
    setEventData(response)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData])


  const typeChangeHandler = (e) => {
    setSelectedEvent(e.target.value)
    setSingleEvent(null)
  }

  function textHandler(e) {
    setTextSearch(e.target.value)
  }

  function addSingleEvent(e) {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setSingleEvent(e);
  }

  function filteredData() {
    if (selectedEvent.length > 0) {
      const filteredData = eventData.filter((ev) => {
        return ev.categories[0].id === +selectedEvent
      })
      return filteredData;
    }
    return eventData;
  }


  const uniqueEvents = Array.from(new Set(eventData.map(ev => ev.categories[0].id)))
    .map(id => {
      return {
        id: id,
        title: eventData.find(e => e.categories[0].id === id).categories[0].title
      }
    });


  const data = filteredData();
  const filteredEvents = data.filter(event => {
    return event.title.toLowerCase().includes(textSearch.toLowerCase())
      || event.id.toLowerCase().includes(textSearch.toLowerCase())
  })


  return (
    <div className='App'>
      <Header />
      {!loading ?
        <div style={{ backgroundColor: "#FAF9F6", height: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <div ref={ref}>
            <Map eventData={filteredEvents} singleEvent={singleEvent} />
          </div>
          <Container width="sm" align="center" style={{ padding: "30px 0" }}>
            <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
              <TextField label="Search" variant="standard" onChange={textHandler} style={{ flex: "0 0 25em", marginRight: "100px" }} />
              <NativeSelect onChange={typeChangeHandler} style={{ flex: "0 0 10em" }}>
                <option value=''>All</option>
                {uniqueEvents.map((ev) => <option value={ev.id} key={ev.id}>{ev.title}</option>)}
              </NativeSelect>
            </div>
            <EventTable events={filteredEvents} addSingleEvent={addSingleEvent} />
          </Container>
        </div>
        : <Loader />
      }
    </div>
  );
};

export default App;
