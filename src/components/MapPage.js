import classes from "./MapPage.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Fragment, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import StarIcon from "@mui/icons-material/Star";
import FilterListIcon from "@mui/icons-material/FilterList";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import SearchIcon from "@mui/icons-material/Search";

const MapPage = () => {
  const [data, setData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [country, setCountry] = useState("");
  const [wind, setWind] = useState();
  const [isFiltered, setIsFiltered] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [idCollector, setIdCollector] = useState([]);
  const [sent, setSent] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [infArray, setInfArray] = useState();
  const [first, setFirst] = useState(true);
  const [isFilteredByNameA, setIsFilteredByNameA] = useState(false);
  const [isFilteredByCountryA, setIsFilteredByCountryA] = useState(false);
  const [isFilteredByLatC, setIsFilteredByLatC] = useState(false);
  const [isFilteredByLongC, setIsFilteredByLongC] = useState(false);
  const [isFilteredByWindC, setIsFilteredByWindC] = useState(false);
  const [locationData, setLocationData] = useState("");
  const [isSearchedByLocation, setIsSearchedByLocation] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const filterByNameHandler = () => {
    let copyArray = [...infArray];
    let aux;
    if (isFilteredByNameA === false) {
      for (let i = 0; i < copyArray.length - 1; i++) {
        for (let j = i + 1; j < copyArray.length; j++) {
          if (copyArray[i].name.localeCompare(copyArray[j].name) > 0) {
            aux = copyArray[i];
            copyArray[i] = copyArray[j];
            copyArray[j] = aux;
          }
        }
      }
      setIsFilteredByNameA(true);
    } else {
      for (let i = 0; i < copyArray.length - 1; i++) {
        for (let j = i + 1; j < copyArray.length; j++) {
          if (copyArray[i].name.localeCompare(copyArray[j].name) < 0) {
            aux = copyArray[i];
            copyArray[i] = copyArray[j];
            copyArray[j] = aux;
          }
        }
      }
      setIsFilteredByNameA(false);
    }
    setInfArray(copyArray);
  };
  const filterByCountryHandler = () => {
    let copyArray = [...infArray];
    let aux;
    if (isFilteredByCountryA === false) {
      for (let i = 0; i < copyArray.length - 1; i++) {
        for (let j = i + 1; j < copyArray.length; j++) {
          if (copyArray[i].country.localeCompare(copyArray[j].country) > 0) {
            aux = copyArray[i];
            copyArray[i] = copyArray[j];
            copyArray[j] = aux;
          }
        }
      }
      setIsFilteredByCountryA(true);
    } else {
      for (let i = 0; i < copyArray.length - 1; i++) {
        for (let j = i + 1; j < copyArray.length; j++) {
          if (copyArray[i].country.localeCompare(copyArray[j].country) < 0) {
            aux = copyArray[i];
            copyArray[i] = copyArray[j];
            copyArray[j] = aux;
          }
        }
      }
      setIsFilteredByCountryA(false);
    }
    setInfArray(copyArray);
  };
  const filterByLatHandler = () => {
    let copyArray = [...infArray];
    let aux;
    if (isFilteredByLatC === false) {
      for (let i = 0; i < copyArray.length - 1; i++) {
        for (let j = i + 1; j < copyArray.length; j++) {
          if (copyArray[i].lat > copyArray[j].lat) {
            aux = copyArray[i];
            copyArray[i] = copyArray[j];
            copyArray[j] = aux;
          }
        }
      }
      setIsFilteredByLatC(true);
    } else {
      for (let i = 0; i < copyArray.length - 1; i++) {
        for (let j = i + 1; j < copyArray.length; j++) {
          if (copyArray[i].lat < copyArray[j].lat) {
            aux = copyArray[i];
            copyArray[i] = copyArray[j];
            copyArray[j] = aux;
          }
        }
      }
      setIsFilteredByLatC(false);
    }
    setInfArray(copyArray);
  };
  const filterByLongHandler = () => {
    let copyArray = [...infArray];
    let aux;
    if (isFilteredByLongC === false) {
      for (let i = 0; i < copyArray.length - 1; i++) {
        for (let j = i + 1; j < copyArray.length; j++) {
          if (copyArray[i].long > copyArray[j].lat) {
            aux = copyArray[i];
            copyArray[i] = copyArray[j];
            copyArray[j] = aux;
          }
        }
      }
      setIsFilteredByLongC(true);
    } else {
      for (let i = 0; i < copyArray.length - 1; i++) {
        for (let j = i + 1; j < copyArray.length; j++) {
          if (copyArray[i].long < copyArray[j].lat) {
            aux = copyArray[i];
            copyArray[i] = copyArray[j];
            copyArray[j] = aux;
          }
        }
      }
      setIsFilteredByLongC(false);
    }
    setInfArray(copyArray);
  };
  const filterByWindHandler = () => {
    let copyArray = [...infArray];
    let aux;
    if (isFilteredByWindC === false) {
      for (let i = 0; i < copyArray.length - 1; i++) {
        for (let j = i + 1; j < copyArray.length; j++) {
          if (copyArray[i].probability > copyArray[j].probability) {
            aux = copyArray[i];
            copyArray[i] = copyArray[j];
            copyArray[j] = aux;
          }
        }
      }
      setIsFilteredByWindC(true);
    } else {
      for (let i = 0; i < copyArray.length - 1; i++) {
        for (let j = i + 1; j < copyArray.length; j++) {
          if (copyArray[i].probability < copyArray[j].probability) {
            aux = copyArray[i];
            copyArray[i] = copyArray[j];
            copyArray[j] = aux;
          }
        }
      }
      setIsFilteredByWindC(false);
    }
    setInfArray(copyArray);
  };

  const logoutHandler = () => {
    if (isLogout === false) {
      setIsLogout(true);
    } else {
      setIsLogout(false);
    }
  };

  const filterHandler = () => {
    setIsFilter(true);
  };
  const closeFilter = () => {
    setIsFilter(false);
    setIsFiltered(false);
    setIsFilterApplied(false);
  };
  const countryHandler = (event) => {
    setCountry(event.target.value);
  };

  const windHandler = (event) => {
    setWind(event.target.value);
  };

  const applyFilterHandler = () => {
    setIsFiltered(true);
    setIsFilterApplied(true);
    setIsSearchedByLocation(false);
    setLocationData("");
  };

  const resetFilterHandler = () => {
    setIsFiltered(false);
    setIsFilterApplied(false);
  };

  const favHandler = async (dataToSend) => {
    await fetch("https://625c5621c9e78a8cb9b6d7a9.mockapi.io/favourites", {
      method: "POST",
      body: JSON.stringify({ dataToSend }),
    });
    let newCollector = idCollector;
    newCollector.push(dataToSend);
    setIdCollector(newCollector);
    setSent(true);
    setIsSearchedByLocation(false);
    setLocationData("");
    setIsFilterApplied(false);
    setIsFiltered(false);
  };

  const remFromfavHandler = (dataToDelete) => {
    let copyArray = idCollector;
    let myIndex = idCollector.indexOf(dataToDelete);
    copyArray.splice(myIndex, 1);
    setIdCollector(copyArray);
    setIsDeleted(true);
    const timeoutFunction = () => {
      setIsDeleted(false);
    };
    setTimeout(timeoutFunction, 500);
    // const deleteDataHandler = async (dataToDelete) => {
    //   await fetch(
    //     `https://625c5621c9e78a8cb9b6d7a9.mockapi.io/favourites/:${dataToDelete}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );
    // };
    // deleteDataHandler(dataToDelete).catch((e) => {
    //   console.log("Delete went wrong!");
    // });
  };

  const locationHandler = (event) => {
    setLocationData(event.target.value);
  };

  const searchIconHandler = () => {
    if (isSearchedByLocation === false) {
      setIsSearchedByLocation(true);
    } else {
      setIsSearchedByLocation(false);
      setLocationData("");
    }
  };

  let dataArray = [];
  let mapDataArray = [];

  var DefaultIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  var redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  var yellowIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    const mapData = async () => {
      const response = await fetch(
        "https://625c5621c9e78a8cb9b6d7a9.mockapi.io/spot"
      );

      const responseData = await response.json();
      if (first === true) {
        setInfArray(responseData);
        setFirst(false);
      }
      const copyElement = (
        <div className={classes.tableHeader} key={Math.random()}>
          <div className={classes.headerColWithSymbolBox}>
            <p className={classes.nameHeader}>Name</p>
            <UnfoldMoreIcon
              className={classes.filterHeaderIcon}
              onClick={filterByNameHandler}
            />
          </div>
          <div className={classes.headerColWithSymbolBox}>
            <p className={classes.countryHeader}>Country</p>
            <UnfoldMoreIcon
              className={classes.filterHeaderIcon}
              onClick={filterByCountryHandler}
            />
          </div>
          <div className={classes.headerColWithSymbolBox}>
            <p className={classes.latHeader}>Latitude</p>
            <UnfoldMoreIcon
              className={classes.filterHeaderIcon}
              onClick={filterByLatHandler}
            />
          </div>
          <div className={classes.headerColWithSymbolBox}>
            <p className={classes.longHeader}>Longitude</p>
            <UnfoldMoreIcon
              className={classes.filterHeaderIcon}
              onClick={filterByLongHandler}
            />
          </div>
          <div className={classes.headerColWithSymbolBox}>
            <p className={classes.windProbHeader}>Wind Prob.</p>
            <UnfoldMoreIcon
              className={classes.filterHeaderIcon}
              onClick={filterByWindHandler}
            />
          </div>
          <div className={classes.headerColWithSymbolBoxLast}>
            <p className={classes.monthHeader}>When to go</p>
          </div>
        </div>
      );
      dataArray.push(copyElement);
      if (
        isFiltered === false &&
        idCollector.length === 0 &&
        isSearchedByLocation === false
      ) {
        let copyElement1;
        for (const key in infArray) {
          if (isSearchedByLocation === false) {
            copyElement1 = (
              <div className={classes.tableRow} key={Math.random()}>
                <p className={classes.name}>{infArray[key].name}</p>
                <div className={classes.country}>
                  <p>{infArray[key].country}</p>
                </div>
                <p className={classes.lat}>{infArray[key].lat}</p>
                <p className={classes.long}>{infArray[key].long}</p>
                <p className={classes.windProb}>
                  {infArray[key].probability} %
                </p>
                <p className={classes.month}>{infArray[key].month}</p>
              </div>
            );
          }
          let position1 = [infArray[key].lat, infArray[key].long];

          const copyElement2 = (
            <Fragment>
              <div key={Math.random()}>
                <Marker position={position1} icon={DefaultIcon}>
                  <Popup className={classes.popUp}>
                    <h1 className={classes.townName}>{infArray[key].name}</h1>
                    <h2 className={classes.countryName}>
                      {infArray[key].country}
                    </h2>
                    <div className={classes.windProbabilityBox}>
                      <p className={classes.windProbabilityPara}>
                        WIND PROBABILITY
                      </p>
                      <p className={classes.windProbabilitPer}>
                        {infArray[key].probability} %
                      </p>
                    </div>
                    <div className={classes.latitudeBox}>
                      <p className={classes.latitudePara}>LATITUDE</p>
                      <p className={classes.latitudeText}>
                        {infArray[key].lat}
                      </p>
                    </div>
                    <div className={classes.longitudeBox}>
                      <p className={classes.longitudePara}>LONGITUDE</p>
                      <p className={classes.longitudeText}>
                        {infArray[key].long}
                      </p>
                    </div>
                    <div className={classes.whenToGoBox}>
                      <p className={classes.whenToGoPara}>WHEN TO GO</p>
                      <p className={classes.whenToGoData}>
                        {infArray[key].month}
                      </p>
                    </div>

                    <div
                      className={classes.addToFavBox}
                      onClick={() => {
                        favHandler(infArray[key].id);
                      }}
                    >
                      <AddIcon
                        className={classes.addIcon}
                        fontSize="small"
                      ></AddIcon>
                      <button className={classes.addToFavButton}>
                        ADD TO FAVORITES
                      </button>
                    </div>
                  </Popup>
                </Marker>
              </div>
            </Fragment>
          );
          dataArray.push(copyElement1);
          mapDataArray.push(copyElement2);
        }
      } else if (isFiltered === true && isSearchedByLocation === false) {
        for (const key in infArray) {
          if (
            infArray[key].country === country ||
            infArray[key].probability == wind
          ) {
            let exists = 0;
            for (const elem of idCollector) {
              if (elem === infArray[key].id) {
                exists = 1;
                break;
              }
            }
            if (exists === 0) {
              let position1 = [infArray[key].lat, infArray[key].long];
              const copyElement2 = (
                <div key={Math.random()}>
                  <Marker position={position1} icon={redIcon}>
                    <Popup className={classes.popUp}>
                      <h1 className={classes.townName}>{infArray[key].name}</h1>
                      <h2 className={classes.countryName}>
                        {infArray[key].country}
                      </h2>
                      <div className={classes.windProbabilityBox}>
                        <p className={classes.windProbabilityPara}>
                          WIND PROBABILITY
                        </p>
                        <p className={classes.windProbabilitPer}>
                          {infArray[key].probability} %
                        </p>
                      </div>
                      <div className={classes.latitudeBox}>
                        <p className={classes.latitudePara}>LATITUDE</p>
                        <p className={classes.latitudeText}>
                          {infArray[key].lat}
                        </p>
                      </div>
                      <div className={classes.longitudeBox}>
                        <p className={classes.longitudePara}>LONGITUDE</p>
                        <p className={classes.longitudeText}>
                          {infArray[key].long}
                        </p>
                      </div>
                      <div className={classes.whenToGoBox}>
                        <p className={classes.whenToGoPara}>WHEN TO GO</p>
                        <p className={classes.whenToGoData}>
                          {infArray[key].month}
                        </p>
                      </div>
                      <div
                        className={classes.addToFavBox}
                        onClick={() => {
                          favHandler(infArray[key].id);
                        }}
                      >
                        <AddIcon
                          className={classes.addIcon}
                          fontSize="small"
                        ></AddIcon>
                        <button className={classes.addToFavButton}>
                          ADD TO FAVORITES
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                </div>
              );
              if (isSearchedByLocation === false) {
                const copyElement1 = (
                  <div className={classes.tableRow} key={Math.random()}>
                    <p className={classes.name}>{infArray[key].name}</p>
                    <div className={classes.country}>
                      <p>{infArray[key].country}</p>
                    </div>
                    <p className={classes.lat}>{infArray[key].lat}</p>
                    <p className={classes.long}>{infArray[key].long}</p>
                    <p className={classes.windProb}>
                      {infArray[key].probability} %
                    </p>
                    <p className={classes.month}>{infArray[key].month}</p>
                  </div>
                );
                dataArray.push(copyElement1);
              }
              mapDataArray.push(copyElement2);
            }
            break;
          }
        }
      }
      //dsadasdasdsadas
      if (
        idCollector.length > 0 &&
        isFiltered === false &&
        isSearchedByLocation === false
      ) {
        for (const key in infArray) {
          let position1 = [infArray[key].lat, infArray[key].long];
          let exists = 0;
          let counter = 0;
          let classNameFav = classes.tableRow;
          let iconName;
          for (const elem of idCollector) {
            if (elem === infArray[key].id) {
              setSent(false);
              exists = 1;
              break;
            }
            counter++;
          }
          if (exists === 1) {
            classNameFav = classes.tableRowFav;
            iconName = yellowIcon;
          } else {
            iconName = DefaultIcon;
          }
          if (isSearchedByLocation === false) {
            const copyElement1 = (
              <div className={classNameFav} key={Math.random()}>
                <p className={classes.name}>{infArray[key].name}</p>
                <div className={classes.country}>
                  <p>{infArray[key].country}</p>
                </div>
                <p className={classes.lat}>{infArray[key].lat}</p>
                <p className={classes.long}>{infArray[key].long}</p>
                <p className={classes.windProb}>
                  {infArray[key].probability} %
                </p>
                <p className={classes.month}>{infArray[key].month}</p>
              </div>
            );
            dataArray.push(copyElement1);
          }

          const copyElement2 = (
            <div key={Math.random()}>
              <Marker position={position1} icon={iconName}>
                <Popup className={classes.popUp}>
                  <div className={classes.titleDiv}>
                    <h1 className={classes.townName}>{infArray[key].name}</h1>
                    <StarIcon
                      className={classes.starIcon}
                      fontSize="small"
                      onClick={() => {
                        remFromfavHandler(infArray[key].id);
                      }}
                    />
                  </div>
                  <h2 className={classes.countryName}>
                    {infArray[key].country}
                  </h2>
                  <div className={classes.windProbabilityBox}>
                    <p className={classes.windProbabilityPara}>
                      WIND PROBABILITY
                    </p>
                    <p className={classes.windProbabilitPer}>
                      {infArray[key].probability} %
                    </p>
                  </div>
                  <div className={classes.latitudeBox}>
                    <p className={classes.latitudePara}>LATITUDE</p>
                    <p className={classes.latitudeText}>{infArray[key].lat}</p>
                  </div>
                  <div className={classes.longitudeBox}>
                    <p className={classes.longitudePara}>LONGITUDE</p>
                    <p className={classes.longitudeText}>
                      {infArray[key].long}
                    </p>
                  </div>
                  <div className={classes.whenToGoBox}>
                    <p className={classes.whenToGoPara}>WHEN TO GO</p>
                    <p className={classes.whenToGoData}>
                      {infArray[key].month}
                    </p>
                  </div>

                  {exists === 1 ? (
                    <div
                      className={classes.remFromFavBox}
                      onClick={() => {
                        remFromfavHandler(infArray[key].id);
                      }}
                    >
                      <RemoveIcon
                        className={classes.remIcon}
                        fontSize="small"
                      ></RemoveIcon>
                      <button className={classes.remFromFavButton}>
                        REMOVE FROM FAVOURITES
                      </button>
                    </div>
                  ) : (
                    <div
                      className={classes.addToFavBox}
                      onClick={() => {
                        favHandler(infArray[key].id);
                      }}
                    >
                      <AddIcon
                        className={classes.addIcon}
                        fontSize="small"
                      ></AddIcon>
                      <button className={classes.addToFavButton}>
                        ADD TO FAVORITES
                      </button>
                    </div>
                  )}
                </Popup>
              </Marker>
              )
            </div>
          );

          mapDataArray.push(copyElement2);
        }
      }
      if (isSearchedByLocation === true) {
        for (const key in infArray) {
          if (infArray[key].name.localeCompare(locationData) == 0) {
            const copyElement1 = (
              <div className={classes.tableRow} key={Math.random()}>
                <p className={classes.name}>{infArray[key].name}</p>
                <div className={classes.country}>
                  <p>{infArray[key].country}</p>
                </div>
                <p className={classes.lat}>{infArray[key].lat}</p>
                <p className={classes.long}>{infArray[key].long}</p>
                <p className={classes.windProb}>
                  {infArray[key].probability} %
                </p>
                <p className={classes.month}>{infArray[key].month}</p>
              </div>
            );
            dataArray.push(copyElement1);
            let position1 = [infArray[key].lat, infArray[key].long];
            const copyElement2 = (
              <Fragment>
                <div key={Math.random()}>
                  <Marker position={position1} icon={DefaultIcon}>
                    <Popup className={classes.popUp}>
                      <h1 className={classes.townName}>{infArray[key].name}</h1>
                      <h2 className={classes.countryName}>
                        {infArray[key].country}
                      </h2>
                      <div className={classes.windProbabilityBox}>
                        <p className={classes.windProbabilityPara}>
                          WIND PROBABILITY
                        </p>
                        <p className={classes.windProbabilitPer}>
                          {infArray[key].probability} %
                        </p>
                      </div>
                      <div className={classes.latitudeBox}>
                        <p className={classes.latitudePara}>LATITUDE</p>
                        <p className={classes.latitudeText}>
                          {infArray[key].lat}
                        </p>
                      </div>
                      <div className={classes.longitudeBox}>
                        <p className={classes.longitudePara}>LONGITUDE</p>
                        <p className={classes.longitudeText}>
                          {infArray[key].long}
                        </p>
                      </div>
                      <div className={classes.whenToGoBox}>
                        <p className={classes.whenToGoPara}>WHEN TO GO</p>
                        <p className={classes.whenToGoData}>
                          {infArray[key].month}
                        </p>
                      </div>

                      <div
                        className={classes.addToFavBox}
                        onClick={() => {
                          favHandler(infArray[key].id);
                        }}
                      >
                        <AddIcon
                          className={classes.addIcon}
                          fontSize="small"
                        ></AddIcon>
                        <button className={classes.addToFavButton}>
                          ADD TO FAVORITES
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                </div>
              </Fragment>
            );
            mapDataArray.push(copyElement2);
            break;
          }
        }
      }
      //dasdsadasdasdsa
      setData(dataArray);
      setMapData(mapDataArray);
    };
    mapData().catch((e) => {
      setIsError(true);
      setErrorText("Something went wrong!");
    });
  }, [
    isFiltered,
    idCollector,
    sent,
    isDeleted,
    infArray,
    isSearchedByLocation,
  ]);

  return (
    <Fragment>
      {isError === false ? (
        <div>
          <div className={classes.logoutBox}>
            <div className={classes.logoutPopBox}>
              <AccountCircleIcon
                fontSize="large"
                className={classes.accountIcon}
                onClick={logoutHandler}
              />
              <NavLink to="/loginpage" className={classes.navLinkToLogin}>
                {isLogout === true ? (
                  <div className={classes.logout}>
                    <LogoutIcon className={classes.logoutIcon} />
                    <p className={classes.logoutPara}>Logout</p>
                  </div>
                ) : (
                  ""
                )}
              </NavLink>
            </div>
          </div>
          {isFiltered === false ? (
            <MapContainer
              center={[60, 10]}
              zoom={2}
              style={{ height: "80vh", width: "100%" }}
              className={classes.map}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapData}
            </MapContainer>
          ) : (
            <MapContainer
              center={[20, 20]}
              zoom={15}
              style={{ height: "60vh", width: "100%" }}
              className={classes.map}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapData}
            </MapContainer>
          )}
          {isFilter === false ? (
            <div className={classes.filterDiv}>
              <FilterListIcon onClick={filterHandler} />
              <button className={classes.filterButton} onClick={filterHandler}>
                FILTER
              </button>
            </div>
          ) : (
            <div className={classes.filterContainer}>
              <div className={classes.filterBox}>
                <CloseIcon
                  className={classes.closeIcon}
                  onClick={closeFilter}
                />
                <label htmlFor="country">Country</label>
                <input id="country" onChange={countryHandler} value={country} />
                <label htmlFor="windprobabily">Wind Probability</label>
                <input id="windprobabily" onChange={windHandler} value={wind} />
                {isFilterApplied === false ? (
                  <button
                    className={classes.applyFilterButton}
                    onClick={applyFilterHandler}
                  >
                    APPLY FILTER
                  </button>
                ) : (
                  <button
                    className={classes.applyFilterButton}
                    onClick={resetFilterHandler}
                  >
                    RESET FILTER
                  </button>
                )}
              </div>
            </div>
          )}
          <div className={classes.searchByLocationBox}>
            <div className={classes.inputBox}>
              {locationData !== "" ? (
                <SearchIcon
                  className={classes.searchIcon}
                  onClick={searchIconHandler}
                />
              ) : (
                <SearchIcon className={classes.searchIconDisabled} />
              )}
              <input
                className={classes.searchByLocationInput}
                placeholder="Search by location..."
                onChange={locationHandler}
                value={locationData}
              ></input>
            </div>
            <div className={classes.closeLocationBox}>
              {isSearchedByLocation !== false ? (
                <CloseIcon
                  fontSize="small"
                  onClick={searchIconHandler}
                  className={classes.closeLocationIcon}
                />
              ) : (
                <CloseIcon
                  fontSize="small"
                  className={classes.closeLocationIconDisabled}
                />
              )}
            </div>
          </div>
          <div className={classes.dataTable}>{data}</div>
        </div>
      ) : (
        <p className={classes.errorText}>{errorText}</p>
      )}
    </Fragment>
  );
};

export default MapPage;
