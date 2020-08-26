import React from "react";
import NewProject from "../projects/NewProject";
import ListProject from "../projects/ListProjects";

const Sidebar = () => {
  return (
    <aside>
      <h1>
        MERN <span>Tasks</span>
      </h1>
			<NewProject />
			<div className="proyectos">
				<h2>Tus proyectos</h2>
        <ListProject />
			</div>
    </aside>
  );
};

export default Sidebar;
