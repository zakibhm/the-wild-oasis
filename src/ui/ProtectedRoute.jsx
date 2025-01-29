import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ProtectedRoute({ children }) {
  //1 Load the authenticated user

  const { isLoading, user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  //3 If the user is not authenticated, redirect to the login page

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, isLoading]);

  //2 While loading, show a spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  //4 If the user is authenticated, render the children
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
