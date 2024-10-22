import AppNavigation from "./navigation/AppNavigation";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </>
  );
}
