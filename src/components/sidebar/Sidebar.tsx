import React, { ReactElement } from 'react';
import s from './sidebar.module.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import DataBaseLogo from '../../assets/images/dataBaseLogo.png';
import ApplicationsLogo from '../../assets/images/applicationLogo.png';
import EmployersLogo from '../../assets/images/employersLogo.png';
import Clients from '../../assets/images/clientsLogo.png';
import ActivesLogo from '../../assets/images/activesLogo.png';
import SettingsLogo from '../../assets/images/settingsLogo.png';
import { useDispatch } from 'react-redux';
import {
  setAddNewApplicationVisibleAC,
  setEditApplicationVisibleAC,
} from '../../redux/applications-reducer';

type NavLinkType = {
  id: string;
  icon: string;
  text: string;
  navLink: string;
};

const Sidebar = (): ReactElement => {
  const navLinksArray: NavLinkType[] = [
    { id: '1', icon: DataBaseLogo, text: 'База знаний', navLink: '/dataBase' },
    { id: '2', icon: ApplicationsLogo, text: 'Заявки', navLink: '/applications' },
    { id: '3', icon: EmployersLogo, text: 'Сотрудники', navLink: '/employers' },
    { id: '4', icon: Clients, text: 'Клиенты', navLink: '/clients' },
    { id: '5', icon: ActivesLogo, text: 'Активы', navLink: '/actives' },
    { id: '6', icon: SettingsLogo, text: 'Настройки', navLink: '/settings' },
  ];
  const dispatch = useDispatch();

  return (
    <header className={s.sidebarContainer}>
      <nav className={s.sidebarNav}>
        <img className={s.logo} src={Logo} alt="Логотип" />
        <ul className={s.sidebarList}>
          {navLinksArray.map((item, i) => (
            <li className={s.sideBarItem} key={item.id}>
              <NavLink
                onClick={() => {
                  if (item.id === '2') {
                    dispatch(setAddNewApplicationVisibleAC(false));
                    dispatch(setEditApplicationVisibleAC(false));
                  }
                }}
                className={s.navLink}
                to={item.navLink}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#002b49' : 'transparent',
                })}
              >
                <img src={item.icon} alt="icon" />

                <span className={s.text}>{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Sidebar;
