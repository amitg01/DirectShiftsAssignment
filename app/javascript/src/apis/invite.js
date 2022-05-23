import axios from "axios";

const invite = (payload) => axios.post("/api/invitations", payload);

const invitationApi = {
  invite,
};

export default invitationApi;
