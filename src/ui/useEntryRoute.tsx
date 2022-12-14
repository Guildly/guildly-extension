import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { delay } from "../shared/utils/delay";
// import { IS_DEV } from "../shared/utils/dev";
import { useAppState } from "./app.state";
// import { recover } from "./features/recovery/recovery.service";
import { routes } from "./routes";
import { hasActiveSession, isInitialized } from "./services/backgroundSessions";
// import { getInitialHardReloadRoute } from "./services/resetAndReload";

export const useEntryRoute = () => {
  const navigate = useNavigate();
  const { isFirstRender } = useAppState();

  useEffect(() => {
    (async () => {
      if (isFirstRender) {
        const query = new URLSearchParams(window.location.search);
        const entry = await determineEntry();
        useAppState.setState({ isLoading: false, isFirstRender: false });
        navigate(entry);
      }
    })();
  }, [isFirstRender, navigate]);
};

const determineEntry = async () => {
  const hasSession = await hasActiveSession();
  if (hasSession) {
    return routes.home();
  }
  return routes.welcome();
};
