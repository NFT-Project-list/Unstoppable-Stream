//import './styles/global.css'
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Stream from "./Stream";
import XplayVids from "./XplayVid";

function Navhan() {
  return (
    <>
      <BrowserRouter>
        <div
          className="App overflow-visible"
          style={{
           
            display: "flex",
           
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>{/*  <img width={200} height={200} src="/Meta.png" /> */}</div>

          <div>
            <Link
              style={{ padding: "0rem 3rem" }}
              className="text-xl text-blue-500 "
              to="./XplayVid"
            >
              Play Vids
            </Link>
            <Link
              style={{ padding: "0rem 3rem" }}
              className="text-xl text-blue-500 "
              to="./Stream"
            >
              Stream
            </Link>
          </div>
        </div>
        <div>
          <Switch>
            <Route path="/XplayVid" component={XplayVids}></Route>
            <Route path="/Stream" component={Stream}  exact></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}
export default Navhan;
