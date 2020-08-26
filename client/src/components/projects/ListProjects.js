import React from 'react';
import Project from './Project';


const ListProjects = ({project}) => {

    const projects = [
        {
            name: "Tienda virtual",
        },
        {
            name: "Compras de ropa",
        },
        {
            name: "MERN",
        }
    ]

    return (
        <ul className="listado-proyectos">
            {projects.map( project => (
                <Project
                    project={project}
                
                />

            ))}
        </ul>
    );
}
 
export default ListProjects;