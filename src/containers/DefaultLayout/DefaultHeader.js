import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../assets/logo_rota.jpg";
import sygnet from "../../assets/img/brand/sygnet.svg";
import { IoIosArrowDown } from "react-icons/io";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 50, height: 50, alt: "CoreUI Logo" }}
          minimized={{ src: logo, width: 30, height: 30, alt: "CoreUI Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav style={{ marginRight: 20 }}>
              {JSON.parse(localStorage.getItem("currentUser")).email}{" "}
              <IoIosArrowDown />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Ajustes</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-user"></i> Perfil
              </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock"></i> Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
