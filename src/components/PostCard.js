import React from 'react';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import { useTilt } from '../hooks/useTilt';

const shimmerAnim = keyframes`
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(300%) skewX(-12deg); }
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  position: relative;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.glowPrimary} 0%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    box-shadow:
      0 8px 40px rgba(0, 0, 0, 0.12),
      0 0 0 1px ${({ theme }) => theme.colors.primary}40,
      0 0 30px ${({ theme }) => theme.colors.glowPrimary};
    opacity: 1;

    &::before {
      opacity: 1;
    }
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.colors.background};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -60%;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      105deg,
      transparent 0%,
      rgba(255, 255, 255, 0.15) 50%,
      transparent 100%
    );
    animation: ${shimmerAnim} 2.5s ease infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${CardLink}:hover &::after {
    opacity: 1;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  ${CardLink}:hover & {
    transform: scale(1.06);
  }
`;

const ExcerptPreview = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: 20px 24px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.backgroundSecondary} 100%
  );
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(transparent, ${({ theme }) => theme.colors.background});
  }

  p {
    position: relative;
    z-index: 1;
    font-size: 13px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.paragraph};
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    opacity: 0.8;
  }
`;

const CardContent = styled.div`
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  z-index: 1;
`;

const Category = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.headline};
`;

const Summary = styled.p`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.gray};
  margin: 0;
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
`;

const Date = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.gray};
  opacity: 0.7;
`;

const ReadMore = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.25s ease, transform 0.25s ease;

  ${CardLink}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const PostCard = ({ slug, title, date, category, thumbnail, summary, excerpt }) => {
  const { ref, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTilt(6);

  return (
    <CardLink
      to={slug}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {thumbnail ? (
        <ThumbnailWrapper>
          <Thumbnail src={thumbnail} alt={title} />
        </ThumbnailWrapper>
      ) : (
        <ExcerptPreview>
          <p>{excerpt || summary || ''}</p>
        </ExcerptPreview>
      )}
      <CardContent>
        {category && <Category>{category}</Category>}
        <Title>{title}</Title>
        {summary && <Summary>{summary}</Summary>}
        <Meta>
          <Date>{date}</Date>
          <ReadMore>Read more →</ReadMore>
        </Meta>
      </CardContent>
    </CardLink>
  );
};

export default PostCard;
