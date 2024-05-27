import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation, Outlet } from "react-router-dom";

const PageTransition = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={500}>
        <div className="page">
          <Outlet />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
