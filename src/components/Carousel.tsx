import styled from "styled-components";
import { carouselItems } from "../constants";
import { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CarouselComponent = styled.div`
  margin-top: 70px;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  display: flex;
`;

const CarouselItem = styled.div<{ level: number; totalLevels: number }>`
  position: relative;
  z-index: ${({ level }) => Math.abs(level)};
  height: 400px;
  width: 600px;
  opacity: 0.8;
  scale: ${({ level }) => Math.abs(level) * 0.3};
  translate: ${({ level, totalLevels }) => {
    const multiplier = level > 0 ? -1 : 1;
    return (totalLevels - Math.abs(level)) * multiplier * 65;
  }}%;
  ${({ level, totalLevels }) =>
    level === totalLevels &&
    `animation: fadeIn 0.6s;
    opacity: 1`};
  @keyframes fadeIn {
    0% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Header = styled.h1`
  margin: 0;
`;

const SubHeader = styled.h4``;

const Image = styled.img`
  border-radius: 10px;
  height: 100%;
  width: 100%;
`;

const Title = styled.p`
  margin: 0;
  position: absolute;
  bottom: 0;
  background: #231f2080;
  color: white;
  width: 100%;
  text-align: center;
  border-radius: 0 0 10px 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotIndicator = styled.div<{ isActive: boolean }>`
  height: 4px;
  width: 4px;
  background-color: #a4a4a4;
  margin: 4px;
  border-radius: 50%;
  ${({ isActive }) => {
    return (
      isActive &&
      `
      width: 16px;
        border-radius: 10px;
        background: #3dc1ee;
        `
    );
  }}
`;

const Button = styled.button`
  background: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  color: #a4a4a4;
`;

export const Carousel = ({ itemsToShow = 5 }) => {
  const itemRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = useMemo(() => {
    const visibleItems = [];
    const start = Math.round(currentIndex - itemsToShow / 2);
    const end = Math.round(currentIndex + itemsToShow / 2);
    for (let i = start; i < end; i++) {
      const itemIndex =
        i < 0
          ? i + carouselItems.length
          : i > carouselItems.length - 1
          ? i - carouselItems.length
          : i;

      visibleItems.push(carouselItems[itemIndex]);
    }
    return visibleItems;
  }, [currentIndex, itemsToShow]);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (id: string) => {
    const itemIndex = carouselItems.findIndex((item) => item.id === id);
    setCurrentIndex(itemIndex);
  };

  return (
    <CarouselComponent>
      <Header>Featured Products</Header>
      <SubHeader>Explore and discover variety of products</SubHeader>
      <CarouselContainer>
        {items.map((item, index) => {
          const idx = index + 1;
          const possibleLevels = Math.round(itemsToShow / 2);
          const level =
            idx < possibleLevels
              ? -1 * idx
              : possibleLevels - (idx - possibleLevels);

          return (
            <CarouselItem
              ref={itemRef}
              key={item.id}
              level={level}
              totalLevels={possibleLevels}
              onClick={() => {
                goToSlide(item.id);
              }}
            >
              <Image src={item.src} />
              <Title>{item.title}</Title>
            </CarouselItem>
          );
        })}
      </CarouselContainer>
      <ButtonContainer>
        <Button onClick={goToPrevSlide}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        {items.map((_, index) => {
          return (
            <DotIndicator isActive={Math.floor(itemsToShow / 2) === index} />
          );
        })}
        <Button onClick={goToNextSlide}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </ButtonContainer>
    </CarouselComponent>
  );
};
