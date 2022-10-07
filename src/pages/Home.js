import { useState, useRef } from 'react'
import { Container, NativeSelect, TextField, Box } from '@material-ui/core';
import Map from '../components/Map/Map';
import EventTable from '../components/Table/EventTable';

const Home = ({ eventData }) => {

    const ref = useRef(null);
    const [search, setSearch] = useState(null)
    const [singleEvent, setSingleEvent] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState(eventData)

    function addSingleEvent(e) {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setSingleEvent(e);
    }

    function typeChangeHandler(value) {

        setSearch(null)
        setSingleEvent(null)

        if (!value || value === "All") return setFilteredEvents(eventData)
        const filteredData = eventData.filter((ev) => {
            return ev.categories[0].id === +value
        })
        setFilteredEvents(filteredData);

    }


    const uniqueEvents = Array.from(new Set(eventData.map(ev => ev.categories[0].id))).map(id => {
        return { id: id, title: eventData.find(e => e.categories[0].id === id).categories[0].title }
    });

    const searchHandler = (e) => {

        if (e.target.value.length <= 0) return setSearch(null)

        const data = filteredEvents.filter(event => {
            return event.title.toLowerCase().includes(e.target.value.toLowerCase()) || event.id.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setSearch(data)
    }



    return (
        <Box style={{ backgroundColor: "#FAF9F6", height: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Box ref={ref}>
                <Map eventData={search || filteredEvents} singleEvent={singleEvent} />
            </Box>
            <Container width="sm" align="center" style={{ padding: "30px 0" }}>
                <Box style={{ display: "flex", justifyContent: "center", flex: 1 }}>
                    <TextField label="Search" variant="standard" onChange={searchHandler} style={{ flex: "0 0 25em", marginRight: "100px" }} />
                    <NativeSelect onChange={(e) => typeChangeHandler(e.target.value)} style={{ flex: "0 0 10em" }}>
                        <option>All</option>
                        {uniqueEvents.map((ev) => <option value={ev.id} key={ev.id}>{ev.title}</option>)}
                    </NativeSelect>
                </Box>
                <EventTable events={search || filteredEvents} addSingleEvent={addSingleEvent} />
            </Container>
        </Box>
    )
}

export default Home