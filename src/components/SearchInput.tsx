import {
  IconDefinition,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const SearchContainer = styled.div`
  padding-bottom: 6px;
  display: flex;
  position: relative;
  margin: auto;
  width: 15%;
  min-width: 50px;
  border-bottom: 1px solid white;
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const SearchField = styled.input.attrs({ placeholder: "Search Something" })`
  outline: none;
  border: none;
  color: white;
  background: #2f302c;
  width: 100%;
`;

const SearchIcon = styled(FontAwesomeIcon).attrs<{ icon?: IconDefinition }>({
  icon: faMagnifyingGlass,
})`
  margin: 0px 4px;
`;

export const SearchInput = () => {
  return (
    <SearchContainer>
      <SearchIcon />
      <SearchField />
    </SearchContainer>
  );
};
