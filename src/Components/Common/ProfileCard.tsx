import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import styled from 'styled-components';
import React from 'react';

// Styled components
const ProfileContainer = styled.div`
  padding: 32px;
  background-color: rgb(23 37 84);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0px;

  @media (min-width: 768px) {
    align-items: flex-start;
    padding: 64px;
  }
`;

const ProfileTitle = styled.h6`
  font-weight: bold;
  margin-bottom: 4px;
`;

const ProfileName = styled.h2`
  font-weight: bold;
  font-size: 36px;
  margin-bottom: 12px;
`;

const ProfileSpan = styled.span`
  color: rgb(96 165 250);
`;

const ProfileDesc = styled.p`
  font-size: 20px;
  color: rgb(147 197 253);
`;

const ProfileIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 96px;
  margin-top: 20px;
`;

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    margin-left: 64px;
  }
`;

// Define types for props (even if it's empty for now)
interface ProfileCardProps {
  title:string;
  name:string;
  description:string;
  imgUrl:string;
  facebookUrl:string;
  instagramUrl:string;
  githubUrl:string;
  }



// Functional component with TypeScript
const ProfileCard: React.FC<ProfileCardProps> = ({title,name,description,imgUrl,facebookUrl,instagramUrl,githubUrl}) => {
  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileTitle>
          Hello,<ProfileSpan> I'm</ProfileSpan>
        </ProfileTitle>
        <ProfileName>{name}</ProfileName>
        <ProfileDesc>{description}</ProfileDesc>
        <ProfileIcons>
          <a
            href={facebookUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaFacebook size='24' />
          </a>
          <a
            href={instagramUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram size='24' />
          </a>
          <a
            href={githubUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub size='24' />
          </a>
        </ProfileIcons>
      </ProfileContent>
      <ProfileImage>
        <img
          src={imgUrl}
          className='w-72 h-auto rounded-full object-cover'
          alt= {`${name}'s profile`} // Added alt attribute for accessibility
        />
      </ProfileImage>
    </ProfileContainer>
  );
};

export default ProfileCard;
