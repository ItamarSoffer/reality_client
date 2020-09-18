export const getStoryEventsAction = (events) => {
    let dictEvents = {};
    events.map(
        // eslint-disable-next-line array-callback-return
        function(evt) {
            dictEvents[evt.event_id] = formatEvent(evt);
        }
    );
    return {
        type: "EVENTS_GET_ALL",
        events: dictEvents
    }
};

const formatEvent = (event) => {
    return {...event, iconAndColor: [event.icon, event.frame_color]}
};


export const updateEventAction = (newEvent) => {
    /*
    gets a new event data and updates it to the list
     */
    return {
        type: "EVENTS_NEW_EVENT",
        newEvent: formatEvent(newEvent)
    }
};

export const deleteEvent = (eventId) => {
    return {
        type: "EVENTS_DEL_EVENT",
        eventId: eventId
    }
};

export const resetStoryEvents = () => {
    return {
        type: "EVENTS_RESET",
        events: {}
    }
};

export function eventsCompareSorter( a, b, ) {
  if ( a.event_time < b.event_time){
    return 1;
  }
  if ( a.event_time > b.event_time){
    return -1;
  }
  return 0;
}

export function getUniqValues(data, field) {
        /*
        gets an array of objects (data), and returns a uniq list of field values
        data- array of objects.
        field- the field to filter by.
        if null in, removes it.
         */
        let iconsList = data.map( record => record[field]);
        let uniq = [...new Set(iconsList)];
        if (uniq.indexOf(null) > -1){
            delete uniq[uniq.indexOf(null)]
        }
        if (uniq.indexOf('') > -1){
            delete uniq[uniq.indexOf('')]
        }
        return uniq
}