import React from "react";
import FHIR from "fhirclient";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "./Error";
import { getEnv, queryPatientIdKey } from "../util/util.js";
import "../style/App.scss";

export default function Launch() {
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let authURL = "launch-context.json";
    const backendURL = getEnv("REACT_APP_BACKEND_URL");
    if (backendURL) {
      authURL = `${backendURL}/auth/auth-info`;
    }
    const urlParams = new URLSearchParams(window.location.search);
    //retrieve patient id from URL querystring if any
    let patientId = urlParams.get("patient");
    console.log("patient id from url query string: ", patientId);
    console.log("Auth url ", authURL);

    fetch(authURL, {
      // include cookies in request
      credentials: "include",
    })
      .then((result) => {
        if (!result.ok) {
          throw Error(result.status);
        }
        return result.json();
      })
      .catch((e) => setError(e))
      .then((json) => {
        if (patientId) {
          //only do this IF patient id comes from url queryString
          json.patientId = patientId;
          sessionStorage.setItem(queryPatientIdKey, patientId);
        }
        //allow auth scopes to be updated via environment variable
        //see https://build.fhir.org/ig/HL7/smart-app-launch/scopes-and-launch-context.html
        const envAuthScopes = getEnv("REACT_APP_AUTH_SCOPES");
        if (envAuthScopes) json.scope = envAuthScopes;

        console.log("launch context json ", json);
        FHIR.oauth2.authorize(json).catch((e) => {
          setError(e);
        });
      })
      .catch((e) => {
        setError(e);
        console.log("launch error ", e);
      });
  }, []);

  return (
    <React.Fragment>
      {error && <Error message={error.message}></Error>}
      {!error && (
        <Stack
          spacing={2}
          direction="row"
          style={{ padding: "24px" }}
          alignItems="center"
        >
          <CircularProgress></CircularProgress>
          <div>Launching ...</div>
        </Stack>
      )}
    </React.Fragment>
  );
}
