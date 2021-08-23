import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux'
import { actions } from './Redux/Action';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './Home.css'

//my key of the api
const API_KEY = 'nLEZKQOCAMj3KrW5aAA9G54ENCTEjN2r‏';

function mapStateToProps(state) {
    return {
        listFavorite: state.dataReducer.listFavorite,
        selectedLocation: state.dataReducer.selectedLocation,//Selected weather data
        selectedKey: state.dataReducer.selectedKey,//Key of a selected city
        selectedCity: state.dataReducer.selectedCity,//name of a selected city
        days: state.dataReducer.days,
    }
}
const mapDispatchToProps = (dispatch) => ({
    setListFavorite: (favorite) => dispatch(actions.setListFavorite(favorite)),
    setSelectedLocation: (location) => dispatch(actions.setSelectedLocation(location)),
    setSelectedKey: (key) => dispatch(actions.setSelectedKey(key)),
    setSelectedCity: (city) => dispatch(actions.setSelectedCity(city)),
    setDays: (day) => dispatch(actions.setDays(day)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function Home(props) {

    let {listFavorite, selectedLocation, selectedKey, selectedCity, days,
        setListFavorite, setSelectedLocation, setSelectedKey, setSelectedCity, setDays } = props;

    const [ifFavorite, setIfFavorite] = useState(false);//icon of favorite
    const [locations, setLocations] = useState([{
        Version: '',
        Key: "",
        Type: "",
        Rank: '',
        LocalizedName: "",
        Country: {
            ID: "",
            LocalizedName: ""
        },
        AdministrativeArea:
        {
            ID: "",
            LocalizedName: ""
        }
    }]);
    
    //Enter a location for a list of favorites
    function insertToFavorite() {
        debugger;
        setIfFavorite(true);
        setListFavorite({ key: selectedKey, city: selectedCity, currentLocation: selectedLocation });
    }
  
    //Bringing placements in auto-completion
    function AoutoComplete() {
        fetch("https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + API_KEY + "&q=" + selectedCity + "", {
        }).then(res => res.json())
            .then((res) => {
                var arr = res;
                var cloneArray = [...locations];
                cloneArray = cloneArray.concat(arr);
                setLocations(cloneArray);
            },
                (err) => {
                    debugger;
                });
    }

    //Bringing weather data of a selected city
    function currentWeather() {
        fetch("https://dataservice.accuweather.com/currentconditions/v1/" + selectedKey + "?apikey=" + API_KEY + "&details=false", {
        }).then(res => res.json())
            .then((res) => {
                setSelectedLocation(res);
            },
                (err) => {
                    debugger;

                });
    }

    //Bringing weather data of a selected city for five days
    function currentWeather5days() {
        fetch("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + selectedKey + "?apikey=" + API_KEY + "&details=false", {
        }).then(res => res.json())
            .then((res) => {
                setDays(res);
            },
                (err) => {
                    debugger;
                });
    }
    
    //Updated selected city name
    function changeCity(e) {
        setSelectedCity(e.target.value);
    }

    //Choose a city for the weather
    function selectWeatherCity(e) {
        setSelectedCity(e.target.value);
        for (var i = 0; i < locations.length; i++)
            if (locations[i].LocalizedName == e.target.value)
                setSelectedKey(locations[i].Key);
        setIfFavorite(false);        
    }

    useEffect(() => {
        if (selectedCity != undefined && selectedCity != "")
            AoutoComplete();
        else {
            setSelectedCity("Tel Aviv");
            setSelectedKey("215854");
            if (selectedCity != "" && selectedCity != "") {
                currentWeather();
                currentWeather5days();
            }
        }
    }, [selectedCity])

    useEffect(() => {
        debugger;
        if (selectedKey != undefined && selectedKey != "") {
            currentWeather();//get current weather 
            currentWeather5days();//5 days -daily forecasts
        }
        else
            setSelectedCity("");
    }, [selectedKey])

    //Normalization date
    function SubstringDate(str) {
        return str.substring(0, 10);
    }

    return (
        <>
            <Autocomplete
                id="autocomplete"
                options={locations}
                getOptionLabel={(option) => option.LocalizedName}
                style={{ width: 300 } }
                renderInput={(params) => <TextField {...params} label="enter city" variant="outlined" onChange={(e) => changeCity(e)} />}
                onSelect={(e) => selectWeatherCity(e)}
            />
            <h1>Weather Forecast</h1>
            <div className="container">
                <button className="addFavorite" onClick={() => insertToFavorite()}>Add to Favorite</button>
                {ifFavorite == true ? <FavoriteBorderIcon className="icon" /> : null}
                {selectedCity?  <lable className="nameCity">{selectedCity}</lable>:<label>"Tel-Aviv"</label>}
                <br></br>
                {selectedLocation[0] && <label>{selectedLocation[0].Temperature.Metric.Value}</label>}℃
                {selectedLocation[0] && <h1>{selectedLocation[0].WeatherText}</h1>}
                {days.DailyForecasts &&
                    <>
                        {days.HeadLine && <h1>{days.HeadLine.Text}</h1>}
                        <div>{days.DailyForecasts.map((day) => {
                            return (
                                <>
                                    <div className="days" >
                                        <label>{day.Temperature.Minimum.Value}℉</label> <br></br>
                                        <lable>{SubstringDate(day.Date)} </lable><br></br>
                                        <lable> {day.Day.IconPhrase} </lable>
                                    </div>

                                </>
                            )
                        })}</div>
                    </>
                }


            </div>



        </>
    )
})
