import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import styled from 'styled-components'
import React from 'react';

  const ProfileContainer = styled.div`
  padding:32px;
  background-color: rgb(23 37 84 );
  color:white;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:center;

@media (min-width:768px){
  display:flex;
  flex-direction:row
}
`
const ProfileContent = styled.div
`
  display:flex;
  flex-direction:column;
  align-items:center;
  padding: 16px 0px;

@media (min-width:768){
  display:flex;
  align-items:items-start;
  padding: 64px;
}
`
const ProfileTitle = styled.h6
`
  font-weight:bold;
  margin-bottom: 4px;
`
const ProfileName = styled.h2
`
  font-weight:bold;
  font-size: 36px;
  margin-bottom: 12px
`;
const ProfileSpan = styled.span
`
  color: rgb(96 165 250) ;

` 
const ProfileDesc = styled.p
`
  font-size:20px;
  color:  rgb(147 197 253);

`;
const ProfileIcons = styled.div
`
display:flex;
align-items:center;
gap: 96px;
margin-top:20px;
`;
const ProfileImage = styled.div
`
  display:flex;
  justify-content: center;

  @media (min-width:768px){
  margin-left:64px;
  }

`
;
  const ProfileCard = ()=>{
   return (
    <ProfileContainer>
      <ProfileContent>
      <ProfileTitle>Hello,<ProfileSpan> I'm</ProfileSpan></ProfileTitle>
      <ProfileName> Wissam Jamous</ProfileName>
      <ProfileDesc>A Junior Front End Developper</ProfileDesc>
      <ProfileIcons>
      <a href='https://www.facebook.com/wissam.jamous.1?mibextid=ZbWKwL' target='_blank'>
      <FaFacebook size="24"/>
      </a>
      <a href='https://www.instagram.com/wissam.jamous' target='_blank'>
      <FaInstagram size="24"/>
      </a>
      <a href='https://www.github.com/wissam1111'>
      <FaGithub size="24"/>
      </a>
      </ProfileIcons>
      </ProfileContent>
      <ProfileImage>
        <img
          src={require('../../Assets/Images/31AWFCkio3L._AC_UF1000,1000_QL80_.jpg')}
          className="w-72 h-auto rounded-full object-cover"
        />
      </ProfileImage>
      </ProfileContainer>
  
)}

export default ProfileCard;