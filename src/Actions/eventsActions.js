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

