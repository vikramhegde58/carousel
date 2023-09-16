import { styled, css } from "styled-components";
import logo from "../assets/logo.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { allMenuItems } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { SearchInput } from "./SearchInput";

type MenuItemType = {
  id: string;
  title: string;
  url: string;
  show: boolean;
};

const menuItemStyle = css`
  margin: auto 0px;
  padding: 20px;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const NavBarContainer = styled.nav`
  position: fixed;
  color: white;
  display: flex;
  background-color: #2f302c;
  width: 100%;
  height: 70px;
`;

const Logo = styled.img`
  margin: auto 50px;
  width: 15%;
  min-width: 100px;
  max-width: 200px;
`;

const Menu = styled.div`
  display: flex;
  width: 50%;
  margin: auto 0px;
  @media only screen and (max-width: 480px) {
    width: 0;
  }
`;

const MenuItem = styled.div<{ show: boolean }>`
  ${menuItemStyle}
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  &:hover {
    color: #83cef9;
  }
`;

const MoreMenuContainer = styled.div`
  margin: auto 0px;
  position: relative;
  @media only screen and (max-width: 480px) {
    margin: auto;
  }
`;

const MoreMenuButton = styled.div`
  ${menuItemStyle}
  &:hover {
    color: #231f20;
    background-color: #eeeeee;
  }
`;

const MoreMenuBody = styled.div`
  position: absolute;
  background: #2f302c;
  top: 66px;
  left: -25px;
  border-radius: 6px;
  min-width: 150px;
  -webkit-box-shadow: 0px 5px 17px -8px rgba(0, 0, 0, 0.61);
  -moz-box-shadow: 0px 5px 17px -8px rgba(0, 0, 0, 0.61);
  box-shadow: 0px 5px 17px -8px rgba(0, 0, 0, 0.61);
`;

export const NavBar = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(allMenuItems);
  const [moreItems, setMoreItems] = useState<MenuItemType[]>([]);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const updateMenuItems = useCallback(() => {
    const menuDiv = menuRef.current;
    if (!menuDiv) {
      return;
    }

    const menuItemsArray = Array.from(menuDiv.children) as HTMLDivElement[];
    const prevMoreItems = [...moreItems];

    menuItemsArray.forEach((itm) => {
      console.log(itm.offsetLeft, menuDiv.offsetWidth + menuDiv.offsetLeft);
    });

    while (
      menuItemsArray.length > 0 &&
      menuItemsArray[menuItemsArray.length - 1].offsetLeft +
        menuItemsArray[menuItemsArray.length - 1].offsetWidth >
        menuDiv.offsetWidth + menuDiv.offsetLeft
    ) {
      const movedItemDiv = menuItemsArray.pop();
      const movedItem = menuItems.find(
        (menuItem) => menuItem.id === movedItemDiv?.id
      );
      movedItem && prevMoreItems.unshift(movedItem);
    }
    const filteredMenuItems = menuItems.map((itm) => {
      itm.show = !prevMoreItems.some((moreItem) => moreItem.id === itm.id);
      return itm;
    });
    setMoreItems(prevMoreItems);
    setMenuItems(filteredMenuItems);
  }, [moreItems, menuItems]);

  useEffect(() => {
    window.addEventListener("resize", updateMenuItems);
    updateMenuItems();
    return () => {
      window.removeEventListener("resize", updateMenuItems);
    };
  }, []);

  const toggleMore = () => {
    setIsShowingMore(!isShowingMore);
  };

  return (
    <NavBarContainer>
      <Logo src={logo} />
      <Menu ref={menuRef}>
        {menuItems.map((menuItem) => (
          <MenuItem show={menuItem.show} id={menuItem.id} key={menuItem.id}>
            {menuItem.title}
          </MenuItem>
        ))}
      </Menu>
      {!!moreItems.length && (
        <MoreMenuContainer>
          <MenuItem show onClick={toggleMore}>
            More <FontAwesomeIcon icon={faChevronDown} />
          </MenuItem>
          {isShowingMore && (
            <MoreMenuBody>
              {moreItems.map((moreMenuItem) => (
                <MoreMenuButton key={"more_" + moreMenuItem.id}>
                  {moreMenuItem.title}
                </MoreMenuButton>
              ))}
            </MoreMenuBody>
          )}
        </MoreMenuContainer>
      )}
      <SearchInput />
    </NavBarContainer>
  );
};
