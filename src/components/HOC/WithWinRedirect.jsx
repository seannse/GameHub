import { Navigate } from "react-router-dom";
import { useGameProgress } from "../../contexts/GameProgressContext";

function WithWinRedirect(Component, navigateTo) {
  return function WrappedComponent(props) {
    const { findTheSmileLevel, MAX_LEVELS } = useGameProgress();
    // console.log(findTheSmileLevel);
    // console.log(MAX_LEVELS);
    return findTheSmileLevel > MAX_LEVELS ? (
      <Navigate to={navigateTo} />
    ) : (
      <Component {...props} />
    );
  };
}
export default WithWinRedirect;
