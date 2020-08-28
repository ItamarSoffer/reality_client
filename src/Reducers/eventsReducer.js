
const initState = {
    events: {}
};

const eventsReducer = (state = initState, action) => {

    switch(action.type){
        case "EVENTS_GET_ALL":
            state = {...state,
                events: action.events
            };
            break;

        case "EVENTS_RESET":
            state = {...state,
                events: {}
            };
            break;

        case "EVENTS_NEW_EVENT":
            state = {...state,
                events: {...state.events, [action.newEvent.event_id]: action.newEvent}
            };
            // console.log("NEW KEY",action.newEvent.event_id);
            // console.log("NEW STATE", state);
            break;

        case "EVENTS_DEL_EVENT":
            const {[action.eventId]: removed, ...rest} = state.events;
            state = {...state,
                events: rest
            };
            break;
        default:
            break;
    }

    return state;
};

export default eventsReducer;