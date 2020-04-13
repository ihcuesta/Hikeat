import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField
} from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { SearcherCont } from "../styled/HomeStyles";
import { s } from "../styled/globalStyles";

export const Searcher = () => {
  return (
    <SearcherCont>
      <Grid container>
        <Grid item xs={12} sm={10}>
          {
            // <TextField
            //   id="search"
            //   name="search"
            //   label="Search"
            //   type="text"
            //   variant="outlined"
            //   size="medium"
            //   fullWidth="true"
            //   inputRef={register({ required: true })}
            //   InputProps={
            //     ({
            //       startAdornment: (
            //         <InputAdornment position="start">
            //           <LocationOnOutlinedIcon />
            //         </InputAdornment>
            //       )
            //     },
            //     txtField)
            //   }
            // />
          }
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button color="primary" variant="contained">
            <SearchOutlinedIcon color="#FFF" />
          </Button>
        </Grid>
      </Grid>
    </SearcherCont>
  );
};
