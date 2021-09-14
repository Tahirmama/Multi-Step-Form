import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import "./style.css"




export default function Header() {

  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var n = weekday[d.getDay()];

  return (
    <div className= "root" >
      <AppBar position="static" style={{ background: 'primary' }}>
        <Toolbar>
         
          <Typography className="title" variant="h4" noWrap >
            <i>SHIPPING FORM</i>
          </Typography>
          <div className="Date">
          <h3 >
            Date :{" "}
            {n}{" "} {date}{"-"}{month}{"-"}{year}
          </h3>
</div>
        </Toolbar>
      </AppBar>
    </div>
  );
}