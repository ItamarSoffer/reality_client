import React from 'react';
import { Input } from 'antd';
import { withRouter } from "react-router-dom";
import {setReRenderCardsAction} from "../../../Actions/siteActions";
import {connect} from "react-redux";
import {getQueryStringParams} from "../../../Actions/queryStringActions";
import URLSearchParams from "url-search-params";

const { Search } = Input;

class CardsSearch extends React.Component{

    onSearch =(value) => {
        const pathName = this.props.history.location.pathname;
        let currentSearchQuery = getQueryStringParams(this.props.history.location.search);
        if (value === null || value === ''){
            delete currentSearchQuery['search_string'];
                        this.props.history.push(
                {pathname: pathName,
                    search: "?" + new URLSearchParams(
                        {...currentSearchQuery}
                        ).toString()
            });
        }
        else{
            currentSearchQuery['search_string'] = value;
            this.props.history.push(
                {pathname: pathName,
                    search: "?" + new URLSearchParams(
                        {...currentSearchQuery}
                        ).toString()

            });
        }
    this.props.setReRenderCards(1);
    };

    render(){
        const queryParams = getQueryStringParams(this.props.history.location.search);
        let defaultQueryValues = null;
        if (queryParams.search_string){
            defaultQueryValues = queryParams.search_string;
        }


        return (
            <Search
                allowClear
                placeholder="Search Stories"
                onSearch={this.onSearch}
                style={{ width: 700,
                    borderRadius: '10px',
                }}
                // enterButton="Search"
                defaultValue={defaultQueryValues}
    />

        )
    }
}
const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
    return{
        setReRenderCards: (index) => {dispatch(setReRenderCardsAction(index))}
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardsSearch));
