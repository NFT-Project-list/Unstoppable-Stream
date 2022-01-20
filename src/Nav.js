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
            height: "65px",
            display: "flex",
            background: "#000",
            color: "#fff",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>{/*  <img width={200} height={200} src="/Meta.png" /> */}</div>

          <div>
            <Link
              style={{ padding: "0rem 3rem" }}
              className="text-0.05px text-blue-500 md:text-0.01px"
              to="./XplayVid"
            >
              Play Vids
            </Link>
            <Link
              style={{ padding: "0rem 3rem" }}
              className="text-0.05px text-blue-500 md:text-0.01px"
              to="./Stream"
            >
              Stream
            </Link>
          </div>
        </div>
        <div>
          <Switch>
            <Route path="/XplayVid" component={XplayVids} exact></Route>
            <Route path="/Stream" component={Stream} ></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}
export default Navhan;
