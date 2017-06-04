import * as React from "react";
import * as ReactDOM from "react-dom";

import { LeagueViewer } from "./components/LeagueViewer";

ReactDOM.render(
    <LeagueViewer apiKey='AIzaSyD5XCQu3WGomBBuU3bwyMbICk3YdlfLz2k' channelId='UCQJT7rpynlR7SSdn3OyuI_Q' />,
    document.getElementById("viewer")
);