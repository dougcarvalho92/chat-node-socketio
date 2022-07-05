import { serverHttp } from "./http";
import "./websocket";
serverHttp.listen(3000, () => "server running on port 3000");
