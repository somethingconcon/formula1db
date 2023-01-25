import React, { useState, useCallback, useMemo, useContext, ChangeEvent, useReducer, useRef} from 'react';
import {FormControl, InputLabel, FilledInput, Select, MenuItem} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import drivers from './data/drivers.json';
import years from './data/years.json';

const searchOptions = {"drivers": drivers, "years": years };

const searchTypes = [
    "drivers",
    "constructors",
    "circuits",
    "years"
];

const theme = createTheme({
    palette: {
      primary: {
        main: "#666",
      },
    },
  });

function changeHandler(event) {
    console.log(event);
    // fetch({}, );
}

interface SearchProps {
    value: string;
}

interface Filter {
    active: boolean;
    type: string;
    value: string|null;
    index?: number;
}

interface FilterAction {
    type: string;
    index?: number;
    value?: string;
}

function applyFilter(state: Array<Filter>, action: FilterAction) {
    let activeFilters: Array<Filter> = [...state];
    switch(action.type) {
        case "add" : {
            const takenFilters = activeFilters.map(f => f.type);
            const availableFilters = searchTypes.filter(st => !takenFilters.includes(st));
            const newFilter = availableFilters.shift();
            if(newFilter) {
                activeFilters.push({active: true, type: newFilter, value: null});
            } else {
                console.log("no more. please");
            }
            break;
        }
        case "remove": {
            if(Number.isInteger(action.index) && activeFilters.length > 1) {
                activeFilters = activeFilters.filter((f, i) => i !== action.index );
            } else {
                console.log("cannot delete last filter")
            }
            break; 
        }
        case "change": {
            if(Number.isInteger(action.index)) {
                const activeTypes = activeFilters.map(f => f.type);
                activeFilters = activeFilters.map((f, i) => {
                    if(i === action.index && action.value !== undefined) {
                        if(!activeTypes.includes(action.value)) {
                            f.type = action.value;
                        } else {
                            console.log("duplicate")
                            //f.error = "dupe";
                        }
                    }
                    return f;
                })
            }
            break;
        }
    }

    // do the things that the reducer is supposed to do
    return activeFilters;
}
interface FilterProps {
    type: string;
    value: string;
    index: number;
}

function Filter(props: FilterProps) {

}

export default function Search(props : SearchProps) {

    const typeRef = useRef();
    const searchRef = useRef();

    // change to use reducer
    // const [searchV, setSearchV] = useState(null);
    // const [searchR, setSearchR] = useState([]);
    // const [searchT, setSearchT] = useState("drivers");

    //
    const [filters, dispatchFilters] = useReducer(applyFilter, [{active: true, type: "drivers", value: null}]);

    function searchF(v:string) {

        // const formT = e.target as HTMLInputElement;
        // if(formT) {
        //     console.log(formT.value);
        // } else {
        //     console.log("Do nothing");   
        // }
        console.log(v)

    }

    function selectHandler(i : number, e: SelectChangeEvent) {
        filters
        // setSearchT(e.target.value);
    }

    function deleteHandler(idx: number, e: Event) {
        console.log("delete handler")
    }
    console.log(filters);
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
            
                <h1 id="welcome">Welcome to F1DB</h1>

                <form onSubmit={(e: React.SyntheticEvent) => {
                        // e.preventDefault();
                        // const target = e.target as typeof e.target & {
                        //     search: { value: string };
                        // };
                        // const searchVal = target.search.value;
                        // searchF(searchVal);
                    }} id="search">
                    

                    {/* <Select
                        onChange={selectHandler}
                        labelId="search-label"
                        id="select-search"
                        value={searchT}
                        label="type"
                        fullWidth>
                        {searchTypes.map(st => <MenuItem value={st}>{st}</MenuItem>)}
                    </Select>
                    <hr />
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">Search</InputLabel>
                        <FilledInput name="search" ref={searchRef} id="search-bar" />
                    </FormControl> */}
                    
                    {filters.map((f : Filter, i : number) => 
                        <>
                        <div className="search-filter">
                            <Select
                                onChange={(e) => dispatchFilters({type: "change", index: i, value: e.target.value })}
                                labelId={"search-type-"+i}
                                id={"select-search-"+i}
                                value={f.type}
                                label={"type-"+i}
                                fullWidth>
                                {searchTypes.map(st => <MenuItem value={st}>{st}</MenuItem>)}
                            </Select>

                            {searchOptions.hasOwnProperty(f.type) &&
                                 <Select
                                 >
                                    {searchOptions[f.type].map(o => <MenuItem value={o}>{o}</MenuItem>)  }
                                 </Select>
                            }
                           

                            {/* <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="filled-adornment-amount">Search</InputLabel>
                                <FilledInput name="search" ref={searchRef} id="search-bar" value={f.value}/>
                            </FormControl> */}

                            <span style={{color: 'blue'}} onClick={() => dispatchFilters({type: "remove", index: i})}>delete</span>
                        </div>
                        {!(filters.length === i + 1) && <hr />}
                        </>
                    )}
                </form>
            </div>
            {filters.length !== searchTypes.length &&
                <span onClick={() => dispatchFilters({type: "add"})}>
                    <AddBoxSharpIcon sx={{ fontSize: 80 }}/>
                </span>
            }
            {/* {searchR.length > 0 && 
                (
                    <table>
                    <thead>
                        <tr><td>col head</td></tr>
                    </thead>
                    <tbody>
                        {searchR.map((r, i) => <tr key={"result-"+i}><td>body</td></tr>)}
                    </tbody>
                    </table>
                )
            } */}
        </ThemeProvider>
    );

}