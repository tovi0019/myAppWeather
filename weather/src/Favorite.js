import React from 'react'
import { connect } from 'react-redux'
import { actions } from './Redux/Action';
import { withRouter } from "react-router-dom";
import './Favorite.css'


function mapStateToProps(state) {
    return {
        listFavorite: state.dataReducer.listFavorite,
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedKey: (key) => dispatch(actions.setSelectedKey(key)),
    setSelectedCity: (city) => dispatch(actions.setSelectedCity(city)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Favorite(props) {

    let { listFavorite, setSelectedKey, setSelectedCity } = props;

    //Returns to the home page with the weather of the selected city
    function currentWeather(e) {
        setSelectedCity(e.city);
        setSelectedKey(e.key);
        props.history.push("/");
    }

    return (
        <>
            <h1>my favorite</h1>
            {listFavorite != undefined &&
                <>
                    <div>{listFavorite.map((item) => {
                        return (
                            <>
                                <div className="favorite" value={item} onClick={() => currentWeather(item)}>  
                                    <label>{item.city}</label>
                                    {item.selectedLocation[0] && <p>{item.selectedLocation[0].Temperature.Metric.Value}℃</p>}
                                    {item.selectedLocation[0] && <p>{item.selectedLocation[0].WeatherText}</p>}
                                </div>
                            </>
                        )
                    })}</div>
                </>
            }
        </>
    )
}))