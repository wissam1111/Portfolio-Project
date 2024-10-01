import styled from "styled-components";
import React, { FC } from "react";

const ProfileCardContainer = styled.div`
display: grid;
grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
background-color: rgb(23 37 84);
gap:30px;
padding:30px;
animation: fadeIn 3s ease-in-out;

@keyframes fadeIn{
0%{
  opacity:0;
  transform:translateY(20px);
}
  100%{
  opacity:1;
  transform:translateY(0)
  }
}
`
const Cards = styled.div`
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  text-align: center;
  overflow-wrap: break-word; 
  
  max-height: 400px; 
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h1
`
color:black;
font-size:30px;
font-weight:bold;
`
const Description = styled.p
` font-size: 16px 
  color: rgb(96 165 250);

`
const Image = styled.img
`
  object-fit:cover;
  width:100%;
  height:200px;
`

interface Project {
  title:string;
  description:string;
  image:string;
}
interface ProjectProps{
  projects:Project[];
}

const ExampleCards:React.FC<ProjectProps>=({projects})=>{
  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-3">My Cards Projects</h1>
      <ProfileCardContainer>
        {projects.map((project,index)=>(
          <Cards key={index}>
            <Image src={project.image}/>
            <Title>{project.title}</Title>
            <Description>{project.description}</Description>
          </Cards>
        ))}
      </ProfileCardContainer>
    </div>
  )
}
export default ExampleCards;